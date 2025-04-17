
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Benefits from '@/components/home/Benefits';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <div className="bg-primary/5 py-20 text-center">
        <div className="container-app">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
            ¡Creá tu anuncio en 2 minutos!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Responde algunas preguntas simples y obtendrás un anuncio personalizado 
            listo para publicar en Facebook Ads.
          </p>
          <Link to="/create-ad">
            <Button size="lg" className="text-lg">
              🚀 Comenzar
            </Button>
          </Link>
        </div>
      </div>
      <Benefits />
    </Layout>
  );
};

export default Index;
