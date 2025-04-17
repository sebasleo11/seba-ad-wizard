import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: 'Creación Rápida de Anuncios',
      description: 'Genera anuncios personalizados en minutos con nuestra interfaz intuitiva y guiada.',
      icon: '⚡'
    },
    {
      title: 'Optimización Automática',
      description: 'Nuestro sistema analiza y optimiza automáticamente tus anuncios para obtener mejores resultados.',
      icon: '🎯'
    },
    {
      title: 'Plantillas Profesionales',
      description: 'Accede a una variedad de plantillas diseñadas por expertos en marketing digital.',
      icon: '📋'
    },
    {
      title: 'Análisis de Rendimiento',
      description: 'Obtén informes detallados sobre el rendimiento de tus campañas publicitarias.',
      icon: '📊'
    },
    {
      title: 'Integración con Facebook Ads',
      description: 'Publica directamente tus anuncios en Facebook Ads con solo unos clics.',
      icon: '🔗'
    },
    {
      title: 'Soporte Personalizado',
      description: 'Recibe asistencia personalizada de nuestro equipo de expertos en marketing digital.',
      icon: '💬'
    }
  ];

  return (
    <Layout>
      <div className="py-20">
        <div className="container-app">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Funcionalidades
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre todas las herramientas y características que hacen de SebaAdsPro la mejor opción para tus campañas publicitarias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Features; 