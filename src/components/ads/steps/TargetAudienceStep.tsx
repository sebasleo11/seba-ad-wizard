
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TargetAudienceStepProps {
  data: {
    location: string;
    ageRange: string;
    interests: string;
    gender: string;
  };
  updateData: (data: Partial<TargetAudienceStepProps['data']>) => void;
}

const TargetAudienceStep: React.FC<TargetAudienceStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-heading mb-2">Tu público ideal</h2>
        <p className="text-gray-600">¿A quién querés llegar con tu anuncio?</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="location">¿En qué país o ciudad viven tus clientes?</Label>
          <Input
            id="location"
            placeholder="Ej: Argentina o Buenos Aires"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
          />
        </div>
        
        <div>
          <Label className="text-base mb-2 block">¿Qué edad tienen aproximadamente?</Label>
          <RadioGroup 
            value={data.ageRange} 
            onValueChange={(value) => updateData({ ageRange: value })} 
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.ageRange === '18-24' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="18-24" id="age-18-24" className="sr-only" />
              <Label htmlFor="age-18-24" className="cursor-pointer">18-24 años</Label>
            </div>
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.ageRange === '25-34' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="25-34" id="age-25-34" className="sr-only" />
              <Label htmlFor="age-25-34" className="cursor-pointer">25-34 años</Label>
            </div>
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.ageRange === '35-54' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="35-54" id="age-35-54" className="sr-only" />
              <Label htmlFor="age-35-54" className="cursor-pointer">35-54 años</Label>
            </div>
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.ageRange === '55+' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="55+" id="age-55+" className="sr-only" />
              <Label htmlFor="age-55+" className="cursor-pointer">55+ años</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="interests">¿Qué les interesa? (separa por comas)</Label>
          <Input
            id="interests"
            placeholder="Ej: cocina, tecnología, moda, viajes"
            value={data.interests}
            onChange={(e) => updateData({ interests: e.target.value })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Coloca temas que le interesan a tu público ideal
          </p>
        </div>
        
        <div>
          <Label className="text-base mb-2 block">Género <span className="text-xs text-gray-500">(opcional)</span></Label>
          <RadioGroup 
            value={data.gender} 
            onValueChange={(value) => updateData({ gender: value })} 
            className="grid grid-cols-3 gap-3"
          >
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.gender === 'all' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="all" id="gender-all" className="sr-only" />
              <Label htmlFor="gender-all" className="cursor-pointer">Todos</Label>
            </div>
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.gender === 'female' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="female" id="gender-female" className="sr-only" />
              <Label htmlFor="gender-female" className="cursor-pointer">Mujeres</Label>
            </div>
            <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${data.gender === 'male' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
              <RadioGroupItem value="male" id="gender-male" className="sr-only" />
              <Label htmlFor="gender-male" className="cursor-pointer">Hombres</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default TargetAudienceStep;
