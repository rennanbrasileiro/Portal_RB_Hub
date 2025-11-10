import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  X, 
  Building2, 
  Wrench, 
  Shield, 
  Wifi, 
  Leaf, 
  Briefcase,
  Plus,
  Calculator,
  Settings,
  Lightbulb,
  ClipboardList,
  MessageSquare,
  ArrowRight,
  Save,
  History,
  TrendingUp,
  Calendar,
  Loader2
} from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useProposals } from '@/react-app/contexts/ProposalContext';
import { useToast } from '@/react-app/hooks/useToast';
import { ToastContainer } from '@/react-app/components/ToastNotification';
import SmartSuggestions from '@/react-app/components/SmartSuggestions';
import ROICalculator from '@/react-app/components/ROICalculator';
import ProposalTimeline from '@/react-app/components/ProposalTimeline';
import ProposalHistory from '@/react-app/components/ProposalHistory';
import type { ServiceType, ServiceCategoryType } from '@/shared/types';
import { serviceCategories, allServices } from '@/shared/servicesData';

interface AdvancedProposalSystemProps {
  onClose: () => void;
}

// Services data imported from shared file

export default function AdvancedProposalSystem({ onClose }: AdvancedProposalSystemProps) {
  {
    id: 'prestacao_contas',
    name: 'Prestação de Contas e Balancetes',
    category: 'sindico_professional',
    description: 'Relatórios financeiros mensais e transparência total',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['relatórios', 'balancetes', 'transparência']
  },
  {
    id: 'controle_inadimplencia',
    name: 'Controle de Inadimplência',
    category: 'sindico_professional',
    description: 'Gestão e cobrança de débitos condominiais',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['cobrança', 'inadimplência', 'débitos']
  },
  {
    id: 'assembleias',
    name: 'Assembleias Ordinárias e Extraordinárias',
    category: 'sindico_professional',
    description: 'Organização e condução de assembleias',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['assembleias', 'reuniões', 'votações']
  },
  {
    id: 'representacao_legal',
    name: 'Representação Legal do Condomínio',
    category: 'sindico_professional',
    description: 'Suporte jurídico e representação legal',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['jurídico', 'legal', 'representação']
  },
  {
    id: 'gestao_contratos',
    name: 'Gestão de Contratos Existentes',
    category: 'sindico_professional',
    description: 'Administração e renovação de contratos',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['contratos', 'fornecedores', 'negociação']
  },
  {
    id: 'comunicacao_condominos',
    name: 'Comunicação com Condôminos',
    category: 'sindico_professional',
    description: 'Canal direto e eficiente de comunicação',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['comunicação', 'atendimento', 'relacionamento']
  },
  {
    id: 'relatorios_mensais',
    name: 'Relatórios Mensais de Gestão',
    category: 'sindico_professional',
    description: 'Dashboards e indicadores de performance',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    tags: ['relatórios', 'indicadores', 'performance']
  },

  // Maintenance & Facilities
  {
    id: 'manutencao_preventiva',
    name: 'Manutenção Predial Preventiva e Corretiva',
    category: 'maintenance_facilities',
    description: 'Manutenção completa de infraestrutura',
    basePrice: 1500,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['manutenção', 'preventiva', 'corretiva']
  },
  {
    id: 'limpeza_conservacao',
    name: 'Limpeza e Conservação de Áreas Comuns',
    category: 'maintenance_facilities',
    description: 'Serviços de limpeza profissional',
    basePrice: 2000,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['limpeza', 'conservação', 'higiene']
  },
  {
    id: 'zeladoria',
    name: 'Serviços de Zeladoria',
    category: 'maintenance_facilities',
    description: 'Zeladoria qualificada e uniformizada',
    basePrice: 2800,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['zeladoria', 'portaria', 'atendimento']
  },
  {
    id: 'portaria',
    name: 'Serviços de Portaria',
    category: 'maintenance_facilities',
    description: 'Recepção e controle de acesso',
    basePrice: 3200,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['portaria', 'recepção', 'controle']
  },
  {
    id: 'jardinagem',
    name: 'Jardinagem e Paisagismo',
    category: 'maintenance_facilities',
    description: 'Cuidado e manutenção de áreas verdes',
    basePrice: 800,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['jardinagem', 'paisagismo', 'verde']
  },
  {
    id: 'manutencao_eletrica',
    name: 'Manutenção Elétrica (Quadros, Iluminação, Fiação)',
    category: 'maintenance_facilities',
    description: 'Serviços elétricos especializados',
    basePrice: 500,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['elétrica', 'iluminação', 'fiação']
  },
  {
    id: 'manutencao_hidraulica',
    name: 'Manutenção Hidráulica (Tubulações, Bombas, Reservatórios)',
    category: 'maintenance_facilities',
    description: 'Sistemas hidráulicos e saneamento',
    basePrice: 600,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['hidráulica', 'bombas', 'reservatórios']
  },
  {
    id: 'climatizacao',
    name: 'Climatização e Ar-condicionado',
    category: 'maintenance_facilities',
    description: 'Manutenção de sistemas de climatização',
    basePrice: 400,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['ar-condicionado', 'climatização', 'ventilação']
  },
  {
    id: 'pintura_reparos',
    name: 'Pintura e Reparos Estruturais',
    category: 'maintenance_facilities',
    description: 'Pintura e pequenos reparos estruturais',
    basePrice: 15000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['pintura', 'reparos', 'estética']
  },
  {
    id: 'impermeabilizacao',
    name: 'Impermeabilização de Áreas Comuns',
    category: 'maintenance_facilities',
    description: 'Proteção contra infiltrações e umidade',
    basePrice: 8000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['impermeabilização', 'infiltração', 'proteção']
  },
  {
    id: 'dedetizacao',
    name: 'Dedetização e Controle de Pragas',
    category: 'maintenance_facilities',
    description: 'Controle sanitário e eliminação de pragas',
    basePrice: 300,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['dedetização', 'pragas', 'sanitário']
  },
  {
    id: 'gestao_residuos',
    name: 'Gestão de Resíduos (Coleta Seletiva e Logística)',
    category: 'maintenance_facilities',
    description: 'Gestão sustentável de resíduos',
    basePrice: 250,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['resíduos', 'coleta', 'sustentabilidade']
  },
  {
    id: 'elevadores',
    name: 'Manutenção de Elevadores (parceria homologada)',
    category: 'maintenance_facilities',
    description: 'Manutenção especializada de elevadores',
    basePrice: 1200,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['elevadores', 'manutenção', 'segurança']
  },
  {
    id: 'laudos_tecnicos',
    name: 'Inspeções e Laudos Técnicos (CREA, AVCB, etc.)',
    category: 'maintenance_facilities',
    description: 'Certificações e laudos obrigatórios',
    basePrice: 2000,
    isPredefined: false,
    isRecurring: false,
    unit: 'yearly',
    tags: ['laudos', 'certificações', 'CREA', 'AVCB']
  },
  {
    id: 'obras_reformas',
    name: 'Acompanhamento de Obras e Reformas',
    category: 'maintenance_facilities',
    description: 'Gestão e fiscalização de obras',
    basePrice: 3000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['obras', 'reformas', 'fiscalização']
  },
  {
    id: 'projetos_adequacao',
    name: 'Projetos de Adequação: Incêndio, Acessibilidade, Sinalização',
    category: 'maintenance_facilities',
    description: 'Projetos para adequação às normas',
    basePrice: 5000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['projetos', 'adequação', 'normas']
  },
  {
    id: 'combate_incendio',
    name: 'Manutenção de Sistemas de Combate a Incêndio',
    category: 'maintenance_facilities',
    description: 'Manutenção de equipamentos de segurança',
    basePrice: 400,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['incêndio', 'segurança', 'prevenção']
  },
  {
    id: 'sinalizacao',
    name: 'Sinalização de Segurança e Acessibilidade',
    category: 'maintenance_facilities',
    description: 'Placas e sinalizações normativas',
    basePrice: 1500,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['sinalização', 'acessibilidade', 'normas']
  },
  {
    id: 'pequenas_reformas',
    name: 'Serviços de Pequenas Reformas (alvenaria, marcenaria, serralheria)',
    category: 'maintenance_facilities',
    description: 'Pequenos reparos e melhorias',
    basePrice: 2000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['reformas', 'alvenaria', 'marcenaria']
  },

  // Security & Automation
  {
    id: 'cftv_monitoramento',
    name: 'CFTV e Monitoramento',
    category: 'security_automation',
    description: 'Sistema completo de câmeras e monitoramento',
    basePrice: 2500,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['cftv', 'monitoramento', 'segurança']
  },
  {
    id: 'controle_acesso',
    name: 'Controle de Acesso (Biometria, Tags, Cartões)',
    category: 'security_automation',
    description: 'Sistemas de controle de entrada e saída',
    basePrice: 1800,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['controle', 'biometria', 'acesso']
  },
  {
    id: 'ronda_eletronica',
    name: 'Ronda Eletrônica',
    category: 'security_automation',
    description: 'Sistema de rondas automatizadas',
    basePrice: 500,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['ronda', 'eletrônica', 'patrulhamento']
  },
  {
    id: 'automacao_predial',
    name: 'Automação Predial Inteligente',
    category: 'security_automation',
    description: 'Smart building e IoT para condomínios',
    basePrice: 4000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['automação', 'smart', 'IoT']
  },

  // Technology & Digital
  {
    id: 'app_portal',
    name: 'Aplicativo / Portal para Condôminos',
    category: 'technology_digital',
    description: 'App e portal web para comunicação',
    basePrice: 800,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['app', 'portal', 'digital']
  },
  {
    id: 'site_exclusivo',
    name: 'Site Exclusivo para Condomínio',
    category: 'technology_digital',
    description: 'Website personalizado do condomínio',
    basePrice: 3000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['site', 'web', 'institucional']
  },
  {
    id: 'dashboards',
    name: 'Dashboards de Indicadores',
    category: 'technology_digital',
    description: 'Painéis de controle e analytics',
    basePrice: 600,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['dashboard', 'indicadores', 'analytics']
  },
  {
    id: 'lgpd',
    name: 'Projetos LGPD',
    category: 'technology_digital',
    description: 'Adequação à Lei Geral de Proteção de Dados',
    basePrice: 2500,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['LGPD', 'privacidade', 'dados']
  },

  // ESG & Sustainability
  {
    id: 'coleta_seletiva',
    name: 'Coleta Seletiva e Logística Reversa',
    category: 'esg_sustainability',
    description: 'Gestão sustentável de resíduos e reciclagem',
    basePrice: 400,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['coleta', 'reciclagem', 'sustentabilidade']
  },
  {
    id: 'eficiencia_energetica',
    name: 'Eficiência Energética (LED, Solar)',
    category: 'esg_sustainability',
    description: 'Modernização para economia de energia',
    basePrice: 8000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['eficiência', 'LED', 'solar']
  },
  {
    id: 'eficiencia_hidrica',
    name: 'Eficiência Hídrica (Reuso de Água)',
    category: 'esg_sustainability',
    description: 'Sistemas de reaproveitamento de água',
    basePrice: 12000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['água', 'reuso', 'sustentabilidade']
  },
  {
    id: 'treinamentos',
    name: 'Treinamentos de Segurança e Sustentabilidade',
    category: 'esg_sustainability',
    description: 'Capacitação para funcionários e moradores',
    basePrice: 800,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['treinamento', 'capacitação', 'segurança']
  },

  // Corporate & Isolated Services
  {
    id: 'consultoria_empresarial',
    name: 'Consultoria Empresarial e BPO',
    category: 'corporate_isolated',
    description: 'Consultoria especializada para empresas',
    basePrice: 5000,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['consultoria', 'BPO', 'empresarial']
  },
  {
    id: 'sites_ecommerce',
    name: 'Criação de Sites e E-commerces',
    category: 'corporate_isolated',
    description: 'Desenvolvimento web e lojas virtuais',
    basePrice: 8000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['sites', 'e-commerce', 'desenvolvimento']
  },
  {
    id: 'automacao_processos',
    name: 'Automação de Processos (ERP/CRM/RPA)',
    category: 'corporate_isolated',
    description: 'Sistemas empresariais e automação',
    basePrice: 15000,
    isPredefined: false,
    isRecurring: false,
    unit: 'one_time',
    tags: ['automação', 'ERP', 'CRM', 'RPA']
  },
  {
    id: 'hospedagem_monitoramento',
    name: 'Hospedagem e Monitoramento de Sistemas',
    category: 'corporate_isolated',
    description: 'Infraestrutura cloud e monitoramento',
    basePrice: 800,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['hospedagem', 'cloud', 'monitoramento']
  },
  {
    id: 'ciberseguranca',
    name: 'Cibersegurança e Backups',
    category: 'corporate_isolated',
    description: 'Proteção digital e backup de dados',
    basePrice: 1200,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['segurança', 'backup', 'proteção']
  },
  {
    id: 'business_intelligence',
    name: 'Business Intelligence e Dashboards',
    category: 'corporate_isolated',
    description: 'Inteligência de negócios e análise de dados',
    basePrice: 3000,
    isPredefined: false,
    isRecurring: true,
    unit: 'monthly',
    tags: ['BI', 'dados', 'análise']
  },
];

