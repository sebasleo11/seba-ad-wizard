
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-app flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-primary">Seba<span className="text-gray-800">Ads</span><span className="text-facebook">Pro</span></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-700 hover:text-primary font-medium">Funcionalidades</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-primary font-medium">Precios</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">Contacto</Link>
          <Link to="/dashboard">
            <Button>Ingresar</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 bg-white shadow-md">
          <div className="container-app flex flex-col space-y-4">
            <Link to="/features" className="text-gray-700 hover:text-primary font-medium py-2">Funcionalidades</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary font-medium py-2">Precios</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium py-2">Contacto</Link>
            <Link to="/dashboard" className="w-full">
              <Button className="w-full">Ingresar</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
