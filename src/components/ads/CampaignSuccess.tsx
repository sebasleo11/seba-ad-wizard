import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Download, Mail, RefreshCw, Image as ImageIcon, 
  Target, DollarSign, MapPin, Users, Calendar, Brain,
  Facebook, Instagram, Youtube, Clock, Calendar as CalendarIcon,
  TrendingUp, Sparkles
} from 'lucide-react';
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
    imageUrl: string | File;
    cta: string;
    destinationType: string;
    destinationUrl: string;
  };
}

type FormatType = 'facebook' | 'instagram' | 'shorts';

const formatDimensions = {
  facebook: { width: 1200, height: 628 },
  instagram: { width: 1080, height: 1080 },
  shorts: { width: 1080, height: 1920 }
};

// Hook para generación de prompts IA (estructura preparada)
const useAIPromptGenerator = (campaignData: CampaignData | null) => {
  const generatePrompt = () => {
    if (!campaignData) return '';
    
    return `
      Objetivo: ${campaignData.objective}
      Audiencia: ${campaignData.audience.location}, ${campaignData.audience.ageRange.join(', ')}, ${campaignData.audience.gender.join(', ')}
      Intereses: ${campaignData.audience.interests.join(', ')}
      Presupuesto: ${campaignData.budget}
      Copy actual: ${campaignData.content.customText}
    `;
  };

  return { generatePrompt };
};

const CampaignSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('facebook');
  const [generationAttemptsLeft, setGenerationAttemptsLeft] = useState(2);
  const imageRef = useRef<HTMLImageElement>(null);
  const { generatePrompt } = useAIPromptGenerator(campaignData);

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

  const handleGenerateImage = async () => {
    if (generationAttemptsLeft <= 0) {
      toast({
        title: "Límite alcanzado",
        description: "Has alcanzado el límite de generaciones de imágenes",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simular generación de imagen
      setGenerationAttemptsLeft(prev => prev - 1);
      toast({
        title: "Generando imagen",
        description: "Estamos creando una nueva imagen para tu anuncio",
      });
      
      // Aquí iría la llamada real a la API
      // const response = await fetch('/api/generate-image', {...});
      // const newImageUrl = await response.json();
      // setImageUrl(newImageUrl);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "No pudimos generar una nueva imagen",
        variant: "destructive",
      });
    }
  };

  const handleDownloadImage = () => {
    if (!imageRef.current || !imageUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = formatDimensions[selectedFormat];
    canvas.width = width;
    canvas.height = height;

    // Dibujar la imagen en el canvas con el formato seleccionado
    ctx.drawImage(imageRef.current, 0, 0, width, height);

    // Convertir a blob y descargar
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `anuncio-${selectedFormat}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  if (!campaignData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Barra de progreso */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: '100%' }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-right">Campaña generada al 100%</p>
      </div>

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
          <div className="lg:col-span-2 space-y-8">
            {/* Mockup principal */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              {/* Selector de formato */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <Button
                    variant={selectedFormat === 'facebook' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant={selectedFormat === 'instagram' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('instagram')}
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Button>
                  <Button
                    variant={selectedFormat === 'shorts' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('shorts')}
                    className="flex items-center gap-2"
                  >
                    <Youtube className="w-4 h-4" />
                    Shorts
                  </Button>
                </div>
              </div>

              {/* Contenedor del anuncio */}
              <div className="p-4 space-y-4">
                {/* Encabezado del anuncio */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">SA</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Seba Ads Pro</h3>
                      <p className="text-sm text-gray-500">Anuncio patrocinado • Publicado hace 3 min</p>
                    </div>
                  </div>
                </div>

                {/* Imagen */}
                <div 
                  className="relative bg-gray-100 rounded-lg overflow-hidden"
                  style={{
                    aspectRatio: `${formatDimensions[selectedFormat].width} / ${formatDimensions[selectedFormat].height}`,
                    maxWidth: '100%',
                    maxHeight: '80vh'
                  }}
                >
                  {imageUrl && !imageError ? (
                    <img
                      ref={imageRef}
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

                {/* Interacciones */}
                <div className="flex items-center gap-6 text-gray-500 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 hover:text-primary">
                    <span className="text-xl">👍</span>
                    <span className="text-sm">1.2K</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-primary">
                    <span className="text-xl">💬</span>
                    <span className="text-sm">45</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-primary">
                    <span className="text-xl">↗️</span>
                    <span className="text-sm">89</span>
                  </button>
                </div>

                {/* Acciones de imagen */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleGenerateImage}
                    disabled={generationAttemptsLeft <= 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generar nueva imagen ({generationAttemptsLeft} intentos)
                  </Button>
                  <Button
                    onClick={handleDownloadImage}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar imagen
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview móvil */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Vista previa móvil</h3>
              </div>
              <div className="p-4">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mx-auto" style={{ width: '300px', height: '600px' }}>
                  {imageUrl && !imageError ? (
                    <img
                      src={imageUrl}
                      alt="Imagen del anuncio"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="text-sm">Imagen no disponible</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Tips de publicación */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips de publicación</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Días recomendados</p>
                    <p className="text-sm text-gray-600">Publica de lunes a viernes para mejor rendimiento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Horario ideal</p>
                    <p className="text-sm text-gray-600">Entre las 19:00 y 21:00 hs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Mejor rendimiento</p>
                    <p className="text-sm text-gray-600">Ideal para productos digitales y servicios locales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles de la campaña */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Objetivo de la campaña</h3>
              </div>
              <p className="text-gray-600">{campaignData.objective}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Presupuesto diario</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">USD ${campaignData.budget}</p>
            </div>

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

            {/* Botón de IA (no funcional por ahora) */}
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 text-primary border-primary hover:bg-primary/5"
              disabled
            >
              <Sparkles className="w-4 h-4" />
              Conectar con inteligencia artificial para optimizar esta campaña
            </Button>

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