import { useState } from 'react';
import { Calculator, Building2, Users, Wrench, Paintbrush, Shield, FileText, ArrowRight } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { calculateServicePrice } from '@/react-app/hooks/useServiceCalculation';
import type { ServiceType } from '@/shared/types';

interface ServiceOption extends ServiceType {
  icon: React.ElementType;
  description: string;
}

const services: ServiceOption[] = [
  {
    id: 'sindico',
    name: 'Síndico Profissional',
    icon: Building2,
    basePrice: 3500,
    description: 'Gestão completa e certificada',
    category: 'sindico_professional',
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['gestão', 'síndico']
  },
  {
    id: 'manutencao',
    name: 'Manutenção Preventiva',
    icon: Wrench,
    basePrice: 1200,
    description: 'Hidráulica, elétrica e geral',
    category: 'maintenance_facilities',
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['manutenção']
  },
  {
    id: 'pintura',
    name: 'Pintura e Reforma',
    icon: Paintbrush,
    basePrice: 25000,
    description: 'Fachada e áreas comuns',
    category: 'maintenance_facilities',
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['pintura']
  },
  {
    id: 'zeladoria',
    name: 'Zeladoria Qualificada',
    icon: Users,
    basePrice: 2800,
    description: 'Equipe treinada 24h',
    category: 'maintenance_facilities',
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['zeladoria']
  },
  {
    id: 'seguranca',
    name: 'Segurança Integrada',
    icon: Shield,
    basePrice: 4500,
    description: 'CFTV, alarmes e controle',
    category: 'security_automation',
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['segurança']
  }
];

export default function BudgetCalculator() {
  const [units, setUnits] = useState(20);
  const [selectedServices, setSelectedServices] = useState<string[]>(['sindico']);
  const { isDark } = useTheme();

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getServicePrice = (service: ServiceOption) => {
    return calculateServicePrice(service, units);
  };

  const calculateTotal = () => {
    let sum = 0;
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        sum += getServicePrice(service);
      }
    });
    return sum;
  };

  const total = calculateTotal();

  const isServiceRecurring = (serviceId: string) => {
    return ['sindico', 'manutencao', 'zeladoria', 'seguranca'].includes(serviceId);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Calculadora de <span className="text-gradient from-cyan-500 to-blue-600">Orçamento</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Simule os custos dos nossos serviços para seu condomínio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Number of Units */}
            <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Informações do Condomínio
              </h3>
              <div>
                <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Número de Unidades
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={units}
                    onChange={(e) => setUnits(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className={`px-4 py-2 rounded-lg font-bold text-lg min-w-16 text-center ${
                    isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {units}
                  </div>
                </div>
                <div className={`flex justify-between text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  <span>5 unidades</span>
                  <span>200 unidades</span>
                </div>
              </div>
            </div>

            {/* Services Selection */}
            <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Selecione os Serviços
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  const price = getServicePrice(service);
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-xl transition-all text-left border-2 ${
                        isSelected
                          ? isDark
                            ? 'border-cyan-500 bg-cyan-500/20 shadow-glow'
                            : 'border-cyan-500 bg-cyan-50 shadow-glow-light'
                          : isDark
                            ? 'border-slate-700 hover:border-slate-600 hover:bg-white/5'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <service.icon className={`w-6 h-6 mt-1 ${
                          isSelected
                            ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                            : isDark ? 'text-slate-400' : 'text-gray-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold mb-1 ${
                            isSelected 
                              ? isDark ? 'text-cyan-300' : 'text-cyan-700'
                              : isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {service.name}
                          </h4>
                          <p className={`text-sm mb-2 ${
                            isDark ? 'text-slate-400' : 'text-gray-600'
                          }`}>
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${
                              isSelected 
                                ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                                : isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              R$ {price.toLocaleString('pt-BR')}
                            </span>
                            {isServiceRecurring(service.id) && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
                              }`}>
                                /mês
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-1">
            <div className={`sticky top-8 p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Resumo do Orçamento
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    Condomínio com
                  </p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {units} unidades
                  </p>
                </div>

                {selectedServices.length > 0 && (
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Serviços Selecionados:
                    </h4>
                    <div className="space-y-2">
                      {selectedServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service) return null;
                        const price = getServicePrice(service);
                        
                        return (
                          <div key={serviceId} className="flex justify-between text-sm">
                            <span className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                              {service.name}
                            </span>
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              R$ {price.toLocaleString('pt-BR')}
                              {isServiceRecurring(serviceId) && <span className="text-xs">/mês</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className={`border-t pt-4 ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Total Estimado:
                  </span>
                  <span className={`text-2xl font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    R$ {total.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                {selectedServices.some(id => isServiceRecurring(id)) && (
                  <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    * Valores mensais para serviços recorrentes
                  </p>
                )}

                <button
                  onClick={() => {
                    // Scroll to proposal form or trigger it
                    const proposalEvent = new CustomEvent('openAdvancedProposal');
                    window.dispatchEvent(proposalEvent);
                  }}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Catálogo Completo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'}`}>
                  <p className={`text-xs text-center ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                    💡 Orçamento gratuito e sem compromisso. Valores podem variar conforme especificações técnicas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
