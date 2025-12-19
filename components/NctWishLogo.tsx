
import React, { useState } from 'react';

const NctWishLogo: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center select-none py-8 px-12 text-center">
      <div className="relative group">
        {/* 사용자 정의 이미지 로고 */}
        <img 
          src="/assets/LOGO_oneline.png" 
          alt="NCT WISH" 
          className={`w-full max-w-[600px] md:max-w-[800px] h-auto transition-all duration-500 ease-out group-hover:scale-105 ${!imageLoaded ? 'hidden' : 'block'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />

        {/* 이미지가 없거나 로드에 실패했을 때만 나타나는 백업 텍스트 로고 */}
        {(imageError || !imageLoaded) && (
          <h1 className="text-6xl md:text-8xl font-black text-blue-400 tracking-tighter drop-shadow-sm group-hover:text-blue-500 transition-colors">
            NCT WISH
          </h1>
        )}
      </div>
    </div>
  );
};

export default NctWishLogo;
