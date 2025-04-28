import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BusinessInfoStep from './steps/BusinessInfoStep';
import CampaignObjectiveStep from './steps/CampaignObjectiveStep';
import TargetAudienceStep from './steps/TargetAudienceStep';
import BudgetStep from './steps/BudgetStep';
import AdContentStep from './steps/AdContentStep';
import FinalStep from './steps/FinalStep';
import { generateAdCopy } from '@/lib/adGenerator';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AdWizardProps {
  onComplete: (data: any) => void;
}

interface BusinessData {
  type: string;
  name: string;
  socialLinks: string;
  description: string;
}

interface AudienceData {
  location: string;
  ageRanges: string[];
  interests: string;
  genders: string[];
}

interface ContentData {
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
  objective: string;
  audience: string;
  budget: string;
}

interface FormData {
  business: BusinessData;
  objective: string;
  audience: AudienceData;
  budget: number;
  content: ContentData;
}

const AdWizard: React.FC<AdWizardProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
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
      imageWithText: false,
      objective: '',
      audience: '',
      budget: ''
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

      const response = await fetch("http://localhost:5678/webhook/generar-texto", {
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

  const finalizeAd = async () => {
    try {
      // Generar el copy y la imagen
      const adCopy = await generateAdCopy(formData);
      const imageUrl = formData.content.imageUrl || 
        `https://source.unsplash.com/random/800x600/?${formData.business.type},${formData.audience.interests}`;

      // Crear el objeto final de la campaña
      const finalCampaignData = {
        objective: formData.objective,
        budget: formData.budget,
        audience: {
          location: formData.audience.location,
          ageRanges: formData.audience.ageRanges,
          interests: formData.audience.interests,
          genders: formData.audience.genders
        },
        content: {
          autoGenerateText: formData.content.autoGenerateText,
          customText: adCopy,
          imageUrl: imageUrl,
          cta: formData.content.cta,
          destinationType: formData.content.destinationType,
          destinationUrl: formData.content.destinationUrl
        }
      };

      // Guardar en localStorage como backup
      localStorage.setItem('campaignData', JSON.stringify(finalCampaignData));

      // Navegar a la pantalla de éxito con los datos
      navigate('/success', { state: { data: finalCampaignData } });
    } catch (error) {
      console.error('Error al finalizar la campaña:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al generar tu campaña. Por favor, intentá de nuevo.",
        variant: "destructive"
      });
    }
  };

  const renderStep = () => {
    if (showSuccess) {
      return (
        <FinalStep
          data={formData}
          updateData={updateFormData}
          onBack={() => setShowSuccess(false)}
        />
      );
    }

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
    <div className="space-y-8">
      {!showSuccess && (
        <>
          <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
          <div className="flex justify-between items-center">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </Button>
            )}
            <div className="flex-1" />
            {currentStep < totalSteps && (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center gap-2"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </>
      )}
      {renderStep()}
    </div>
  );
};

export default AdWizard;

