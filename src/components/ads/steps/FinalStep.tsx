import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FinalStepProps {
  data: {
    objective: string;
    budget: number;
    audience: {
      location: string;
      ageRanges: string[];
      interests: string | string[];
      genders: string[];
    };
    content: {
      autoGenerateText: boolean;
      customText: string;
      imageUrl: string;
      generatedCopies: string[];
      generatedImages: string[];
      cta: string;
      destinationType: string;
      destinationUrl: string;
    };
  };
  updateData: (section: string, data: any) => void;
  onBack: () => void;
}

const FinalStep: React.FC<FinalStepProps> = ({ data, updateData, onBack }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Transformar los datos para asegurar que los arrays sean correctos
  const transformedData = {
    ...data,
    audience: {
      ...data.audience,
      interests: Array.isArray(data.audience.interests) 
        ? data.audience.interests 
        : typeof data.audience.interests === 'string'
          ? data.audience.interests.split(',').map(i => i.trim())
          : [],
      ageRanges: Array.isArray(data.audience.ageRanges) 
        ? data.audience.ageRanges 
        : [data.audience.ageRanges].filter(Boolean),
      genders: Array.isArray(data.audience.genders) 
        ? data.audience.genders 
        : [data.audience.genders].filter(Boolean)
    }
  };

  const handleUseCopy = (copy: string) => {
    updateData('content', { ...data.content, customText: copy });
  };

  const handleUseImage = (imageUrl: string) => {
    updateData('content', { ...data.content, imageUrl });
  };

  const handleDownload = () => {
    console.log('Descargando kit...');
    // TODO: Implementar descarga del kit
  };

  const handleEmail = () => {
    console.log('Enviando por email...');
    // TODO: Implementar envío por email
  };

  const handleNewCampaign = () => {
    navigate('/create-ad');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      updateData('content', { ...data.content, imageUrl: fileUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-8"
        >
          ← Volver
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda */}
          <div className="flex-1 space-y-6">
            {/* Título del anuncio */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Título del anuncio
              </h2>
              <p className="text-gray-600 text-lg">
                {transformedData.content.customText}
              </p>
            </div>

            {/* Segmentación recomendada */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Segmentación recomendada
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">📍 Ubicación:</span> {transformedData.audience.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">👥 Edades:</span> {transformedData.audience.ageRanges.join(', ')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">👤 Género:</span> {transformedData.audience.genders.join(', ')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">🎯 Intereses:</span> {transformedData.audience.interests.join(', ')}
                </p>
              </div>
            </div>

            {/* Presupuesto sugerido */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Presupuesto sugerido
              </h3>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">
                  ${transformedData.budget} USD/día
                </p>
                <p className="text-sm text-gray-500">
                  Optimizado para tu objetivo de {transformedData.objective}
                </p>
              </div>
            </div>

            {/* Opciones de copy */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Opciones de copy generadas
              </h3>
              <div className="space-y-4">
                {transformedData.content.generatedCopies.map((copy, index) => (
                  <div 
                    key={`copy-${index}`} 
                    className="bg-white rounded-xl shadow-sm p-6 space-y-4"
                  >
                    <p className="text-gray-600">{copy}</p>
                    <Button
                      variant="outline"
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleUseCopy(copy)}
                    >
                      Usar este copy
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex-1 space-y-6">
            {/* Opciones de imagen generadas */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Imágenes generadas por IA
              </h3>
              <div className="space-y-4">
                {transformedData.content.generatedImages.map((imageUrl, index) => (
                  <div 
                    key={`image-${index}`} 
                    className="bg-white rounded-xl shadow-sm p-6 space-y-4"
                  >
                    <div className="relative aspect-video w-full">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`Imagen generada ${index + 1}`}
                          className="object-cover rounded-lg w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.querySelector('.error-message')!.classList.remove('hidden');
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                          <p className="text-gray-500">Imagen no disponible</p>
                        </div>
                      )}
                      <p className="hidden error-message text-sm text-red-500 mt-2">
                        Error al cargar la imagen
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleUseImage(imageUrl)}
                    >
                      Usar esta imagen
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subir imagen manualmente */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Subir imagen manualmente
              </h3>
              <div className="space-y-4">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {selectedFile ? selectedFile.name : 'Seleccionar imagen'}
                </Button>
                {selectedFile && (
                  <p className="text-sm text-gray-500">
                    Archivo seleccionado: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 px-6 py-3"
          >
            <Download className="w-4 h-4" />
            Descargar Kit
          </Button>
          
          <Button
            variant="outline"
            onClick={handleEmail}
            className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 px-6 py-3"
          >
            <Mail className="w-4 h-4" />
            Enviar por email
          </Button>
          
          <Button
            variant="outline"
            onClick={handleNewCampaign}
            className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 px-6 py-3"
          >
            <RefreshCw className="w-4 h-4" />
            Generar otra campaña
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalStep; 