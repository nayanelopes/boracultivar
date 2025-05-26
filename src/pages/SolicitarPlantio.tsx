
import React, { useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Camera, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequestForm from '@/components/RequestForm';

const MODEL_URL = "/teachable_model/";

export default function SolicitarPlantio() {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [webcam, setWebcam] = useState<tmImage.Webcam | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<'camera' | 'form' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function loadModel() {
    if (!model) {
      try {
        const loadedModel = await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
        setModel(loadedModel);
        return loadedModel;
      } catch (error) {
        console.error("Erro ao carregar modelo:", error);
        toast.error("Erro ao carregar o modelo de verificação");
        return null;
      }
    }
    return model;
  }

  async function initWebcam() {
    const loadedModel = await loadModel();
    if (!loadedModel) return;

    try {
      const webcamInstance = new tmImage.Webcam(320, 320, true);
      await webcamInstance.setup();
      await webcamInstance.play();

      if (webcamRef.current) {
        webcamRef.current.appendChild(webcamInstance.canvas);
      }

      setWebcam(webcamInstance);
      setIsWebcamActive(true);

      const loop = async () => {
        if (webcamInstance && loadedModel) {
          webcamInstance.update();
          const prediction = await loadedModel.predict(webcamInstance.canvas);
          prediction.sort((a, b) => b.probability - a.probability);
          const topPrediction = prediction[0];
          
          const mensagens: { [key: string]: string } = {
            'Apto para plantio': '✅ Este local está apto para plantio! Sua solicitação foi registrada e será analisada por nossa equipe técnica.',
            'Calçada estreita': '🚫 A calçada tem menos de 1,90m. Isso impede o crescimento saudável da árvore e a circulação segura.',
            'Obstáculos urbanos': '🚫 Há muitos equipamentos urbanos no local, como postes, rampas ou entradas de garagem.',
            'Solo inadequado': '🚫 O solo está muito compactado ou pavimentado. Isso prejudica o desenvolvimento da árvore.',
            'Rua estreita': '🚫 Ruas com menos de 7 metros não podem ser arborizadas devido à segurança do trânsito.',
            'Fiação elétrica': '🚫 Há fiação elétrica de média/alta tensão. Plantio aqui não é permitido por segurança.',
            'Sem área permeável': '🚫 O local precisa ter solo permeável para infiltrar água e nutrir a árvore.',
            'Muito próximo de edificações': '🚫 A árvore poderia causar danos estruturais a construções próximas.',
          };
          
          setMessage(mensagens[topPrediction.className] || 'Resultado não identificado. Tente novamente.');
          
          if (isWebcamActive) {
            requestAnimationFrame(loop);
          }
        }
      };

      loop();
    } catch (error) {
      console.error("Erro ao inicializar webcam:", error);
      toast.error("Erro ao acessar a câmera");
    }
  }

  function stopWebcam() {
    if (webcam) {
      webcam.stop();
      setWebcam(null);
      setIsWebcamActive(false);
      setMessage('');
      if (webcamRef.current) {
        webcamRef.current.innerHTML = '';
      }
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const loadedModel = await loadModel();
    if (!loadedModel || !event.target.files) return;

    const file = event.target.files[0];
    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        image.src = reader.result;
        setPreview(reader.result);
        image.onload = async () => {
          const prediction = await loadedModel.predict(image);
          const best = prediction.reduce((prev, curr) =>
            curr.probability > prev.probability ? curr : prev
          );

          const label = best.className;

          if (label.includes("Apto")) {
            toast.success("🌱 Local apto para plantio! Prossiga com o formulário abaixo.");
            setSelectedOption('form');
          } else {
            const motivo = label.replace("Inapto - ", "");
            toast.error(`🚫 Plantio não recomendado: ${motivo}`);
          }
        };
      }
    };

    reader.readAsDataURL(file);
  }

  if (selectedOption === 'form') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-raiz-green-light/10 py-10 flex-grow">
          <div className="container">
            <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar à página inicial</span>
            </Link>
            
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark">Solicitar Plantio</h1>
              <Button
                onClick={() => setSelectedOption(null)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Verificar outro local
              </Button>
            </div>
            
            <RequestForm />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-raiz-green-light/10 py-10 flex-grow">
        <div className="container">
          <Link to="/" className="flex items-center gap-1 text-raiz-green-dark hover:text-raiz-green-light transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar à página inicial</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-raiz-green-dark mb-4">Solicitar Plantio</h1>
          
          <p className="text-raiz-gray mb-8 max-w-3xl">
            Primeiro, vamos verificar se o local é adequado para o plantio de árvores. Escolha uma das opções abaixo:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Verificação por Câmera */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-xl rounded-2xl border border-green-200 h-full">
                <CardContent className="p-6 space-y-5 text-center h-full flex flex-col">
                  <Camera className="h-16 w-16 text-green-600 mx-auto" />
                  <h2 className="text-2xl font-bold text-green-800">Verificação ao Vivo</h2>
                  <p className="text-sm text-muted-foreground flex-grow">
                    Use sua câmera para verificar o local em tempo real. Ideal para uma análise instantânea.
                  </p>

                  {!isWebcamActive ? (
                    <Button
                      onClick={initWebcam}
                      className="bg-green-600 hover:bg-green-700 text-white w-full"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Iniciar Câmera
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div ref={webcamRef} className="flex justify-center"></div>
                      {message && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{message}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          onClick={stopWebcam}
                          variant="outline"
                          className="flex-1"
                        >
                          Parar
                        </Button>
                        {message.includes('✅') && (
                          <Button
                            onClick={() => setSelectedOption('form')}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          >
                            Continuar
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Verificação por Upload */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-xl rounded-2xl border border-green-200 h-full">
                <CardContent className="p-6 space-y-5 text-center h-full flex flex-col">
                  <Upload className="h-16 w-16 text-green-600 mx-auto" />
                  <h2 className="text-2xl font-bold text-green-800">Enviar Foto</h2>
                  <p className="text-sm text-muted-foreground flex-grow">
                    Envie uma foto do local que deseja arborizar. Ideal se você já tem uma imagem salva.
                  </p>

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Escolher Foto
                  </Button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {preview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-3"
                    >
                      <img
                        src={preview}
                        alt="Pré-visualização da imagem"
                        className="w-full rounded-xl border max-h-48 object-cover"
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Opção de pular verificação */}
          <div className="text-center mt-8">
            <Button
              onClick={() => setSelectedOption('form')}
              variant="outline"
              className="text-raiz-green-dark border-raiz-green-light hover:bg-raiz-green-light/20"
            >
              Pular verificação e ir direto ao formulário
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
