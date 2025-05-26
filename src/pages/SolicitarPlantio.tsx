// src/pages/SolicitarPlantio.tsx
import React, { useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const MODEL_URL = "/teachable_model/";

export default function SolicitarPlantio() {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function loadModel() {
    if (!model) {
      const loadedModel = await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
      setModel(loadedModel);
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!model || !event.target.files) return;

    const file = event.target.files[0];
    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        image.src = reader.result;
        setPreview(reader.result); // atualiza preview
        image.onload = async () => {
          const prediction = await model.predict(image);
          const best = prediction.reduce((prev, curr) =>
            curr.probability > prev.probability ? curr : prev
          );

          const label = best.className;
          const confidence = best.probability;

          if (label.includes("Apto")) {
            toast.success("🌱 Local apto para plantio! Sua solicitação será analisada pela equipe técnica.");
          } else {
            const motivo = label.replace("Inapto - ", "");
            toast.error(`🚫 Plantio não pôde ser solicitado: ${motivo}`);
          }
        };
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-xl rounded-2xl border border-green-200">
        <CardContent className="p-6 space-y-5 text-center">
          <h1 className="text-2xl font-bold text-green-800">📷 Solicitar Plantio por Imagem</h1>
          <p className="text-sm text-muted-foreground">
            Envie uma foto da calçada ou espaço urbano que deseja arborizar.
          </p>

          <Button
            onClick={() => {
              loadModel();
              fileInputRef.current?.click();
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Enviar Foto
          </Button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {preview && (
            <motion.img
              key={preview}
              src={preview}
              alt="Pré-visualização da imagem"
              className="w-full rounded-xl mt-4 border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
