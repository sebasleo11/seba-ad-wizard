
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import OnboardingTip from '@/components/onboarding/OnboardingTip';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Form data state
  const [businessType, setBusinessType] = useState<string | undefined>();
  const [audience, setAudience] = useState({
    age: 'all',
    location: '',
    interests: '',
  });
  const [budget, setBudget] = useState(20); // Default budget $20

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Tips for each step
  const tips = [
    "Elegir el tipo de negocio correcto nos ayudará a sugerir las mejores plantillas para tus anuncios.",
    "Cuanto más específica sea tu audiencia, mejor funcionarán tus anuncios. Piensa en tu cliente ideal.",
    "Un buen presupuesto inicial permite probar diferentes creatividades y encontrar lo que funciona mejor."
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-app max-w-3xl py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Configura tu primera campaña</h1>
          <p className="text-gray-600">
            Responde algunas preguntas para ayudarnos a personalizar tu experiencia
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
          
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-heading font-semibold">¿Qué tipo de negocio tienes?</h2>
              
              <OnboardingTip tip={tips[0]} />
              
              <RadioGroup value={businessType} onValueChange={setBusinessType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`border rounded-lg p-4 cursor-pointer transition-all ${businessType === 'product' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                  <RadioGroupItem value="product" id="product" className="sr-only" />
                  <Label htmlFor="product" className="flex flex-col items-center cursor-pointer gap-2">
                    <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-lg">Producto físico</span>
                    <span className="text-sm text-gray-500 text-center">Vendes productos tangibles que se envían</span>
                  </Label>
                </div>

                <div className={`border rounded-lg p-4 cursor-pointer transition-all ${businessType === 'service' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                  <RadioGroupItem value="service" id="service" className="sr-only" />
                  <Label htmlFor="service" className="flex flex-col items-center cursor-pointer gap-2">
                    <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-lg">Servicio</span>
                    <span className="text-sm text-gray-500 text-center">Ofreces servicios profesionales o personales</span>
                  </Label>
                </div>

                <div className={`border rounded-lg p-4 cursor-pointer transition-all ${businessType === 'digital' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                  <RadioGroupItem value="digital" id="digital" className="sr-only" />
                  <Label htmlFor="digital" className="flex flex-col items-center cursor-pointer gap-2">
                    <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-lg">Infoproducto</span>
                    <span className="text-sm text-gray-500 text-center">Vendes cursos, ebooks u otros productos digitales</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-heading font-semibold">¿Quién es tu cliente ideal?</h2>
              
              <OnboardingTip tip={tips[1]} />
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-2 block">Rango de edad</Label>
                  <RadioGroup 
                    value={audience.age} 
                    onValueChange={(value) => setAudience({ ...audience, age: value })} 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${audience.age === '18-24' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                      <RadioGroupItem value="18-24" id="age-18-24" className="sr-only" />
                      <Label htmlFor="age-18-24" className="cursor-pointer">18-24 años</Label>
                    </div>
                    <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${audience.age === '25-34' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                      <RadioGroupItem value="25-34" id="age-25-34" className="sr-only" />
                      <Label htmlFor="age-25-34" className="cursor-pointer">25-34 años</Label>
                    </div>
                    <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${audience.age === '35-54' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                      <RadioGroupItem value="35-54" id="age-35-54" className="sr-only" />
                      <Label htmlFor="age-35-54" className="cursor-pointer">35-54 años</Label>
                    </div>
                    <div className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${audience.age === 'all' ? 'border-primary bg-blue-50' : 'hover:border-gray-300'}`}>
                      <RadioGroupItem value="all" id="age-all" className="sr-only" />
                      <Label htmlFor="age-all" className="cursor-pointer">Todas las edades</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="location" className="text-base mb-2 block">Ubicación principal</Label>
                  <Input 
                    id="location" 
                    placeholder="Ej: Buenos Aires, Argentina" 
                    value={audience.location}
                    onChange={(e) => setAudience({ ...audience, location: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="interests" className="text-base mb-2 block">Intereses (separa con comas)</Label>
                  <Input 
                    id="interests" 
                    placeholder="Ej: fitness, nutrición, yoga" 
                    value={audience.interests}
                    onChange={(e) => setAudience({ ...audience, interests: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-heading font-semibold">¿Cuál es tu presupuesto diario?</h2>
              
              <OnboardingTip tip={tips[2]} />
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">USD ${budget} por día</span>
                    <span className="text-gray-500">≈ USD ${(budget * 30).toFixed(2)} por mes</span>
                  </div>
                  
                  <Slider
                    defaultValue={[budget]}
                    min={5}
                    max={100}
                    step={1}
                    onValueChange={([value]) => setBudget(value)}
                    className="my-6"
                  />
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>USD $5</span>
                    <span>USD $100</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Estimaciones con este presupuesto:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Alcance diario:</span>
                      <span className="font-medium">{Math.round(budget * 150)} - {Math.round(budget * 300)} personas</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Clics estimados:</span>
                      <span className="font-medium">{Math.round(budget * 1.5)} - {Math.round(budget * 3)} por día</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t flex justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Atrás
              </Button>
            ) : (
              <div></div> // Empty div for spacing
            )}
            <Button 
              onClick={nextStep}
              disabled={currentStep === 1 && !businessType}
            >
              {currentStep < totalSteps ? 'Continuar' : 'Finalizar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
