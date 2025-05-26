
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Camera, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequestForm from '@/components/RequestForm';

export default function SolicitarPlantio() {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<'camera' | 'form' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function initWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsWebcamActive(true);
      
      // Simular análise após 3 segundos
      setTimeout(() => {
        const isApto = Math.random() > 0.5; // 50% de chance de ser apto
        
        if (isApto) {
          setMessage('✅ Este local está apto para plantio! Sua solicitação foi registrada e será analisada por nossa equipe técnica.');
        } else {
          const motivos = [
            '🚫 A calçada tem menos de 1,90m. Isso impede o crescimento saudável da árvore e a circulação segura.',
            '🚫 Há muitos equipamentos urbanos no local, como postes, rampas ou entradas de garagem.',
            '🚫 O solo está muito compactado ou pavimentado. Isso prejudica o desenvolvimento da árvore.',
            '🚫 Ruas com menos de 7 metros não podem ser arborizadas devido à segurança do trânsito.',
            '🚫 Há fiação elétrica de média/alta tensão. Plantio aqui não é permitido por segurança.'
          ];
          const motivoAleatorio = motivos[Math.floor(Math.random() * motivos.length)];
          setMessage(motivoAleatorio);
        }
      }, 3000);
      
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      toast.error("Erro ao acessar a câmera");
    }
  }

  function stopWebcam() {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsWebcamActive(false);
    setMessage('');
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
        
        // Simular análise da imagem
        setTimeout(() => {
          const isApto = Math.random() > 0.5; // 50% de chance de ser apto
          
          if (isApto) {
            toast.success("🌱 Local apto para plantio! Prossiga com o formulário abaixo.");
            setSelectedOption('form');
          } else {
            const motivos = [
              "Calçada estreita",
              "Obstáculos urbanos", 
              "Solo inadequado",
              "Rua estreita",
              "Fiação elétrica"
            ];
            const motivoAleatorio = motivos[Math.floor(Math.random() * motivos.length)];
            toast.error(`🚫 Plantio não recomendado: ${motivoAleatorio}`);
          }
        }, 2000);
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
            
<RequestForm temImagem={!!preview} />
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
                      <div className="flex justify-center">
                        <video
                          ref={videoRef}
                          className="w-80 h-60 rounded-lg border"
                          autoPlay
                          muted
                        />
                      </div>
                      {message ? (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{message}</p>
                        </div>
                      ) : (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm">🔍 Analisando o local...</p>
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
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm">🔍 Analisando a imagem...</p>
                      </div>
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
