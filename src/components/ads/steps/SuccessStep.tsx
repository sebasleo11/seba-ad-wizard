import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Download, Home } from 'lucide-react';

interface SuccessStepProps {
  data: {
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
  };
}

const SuccessStep: React.FC<SuccessStepProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/descargar-kit');
      if (!response.ok) throw new Error('Error al descargar el kit');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kit-campaña.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">🎉</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Tu kit de campaña está listo!
          </h1>
          
          <p className="text-lg text-gray-600">
            Tu campaña fue creada con éxito. Revisá toda la información y descargá tu kit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            Descargar Kit de Campaña
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
  );
};

export default SuccessStep; 