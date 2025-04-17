
import React from 'react';
import { Clock, Target, TrendingUp, User, Sparkles, Shield } from 'lucide-react';

const benefits = [
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: 'Ahorra tiempo',
    description: 'Reduce a minutos lo que antes te tomaba horas. Deja que nuestra plataforma haga el trabajo pesado por ti.'
  },
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: 'Segmentación precisa',
    description: 'Encuentra a tu cliente ideal con nuestro asistente de segmentación inteligente. Sin adivinanzas, solo resultados.'
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-primary" />,
    title: 'Mejora tus resultados',
    description: 'Obtén sugerencias automáticas para optimizar tus campañas y maximizar tu retorno de inversión.'
  },
  {
    icon: <User className="w-10 h-10 text-primary" />,
    title: 'Sin conocimientos técnicos',
    description: 'Interfaz intuitiva diseñada para emprendedores, no para expertos en marketing digital.'
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: 'Creatividades que convierten',
    description: 'Accede a plantillas probadas que generan clics y conversiones para tu negocio.'
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: 'Aprobación garantizada',
    description: 'Nuestro sistema verifica que tus anuncios cumplan con las políticas de Facebook antes de publicarlos.'
  }
];

const Benefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-app">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Beneficios que transformarán tu negocio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SebaAdsPro elimina la complejidad de la publicidad en Facebook, permitiéndote enfocarte en hacer crecer tu negocio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
