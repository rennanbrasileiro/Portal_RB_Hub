import { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, Clock, FileCheck, Handshake, Rocket } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

const steps = [
  {
    id: 1,
    icon: Handshake,
    title: 'Primeiro Contato',
    description: 'Análise inicial gratuita das necessidades do seu condomínio',
    details: ['Visita técnica sem compromisso', 'Diagnóstico completo', 'Mapeamento de necessidades', 'Apresentação da empresa'],
    duration: '24h'
  },
  {
    id: 2,
    icon: FileCheck,
    title: 'Proposta Personalizada',
    description: 'Elaboração de proposta técnica e comercial sob medida',
    details: ['Cronograma detalhado', 'Orçamento transparente', 'Especificações técnicas', 'Garantias incluídas'],
    duration: '48h'
  },
  {
    id: 3,
    icon: Clock,
    title: 'Implementação',
    description: 'Início dos serviços com acompanhamento total',
    details: ['Transição suave', 'Equipe dedicada', 'Relatórios semanais', 'Suporte 24/7'],
    duration: '7-15 dias'
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Resultados',
    description: 'Gestão ativa com melhorias contínuas',
    details: ['Otimização constante', 'Relatórios mensais', 'Feedback contínuo', 'Evolução do patrimônio'],
    duration: 'Contínuo'
  }
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(1);
  const { isDark } = useTheme();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Como <span className="text-gradient from-cyan-500 to-blue-600">Trabalhamos</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Processo transparente e eficiente do primeiro contato aos resultados
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="flex flex-col md:flex-row justify-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  activeStep === step.id
                    ? isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-light'
                    : isDark
                      ? 'glass-effect text-white hover:bg-white/20'
                      : 'glass-effect-light text-gray-700 hover:bg-black/10'
                }`}
              >
                {activeStep > step.id ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : activeStep === step.id ? (
                  <step.icon className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
                <div className="text-left">
                  <p className="font-bold text-sm">Etapa {step.id}</p>
                  <p className="text-xs opacity-90">{step.duration}</p>
                </div>
              </button>
              {index < steps.length - 1 && (
                <ArrowRight className={`w-5 h-5 mx-2 hidden md:block ${
                  isDark ? 'text-slate-500' : 'text-gray-400'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Active Step Details */}
        <div className={`p-8 rounded-3xl transition-all duration-500 ${
          isDark ? 'glass-effect' : 'glass-effect-light'
        }`}>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`transition-all duration-500 ${
                activeStep === step.id ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {step.title}
                      </h3>
                      <p className={`${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                        Duração: {step.duration}
                      </p>
                    </div>
                  </div>
                  <p className={`text-lg mb-6 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {step.details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      <span className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
