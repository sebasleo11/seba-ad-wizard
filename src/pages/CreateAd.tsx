
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdWizard from '@/components/ads/AdWizard';
import CampaignKit from '@/components/ads/CampaignKit';

const CreateAd = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [campaignData, setCampaignData] = useState(null);

  const handleStartClick = () => {
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleComplete = (data: any) => {
    setCampaignData(data);
  };

  return (
    <Layout>
      <div className="container-app py-12">
        {!showForm && !campaignData ? (
          <>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                ¡Creá tu anuncio en 2 minutos!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Responde algunas preguntas simples y obtendrás un anuncio personalizado listo para publicar en Facebook Ads.
              </p>
              

              <div className="sebabot-tip">
                <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg shadow-sm mt-4">
                  💡 Sebabot: ¡Hola! Antes de comenzar, recordá que te voy a guiar paso a paso. Hacé clic en "Comenzar".
                </p>
              </div>

              <button
                onClick={handleStartClick}
                className="btn-primary text-xl flex items-center justify-center mx-auto gap-2 mt-6"
              >
                🚀 Comenzar
              </button>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">⚙️</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Proceso simple</h3>
                  <p className="text-gray-600">Un cuestionario sencillo para crear anuncios efectivos.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Resultados rápidos</h3>
                  <p className="text-gray-600">En solo 2 minutos tendrás tu anuncio listo para publicar.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">IA optimizada</h3>
                  <p className="text-gray-600">Anuncios creados con tecnología de IA para mejores resultados.</p>
                </div>
              </div>
            </div>
          </>
        ) : showForm && !campaignData ? (
          <AdWizard onComplete={handleComplete} />
        ) : (
          <CampaignKit campaignData={campaignData} />
        )}
      </div>
    </Layout>
  );
};

export default CreateAd;

