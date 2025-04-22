import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";

interface TargetAudienceStepProps {
  data: {
    location: string;
    ageRanges: string[];
    interests: string;
    genders: string[];
  };
  updateData: (data: any) => void;
}

const TargetAudienceStep: React.FC<TargetAudienceStepProps> = ({ data, updateData }) => {
  const handleAgeRangeChange = (ageRange: string, checked: boolean) => {
    if (checked) {
      updateData({
        ageRanges: [...data.ageRanges, ageRange]
      });
    } else {
      updateData({
        ageRanges: data.ageRanges.filter(age => age !== ageRange)
      });
    }
  };

  const handleGenderChange = (gender: string, checked: boolean) => {
    if (gender === "Todos") {
      if (checked) {
        updateData({
          genders: ["Todos"]
        });
      } else {
        updateData({
          genders: []
        });
      }
    } else {
      if (checked) {
        updateData({
          genders: data.genders.filter(g => g !== "Todos").concat(gender)
        });
      } else {
        updateData({
          genders: data.genders.filter(g => g !== gender)
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="font-medium">Rango de edad</Label>
        <div className="grid grid-cols-2 gap-2">
          {["18-24 años", "25-34 años", "35-54 años", "55+ años"].map((ageRange) => (
            <div key={ageRange} className="flex items-center space-x-2">
              <Checkbox
                id={ageRange}
                checked={data.ageRanges.includes(ageRange)}
                onCheckedChange={(checked) => handleAgeRangeChange(ageRange, checked as boolean)}
              />
              <Label htmlFor={ageRange}>{ageRange}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="font-medium">Género</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Todos", "Hombres", "Mujeres"].map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={gender}
                checked={data.genders.includes(gender)}
                onCheckedChange={(checked) => handleGenderChange(gender, checked as boolean)}
              />
              <Label htmlFor={gender}>{gender}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="font-medium">Intereses</Label>
        <Input
          type="text"
          value={data.interests}
          onChange={(e) => updateData({ interests: e.target.value })}
          placeholder="Ej: tecnología, deportes, música"
        />
      </div>

      <div className="space-y-4">
        <Label className="font-medium">Ubicación</Label>
        <Input
          type="text"
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          placeholder="Ej: Argentina, Buenos Aires"
        />
      </div>
    </div>
  );
};

export default TargetAudienceStep;
