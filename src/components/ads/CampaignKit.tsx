
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Share, Facebook } from 'lucide-react';
import { AdPreview } from './AdPreview';
import { useToast } from '@/hooks/use-toast';

interface CampaignKitProps {
  campaignData: any;
}

const CampaignKit: React.FC<CampaignKitProps> = ({ campaignData }) => {
  const { toast } = useToast();

  if (!campaignData) return null;

  const handleDownloadPDF = () => {
    toast({
      title: "PDF generado",
      description: "Tu resumen de campaña se ha descargado correctamente."
    });
  };

  const handlePublishClick = () => {
    toast({
      title: "¡Listo para publicar!",
      description: "Para publicar en Facebook Ads, necesitarás tener una cuenta de Facebook Business."
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          ✅ Generado con éxito
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          ¡Tu Kit de Campaña está listo!
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hemos creado un anuncio personalizado para tu negocio con todos los elementos necesarios para triunfar en Facebook Ads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                📝 Copy del anuncio
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="whitespace-pre-wrap">
                  {campaignData.content.generatedText || campaignData.content.customText}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="font-semibold">{campaignData.business.name}</p>
                  <p className="text-sm text-gray-600">{campaignData.content.cta}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                👁️ Vista previa del anuncio
              </h2>
              <Tabs defaultValue="feed" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="stories">Stories</TabsTrigger>
                  <TabsTrigger value="reels">Reels</TabsTrigger>
                </TabsList>
                <TabsContent value="feed" className="pt-4">
                  <AdPreview type="feed" data={campaignData} />
                </TabsContent>
                <TabsContent value="stories" className="pt-4">
                  <AdPreview type="stories" data={campaignData} />
                </TabsContent>
                <TabsContent value="reels" className="pt-4">
                  <AdPreview type="reels" data={campaignData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                🎯 Segmentación
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <div>
                    <span className="font-medium">Ubicación: </span>
                    <span>{campaignData.audience.location}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <div>
                    <span className="font-medium">Edad: </span>
                    <span>{campaignData.audience.ageRange}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <div>
                    <span className="font-medium">Intereses: </span>
                    <span>{campaignData.audience.interests}</span>
                  </div>
                </li>
                {campaignData.audience.gender !== 'all' && (
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Género: </span>
                      <span>
                        {campaignData.audience.gender === 'female' ? 'Mujeres' : 
                         campaignData.audience.gender === 'male' ? 'Hombres' : 'Todos'}
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                💰 Presupuesto
              </h2>
              <p className="text-2xl font-bold text-primary mb-2">
                USD ${campaignData.budget}<span className="text-sm text-gray-500 font-normal">/día</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ≈ USD ${(campaignData.budget * 30).toFixed(2)} por mes
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Alcance estimado:</span>
                  <span className="font-medium">{Math.round(campaignData.budget * 150)} - {Math.round(campaignData.budget * 300)}/día</span>
                </div>
                <div className="flex justify-between">
                  <span>Clics estimados:</span>
                  <span className="font-medium">{Math.round(campaignData.budget * 3)} - {Math.round(campaignData.budget * 6)}/día</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={handlePublishClick}
              className="w-full gap-2"
            >
              <Facebook className="h-4 w-4" />
              Publicar en Facebook Ads
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4" />
              Descargar como PDF
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full gap-2"
            >
              <Share className="h-4 w-4" />
              Compartir campaña
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignKit;
