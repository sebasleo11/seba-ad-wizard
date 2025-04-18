import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  priceUsd: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isHighlighted?: boolean;
}

const PricingCard = ({
  title,
  price,
  priceUsd,
  features,
  buttonText,
  buttonLink,
  isHighlighted = false,
}: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col p-6 rounded-lg border ${
        isHighlighted
          ? 'border-primary bg-primary/5'
          : 'border-gray-200 bg-white'
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-gray-500 ml-2">({priceUsd})</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={buttonLink} className="mt-auto">
        <Button
          className={`w-full ${
            isHighlighted ? 'bg-primary hover:bg-primary/90' : ''
          }`}
          variant={isHighlighted ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

const PricingSection = () => {
  const plans = [
    {
      title: '🆓 Plan Free',
      price: '$0',
      priceUsd: '≈ 0 USD',
      features: [
        '1 campaña lista para publicar',
        'Textos, imagen y segmentación sugerida',
        'Sin tarjeta ni vencimiento',
        'Ideal para conocer la herramienta',
      ],
      buttonText: 'Probar gratis',
      buttonLink: '/login',
    },
    {
      title: '💡 Plan PRO',
      price: '$7.000 ARS',
      priceUsd: '≈ 7 USD',
      features: [
        'Hasta 20 campañas mensuales',
        'Edición libre de textos e imágenes',
        'Métricas básicas',
        'Exportación en PDF',
        'IA personalizada',
      ],
      buttonText: 'Quiero el plan PRO',
      buttonLink: '#',
      isHighlighted: true,
    },
    {
      title: '🚀 Plan MASTER',
      price: '$15.000 ARS',
      priceUsd: '≈ 15 USD',
      features: [
        'Todo lo del plan PRO',
        '1 Masterclass mensual por Zoom',
        'Acceso a grabaciones anteriores',
        'Grupo de WhatsApp exclusivo',
        'Comunidad privada de emprendedores',
        'Bonus mensual: plantillas y recursos',
      ],
      buttonText: 'Sumarme al plan MASTER',
      buttonLink: '#',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planes y Precios</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos los planes
            incluyen soporte y actualizaciones gratuitas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 