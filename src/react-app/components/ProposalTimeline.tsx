import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import type { ServiceType } from '@/shared/types';

interface ProposalTimelineProps {
  selectedServices: string[];
  allServices: ServiceType[];
}

export default function ProposalTimeline({ selectedServices, allServices }: ProposalTimelineProps) {
  const { isDark } = useTheme();

  const timelinePhases = [
    {
      phase: 'Análise Técnica',
      duration: '1-2 dias',
      description: 'Visita técnica e levantamento detalhado das necessidades',
      icon: CheckCircle2
    },
    {
      phase: 'Proposta Formal',
      duration: '2-3 dias',
      description: 'Elaboração de proposta comercial personalizada',
      icon: CheckCircle2
    },
    {
      phase: 'Aprovação',
      duration: '1-7 dias',
      description: 'Análise e aprovação pela administração/assembleia',
      icon: Clock
    },
    {
      phase: 'Mobilização',
      duration: '7-15 dias',
      description: 'Preparação de equipe, materiais e documentação',
      icon: Clock
    },
    {
      phase: 'Implementação',
      duration: 'Variável',
      description: 'Início dos serviços conforme cronograma acordado',
      icon: Clock
    }
  ];

  const hasLongTermServices = selectedServices.some(id => {
    const service = allServices.find(s => s.id === id);
    return service && !service.isRecurring;
  });

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Timeline de Implementação
        </h3>
      </div>

      <div className="space-y-4">
        {timelinePhases.map((phase, index) => {
          const Icon = phase.icon;
          const isLast = index === timelinePhases.length - 1;

          return (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${
                  Icon === CheckCircle2
                    ? isDark ? 'bg-green-500/20' : 'bg-green-100'
                    : isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    Icon === CheckCircle2
                      ? isDark ? 'text-green-400' : 'text-green-600'
                      : isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`} />
                </div>
                {!isLast && (
                  <div className={`w-0.5 h-12 mt-2 ${
                    isDark ? 'bg-slate-700' : 'bg-gray-300'
                  }`} />
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {phase.phase}
                  </h4>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    isDark ? 'bg-slate-700 text-cyan-400' : 'bg-gray-100 text-cyan-600'
                  }`}>
                    {phase.duration}
                  </span>
                </div>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-6 p-4 rounded-xl ${
        isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          <Clock className={`w-5 h-5 ${
            isDark ? 'text-cyan-400' : 'text-cyan-600'
          }`} />
          <p className={`font-semibold ${
            isDark ? 'text-cyan-300' : 'text-cyan-700'
          }`}>
            Prazo Total Estimado
          </p>
        </div>
        <p className={`text-2xl font-black ${
          isDark ? 'text-cyan-400' : 'text-cyan-600'
        }`}>
          {hasLongTermServices ? '15-30 dias' : '10-20 dias'}
        </p>
        <p className={`text-xs mt-1 ${
          isDark ? 'text-cyan-300' : 'text-cyan-600'
        }`}>
          Para início da operação completa
        </p>
      </div>

      <div className={`mt-4 p-3 rounded-lg ${
        isDark ? 'bg-yellow-500/20' : 'bg-yellow-50'
      }`}>
        <p className={`text-xs ${
          isDark ? 'text-yellow-300' : 'text-yellow-700'
        }`}>
          ⚡ <strong>Processos urgentes:</strong> Para situações emergenciais, 
          podemos acelerar o processo de mobilização em até 50%.
        </p>
      </div>
    </div>
  );
}
