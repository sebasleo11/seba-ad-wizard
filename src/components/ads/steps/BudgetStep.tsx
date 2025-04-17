
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface BudgetStepProps {
  budget: number;
  updateBudget: (budget: number) => void;
}

const BudgetStep: React.FC<BudgetStepProps> = ({ budget, updateBudget }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      updateBudget(value);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-heading mb-2">Presupuesto</h2>
        <p className="text-gray-600">¿Cuánto querés invertir por día?</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="budget-input" className="text-lg font-medium">USD ${budget} por día</Label>
            <span className="text-gray-500">≈ USD ${(budget * 30).toFixed(2)} por mes</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <Slider
              value={[budget]}
              min={5}
              max={100}
              step={1}
              onValueChange={([value]) => updateBudget(value)}
              className="flex-grow"
            />
            <Input
              id="budget-input"
              type="number"
              min={5}
              max={100}
              value={budget}
              onChange={handleInputChange}
              className="w-20 text-center"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>USD $5</span>
            <span>USD $100</span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
          <h3 className="font-medium mb-3">Con este presupuesto podrás obtener aproximadamente:</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Alcance diario:</span>
              <span className="font-medium">{Math.round(budget * 150)} - {Math.round(budget * 300)} personas</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Clics estimados:</span>
              <span className="font-medium">{Math.round(budget * 3)} - {Math.round(budget * 6)} por día</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Conversiones potenciales:</span>
              <span className="font-medium">{Math.round(budget * 0.3)} - {Math.round(budget * 0.8)} por día</span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            *Estas son estimaciones aproximadas basadas en promedios de la industria. Los resultados reales pueden variar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetStep;
