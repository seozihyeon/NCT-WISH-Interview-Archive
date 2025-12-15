
import React from 'react';

const StarSVG: React.FC<{ color: string; size: number; className?: string; style?: React.CSSProperties }> = ({ color, size, className, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color} 
    className={`opacity-40 pointer-events-none ${className}`}
    style={style}
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Recreated Pastel Plaid Pattern matching the uploaded image */}
      <div 
        className="absolute inset-0 opacity-60" 
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(232, 240, 254, 0.6) 20px, transparent 20px),
            linear-gradient(rgba(232, 240, 254, 0.6) 20px, transparent 20px),
            linear-gradient(90deg, rgba(245, 235, 255, 0.6) 30px, transparent 30px),
            linear-gradient(rgba(245, 235, 255, 0.6) 30px, transparent 30px),
            linear-gradient(90deg, rgba(235, 255, 240, 0.6) 40px, transparent 40px),
            linear-gradient(rgba(235, 255, 240, 0.6) 40px, transparent 40px),
            linear-gradient(90deg, rgba(255, 240, 245, 0.4) 10px, transparent 10px),
            linear-gradient(rgba(255, 240, 245, 0.4) 10px, transparent 10px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 150px 150px, 150px 150px, 200px 200px, 200px 200px, 80px 80px, 80px 80px',
          backgroundBlendMode: 'multiply'
        }}
      />
      
      {/* Floating Stars for extra "Wish" vibe */}
      <StarSVG color="#fca5a5" size={120} className="absolute top-[10%] left-[5%] floating-star" />
      <StarSVG color="#93c5fd" size={80} className="absolute top-[5%] right-[10%] floating-star" style={{ animationDelay: '1s' }} />
      <StarSVG color="#fde047" size={60} className="absolute bottom-[20%] left-[15%] floating-star" style={{ animationDelay: '2s' }} />
      <StarSVG color="#f472b6" size={150} className="absolute bottom-[5%] right-[5%] floating-star" style={{ animationDelay: '0.5s' }} />
      <StarSVG color="#c084fc" size={40} className="absolute top-[40%] right-[30%] floating-star" style={{ animationDelay: '3s' }} />
      <StarSVG color="#4ade80" size={50} className="absolute bottom-[40%] left-[40%] floating-star" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default AnimatedBackground;
