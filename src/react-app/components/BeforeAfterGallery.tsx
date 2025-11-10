import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, TrendingUp } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useAdmin } from '@/react-app/contexts/AdminContext';

export default function BeforeAfterGallery() {
  const { isDark } = useTheme();
  const { siteConfig } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBefore, setShowBefore] = useState(true);
  
  // Usar imagens do AdminContext
  const transformations = siteConfig.gallery.beforeAfterImages;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setShowBefore(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setShowBefore(true);
  };

  // Se não houver imagens, retornar null
  if (transformations.length === 0) {
    return null;
  }

  const current = transformations[currentIndex];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900/50' : 'bg-gray-100/50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Transformações <span className="text-gradient from-cyan-500 to-blue-600">Reais</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Veja como revolucionamos condomínios com resultados comprovados
          </p>
        </div>

        <div className={`rounded-3xl overflow-hidden ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Comparison */}
            <div className="relative h-96 lg:h-auto overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src={showBefore ? current.before : current.after}
                  alt={showBefore ? 'Antes' : 'Depois'}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              {/* Before/After Toggle */}
              <div className="absolute top-4 left-4 flex bg-black/50 backdrop-blur-sm rounded-full p-1">
                <button
                  onClick={() => setShowBefore(true)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    showBefore ? 'bg-white text-black' : 'text-white hover:bg-white/20'
                  }`}
                >
                  Antes
                </button>
                <button
                  onClick={() => setShowBefore(false)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    !showBefore ? 'bg-white text-black' : 'text-white hover:bg-white/20'
                  }`}
                >
                  Depois
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Status Indicator */}
              <div className="absolute bottom-4 left-4">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${
                  showBefore ? 'bg-red-500/80' : 'bg-green-500/80'
                } backdrop-blur-sm`}>
                  <Eye className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">
                    {showBefore ? 'ANTES' : 'DEPOIS'}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {current.title}
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {current.description}
                </p>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center space-x-2 mb-6">
                {transformations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowBefore(true);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-gradient-to-r from-cyan-500 to-blue-600' 
                        : `w-2 ${
                        isDark ? 'bg-slate-700' : 'bg-gray-300'
                      }`
                    }`}
                  />
                ))}
              </div>

              {/* Call to Action */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'}`}>
                <p className={`text-sm ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                  ✨ <strong>Transforme seu condomínio também!</strong> Entre em contato para saber mais sobre nossos serviços.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Indicators */}
          <div className="flex justify-center space-x-2 p-6">
            {transformations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowBefore(true);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    : isDark ? 'bg-slate-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
