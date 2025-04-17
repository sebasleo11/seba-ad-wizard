
import React from 'react';

interface AdPreviewProps {
  type: 'feed' | 'stories' | 'reels';
  data: any;
}

export const AdPreview: React.FC<AdPreviewProps> = ({ type, data }) => {
  // Determine the proper placeholder if no image is available
  const imagePlaceholder = data.content.imageUrl || `https://source.unsplash.com/random/800x600/?${data.business.type}`;
  
  // Get the appropriate text based on whether it was custom or AI-generated
  const adText = data.content.generatedText || data.content.customText || 
                `¡Descubre ${data.business.name}! ${data.business.description.slice(0, 80)}...`;
  
  if (type === 'feed') {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white max-w-md mx-auto">
        {/* Header */}
        <div className="p-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              {data.business.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm">{data.business.name}</p>
              <p className="text-xs text-gray-500">Publicidad</p>
            </div>
          </div>
          <div className="text-gray-400 text-lg">•••</div>
        </div>
        
        {/* Image */}
        <div className="aspect-[4/3] bg-gray-100">
          <img 
            src={imagePlaceholder} 
            alt={data.business.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Text and CTA */}
        <div className="p-3">
          <p className="text-sm mb-3 line-clamp-3">{adText}</p>
          <div className="bg-primary text-white text-center py-2 px-4 rounded font-medium text-sm">
            {data.content.cta}
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'stories') {
    return (
      <div className="mx-auto" style={{ width: '240px', height: '420px' }}>
        <div className="h-full w-full rounded-lg overflow-hidden border border-gray-300 relative bg-gray-100">
          {/* Background image */}
          <img 
            src={imagePlaceholder} 
            alt={data.business.name} 
            className="w-full h-full object-cover absolute inset-0"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col p-4 text-white">
            {/* Header */}
            <div className="flex items-center gap-2 mb-auto">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 text-xs font-bold">
                {data.business.name.charAt(0)}
              </div>
              <p className="text-sm font-medium">{data.business.name}</p>
            </div>
            
            {/* Footer content */}
            <div className="mt-auto">
              <p className="text-sm font-medium mb-3 line-clamp-2">
                {adText}
              </p>
              <div className="bg-white text-black text-center py-2 px-4 rounded-full font-medium text-xs">
                {data.content.cta}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'reels') {
    return (
      <div className="mx-auto" style={{ width: '240px', height: '420px' }}>
        <div className="h-full w-full rounded-lg overflow-hidden border border-gray-300 relative bg-gray-100">
          {/* Background image */}
          <img 
            src={imagePlaceholder} 
            alt={data.business.name} 
            className="w-full h-full object-cover absolute inset-0"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
          
          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="text-sm font-medium mb-3 line-clamp-2">
              {adText}
            </p>
            <div className="bg-white text-black text-center py-2 px-4 rounded-full font-medium text-xs">
              {data.content.cta}
            </div>
          </div>
          
          {/* Reels UI elements */}
          <div className="absolute top-4 right-4 flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">❤️</div>
            <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">💬</div>
            <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">➡️</div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};
