
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface BusinessInfoStepProps {
  data: {
    type: string;
    name: string;
    description: string;
    socialLinks: string;
  };
  updateData: (data: Partial<BusinessInfoStepProps['data']>) => void;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-heading mb-2">Sobre tu negocio</h2>
        <p className="text-gray-600">Cuéntanos un poco sobre lo que haces</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base mb-2 block">¿Qué vendés?</Label>
          <RadioGroup 
            value={data.type} 
            onValueChange={(value) => updateData({ type: value })} 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className={`border rounded-lg p-4 cursor-pointer transition-all ${data.type === 'producto' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="producto" id="product" className="sr-only" />
              <Label htmlFor="product" className="flex flex-col items-center cursor-pointer gap-2">
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <span role="img" aria-label="producto" className="text-xl">📦</span>
                </div>
                <span className="font-medium">Producto físico</span>
                <span className="text-xs text-gray-500 text-center">Vendes productos tangibles que se envían</span>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 cursor-pointer transition-all ${data.type === 'servicio' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="servicio" id="service" className="sr-only" />
              <Label htmlFor="service" className="flex flex-col items-center cursor-pointer gap-2">
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <span role="img" aria-label="servicio" className="text-xl">🛠️</span>
                </div>
                <span className="font-medium">Servicio</span>
                <span className="text-xs text-gray-500 text-center">Ofreces servicios profesionales o personales</span>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 cursor-pointer transition-all ${data.type === 'infoproducto' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="infoproducto" id="digital" className="sr-only" />
              <Label htmlFor="digital" className="flex flex-col items-center cursor-pointer gap-2">
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <span role="img" aria-label="infoproducto" className="text-xl">📚</span>
                </div>
                <span className="font-medium">Infoproducto</span>
                <span className="text-xs text-gray-500 text-center">Vendes cursos, ebooks u otros productos digitales</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="business-name">Nombre de tu marca o negocio</Label>
          <Input
            id="business-name"
            placeholder="Ej: Dulce Tentación Pastelería"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="business-description">Describe brevemente lo que haces</Label>
          <Textarea
            id="business-description"
            placeholder="Ej: Somos una pastelería artesanal que se especializa en tortas personalizadas para eventos especiales..."
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="social-links" className="flex items-center">
            Redes sociales o página web <span className="text-xs text-gray-500 ml-2">(opcional)</span>
          </Label>
          <Input
            id="social-links"
            placeholder="Ej: www.mitienda.com o @mi_instagram"
            value={data.socialLinks}
            onChange={(e) => updateData({ socialLinks: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
