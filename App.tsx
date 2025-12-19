
import React, { useState, useCallback } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import NctWishLogo from './components/NctWishLogo';
import GalleryView from './components/GalleryView';
import { performWishSearch, SearchResult } from './services/geminiService';
import { Search, Star, Loader2, ExternalLink, X, ArrowLeft } from 'lucide-react';

type ViewState = 'HOME' | 'GALLERY';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeMember, setActiveMember] = useState<string>('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const searchRes = await performWishSearch(query);
    setResult(searchRes);
    setLoading(false);
    setShowResultModal(true);
  }, [query]);

  const quickLinks = [
    { name: 'SION', color: '#877FF6', search: 'Sion (NCT WISH) news' },
    { name: 'RIKU', color: '#FF7073', search: 'Riku (NCT WISH) performance' },
    { name: 'YUSHI', color: '#46A9FF', search: 'Yushi (NCT WISH) photos' },
    { name: 'JAEHEE', color: '#5CE27E', search: 'Jaehee (NCT WISH) facts' },
    { name: 'RYO', color: '#FADF72', search: 'Ryo (NCT WISH) profile' },
    { name: 'SAKUYA', color: '#F99CEC', search: 'Sakuya (NCT WISH) cute moments' },
  ];

  const handleMemberClick = (name: string) => {
    setActiveMember(name);
    setView('GALLERY');
  };

  // 갤러리 뷰 모드
  if (view === 'GALLERY') {
    return (
      <div className="min-h-screen w-full relative">
        <AnimatedBackground />
        <button 
          onClick={() => setView('HOME')}
          className="fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all group border-2 border-white"
          aria-label="Back to Home"
        >
          <ArrowLeft size={24} className="text-blue-500 group-hover:-translate-x-1 transition-transform" />
        </button>
        <GalleryView memberName={activeMember} />
      </div>
    );
  }

  // 홈(검색) 뷰 모드
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4">
      <AnimatedBackground />

      <main className="w-full max-w-2xl flex flex-col items-center gap-8">
        {/* Logo Section */}
        <div className="animate-bounce-slow cursor-pointer" onClick={() => setView('HOME')}>
          <NctWishLogo />
        </div>

        {/* Search Section */}
        <form 
          onSubmit={handleSearch}
          className="w-full relative group"
        >
          <div className="absolute inset-0 bg-blue-300 opacity-10 blur-2xl group-focus-within:opacity-30 transition-opacity rounded-full"></div>
          <div className="relative flex items-center bg-white/90 backdrop-blur-sm border-2 border-white rounded-full p-2 focus-within:ring-4 focus-within:ring-white/50 transition-all">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="인터뷰 키워드 또는 멤버 소식 검색..."
              className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg text-gray-700 placeholder:text-gray-300 font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-200 hover:bg-blue-500 text-white rounded-full p-3 transition-colors disabled:bg-gray-300 shadow-md"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </button>
          </div>
        </form>

        {/* Quick Link Stars (갤러리 연결) */}
        <div className="grid grid-cols-3 gap-6 justify-items-center md:flex md:flex-wrap md:justify-center">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleMemberClick(link.name)}
              className="group flex flex-col items-center gap-3"
            >
              <div
                className="
                  bg-white w-16 h-16 rounded-full
                  flex items-center justify-center
                  shadow-[0_6px_0_rgba(0,0,0,0.05)]
                  group-hover:shadow-none group-hover:translate-y-1
                  transition-all transform active:scale-95
                  border-4 border-white
                "
              >
                <Star
                  size={40}
                  strokeWidth={2.5}
                  fill={link.color}
                  stroke={link.color}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <span
                className="text-[10px] font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase"
                style={{
                  color: link.color,
                  textShadow: `0 0 6px ${link.color}66`,
                }}
              >
                {link.name}
              </span>

            </button>
          ))}
        </div>
      </main>

      {/* Result Modal */}
      {showResultModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border-8 border-white/80 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-8 border-b border-gray-50 bg-gradient-to-r from-blue-50/50 to-pink-50/50">
              <h2 className="text-2xl font-black text-blue-500 flex items-center gap-3">
                <div className="bg-yellow-400 p-2 rounded-xl">
                  <Star className="text-white" fill="white" size={18} />
                </div>
                WISH Search Result
              </h2>
              <button 
                onClick={() => setShowResultModal(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                {result.text}
              </div>

              {result.sources.length > 0 && (
                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Discovery Sources</h3>
                  <div className="flex flex-wrap gap-3">
                    {result.sources.map((source, i) => (
                      <a
                        key={i}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-50/50 text-blue-600 px-4 py-2 rounded-2xl text-xs font-bold hover:bg-blue-100 transition-all border border-blue-100/50 shadow-sm"
                      >
                        {source.title.length > 35 ? source.title.substring(0, 35) + '...' : source.title}
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-gray-50/50 text-center">
              <button 
                onClick={() => setShowResultModal(false)}
                className="bg-blue-400 text-white px-12 py-3 rounded-full font-black hover:bg-blue-500 transition-all shadow-lg active:scale-95"
              >
                CLOSE 💚
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
