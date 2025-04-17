
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface OnboardingTipProps {
  tip: string;
}

const OnboardingTip: React.FC<OnboardingTipProps> = ({ tip }) => {
  return (
    <div className="bg-blue-50 border-l-4 border-primary rounded-r-lg p-4 my-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-700">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTip;
