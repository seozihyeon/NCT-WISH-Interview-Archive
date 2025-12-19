
import React from 'react';

const StarSVG: React.FC<{
  color: string;
  size: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ color, size, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill={color}
    className={`opacity-60 pointer-events-none ${className}`}
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M12 2l3.09 6.26l6.91 1l-5 4.86l1.18 6.88L12 17.27l-6.18 3.23l1.18-6.88l-5-4.86l6.91-1L12 2z" />
  </svg>
);

const AnimatedBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden bg-[#F0F9FF]"
      style={{
        backgroundImage: `url('/assets/Background.png'), linear-gradient(135deg, #f0f9ff 0%, #fff1f2 100%)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Floating Stars */}
      <StarSVG color="#FFB1B1" size={120} className="absolute top-[10%] left-[5%] floating-star" />
      <StarSVG color="#FFD8D8" size={80} className="absolute top-[5%] right-[10%] floating-star" style={{ animationDelay: '1s' }} />
      <StarSVG color="#9DE5F7" size={60} className="absolute bottom-[20%] left-[15%] floating-star" style={{ animationDelay: '2s' }} />
      <StarSVG color="#FFB1B1" size={150} className="absolute bottom-[5%] right-[5%] floating-star" style={{ animationDelay: '0.5s' }} />
      <StarSVG color="#9DE5F7" size={40} className="absolute top-[40%] right-[30%] floating-star" style={{ animationDelay: '3s' }} />
      <StarSVG color="#FFB1B1" size={50} className="absolute bottom-[40%] left-[40%] floating-star" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default AnimatedBackground;
