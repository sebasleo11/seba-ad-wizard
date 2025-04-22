import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BusinessInfoStep from './steps/BusinessInfoStep';
import CampaignObjectiveStep from './steps/CampaignObjectiveStep.tsx';
import TargetAudienceStep from './steps/TargetAudienceStep';
import BudgetStep from './steps/BudgetStep';
import AdContentStep from './steps/AdContentStep';
import { generateAdCopy } from '@/lib/adGenerator';
import { useToast } from '@/hooks/use-toast';

interface AdWizardProps {
  onComplete: (data: any) => void;
}

const AdWizard: React.FC<AdWizardProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    business: {
      type: '',
      name: '',
      socialLinks: '',
      description: ''
    },
    objective: '',
    audience: {
      location: '',
      ageRanges: [],
      interests: '',
      genders: []
    },
    budget: 10,
    content: {
      autoGenerateText: true,
      customText: '',
      image: null,
      imageUrl: '',
      generatedCopies: ['', ''],
      generatedImages: ['', ''],
      destinationType: 'website',
      destinationUrl: '',
      cta: 'Más info',
      imageWithText: false
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => {
      const prevSection = prev[section as keyof typeof prev];
      if (prevSection && typeof prevSection === 'object') {
        return {
          ...prev,
          [section]: {
            ...prevSection,
            ...data
          }
        };
      } else {
        return {
          ...prev,
          [section]: data
        };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      finalizeAd();
    }
  };

  const generarCopyEImagen = async () => {
    setIsGenerating(true);
    try {
      if (!formData.business.name || !formData.objective || !formData.audience.location || !formData.audience.ageRanges || !formData.audience.interests) {
        throw new Error('Faltan datos requeridos para generar el contenido');
      }

      const response = await fetch("https://leo11.app.n8n.cloud/webhook/crear-copy-imagen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          producto: formData.business.name,
          objetivo: formData.objective,
          ubicacion: formData.audience.location,
          edad: formData.audience.ageRanges,
          intereses: formData.audience.interests,
          imageWithText: formData.content.imageWithText,
          descripcion: formData.business.description || '',
          categoria: formData.business.type || ''
        })
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (!data.copy1 || !data.copy2 || !data.img1 || !data.img2) {
        throw new Error('La respuesta del servidor no contiene todos los datos necesarios');
      }

      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          generatedCopies: [data.copy1, data.copy2],
          generatedImages: [data.img1, data.img2]
        }
      }));

      toast({
        title: "¡Contenido generado!",
        description: "Revisá las opciones generadas por IA",
      });

    } catch (error) {
      console.error("Error al generar anuncio:", error);
      
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          generatedCopies: ['', ''],
          generatedImages: ['', '']
        }
      }));

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No pudimos generar el contenido. Por favor, intentá de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const finalizeAd = () => {
    toast({
      title: "Generando tu kit de campaña",
      description: "Estamos procesando tu información..."
    });

    const adCopy = formData.content.autoGenerateText
      ? generateAdCopy(formData)
      : formData.content.customText;

    const imageUrl = formData.content.imageUrl ||
      `https://source.unsplash.com/random/800x600/?${formData.business.type},${formData.audience.interests}`;

    setTimeout(() => {
      const finalCampaignData = {
        ...formData,
        content: {
          ...formData.content,
          adText: adCopy,
          imageUrl
        },
        createdAt: new Date().toISOString()
      };
      onComplete(finalCampaignData);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInfoStep
            data={formData.business}
            updateData={(data) => updateFormData('business', data)}
          />
        );
      case 2:
        return (
          <CampaignObjectiveStep
            objective={formData.objective}
            updateObjective={(data) => updateFormData('objective', data)}
          />
        );
      case 3:
        return (
          <TargetAudienceStep
            data={formData.audience}
            updateData={(data) => updateFormData('audience', data)}
          />
        );
      case 4:
        return (
          <BudgetStep
            budget={formData.budget}
            updateBudget={(budget) => setFormData({ ...formData, budget })}
          />
        );
      case 5:
        return (
          <AdContentStep
            data={formData.content}
            businessData={formData.business}
            updateData={(data) => updateFormData('content', data)}
            onGenerate={generarCopyEImagen}
            isGenerating={isGenerating}
            onBack={handlePrevious}
            onFinish={finalizeAd}
          />
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.business.type && formData.business.name && formData.business.description;
      case 2:
        return !!formData.objective;
      case 3:
        return formData.audience.location && formData.audience.ageRanges && formData.audience.interests;
      case 4:
        return formData.budget > 0;
      case 5:
        if (formData.content.autoGenerateText) return true;
        return !!formData.content.customText;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium text-primary">Paso {currentStep} de {totalSteps}</span>
          <span className="font-medium text-muted-foreground">{(currentStep / totalSteps) * 100}% completado</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div>
      <div className="min-h-[420px]">
        {renderStep()}
      </div>
      <div className="mt-8 pt-6 border-t flex justify-between">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
        >
          {currentStep < totalSteps ? 'Continuar' : 'Finalizar'}
          {currentStep < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default AdWizard;

