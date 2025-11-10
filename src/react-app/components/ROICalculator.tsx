import { useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import type { ServiceType } from '@/shared/types';

interface ROICalculatorProps {
  selectedServices: string[];
  allServices: ServiceType[];
  condominiumUnits: number;
}

export default function ROICalculator({ selectedServices, allServices, condominiumUnits }: ROICalculatorProps) {
  const { isDark } = useTheme();

  const roiData = useMemo(() => {
    let monthlySavings = 0;
    let initialInvestment = 0;
    let monthlyInvestment = 0;
    const benefits: Array<{ text: string; value: number }> = [];

    selectedServices.forEach(serviceId => {
      const service = allServices.find(s => s.id === serviceId);
      if (!service || !service.basePrice) return;

      // Cálculo de ROI para cada serviço
      switch (serviceId) {
        case 'eficiencia_energetica':
          const currentEnergyCost = condominiumUnits * 150; // R$150/unidade média
          const savings = currentEnergyCost * 0.35; // 35% economia
          monthlySavings += savings;
          initialInvestment += service.basePrice;
          benefits.push({ text: 'Economia de energia', value: savings });
          break;

        case 'eficiencia_hidrica':
          const waterSavings = condominiumUnits * 80 * 0.30; // 30% economia
          monthlySavings += waterSavings;
          initialInvestment += service.basePrice;
          benefits.push({ text: 'Economia de água', value: waterSavings });
          break;

        case 'manutencao_preventiva':
          const emergencyCostAvoidance = condominiumUnits * 50; // Evita emergências
          monthlySavings += emergencyCostAvoidance * 0.6; // 60% economia vs corretiva
          monthlyInvestment += service.basePrice;
          benefits.push({ text: 'Prevenção de emergências', value: emergencyCostAvoidance * 0.6 });
          break;

        case 'automacao_predial':
          const automationSavings = condominiumUnits * 40; // Economia operacional
          monthlySavings += automationSavings;
          initialInvestment += service.basePrice;
          benefits.push({ text: 'Eficiência operacional', value: automationSavings });
          break;

        case 'coleta_seletiva':
          const wasteSavings = condominiumUnits * 15; // Redução taxa lixo
          monthlySavings += wasteSavings;
          monthlyInvestment += service.basePrice;
          benefits.push({ text: 'Redução taxa de lixo', value: wasteSavings });
          break;

        default:
          if (service.isRecurring) {
            monthlyInvestment += service.basePrice;
          } else {
            initialInvestment += service.basePrice;
          }
      }
    });

    // Valorização do imóvel
    const propertyValueIncrease = condominiumUnits * 200000 * 0.05; // 5% valorização

    // Payback period
    const totalMonthlyNet = monthlySavings - monthlyInvestment;
    const paybackMonths = initialInvestment > 0 && totalMonthlyNet > 0
      ? Math.ceil(initialInvestment / totalMonthlyNet)
      : null;

    return {
      monthlySavings,
      monthlyInvestment,
      initialInvestment,
      totalMonthlyNet,
      paybackMonths,
      yearlyNet: totalMonthlyNet * 12,
      propertyValueIncrease,
      benefits
    };
  }, [selectedServices, allServices, condominiumUnits]);

  if (roiData.benefits.length === 0) return null;

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Análise de Retorno sobre Investimento
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <p className={`text-sm font-semibold ${isDark ? 'text-green-300' : 'text-green-700'}`}>
              Economia Mensal Estimada
            </p>
          </div>
          <p className={`text-2xl font-black ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            R$ {roiData.monthlySavings.toLocaleString('pt-BR')}
          </p>
        </div>

        <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <p className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              Retorno Anual
            </p>
          </div>
          <p className={`text-2xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            R$ {roiData.yearlyNet.toLocaleString('pt-BR')}
          </p>
        </div>

        {roiData.paybackMonths && (
          <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Target className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <p className={`text-sm font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                Payback do Investimento
              </p>
            </div>
            <p className={`text-2xl font-black ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              {roiData.paybackMonths} meses
            </p>
          </div>
        )}

        <div className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <p className={`text-sm font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
              Valorização Estimada
            </p>
          </div>
          <p className={`text-2xl font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
            +5%
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
            R$ {roiData.propertyValueIncrease.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
        <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Benefícios Detalhados
        </h4>
        <div className="space-y-2">
          {roiData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                • {benefit.text}
              </span>
              <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                +R$ {benefit.value.toLocaleString('pt-BR')}/mês
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-50'}`}>
        <p className={`text-xs ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
          💡 <strong>Importante:</strong> Valores estimados baseados em médias de mercado. 
          O ROI real pode variar conforme uso e condições específicas do condomínio.
        </p>
      </div>
    </div>
  );
}
