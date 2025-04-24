// src/service/generateFromIA.ts

import type { CampaignData } from '../types/campaign';

const ENDPOINT = import.meta.env.VITE_N8N_ENDPOINT;

export const generarAnuncioIA = async (data: CampaignData) => {
  try {
    const response = await fetch(`${ENDPOINT}/generar-anuncio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Error al generar el anuncio con IA");
    }

    const result = await response.json();

    return {
      copy: result.copy,
      title: result.title,
      imageUrl: result.image_url
    };
  } catch (error) {
    console.error("🛑 Error al conectar con la IA desde generateFromIA.ts:", error);
    throw error;
  }
};
