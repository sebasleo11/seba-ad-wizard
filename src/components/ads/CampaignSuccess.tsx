import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Download, Mail, RefreshCw, Image as ImageIcon, Target, DollarSign, MapPin, Users, Calendar, Brain } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import jsPDF from 'jspdf';

interface CampaignData {
  objective: string;
  budget: number;
  audience: {
    location: string;
    ageRange: string[];
    interests: string[];
    gender: string[];
  };
  content: {
    autoGenerateText: boolean;
    customText: string;
    imageUrl: string;
    cta: string;
    destinationType: string;
    destinationUrl: string;
  };
}

const CampaignSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const stateData = location.state?.data;
    if (stateData) {
      setCampaignData(stateData);
      return;
    }

    const storedData = localStorage.getItem('campaignData');
    if (storedData) {
      setCampaignData(JSON.parse(storedData));
      return;
    }

    navigate('/create-ad');
  }, [location.state, navigate]);

  useEffect(() => {
    const imageUrl = campaignData?.content.imageUrl;
    if (!imageUrl) return;

    if (typeof imageUrl === 'string') {
      setImageUrl(imageUrl);
    } else if (imageUrl && typeof imageUrl === 'object' && 'name' in imageUrl && 'type' in imageUrl) {
      setImageUrl(URL.createObjectURL(imageUrl as File));
    }
  }, [campaignData]);

  useEffect(() => {
    if (campaignData) {
      toast({
        title: "¡Éxito!",
        description: "Tu kit de campaña fue generado con éxito",
      });
    }
  }, [campaignData, toast]);

  const handleDownload = async () => {
    if (!campaignData) return;

    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(24);
    doc.text('Kit de Campaña Publicitaria', 20, 20);
    
    // Objetivo
    doc.setFontSize(16);
    doc.text('Objetivo de la Campaña', 20, 40);
    doc.setFontSize(12);
    doc.text(campaignData.objective, 20, 50);
    
    // Audiencia
    doc.setFontSize(16);
    doc.text('Público Objetivo', 20, 70);
    doc.setFontSize(12);
    doc.text(`Ubicación: ${campaignData.audience.location}`, 20, 80);
    doc.text(`Edades: ${Array.isArray(campaignData.audience.ageRange) ? campaignData.audience.ageRange.join(', ') : campaignData.audience.ageRange}`, 20, 90);
    doc.text(`Género: ${Array.isArray(campaignData.audience.gender) ? campaignData.audience.gender.join(', ') : campaignData.audience.gender}`, 20, 100);
    doc.text(`Intereses: ${Array.isArray(campaignData.audience.interests) ? campaignData.audience.interests.join(', ') : campaignData.audience.interests}`, 20, 110);
    
    // Presupuesto
    doc.setFontSize(16);
    doc.text('Presupuesto', 20, 130);
    doc.setFontSize(12);
    doc.text(`USD $${campaignData.budget} por día`, 20, 140);
    
    // Copy
    doc.setFontSize(16);
    doc.text('Texto del Anuncio', 20, 160);
    doc.setFontSize(12);
    const copy = campaignData.content.autoGenerateText 
      ? campaignData.content.customText 
      : campaignData.content.customText;
    doc.text(copy, 20, 170);
    
    // Imagen
    if (imageUrl && !imageError) {
      try {
        const img = new Image();
        img.src = imageUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        doc.addImage(img, 'JPEG', 20, 190, 170, 100);
      } catch (error) {
        doc.text('Imagen no disponible', 20, 190);
      }
    } else {
      doc.text('Imagen no disponible', 20, 190);
    }

    doc.save('kit-campaña.pdf');
  };

  const handleEmail = () => {
    toast({
      title: "En desarrollo",
      description: "Próximamente podrás enviar el kit por email",
    });
  };

  const handleNewCampaign = () => {
    navigate('/create-ad');
  };

  if (!campaignData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">🎉</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Tu anuncio está listo!
          </h1>
          <p className="text-xl text-gray-600">
            Así se verá tu anuncio en las redes sociales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vista previa del anuncio */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              {/* Encabezado del anuncio */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">SA</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Seba Ads Pro</h3>
                    <p className="text-sm text-gray-500">Anuncio patrocinado</p>
                  </div>
                </div>
              </div>

              {/* Contenido del anuncio */}
              <div className="p-4 space-y-4">
                {/* Imagen */}
                <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                  {imageUrl && !imageError ? (
                    <img
                      src={imageUrl}
                      alt="Imagen del anuncio"
                      className="object-cover w-full h-full"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span>Imagen no disponible</span>
                    </div>
                  )}
                </div>

                {/* Texto del anuncio */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {campaignData.objective}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {campaignData.content.customText}
                  </p>
                </div>

                {/* Reacciones simuladas */}
                <div className="flex items-center gap-4 text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <span>👍</span>
                    <span className="text-sm">1.2K</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span className="text-sm">45</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>↗️</span>
                    <span className="text-sm">89</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de detalles */}
          <div className="space-y-6">
            {/* Objetivo */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Objetivo de la campaña</h3>
              </div>
              <p className="text-gray-600">{campaignData.objective}</p>
            </div>

            {/* Presupuesto */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Presupuesto diario</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">USD ${campaignData.budget}</p>
            </div>

            {/* Audiencia */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Público objetivo</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{campaignData.audience.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {Array.isArray(campaignData.audience.gender) ? campaignData.audience.gender.join(', ') : campaignData.audience.gender}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {Array.isArray(campaignData.audience.ageRange) ? campaignData.audience.ageRange.join(', ') : campaignData.audience.ageRange}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {Array.isArray(campaignData.audience.interests) ? campaignData.audience.interests.join(', ') : campaignData.audience.interests}
                  </span>
                </div>
              </div>
            </div>

            {/* Recomendación de IA */}
            <div className="bg-primary/5 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-sm text-gray-600">
                    Te sugerimos publicar este anuncio entre las 19 y 21 hs. en Instagram para mayor rendimiento.
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Download className="w-4 h-4" />
                Descargar Kit
              </Button>
              
              <Button
                onClick={handleEmail}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Enviar por email
              </Button>
              
              <Button
                onClick={handleNewCampaign}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Generar nueva campaña
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSuccess; 