export default function AdvancedProposalSystem({ onClose }: AdvancedProposalSystemProps) {
  const { isDark } = useTheme();
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryType | 'all'>('all');
  const [keepProfessionalSindico, setKeepProfessionalSindico] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [condominiumUnits, setCondominiumUnits] = useState(20);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    condominiumName: '',
    condominiumAddress: '',
    message: ''
  });

  // Initialize with predefined services if keeping professional sindico
  useEffect(() => {
    if (keepProfessionalSindico) {
      const predefinedServices = allServices
        .filter(service => service.isPredefined)
        .map(service => service.id);
      setSelectedServices(prev => [...new Set([...prev, ...predefinedServices])]);
    } else {
      const predefinedServices = allServices
        .filter(service => service.isPredefined)
        .map(service => service.id);
      setSelectedServices(prev => prev.filter(id => !predefinedServices.includes(id)));
    }
  }, [keepProfessionalSindico]);

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      // Don't show predefined services in the selection (they're handled separately)
      const isNotPredefined = !service.isPredefined;
      
      return matchesSearch && matchesCategory && isNotPredefined;
    });
  }, [searchTerm, selectedCategory]);

  // Group services by category
  const servicesByCategory = useMemo(() => {
    const groups: Record<ServiceCategoryType, ServiceType[]> = {
      sindico_professional: [],
      maintenance_facilities: [],
      security_automation: [],
      technology_digital: [],
      esg_sustainability: [],
      corporate_isolated: []
    };

    filteredServices.forEach(service => {
      groups[service.category].push(service);
    });

    return groups;
  }, [filteredServices]);

  // Calculate total estimate
  const totalEstimate = useMemo(() => {
    let total = 0;
    selectedServices.forEach(serviceId => {
      const service = allServices.find(s => s.id === serviceId);
      if (service && service.basePrice) {
        let price = service.basePrice;
        
        // Apply unit multipliers for recurring services
        if (service.isRecurring && service.unit === 'monthly') {
          // For monthly services, consider scale based on units
          if (['zeladoria', 'portaria', 'gestao_administrativa'].includes(serviceId)) {
            price += condominiumUnits * 15;
          } else if (['limpeza_conservacao', 'manutencao_preventiva'].includes(serviceId)) {
            price += condominiumUnits * 8;
          } else if (['cftv_monitoramento', 'controle_acesso'].includes(serviceId)) {
            price += condominiumUnits * 12;
          }
        }
        
        total += price;
      }
    });
    return total;
  }, [selectedServices, condominiumUnits]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleAllInCategory = (category: ServiceCategoryType) => {
    const categoryServices = allServices
      .filter(s => s.category === category && !s.isPredefined)
      .map(s => s.id);
    
    const allSelected = categoryServices.every(id => selectedServices.includes(id));
    
    if (allSelected) {
      setSelectedServices(prev => prev.filter(id => !categoryServices.includes(id)));
    } else {
      setSelectedServices(prev => [...new Set([...prev, ...categoryServices])]);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Professional Sindico Option */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${
              keepProfessionalSindico
                ? isDark ? 'border-cyan-500 bg-cyan-500/20' : 'border-cyan-500 bg-cyan-50'
                : isDark ? 'border-slate-600 bg-slate-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  keepProfessionalSindico
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    : isDark ? 'bg-slate-700' : 'bg-gray-400'
                }`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="radio"
                      checked={keepProfessionalSindico}
                      onChange={() => setKeepProfessionalSindico(true)}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Manter Proposta de Síndico Profissional
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      Recomendado
                    </span>
                  </div>
                  <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                    Recomendado se você pretende receber a proposta de síndico profissional; os serviços padrão seguem incluídos.
                  </p>
                  
                  {keepProfessionalSindico && (
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-white/50'}`}>
                      <h4 className={`font-semibold mb-3 flex items-center ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Incluso na Proposta de Síndico Profissional
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {allServices.filter(s => s.isPredefined).map(service => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                            <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                              {service.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className={`text-xs mt-3 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        Observação: os serviços acima são uma referência. O escopo final pode ser ajustado na proposta formal.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Alternative Option */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${
              !keepProfessionalSindico
                ? isDark ? 'border-cyan-500 bg-cyan-500/20' : 'border-cyan-500 bg-cyan-50'
                : isDark ? 'border-slate-600 bg-slate-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  !keepProfessionalSindico
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                    : isDark ? 'bg-slate-700' : 'bg-gray-400'
                }`}>
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="radio"
                      checked={!keepProfessionalSindico}
                      onChange={() => setKeepProfessionalSindico(false)}
                      className="text-cyan-500 focus:ring-cyan-500"
                    />
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Remover pré-seleção e iniciar novo orçamento
                    </h3>
                  </div>
                  <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                    Use quando quiser mudar totalmente o segmento da contratação (ex.: corporativo, facilities) e montar uma proposta do zero.
                  </p>
                </div>
              </div>
            </div>

            {/* Condominium Info */}
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
                    max="500"
                    value={condominiumUnits}
                    onChange={(e) => setCondominiumUnits(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className={`px-4 py-2 rounded-lg font-bold text-lg min-w-16 text-center ${
                    isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {condominiumUnits}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : isDark 
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Todos
                </button>
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as ServiceCategoryType)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center space-x-2 ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : isDark 
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Services by Category */}
            <div className="space-y-8">
              {Object.entries(servicesByCategory).map(([categoryKey, services]) => {
                if (services.length === 0) return null;
                
                const category = serviceCategories[categoryKey as ServiceCategoryType];
                const categoryServices = services.map(s => s.id);
                const selectedInCategory = categoryServices.filter(id => selectedServices.includes(id)).length;
                
                return (
                  <div key={categoryKey} className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {category.name}
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {selectedInCategory}/{services.length}
                        </span>
                        <button
                          onClick={() => toggleAllInCategory(categoryKey as ServiceCategoryType)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            selectedInCategory === services.length
                              ? isDark
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                              : isDark
                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {selectedInCategory === services.length ? 'Limpar' : 'Selecionar todos'}
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map(service => {
                        const isSelected = selectedServices.includes(service.id);
                        
                        return (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`p-4 rounded-xl transition-all text-left border-2 group ${
                              isSelected
                                ? isDark
                                  ? 'border-cyan-500 bg-cyan-500/20 shadow-glow'
                                  : 'border-cyan-500 bg-cyan-50 shadow-glow-light'
                                : isDark
                                  ? 'border-slate-700 hover:border-slate-600 hover:bg-white/5'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className={`font-semibold text-sm ${
                                isSelected 
                                  ? isDark ? 'text-cyan-300' : 'text-cyan-700'
                                  : isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {service.name}
                              </h4>
                              <div className={`p-1 rounded-full ${
                                isSelected
                                  ? 'bg-cyan-500'
                                  : isDark ? 'bg-slate-600' : 'bg-gray-300'
                              }`}>
                                {isSelected ? (
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                ) : (
                                  <Plus className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
                                )}
                              </div>
                            </div>
                            
                            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                              {service.description}
                            </p>
                            
                            {service.basePrice && (
                              <div className="flex items-center justify-between">
                                <span className={`font-bold text-sm ${
                                  isSelected 
                                    ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                                    : isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                  R$ {service.basePrice.toLocaleString('pt-BR')}
                                </span>
                                {service.isRecurring && (
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    /{service.unit === 'monthly' ? 'mês' : service.unit === 'yearly' ? 'ano' : 'único'}
                                  </span>
                                )}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Nome do Condomínio *
                </label>
                <input
                  type="text"
                  value={formData.condominiumName}
                  onChange={(e) => setFormData(prev => ({ ...prev, condominiumName: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Endereço do Condomínio
              </label>
              <input
                type="text"
                value={formData.condominiumAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, condominiumAddress: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div>
              <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mensagem Adicional
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Descreva necessidades específicas, urgências, ou outras observações importantes..."
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        );

      case 4:
        const selectedServiceDetails = selectedServices.map(id => allServices.find(s => s.id === id)).filter(Boolean);
        const monthlyServices = selectedServiceDetails.filter(s => s!.isRecurring && s!.unit === 'monthly');
        const oneTimeServices = selectedServiceDetails.filter(s => !s!.isRecurring);

        return (
          <div className="space-y-6">
            {/* Summary Header */}
            <div className={`p-6 rounded-2xl text-center ${
              isDark ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20' : 'bg-gradient-to-r from-cyan-50 to-blue-50'
            }`}>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Resumo da Proposta
              </h3>
              <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                {formData.condominiumName} • {condominiumUnits} unidades
              </p>
            </div>

            {/* Services Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Selected Services */}
              <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                <h4 className={`text-xl font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <ClipboardList className="w-6 h-6 mr-2" />
                  Serviços Selecionados
                </h4>

                {keepProfessionalSindico && (
                  <div className="mb-6">
                    <h5 className={`font-semibold mb-3 text-green-600 flex items-center`}>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Síndico Profissional (Incluído)
                    </h5>
                    <div className="space-y-2">
                      {allServices.filter(s => s.isPredefined).map(service => (
                        <div key={service.id} className="flex items-center justify-between text-sm">
                          <span className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                            {service.name}
                          </span>
                          <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            Incluído
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {monthlyServices.length > 0 && (
                  <div className="mb-6">
                    <h5 className={`font-semibold mb-3 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      Serviços Mensais
                    </h5>
                    <div className="space-y-2">
                      {monthlyServices.map(service => (
                        <div key={service!.id} className="flex items-center justify-between text-sm">
                          <span className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                            {service!.name}
                          </span>
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            R$ {service!.basePrice?.toLocaleString('pt-BR')}/mês
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {oneTimeServices.length > 0 && (
                  <div className="mb-6">
                    <h5 className={`font-semibold mb-3 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                      Serviços Únicos
                    </h5>
                    <div className="space-y-2">
                      {oneTimeServices.map(service => (
                        <div key={service!.id} className="flex items-center justify-between text-sm">
                          <span className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                            {service!.name}
                          </span>
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            R$ {service!.basePrice?.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Total and Actions */}
              <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                <h4 className={`text-xl font-bold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Calculator className="w-6 h-6 mr-2" />
                  Orçamento Total
                </h4>

                <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                  <div className="text-center">
                    <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Valor Estimado Total
                    </p>
                    <p className={`text-3xl font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      R$ {totalEstimate.toLocaleString('pt-BR')}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      * Valores podem variar conforme especificações
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-50'}`}>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className={`w-5 h-5 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                        Próximos Passos
                      </p>
                      <ul className={`text-xs mt-1 space-y-1 ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
                        <li>• Análise técnica personalizada</li>
                        <li>• Visita para levantamento detalhado</li>
                        <li>• Proposta comercial formal</li>
                        <li>• Cronograma de implementação</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    // Generate WhatsApp message
                    const message = `
🏢 *SOLICITAÇÃO DE PROPOSTA - RB HUB*

*Cliente:* ${formData.clientName}
*E-mail:* ${formData.clientEmail}
*Telefone:* ${formData.clientPhone}

*Condomínio:* ${formData.condominiumName}
*Unidades:* ${condominiumUnits}
${formData.condominiumAddress ? `*Endereço:* ${formData.condominiumAddress}` : ''}

*Tipo de Proposta:* ${keepProfessionalSindico ? '✅ Síndico Profissional (mantido)' : '❌ Proposta personalizada (síndico removido)'}

*Serviços Solicitados:*
${selectedServices.map(id => {
  const service = allServices.find(s => s.id === id);
  return service ? `• ${service.name}` : '';
}).filter(Boolean).join('\n')}

*Valor Estimado:* R$ ${totalEstimate.toLocaleString('pt-BR')}

${formData.message ? `*Observações:* ${formData.message}` : ''}

Aguardo retorno para agendamento de visita técnica.
                    `.trim();

                    const whatsappUrl = `https://wa.me/5581993119952?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className={`w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Enviar via WhatsApp</span>
                </button>

                <p className={`text-center text-xs mt-3 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Ao enviar, uma mensagem será montada automaticamente com sua escolha e os serviços selecionados.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    'Tipo de Proposta',
    'Seleção de Serviços', 
    'Seus Dados',
    'Confirmação'
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Catálogo & Orçamento</h2>
              <p className="text-cyan-100">Monte sua proposta de forma simples e objetiva</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center space-x-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index + 1 <= step
                    ? 'bg-white text-cyan-600'
                    : 'bg-white/20 text-white/60'
                }`}>
                  {index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  index + 1 <= step ? 'text-white' : 'text-white/60'
                }`}>
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
                  <ArrowRight className={`w-4 h-4 ${
                    index + 1 < step ? 'text-white' : 'text-white/40'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 border-t p-6 ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Voltar
                </button>
              )}
              
              {selectedServices.length > 0 && (
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-700'
                }`}>
                  {selectedServices.length} serviço{selectedServices.length !== 1 ? 's' : ''} selecionado{selectedServices.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && selectedServices.length === 0}
                className={`px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                }`}
              >
                <span>Continuar</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
