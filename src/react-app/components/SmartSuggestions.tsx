import { useState, useMemo } from 'react';
import { Lightbulb, TrendingUp, DollarSign, Shield, Zap } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import type { ServiceType } from '@/shared/types';

interface SmartSuggestionsProps {
  selectedServices: string[];
  condominiumUnits: number;
  allServices: ServiceType[];
  onAddService: (serviceId: string) => void;
}

export default function SmartSuggestions({ 
  selectedServices, 
  condominiumUnits, 
  allServices,
  onAddService 
}: SmartSuggestionsProps) {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const suggestions = useMemo(() => {
    const suggested: Array<{ service: ServiceType; reason: string; icon: any; priority: number }> = [];

    allServices.forEach(service => {
      if (selectedServices.includes(service.id) || service.isPredefined) return;

      let reason = '';
      let priority = 0;
      let icon = Lightbulb;

      // Regras de sugestão inteligente
      if (service.id === 'cftv_monitoramento' && !selectedServices.includes('cftv_monitoramento')) {
        if (condominiumUnits > 50) {
          reason = 'Recomendado para condomínios maiores - aumenta segurança';
          priority = 3;
          icon = Shield;
          suggested.push({ service, reason, icon, priority });
        }
      }

      if (service.id === 'eficiencia_energetica' && condominiumUnits > 30) {
        reason = `Economia estimada de 30-40% na conta de luz - ROI em 18-24 meses`;
        priority = 4;
        icon = DollarSign;
        suggested.push({ service, reason, icon, priority });
      }

      if (service.id === 'app_portal' && condominiumUnits > 20) {
        reason = 'Melhora comunicação e transparência - muito valorizado por moradores';
        priority = 3;
        icon = TrendingUp;
        suggested.push({ service, reason, icon, priority });
      }

      if (service.id === 'manutencao_preventiva' && !selectedServices.includes('manutencao_preventiva')) {
        reason = 'Evita gastos emergenciais - economia de até 60% vs manutenção corretiva';
        priority = 5;
        icon = Zap;
        suggested.push({ service, reason, icon, priority });
      }

      if (service.id === 'dedetizacao' && !selectedServices.includes('dedetizacao')) {
        reason = 'Obrigatório por lei sanitária - evita multas e problemas de saúde';
        priority = 4;
        icon = Shield;
        suggested.push({ service, reason, icon, priority });
      }

      if (service.id === 'coleta_seletiva' && condominiumUnits > 40) {
        reason = 'Reduz taxa de lixo em até 25% - valoriza imóveis com selo verde';
        priority = 2;
        icon = TrendingUp;
        suggested.push({ service, reason, icon, priority });
      }
    });

    return suggested.sort((a, b) => b.priority - a.priority);
  }, [selectedServices, condominiumUnits, allServices]);

  if (suggestions.length === 0) return null;

  const displayedSuggestions = showAll ? suggestions : suggestions.slice(0, 3);

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Sugestões Inteligentes
          </h3>
        </div>
        {suggestions.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={`text-sm font-semibold ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
          >
            {showAll ? 'Ver menos' : `Ver todas (${suggestions.length})`}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {displayedSuggestions.map(({ service, reason, icon: Icon, priority }) => (
          <div
            key={service.id}
            className={`p-4 rounded-xl border-2 transition-all hover:scale-[1.02] cursor-pointer group ${
              isDark
                ? 'border-slate-700 hover:border-yellow-500/50 bg-slate-800/50 hover:bg-yellow-500/10'
                : 'border-gray-200 hover:border-yellow-500/50 bg-gray-50 hover:bg-yellow-50'
            }`}
            onClick={() => onAddService(service.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
              }`}>
                <Icon className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {service.name}
                  </h4>
                  {priority >= 4 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                      Alta prioridade
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {reason}
                </p>
                {service.basePrice && (
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      R$ {service.basePrice.toLocaleString('pt-BR')}
                      {service.isRecurring && <span className="text-xs">/mês</span>}
                    </span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Clique para adicionar →
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
