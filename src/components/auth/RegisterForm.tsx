
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "¡Cuenta creada con éxito!",
        description: "Te redirigiremos al onboarding para configurar tu primera campaña."
      });
      navigate('/onboarding');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input 
            id="name" 
            name="name"
            type="text" 
            placeholder="Tu nombre" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input 
            id="email"
            name="email" 
            type="email" 
            placeholder="tu@email.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input 
            id="password"
            name="password"
            type="password" 
            placeholder="Min. 8 caracteres" 
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            name="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked: boolean) => {
              setFormData(prev => ({ ...prev, agreeTerms: checked }));
            }}
            required
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Acepto los{' '}
            <Link to="/terms" className="text-primary hover:underline">
              términos y condiciones
            </Link>
          </label>
        </div>

        <Button 
          className="w-full" 
          type="submit" 
          disabled={loading || !formData.agreeTerms}
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O continúa con</span>
        </div>
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
        <Facebook className="w-5 h-5 text-facebook" />
        Continuar con Facebook
      </Button>

      <p className="text-center mt-8 text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
