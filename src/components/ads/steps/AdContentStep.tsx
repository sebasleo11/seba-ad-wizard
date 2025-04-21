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
}

const AdContentStep: React.FC<AdContentStepProps> = ({ data, businessData, updateData, onGenerate, isGenerating }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.imageUrl || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateData({ image: file });

      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      updateData({ imageUrl: fileUrl });
    }
  };

  const handleUseCopy = (copy: string) => {
    updateData({ customText: copy });
  };

  const handleUseImage = (imageUrl: string) => {
    setPreviewUrl(imageUrl);
    updateData({ imageUrl });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-heading mb-2">Contenido del anuncio</h2>
        <p className="text-gray-600">Personaliza cómo se verá tu anuncio</p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-generate" className="font-medium">
            Generar texto automáticamente
          </Label>
          <p className="text-sm text-gray-600">
            Nuestra IA creará el mejor texto para tu anuncio
          </p>
        </div>
        <Switch
          id="auto-generate"
          checked={data.autoGenerateText}
          onCheckedChange={(checked) => updateData({ autoGenerateText: checked })}
        />

        {!data.autoGenerateText && (
          <div>
            <Label htmlFor="custom-text">Escribe tu propio texto</Label>
            <Textarea
              id="custom-text"
              value={data.customText}
              onChange={(e) => updateData({ customText: e.target.value })}
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: entre 80-150 caracteres para mejores resultados
            </p>
          </div>
        )}

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
          </div>
        )}

        <div>
          <Label className="mb-2 block">Imagen del anuncio</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <Image className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Sube una imagen o deja que nosotros te ayudemos</p>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                Subir imagen
              </Button>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Formatos aceptados: JPG, PNG. Tamaño recomendado: 1080x1080px
          </p>
        </div>

        <div className="border rounded-lg p-2 bg-white">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full h-[180px] object-cover rounded"
            />
          ) : (
            <div className="w-full h-[180px] bg-gray-200 rounded flex items-center justify-center">
              <p className="text-sm text-gray-500">
                {data.autoGenerateText ? "Se generará una imagen automáticamente" : "Vista previa no disponible"}
              </p>
            </div>
          )}
        </div>

        <div>
          <Label className="mb-2 block">¿A dónde querés que lleve el anuncio?</Label>
          <RadioGroup
            value={data.destinationType}
            onValueChange={(value) => updateData({ destinationType: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="border rounded-lg p-4 cursor-pointer transition-all">
              <RadioGroupItem value="website" id="website" className="sr-only" />
              <Label htmlFor="website" className="flex items-center gap-3 cursor-pointer">
                <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <LinkIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Sitio web o tienda online</p>
                  <p className="text-xs text-gray-600">Lleva a los usuarios a tu página</p>
                </div>
              </Label>
            </div>

            <div className="border rounded-lg p-4 cursor-pointer transition-all">
              <RadioGroupItem value="whatsapp" id="whatsapp" className="sr-only" />
              <Label htmlFor="whatsapp" className="flex items-center gap-3 cursor-pointer">
                <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Chat de WhatsApp</p>
                  <p className="text-xs text-gray-600">Inicia conversaciones directas</p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4">
            <Label htmlFor="destination-url">
              {data.destinationType === 'website' ? 'URL de la página web' : 'Número de WhatsApp'}
            </Label>
            <Input
              id="destination-url"
              placeholder={data.destinationType === 'website' ? 'https://www.tusitio.com' : '+5491122334455'}
              value={data.destinationUrl}
              onChange={(e) => updateData({ destinationUrl: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Botón de llamada a la acción (CTA)</Label>
          <RadioGroup
            value={data.cta}
            onValueChange={(value) => updateData({ cta: value })}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <div className="border rounded-lg p-3 text-center cursor-pointer transition-all">
              <RadioGroupItem value="Más info" id="more-info" className="sr-only" />
              <Label htmlFor="more-info" className="cursor-pointer">Más info</Label>
            </div>
            <div className="border rounded-lg p-3 text-center cursor-pointer transition-all">
              <RadioGroupItem value="Comprar ahora" id="buy-now" className="sr-only" />
              <Label htmlFor="buy-now" className="cursor-pointer">Comprar ahora</Label>
            </div>
            <div className="border rounded-lg p-3 text-center cursor-pointer transition-all">
              <RadioGroupItem value="Contactar" id="contact" className="sr-only" />
              <Label htmlFor="contact" className="cursor-pointer">Contactar</Label>
            </div>
            <div className="border rounded-lg p-3 text-center cursor-pointer transition-all">
              <RadioGroupItem value="Registrarse" id="register" className="sr-only" />
              <Label htmlFor="register" className="cursor-pointer">Registrarse</Label>
            </div>
          </RadioGroup>
        </div>

        {data.autoGenerateText && (
          <div className="mt-6">
            <Button
              onClick={onGenerate}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {data.imageWithText ? "Generando imagen con texto..." : "Generando contenido..."}
                </>
              ) : (
                data.imageWithText ? "🖼️ Generar imagen con texto integrado" : "🚀 Generar anuncio con IA"
              )}
            </Button>
          </div>
        )}

        {data.autoGenerateText && data.generatedCopies[0] && !data.imageWithText && (
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

            <div className="space-y-4">
              <h3 className="font-medium">Opciones de imagen generadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.generatedImages.map((imageUrl, index) => (
                  <div key={`image-${index}`} className="border rounded-lg p-4 space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Imagen generada ${index + 1}`}
                        className="w-full h-[180px] object-cover"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleUseImage(imageUrl)}
                    >
                      Usar esta imagen
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {data.autoGenerateText && data.generatedImages[0] && data.imageWithText && (
          <div className="space-y-4">
            <h3 className="font-medium">Imágenes generadas con texto integrado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.generatedImages.map((imageUrl, index) => (
                <div key={`image-text-${index}`} className="border rounded-lg p-4 space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`Imagen con texto ${index + 1}`}
                      className="w-full h-[180px] object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleUseImage(imageUrl)}
                  >
                    Usar esta imagen
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdContentStep;



