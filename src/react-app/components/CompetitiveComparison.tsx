import { CheckCircle2, X, Star, Award, Zap } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

const comparisonData = [
  {
    feature: 'Síndico Certificado IBAPE',
    rbhub: true,
    others: false,
    highlight: true
  },
  {
    feature: 'Gestão Transparente 100%',
    rbhub: true,
    others: 'Parcial'
  },
  {
    feature: 'Suporte 24/7',
    rbhub: true,
    others: 'Horário comercial'
  },
  {
    feature: 'Hub Completo de Serviços',
    rbhub: true,
    others: false,
    highlight: true
  },
  {
    feature: 'Relatórios Mensais Detalhados',
    rbhub: true,
    others: 'Básicos'
  },
  {
    feature: 'Manutenção Preventiva',
    rbhub: true,
    others: 'Apenas corretiva'
  },
  {
    feature: 'Equipe Própria Qualificada',
    rbhub: true,
    others: 'Terceirizada'
  },
  {
    feature: 'Seguro Responsabilidade Civil',
    rbhub: true,
    others: false
  },
  {
    feature: 'Tecnologia e Automação',
    rbhub: true,
    others: 'Limitada',
    highlight: true
  },
  {
    feature: 'Garantia de Satisfação',
    rbhub: true,
    others: false
  }
];

export default function CompetitiveComparison() {
  const { isDark } = useTheme();

  const renderValue = (value: boolean | string, isRBHub = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle2 className={`w-6 h-6 ${isRBHub ? 'text-green-500' : 'text-green-400'}`} />
      ) : (
        <X className="w-6 h-6 text-red-500" />
      );
    }
    return (
      <span className={`text-sm font-medium ${
        isRBHub 
          ? isDark ? 'text-green-400' : 'text-green-600'
          : isDark ? 'text-yellow-400' : 'text-yellow-600'
      }`}>
        {value}
      </span>
    );
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900/50' : 'bg-gray-100/50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Por que Escolher a <span className="text-gradient from-cyan-500 to-blue-600">RB HUB</span>?
          </h2>
          <p className={`text-xl max-w-3xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Compare nossos diferenciais com outras empresas do mercado
          </p>
        </div>

        <div className={`rounded-3xl overflow-hidden ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
          {/* Header */}
          <div className="grid grid-cols-3 gap-0">
            <div className={`p-6 text-center ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Características
              </h3>
            </div>
            <div className="p-6 text-center bg-gradient-to-br from-cyan-500 to-blue-600">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">RB HUB</h3>
              </div>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                ))}
              </div>
            </div>
            <div className={`p-6 text-center ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Outras Empresas
              </h3>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {comparisonData.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 gap-0 transition-all hover:bg-opacity-50 ${
                  item.highlight 
                    ? isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'
                    : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}
              >
                <div className="p-6 flex items-center">
                  <div className="flex items-center space-x-3">
                    {item.highlight && (
                      <Zap className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                    )}
                    <span className={`font-medium ${
                      item.highlight 
                        ? isDark ? 'text-cyan-300' : 'text-cyan-700'
                        : isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.feature}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-center">
                  {renderValue(item.rbhub, true)}
                </div>
                <div className="p-6 flex items-center justify-center">
                  {renderValue(item.others)}
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-8 bg-gradient-to-r from-cyan-600 to-blue-700 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Faça a Escolha Certa para seu Condomínio
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              A diferença está nos detalhes. Escolha quem oferece a solução completa e a tranquilidade que você merece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5581993119952"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-cyan-600 font-bold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Quero a RB HUB
              </a>
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-cyan-600 transition-all duration-300">
                Ver Proposta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
