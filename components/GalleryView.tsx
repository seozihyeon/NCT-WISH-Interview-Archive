
import React, { useState, useMemo } from 'react';
import { ChevronDown, X, LayoutGrid, Search } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  category?: string;
}

interface MemberTheme {
  primary: string;    
  tabActive: string;  
  secondary: string;  
  accent: string;
  logoUrl?: string; // 멤버별 로고 이미지 경로 추가
}

// 멤버별 테마 및 로고 설정
const MEMBER_THEMES: Record<string, MemberTheme> = {
  SION: { 
    primary: '#BAB4FF', 
    tabActive: '#685FE3', 
    secondary: '#D6D3FF', 
    accent: '#4338CA',
    logoUrl: '/assets/SION.png'
  },
  RIKU: { 
    primary: '#FFB1B1', 
    tabActive: '#E35457', 
    secondary: '#FFD8D8', 
    accent: '#BE123C',
    logoUrl: '/assets/RIKU.png'
  },
  YUSHI: { 
    primary: '#9FD2FF', 
    tabActive: '#2D8EE6', 
    secondary: '#C6E0F7', 
    accent: '#0369A1',
    logoUrl: '/assets/YUSHI.png'
  },
  JAEHEE: { 
    primary: '#C1E9B6', 
    tabActive: '#46C667', 
    secondary: '#D4E7CF', 
    accent: '#15803D',
    logoUrl: '/assets/JAEHEE.png'
  },
  RYO: { 
    primary: '#FFF1AC', 
    tabActive: '#E1C659', 
    secondary: '#FFF7CE', 
    accent: '#A16207',
    logoUrl: '/assets/RYO.png'
  },
  SAKUYA: { 
    primary: '#FFB9F6', 
    tabActive: '#E083D3', 
    secondary: '#FFDBFA', 
    accent: '#BE185D',
    logoUrl: '/assets/SAKUYA.png'
  },
};

