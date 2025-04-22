import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Image, Link as LinkIcon, MessageCircle } from 'lucide-react';

interface AdContentStepProps {
  data: {
    autoGenerateText: boolean;
    customText: string;
    image: File | null;
    imageUrl: string;
    generatedCopies: string[];
    generatedImages: string[];
    destinationType: string;
    destinationUrl: string;
    cta: string;
    imageWithText: boolean;
  };
  businessData: {
    name: string;
    socialLinks: string;
    description: string;
  };
  updateData: (data: any) => void;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
  onBack: () => void;
  onFinish: () => void;
}

const AdContentStep: React.FC<AdContentStepProps> = ({ data, businessData, updateData, onGenerate, isGenerating, onBack, onFinish }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.imageUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateData({ image: file });

      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUseCopy = (copy: string) => {
    updateData({ customText: copy });
  };

  const handleUseImage = (imageUrl: string) => {
    setPreviewUrl(imageUrl);
    updateData({ imageUrl });
  };

  const handleGenerateTexto = async () => {
    try {
      setError(null);
      const response = await fetch('https://leo11.app.n8n.cloud/webhook/generar-texto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreNegocio: businessData.name,
          descripcionNegocio: businessData.description
        })
      });

      if (!response.ok) {
        throw new Error('Error al generar el texto');
      }

      const result = await response.json();
      
      if (!result.copies || result.copies.length === 0) {
        throw new Error('No se generaron textos');
      }

      updateData({ generatedCopies: result.copies });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar el texto');
      console.error('Error al generar texto:', err);
    }
  };

  const handleGenerateImagen = async () => {
    try {
      setError(null);
      const response = await fetch('https://leo11.app.n8n.cloud/webhook/generar-imagen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreNegocio: businessData.name,
          descripcionNegocio: businessData.description,
          imagenConTexto: data.imageWithText
        })
      });

      if (!response.ok) {
        throw new Error('Error al generar la imagen');
      }

      const result = await response.json();
      
      if (!result.imagenes || result.imagenes.length === 0) {
        throw new Error('No se generaron imágenes');
      }

      updateData({ generatedImages: result.imagenes });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar la imagen');
      console.error('Error al generar imagen:', err);
    }
  };

  const handleGenerateTodo = async () => {
    try {
      setError(null);
      const response = await fetch('https://leo11.app.n8n.cloud/webhook/generar-copy-imagen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreNegocio: businessData.name,
          descripcionNegocio: businessData.description,
          imagenConTexto: data.imageWithText
        })
      });

      if (!response.ok) {
        throw new Error('Error al generar el contenido');
      }

      const result = await response.json();
      
      if (!result.copies || !result.imagenes || result.copies.length === 0 || result.imagenes.length === 0) {
        throw new Error('No se generó el contenido completo');
      }

      updateData({
        generatedCopies: result.copies,
        generatedImages: result.imagenes
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar el contenido');
      console.error('Error al generar contenido:', err);
    }
  };

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
        ← Atrás
      </Button>

      {data.autoGenerateText && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Imagen con texto integrado</Label>
            <Switch
              checked={data.imageWithText}
              onCheckedChange={(checked) => updateData({ imageWithText: checked })}
            />
          </div>
          <p className="text-sm text-gray-600">
            {data.imageWithText 
              ? "La IA generará una imagen con el texto del anuncio integrado"
              : "La IA generará el texto y la imagen por separado"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={handleGenerateTexto}
              disabled={isGenerating || !businessData.name || !businessData.description}
              className="w-full bg-primary text-white"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando texto...</span>
                </div>
              ) : (
                <span>🧠 Generar solo texto con IA</span>
              )}
            </Button>

            <Button
              onClick={handleGenerateImagen}
              disabled={isGenerating || !businessData.name || !businessData.description}
              className="w-full bg-primary text-white"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando imagen...</span>
                </div>
              ) : (
                <span>🖼️ Generar solo imagen con IA</span>
              )}
            </Button>

            <Button
              onClick={handleGenerateTodo}
              disabled={isGenerating || !businessData.name || !businessData.description}
              className="w-full bg-primary text-white"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando todo...</span>
                </div>
              ) : (
                <span>🧠🖼️ Generar texto + imagen con IA</span>
              )}
            </Button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-500 text-center">
              {error}
            </div>
          )}
          {(!businessData.name || !businessData.description) && (
            <div className="mt-2 text-sm text-yellow-500 text-center">
              Completa la información de tu negocio para generar contenido
            </div>
          )}
        </div>
      )}

      {data.autoGenerateText && data.generatedCopies.length > 0 && !data.imageWithText && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Opciones de texto generadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.generatedCopies.map((copy, index) => (
                <div key={`copy-${index}`} className="border rounded-lg p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Opción {index + 1}</Label>
                    <p className="text-sm text-gray-600">{copy}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleUseCopy(copy)}
                  >
                    Usar este copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {data.autoGenerateText && data.generatedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">
            {data.imageWithText ? "Imágenes generadas con texto integrado" : "Opciones de imagen generadas"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.generatedImages.map((imageUrl, index) => {
              const isValidUrl = imageUrl && 
                typeof imageUrl === 'string' && 
                (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) &&
                imageUrl.length > 10;

              return (
                <div key={`image-${index}`} className="border rounded-lg p-4 space-y-4">
                  <div className="border rounded-lg overflow-hidden bg-gray-50 relative">
                    {isValidUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt={`Imagen generada ${index + 1}`}
                          className="w-full h-[180px] object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'w-full h-[180px] flex items-center justify-center bg-gray-100';
                            errorDiv.innerHTML = '<p class="text-sm text-gray-500">No se pudo cargar la imagen</p>';
                            target.parentNode?.insertBefore(errorDiv, target.nextSibling);
                          }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 transition-opacity duration-200 hover:opacity-100">
                          <p className="text-sm text-gray-500">Haz clic para previsualizar</p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-[180px] flex items-center justify-center bg-gray-100">
                        <p className="text-sm text-gray-500">Imagen no disponible</p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => isValidUrl && handleUseImage(imageUrl)}
                    disabled={!isValidUrl}
                  >
                    {isValidUrl ? "Usar esta imagen" : "Imagen no disponible"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Button onClick={onFinish} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
        Finalizar
      </Button>
    </div>
  );
};

export default AdContentStep;




