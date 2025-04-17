
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-heading font-bold text-primary">Seba<span className="text-gray-800">Ads</span><span className="text-facebook">Pro</span></span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Plataforma intuitiva para emprendedores que desean crear y gestionar campañas publicitarias en Facebook Ads sin conocimientos técnicos.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-600 hover:text-primary">Funcionalidades</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-primary">Precios</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Política de privacidad</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Términos de servicio</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SebaAdsPro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
