import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequestForm from '@/components/RequestForm';
import { ArrowLeft, Camera, LogIn, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import * as tmImage from "@teachablemachine/image";

const SolicitarPlantio = () => {
  const [isLogado, setIsLogado] = useState(false);
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingIA, setLoadingIA] = useState(false);
  const [aptoIA, setAptoIA] = useState<boolean | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const modelURL = "https://teachablemachine.withgoogle.com/models/04ijzUI11/";
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('raiz_urbana_usuario');
    if (usuarioLocal) {
      try {
        const usuario = JSON.parse(usuarioLocal);
        setIsLogado(usuario.isLogado);
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
      }
    }
  }, []);

  const loadModel = async () => {
    if (!model) {
      const loadedModel = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
      setModel(loadedModel);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setAptoIA(null);
    };
    reader.readAsDataURL(file);
  };

  const predictImage = async () => {
    if (!model || !imageRef.current) return;

    setLoadingIA(true);
    const prediction = await model.predict(imageRef.current);

    const result = prediction.reduce((prev, current) =>
      current.probability > prev.probability ? current : prev
    );

    if (result.className === "Apto para plantio") {
      setAptoIA(true);
      toast.success("🌱 Apto para plantio! Sua solicitação será analisada pela equipe.");
    } else {
      setAptoIA(false);
      toast.error("🚫 Inapto para plantio. Verifique os critérios ou envie outra imagem.");
    }

    setLoadingIA(false);
  };

  const handleSubmitIA = async () => {
    await loadModel();
    await predictImage();
  };

  const handleRedirectToLogin = () => {
    toast.error("Você precisa fazer login para solicitar um plantio.");
    navigate('/autenticacao');
  };

  const handleBoraPlantarJuntos = () => {
    toast("Vamos plantar juntos!", {
      description: "Redirecionando para criar sua conta...",
    });
    navigate('/autenticacao');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4">Solicitar Plantio de Árvore</h1>

          <p className="text-raiz-gray mb-3 max-w-3xl">
            Preencha o formulário abaixo para solicitar o plantio de uma árvore. Nossa equipe técnica
            analisará o pedido e entrará em contato para agendar uma visita ao local.
          </p>

          <div className="bg-white rounded-lg p-4 mb-8 flex items-center gap-3 border-l-4 border-raiz-green shadow-sm max-w-3xl">
            <Camera className="h-6 w-6 text-raiz-green flex-shrink-0" />
            <p className="text-sm text-raiz-gray">
              <strong>Novidade:</strong> Agora você pode tirar uma foto do local diretamente pelo celular ou enviar uma imagem da galeria.
            </p>
          </div>

          {/* Upload e análise com IA */}
          <div className="bg-white rounded-lg p-4 border border-raiz-green/40 mb-8 shadow-sm max-w-3xl">
            <h3 className="text-md font-semibold text-raiz-green-dark mb-3">
              Enviar ou capturar imagem do local
            </h3>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="mb-3 block text-sm text-gray-600"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                ref={imageRef}
                className="w-full max-w-xs rounded-lg border border-gray-300 mb-3"
              />
            )}

            <Button
              onClick={handleSubmitIA}
              disabled={!imagePreview || loadingIA}
              className="bg-raiz-green-dark hover:bg-raiz-green-light text-white flex items-center gap-2"
            >
              {loadingIA ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Analisando imagem...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Analisar imagem com IA
                </>
              )}
            </Button>
          </div>

          {/* Exibição condicional */}
          {isLogado ? (
            aptoIA === null || aptoIA === true ? (
              <RequestForm />
            ) : (
              <div className="text-center text-raiz-gray">
                Envie uma nova imagem válida para prosseguir com o formulário.
              </div>
            )
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl">
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-raiz-green-dark mb-2">
                  Faça login para solicitar um plantio
                </h2>
                <p className="text-raiz-gray mb-6">
                  É necessário ter uma conta para acompanhar o status do seu pedido e receber notificações sobre o plantio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleBoraPlantarJuntos}
                    className="bg-raiz-green-dark hover:bg-raiz-green-light flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    <span>Bora plantar juntos?</span>
                  </Button>
                  <Button
                    onClick={handleRedirectToLogin}
                    variant="outline"
                    className="border-raiz-green-dark text-raiz-green-dark hover:bg-raiz-green-light/10 flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Já tenho uma conta</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SolicitarPlantio;
