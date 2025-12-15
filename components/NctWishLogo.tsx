
import React from 'react';

const NctWishLogo: React.FC = () => {
  // Using the base64 data of the provided PNG logo to ensure it loads perfectly
  const logoSrc = '../assets/NCTWISH.png';
  return (
    <div className="flex items-center justify-center select-none py-8 px-12">
      <div className="relative group">
        <img 
          src={logoSrc} 
          alt="NCT WISH Logo" 
          className="w-full **max-w-[600px] md:max-w-[800px]** h-auto transition-all duration-500 ease-out 
                     drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] 
                     group-hover:scale-105 group-hover:drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
};

export default NctWishLogo;
