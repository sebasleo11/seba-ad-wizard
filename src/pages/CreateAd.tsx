import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdWizard from '@/components/ads/AdWizard';
import CampaignKit from '@/components/ads/CampaignKit';
import FinalStep from '@/components/ads/steps/FinalStep';

const CreateAd = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleStartClick = () => {
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleComplete = async (data: any) => {
    try {
      const response = await fetch('https://leo11.app.n8n.cloud/webhook/crear-campania', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos a n8n');
      }

      const result = await response.json();
      setCampaignData(result);
      setShowFinalStep(true); // activa el paso final
    } catch (error) {
      console.error('Error en el envío:', error);
      alert('Ocurrió un error al generar el contenido con IA');
    }
  };

  const updateCampaignData = (section: string, data: any) => {
    setCampaignData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <Layout>
      {!showForm && !campaignData ? (
        <>
          <div className="container-app py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                ¡Creá tu anuncio en 2 minutos!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Responde algunas preguntas simples y obtendrás un anuncio personalizado listo para usar.
              </p>
              <div className="sebabot-tip">
                <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg shadow-sm mt-4">
                  🤖 Sebabot: ¡Hola! Antes de comenzar, recordá que te voy a guiar paso a paso 😉
                </p>
              </div>
            </div>

            <button
              onClick={handleStartClick}
              className="btn-primary text-xl flex items-center justify-center mx-auto gap-2 mt-10"
            >
              🚀 Comenzar
            </button>

            {/* Beneficios visuales */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-xl">⚙️</span>
                <h3 className="text-lg font-semibold mb-2">Proceso simple</h3>
                <p className="text-gray-600">Un cuestionario sencillo para crear anuncios efectivos.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-xl">⚡</span>
                <h3 className="text-lg font-semibold mb-2">Resultados rápidos</h3>
                <p className="text-gray-600">En solo 2 minutos tendrás tu anuncio listo para publicar.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-xl">🤖</span>
                <h3 className="text-lg font-semibold mb-2">IA optimizada</h3>
                <p className="text-gray-600">Anuncios creados con tecnología de IA para mejorar tus resultados.</p>
              </div>
            </div>
          </div>
        </>
      ) : showForm && !campaignData ? (
        <AdWizard onComplete={handleComplete} />
      ) : showFinalStep ? (
        <FinalStep
          data={campaignData}
          updateData={updateCampaignData}
          onBack={() => setShowFinalStep(false)}
        />
      ) : (
        <CampaignKit campaignData={campaignData} />
      )}

      {campaignData?.copy && campaignData?.titulo && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-xl font-bold mb-2">{campaignData.titulo}</h2>
          <p className="text-gray-700">{campaignData.copy}</p>
        </div>
      )}

      {campaignData?.imagenes && campaignData.imagenes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {campaignData.imagenes.map((url: string, index: number) => (
            <div key={index} className="rounded overflow-hidden shadow">
              <img
                src={url}
                alt={`Imagen generada ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default CreateAd;



