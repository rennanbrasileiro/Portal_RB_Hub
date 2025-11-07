import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, TrendingUp } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

const transformations = [
  {
    id: 1,
    title: 'Edifício Solar - Revitalização Completa',
    location: 'Boa Viagem, Recife',
    before: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=500&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop',
    services: ['Pintura de Fachada', 'Impermeabilização', 'Paisagismo'],
    results: ['Valorização de 15%', 'Economia 30% energia', 'Satisfação 98%'],
    investment: 'R$ 85.000',
    duration: '21 dias'
  },
  {
    id: 2,
    title: 'Residencial Gardens - Modernização',
    location: 'Imbiribeira, Recife',
    before: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop',
    services: ['Automação Predial', 'CFTV HD', 'LED Inteligente'],
    results: ['Segurança 100%', 'Economia 40% energia', 'Tecnologia avançada'],
    investment: 'R$ 120.000',
    duration: '30 dias'
  },
  {
    id: 3,
    title: 'Condomínio Premium - Gestão Total',
    location: 'Pina, Recife',
    before: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=400&fit=crop',
    services: ['Síndico Profissional', 'Zeladoria 24h', 'Manutenção Preventiva'],
    results: ['Inadimplência 0%', 'Custos -25%', 'Transparência total'],
    investment: 'R$ 8.500/mês',
    duration: 'Gestão contínua'
  }
];

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBefore, setShowBefore] = useState(true);
  const { isDark } = useTheme();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setShowBefore(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setShowBefore(true);
  };

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
                <p className={`flex items-center space-x-2 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                  <span>{current.location}</span>
                </p>
              </div>

              {/* Services */}
              <div className="mb-6">
                <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Serviços Realizados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {current.services.map((service, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark 
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                          : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                      }`}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Resultados Alcançados
                </h4>
                <div className="space-y-2">
                  {current.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Investimento</p>
                  <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {current.investment}
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Prazo</p>
                  <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {current.duration}
                  </p>
                </div>
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
