
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BusinessInfoStep from './steps/BusinessInfoStep';
import CampaignObjectiveStep from './steps/CampaignObjectiveStep';
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
      description: '',
      socialLinks: ''
    },
    objective: '',
    audience: {
      location: '',
      ageRange: '',
      interests: '',
      gender: 'all'
    },
    budget: 10,
    content: {
      autoGenerateText: true,
      customText: '',
      image: null,
      imageUrl: '',
      destinationType: 'website',
      destinationUrl: '',
      cta: 'Más info'
    }
  });
  
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
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const finalizeAd = () => {
    // Show loading toast
    toast({
      title: "Generando tu kit de campaña",
      description: "Estamos procesando tu información..."
    });
    
    // Generate ad copy if auto-generate is selected
    const adCopy = formData.content.autoGenerateText 
      ? generateAdCopy(formData)
      : formData.content.customText;
    
    // Generate a sample image URL if no image is provided
    const imageUrl = formData.content.imageUrl || 
      `https://source.unsplash.com/random/800x600/?${formData.business.type},${formData.audience.interests}`;
    
    // Create the final campaign data object
    setTimeout(() => {
      const finalCampaignData = {
        ...formData,
        content: {
          ...formData.content,
          generatedText: adCopy,
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
    <>
      <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg shadow-sm mt-4">
        💡 Sebabot: Contame sobre tu negocio. Esto me va a ayudar a crear una campaña más efectiva. ¡No te preocupes, vamos paso a paso!
      </p>
      <BusinessInfoStep
        data={formData.business}
        updateData={(data) => updateFormData('business', data)}
      />
    </>
  );

  case 2:
  return (
    <>
      <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg shadow-sm mt-4">
        💡 Sebabot: Elegí el objetivo de tu campaña. Si querés vender, seleccioná <strong>"Ventas"</strong>.
      </p>
      <CampaignObjectiveStep
        objective={formData.objective}
        updateObjective={(data) => updateFormData('objective', data)}
      />
    </>
  );




  
  case 3:
    return (
      <>
        <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg shadow-sm mt-4">
          💡 Sebabot: Completá los datos de tu audiencia ideal. Esto nos ayuda a mostrar tu anuncio a las personas correctas.
        </p>
        <TargetAudienceStep
          data={formData.audience}
          updateData={(data) => updateFormData('audience', data)}
        />
      </>
    );
  
      case 4:
        return (
          <BudgetStep 
            budget={formData.budget} 
            updateBudget={(budget) => setFormData({...formData, budget})} 
          />
        );
      case 5:
        return (
          <AdContentStep 
            data={formData.content} 
            businessData={formData.business}
            updateData={(data) => updateFormData('content', data)} 
          />
        );
      default:
        return null;
    }
  };
  
  // Determine if the current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.business.type && formData.business.name && formData.business.description;
      case 2:
        return !!formData.objective;
      case 3:
        return formData.audience.location && formData.audience.ageRange && formData.audience.interests;
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
          <span className="font-medium">{Math.round((currentStep / totalSteps) * 100)}% completado</span>
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
