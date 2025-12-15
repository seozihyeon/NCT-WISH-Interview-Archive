import React from 'react';
// 💡 1. Background.png 파일을 import 합니다. (assets 폴더에 있다고 가정)
// 파일 구조 상 '../assets/Background.png' 경로는 올바릅니다.
import BackgroundImagePath from '../assets/Background.png'; 

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
    <div 
      className="fixed inset-0 -z-10 overflow-hidden bg-white"
      style={{
        // 💡 2. 배경 이미지 스타일 적용
        backgroundImage: `url(${BackgroundImagePath})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Floating Stars (별 모양은 그대로 유지) */}
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