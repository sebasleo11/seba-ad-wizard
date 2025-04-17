
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CampaignObjectiveStepProps {
  objective: string;
  updateObjective: (objective: string) => void;
}

const CampaignObjectiveStep: React.FC<CampaignObjectiveStepProps> = ({ objective, updateObjective }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-heading mb-2">Tu objetivo con la campaña</h2>
        <p className="text-gray-600">¿Qué querés lograr con tu anuncio?</p>
      </div>
      
      <RadioGroup 
        value={objective} 
        onValueChange={updateObjective}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className={`border rounded-lg p-6 cursor-pointer transition-all ${objective === 'sales' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
          <RadioGroupItem value="sales" id="sales" className="sr-only" />
          <Label htmlFor="sales" className="flex flex-col h-full cursor-pointer">
            <div className="mb-4 h-14 w-14 flex items-center justify-center bg-primary/10 rounded-full">
              <span role="img" aria-label="ventas" className="text-2xl">💰</span>
            </div>
            <span className="font-medium text-lg mb-2">Vender más</span>
            <span className="text-sm text-gray-600 flex-grow">
              Anuncios diseñados para convertir visitantes en compradores.
            </span>
          </Label>
        </div>

        <div className={`border rounded-lg p-6 cursor-pointer transition-all ${objective === 'leads' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
          <RadioGroupItem value="leads" id="leads" className="sr-only" />
          <Label htmlFor="leads" className="flex flex-col h-full cursor-pointer">
            <div className="mb-4 h-14 w-14 flex items-center justify-center bg-primary/10 rounded-full">
              <span role="img" aria-label="leads" className="text-2xl">📋</span>
            </div>
            <span className="font-medium text-lg mb-2">Obtener contactos (leads)</span>
            <span className="text-sm text-gray-600 flex-grow">
              Captura información de potenciales clientes interesados.
            </span>
          </Label>
        </div>

        <div className={`border rounded-lg p-6 cursor-pointer transition-all ${objective === 'traffic' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
          <RadioGroupItem value="traffic" id="traffic" className="sr-only" />
          <Label htmlFor="traffic" className="flex flex-col h-full cursor-pointer">
            <div className="mb-4 h-14 w-14 flex items-center justify-center bg-primary/10 rounded-full">
              <span role="img" aria-label="tráfico" className="text-2xl">🔍</span>
            </div>
            <span className="font-medium text-lg mb-2">Llevar visitas a tu sitio</span>
            <span className="text-sm text-gray-600 flex-grow">
              Aumenta el tráfico a tu página web o tienda online.
            </span>
          </Label>
        </div>

        <div className={`border rounded-lg p-6 cursor-pointer transition-all ${objective === 'awareness' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
          <RadioGroupItem value="awareness" id="awareness" className="sr-only" />
          <Label htmlFor="awareness" className="flex flex-col h-full cursor-pointer">
            <div className="mb-4 h-14 w-14 flex items-center justify-center bg-primary/10 rounded-full">
              <span role="img" aria-label="reconocimiento" className="text-2xl">✨</span>
            </div>
            <span className="font-medium text-lg mb-2">Reconocimiento de marca</span>
            <span className="text-sm text-gray-600 flex-grow">
              Da a conocer tu negocio y aumenta la visibilidad.
            </span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default CampaignObjectiveStep;
