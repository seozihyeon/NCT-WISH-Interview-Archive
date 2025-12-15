import React from 'react';
// ----------------------------------------------------
// 💡 수정된 부분 1: 로고 파일을 import 합니다.
// 컴포넌트 파일(components/NctWishLogo.tsx)에서 
// assets/NCTWISH.png 파일로 상대 경로를 설정합니다.
import NctWishLogoPath from '../assets/LOGO_bright.png'; 
// ----------------------------------------------------

const NctWishLogo: React.FC = () => {
  // 💡 수정된 부분 2: import된 변수를 logoSrc에 할당합니다.
  // 이 변수에는 빌드 도구(Vite/Webpack)가 처리한 
  // 배포용 이미지의 URL이 들어갑니다.
  const logoSrc = NctWishLogoPath; 

  return (
    <div className="flex items-center justify-center select-none py-8 px-12">
      <div className="relative group">
        <img 
          src={logoSrc} 
          alt="NCT WISH Logo" 
          // 크기는 이전 요청대로 크게 유지합니다.
          className="w-full max-w-[600px] md:max-w-[800px] h-auto transition-all duration-500 ease-out 
                     drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] 
                     group-hover:scale-105 group-hover:drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
};

export default NctWishLogo;