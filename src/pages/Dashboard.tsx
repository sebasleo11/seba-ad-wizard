
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, LineChart, Target, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container-app py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-heading font-bold text-primary">Seba<span className="text-gray-800">Ads</span><span className="text-facebook">Pro</span></span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <LineChart className="h-4 w-4 mr-2" />
                Métricas
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo anuncio
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-app py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold font-heading">¡Bienvenido a SebaAdsPro!</h1>
          <p className="text-gray-600 mt-2">
            Comienza a crear anuncios efectivos en Facebook en minutos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Crear Anuncio Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6 flex flex-col h-64">
            <div className="flex-grow">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Crear anuncio</h3>
              <p className="text-gray-600 mb-4">
                Crea tu primer anuncio con nuestros asistentes y plantillas
              </p>
            </div>
            <Link to="/create-ad">
              <Button className="w-full">
                Comenzar
              </Button>
            </Link>
          </div>

          {/* Segmentar Audiencia Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-64">
            <div className="flex-grow">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Segmentar audiencia</h3>
              <p className="text-gray-600 mb-4">
                Define a quién mostrar tus anuncios para obtener mejores resultados
              </p>
            </div>
            <Link to="/audience">
              <Button variant="outline" className="w-full">
                Definir audiencia
              </Button>
            </Link>
          </div>

          {/* Ver Métricas Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-64">
            <div className="flex-grow">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Ver métricas</h3>
              <p className="text-gray-600 mb-4">
                Analiza el rendimiento de tus campañas y optimízalas
              </p>
            </div>
            <Link to="/metrics">
              <Button variant="outline" className="w-full">
                Ver métricas
              </Button>
            </Link>
          </div>
        </div>

        {/* Tutorials/Tips Section */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-heading font-semibold text-xl mb-4">Recursos para comenzar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-lg p-4 hover:border-gray-300 transition-all">
              <h3 className="font-medium mb-2">Cómo crear tu primer anuncio</h3>
              <p className="text-gray-600 text-sm">Aprende los conceptos básicos para crear anuncios efectivos en minutos.</p>
              <Button variant="link" className="mt-2 p-0">Ver tutorial</Button>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4 hover:border-gray-300 transition-all">
              <h3 className="font-medium mb-2">Guía de segmentación</h3>
              <p className="text-gray-600 text-sm">Descubre cómo llegar exactamente a las personas correctas con tus anuncios.</p>
              <Button variant="link" className="mt-2 p-0">Ver guía</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