const GalleryView: React.FC<{ memberName: string }> = ({ memberName }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [logoError, setLogoError] = useState(false);
  
  const theme = MEMBER_THEMES[memberName.toUpperCase()] || MEMBER_THEMES.SION;

  const tabs = [
    'All',
    'New Team',
    'WISH',
    'Songbird',
    'Steady',
    'Wishful Winter',
    'poppop',
    'color'
  ];

  const mockData: GalleryItem[] = [
    { id: 1, title: '중국 잡지 1호', date: '2025/10/31', imageUrl: '', category: 'New Team' },
    { id: 2, title: 'WISH Behind Photo', date: '2025/11/05', imageUrl: '', category: 'WISH' },
    { id: 3, title: 'Steady MV Sketch', date: '2025/11/12', imageUrl: '', category: 'Steady' },
    { id: 4, title: 'Songbird Stage Photo', date: '2025/11/20', imageUrl: '', category: 'Songbird' },
    { id: 5, title: 'Winter Special Clip', date: '2025/12/01', imageUrl: '', category: 'Wishful Winter' },
    { id: 6, title: 'Fanmeeting Concept', date: '2025/12/15', imageUrl: '', category: 'poppop' },
  ];

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const matchesTab = activeTab === 'All' || item.category === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm, mockData]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-3 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-x-hidden">
      <div className="w-full max-w-6xl flex flex-col relative">
        
        {/* Tabs Container */}
        <div className="flex flex-row items-end w-full px-1 md:px-2 z-20 relative">
          
          {/* Main Member Tab (Logo or Text) */}
          <div className="relative flex items-center justify-center px-4 md:px-8 py-2 md:py-3.5 min-w-[100px] md:min-w-[160px] flex-shrink-0">
            <svg 
              className="absolute inset-0 w-full h-full drop-shadow-md" 
              viewBox="0 0 100 40" 
              preserveAspectRatio="none"
              fill={theme.primary}
            >
              <path d="M 0,40 L 0,10 Q 0,0 10,0 L 85,0 Q 92,0 95,8 L 100,40 Z" />
            </svg>
            
            <div className="relative z-10 flex items-center justify-center w-full">
              {theme.logoUrl && !logoError ? (
                <img 
                  src={theme.logoUrl} 
                  alt={memberName}
                  onError={() => setLogoError(true)}
                  className="h-5 md:h-8 w-auto object-contain" 
                />
              ) : (
                <h1 className="text-sm md:text-xl font-black text-white font-ibm-mono tracking-widest drop-shadow-sm leading-none pt-1">
                  {memberName}
                </h1>
              )}
            </div>
          </div>

          {/* Desktop Only Era Tabs */}
          <div className="hidden md:flex flex-1 flex-row items-end ml-1 overflow-x-auto no-scrollbar pb-[2px] gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-5 py-2.5 font-bold text-[10px] md:text-xs transition-all whitespace-nowrap rounded-t-2xl shadow-sm border-t border-x border-white/50 flex-shrink-0 ${
                    isActive 
                      ? 'text-white z-20 translate-y-[2px] shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 z-10'
                  }`}
                  style={{ 
                    backgroundColor: isActive ? theme.tabActive : `${theme.primary}35`,
                    borderColor: isActive ? 'white' : 'transparent'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Mobile Only Era Selector Tab */}
          <div className="md:hidden flex-1 flex items-end ml-0.5">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2 border-t border-x border-white/40 rounded-t-2xl shadow-sm text-gray-700 active:scale-95 transition-transform"
              style={{ backgroundColor: `${theme.primary}35` }}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid size={10} style={{ color: theme.accent }} />
                <span className="font-black text-[9px] uppercase tracking-wider" style={{ color: theme.accent }}>{activeTab}</span>
              </div>
              <ChevronDown size={12} style={{ color: theme.accent }} />
            </button>
          </div>
        </div>

        {/* Content Container (Folder Body) */}
        <div 
          className="relative flex-1 shadow-2xl border-4 border-white/60 min-h-[60vh] md:min-h-[70vh] z-10 transition-colors duration-500 mt-[-2px] 
                     rounded-br-[2.5rem] rounded-bl-[2.5rem] md:rounded-br-[3rem] md:rounded-bl-[3rem] rounded-tr-2xl md:rounded-tr-3xl rounded-tl-none flex flex-col"
          style={{ backgroundColor: theme.secondary }}
        >
          {/* Internal Search Bar */}
          <div className="p-4 md:p-10 pb-0 md:pb-0 z-20">
            <div className="relative group max-w-md ml-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} style={{ color: theme.tabActive }} className="opacity-50" />
              </div>
              <input
                type="text"
                placeholder={`${activeTab === 'All' ? '전체' : activeTab} 내 검색...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-sm border-2 border-white/80 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all"
                style={{ 
                  '--tw-ring-color': `${theme.tabActive}30` 
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Mobile Era Selector Overlay */}
          {isMenuOpen && (
            <div className="absolute inset-0 z-50 bg-white/40 backdrop-blur-xl rounded-[inherit] overflow-hidden animate-in fade-in duration-300">
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: theme.accent }}>Select Era</h2>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 bg-white/90 rounded-full shadow-sm text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto no-scrollbar pb-8">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          handleTabChange(tab);
                          setIsMenuOpen(false);
                        }}
                        className={`p-4 rounded-2xl font-bold text-xs transition-all text-center flex items-center justify-center min-h-[60px] border-2 ${
                          isActive 
                            ? 'text-white shadow-lg scale-105 border-white' 
                            : 'text-gray-600 border-transparent hover:bg-white/50'
                        }`}
                        style={{ backgroundColor: isActive ? theme.tabActive : `${theme.primary}25` }}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Grid Content */}
          <div className="flex-1 p-5 md:p-16 pt-6 md:pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14 overflow-y-auto no-scrollbar">
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-white rounded-[1.8rem] md:rounded-[2rem] shadow-lg overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl ring-1 ring-black/5">
                    <div className="w-full h-full bg-slate-50/50 flex items-center justify-center">
                      <div 
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-dashed animate-spin-slow opacity-15"
                        style={{ borderColor: theme.tabActive }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-5 px-1 md:px-2">
                    <h3 className="text-base md:text-2xl font-bold text-gray-800 group-hover:text-black transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 md:mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.tabActive }}></div>
                        <p className="text-[10px] md:text-base font-semibold text-gray-400">
                          {item.date}
                        </p>
                      </div>
                      {activeTab === 'All' && item.category && (
                        <span className="text-[8px] md:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/50 border border-white/80" style={{ color: theme.tabActive }}>
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-30">
                <Search size={48} className="mb-4" />
                <p className="font-bold">검색 결과가 없습니다.</p>
              </div>
            )}
            
            <div className="col-span-full mt-8 md:mt-20 mb-10 text-center opacity-30">
              <div className="h-1 w-16 md:w-20 mx-auto rounded-full mb-3 md:mb-4" style={{ backgroundColor: theme.tabActive }}></div>
              <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.6em]" style={{ color: theme.accent }}>
                Wish Archive Collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </div>
  );
};

export default GalleryView;
