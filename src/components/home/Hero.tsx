
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 md:py-28">
      <div className="container-app">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6 animate-fade-in">
              Crea anuncios de Facebook <span className="text-primary">sin ser experto</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-slide-up">
              SebaAdsPro te guía paso a paso para crear, publicar y optimizar campañas publicitarias en Facebook Ads que realmente funcionan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/dashboard">
                <Button className="w-full sm:w-auto text-base py-6 px-8">
                  Comenzar ahora
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="w-full sm:w-auto text-base py-6 px-8">
                  Ver demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-xl opacity-10 transform rotate-3"></div>
              <div className="relative bg-white shadow-lg rounded-xl p-4 border border-gray-100 animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop" 
                  alt="Dashboard de SebaAdsPro" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
