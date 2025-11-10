import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useToast } from '@/react-app/hooks/useToast';
import { ToastContainer } from '@/react-app/components/ToastNotification';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useAdmin } from '@/react-app/contexts/AdminContext';
import { 
  Building2, 
  Shield, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Paintbrush,
  Wrench,
  Users,
  TrendingUp,
  Award,
  Zap,
  FileCheck,
  MessageSquare,
  Camera,
  Lightbulb,
  Hammer,
  TreePine,
  Droplets,
  Wifi,
  Car,
  Star,
  AlertTriangle,
  FileText,
  Settings,
  LogIn
} from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import ThemeToggle from '@/react-app/components/ThemeToggle';
import ProcessTimeline from '@/react-app/components/ProcessTimeline';
import BeforeAfterGallery from '@/react-app/components/BeforeAfterGallery';
import InteractiveFAQ from '@/react-app/components/InteractiveFAQ';
import BudgetCalculator from '@/react-app/components/BudgetCalculator';
import FloatingActions from '@/react-app/components/FloatingActions';
import CompetitiveComparison from '@/react-app/components/CompetitiveComparison';
import AdvancedProposalSystem from '@/react-app/components/AdvancedProposalSystem';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [showAdvancedProposal, setShowAdvancedProposal] = useState(false);
  const { isDark } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, isMaster } = useAuth();
  const { siteConfig, isSectionEnabled } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleOpenAdvancedProposal = () => {
      setShowAdvancedProposal(true);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('openAdvancedProposal', handleOpenAdvancedProposal);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('openAdvancedProposal', handleOpenAdvancedProposal);
    };
  }, []);

  const mainServices = [
    { 
      icon: Building2, 
      title: 'Síndico Profissional', 
      desc: 'Gestão condominial completa e certificada com transparência total',
      features: ['Certificação IBAPE', 'Gestão financeira', 'Relatórios mensais', 'Suporte jurídico']
    },
    { 
      icon: Wrench, 
      title: 'Manutenções Completas', 
      desc: 'Preventiva e corretiva com equipe especializada',
      features: ['Hidráulica', 'Elétrica', 'Ar-condicionado', 'Elevadores']
    },
    { 
      icon: Paintbrush, 
      title: 'Pintura Profissional', 
      desc: 'Acabamento premium com materiais de qualidade',
      features: ['Fachadas', 'Áreas comuns', 'Apartamentos', 'Proteção anticorrosiva']
    },
    { 
      icon: Users, 
      title: 'Zeladoria Qualificada', 
      desc: 'Equipe treinada e uniformizada',
      features: ['24h disponível', 'Limpeza especializada', 'Portaria', 'Jardinagem']
    },
    { 
      icon: Shield, 
      title: 'Segurança Integrada', 
      desc: 'CFTV, controle de acesso e monitoramento',
      features: ['Câmeras HD', 'Interfones', 'Controle biométrico', 'Alarmes']
    },
    { 
      icon: Briefcase, 
      title: 'Mão de Obra Especializada', 
      desc: 'Profissionais certificados para todos os serviços',
      features: ['Pedreiros', 'Eletricistas', 'Encanadores', 'Jardineiros']
    },
  ];

  const additionalServices = [
    { icon: Camera, title: 'Monitoramento 24h', desc: 'Sistema completo de segurança' },
    { icon: Lightbulb, title: 'Iluminação LED', desc: 'Modernização e economia' },
    { icon: Hammer, title: 'Reformas Gerais', desc: 'Projetos sob medida' },
    { icon: TreePine, title: 'Paisagismo', desc: 'Jardins e áreas verdes' },
    { icon: Droplets, title: 'Tratamento de Água', desc: 'Piscinas e reservatórios' },
    { icon: Wifi, title: 'Automação Predial', desc: 'Smart building solutions' },
    { icon: Car, title: 'Gestão de Garagem', desc: 'Controle e organização' },
    { icon: Building2, title: 'Administração Predial', desc: 'Gestão completa do edifício' },
  ];

  const benefits = [
    { icon: CheckCircle2, text: 'Conformidade Legal Total', desc: 'Sempre em dia com legislação' },
    { icon: Clock, text: 'Suporte 24/7', desc: 'Disponibilidade completa' },
    { icon: TrendingUp, text: 'Valorização do Patrimônio', desc: 'Aumento do valor imobiliário' },
    { icon: Award, text: 'Certificação Profissional', desc: 'IBAPE e outras certificações' },
    { icon: Zap, text: 'Processos Ágeis', desc: 'Eficiência em todas as operações' },
    { icon: FileCheck, text: 'Gestão Transparente', desc: 'Relatórios detalhados mensais' },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      building: "Edifício Solar",
      text: "A RB HUB transformou a gestão do nosso condomínio. Transparência total e resultados excepcionais!",
      rating: 5
    },
    {
      name: "João Santos",
      building: "Residencial Gardens",
      text: "Profissionalismo exemplar. Nosso condomínio nunca esteve tão bem administrado.",
      rating: 5
    },
    {
      name: "Ana Costa",
      building: "Edifício Premium",
      text: "Hub completo de soluções. Tudo que precisamos em um só lugar com qualidade superior.",
      rating: 5
    }
  ];

  const stats = [
    { number: "150+", label: "Condomínios Atendidos" },
    { number: "98%", label: "Satisfação dos Clientes" },
    { number: "24h", label: "Suporte Disponível" },
    { number: "5+", label: "Anos de Experiência" },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-cyan-50'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? isDark 
            ? 'glass-effect shadow-2xl' 
            : 'glass-effect-light shadow-xl border-b border-gray-200/50'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img 
                src="https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png" 
                alt="RB HUB" 
                className="h-12 w-auto drop-shadow-2xl"
              />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>RB HUB</h1>
                <p className={`text-xs font-medium ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>Soluções Integradas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAdvancedProposal(true)}
                  className={`hidden sm:block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                  data-testid="catalog-button"
                >
                  Catálogo & Orçamento
                </button>
                <button
                  onClick={() => setShowProposalForm(true)}
                  className={`hidden md:block px-4 py-3 rounded-full font-semibold transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  data-testid="quick-contact-button"
                >
                  Contato Rápido
                </button>
                {isMaster && (
                  <button
                    onClick={() => navigate('/admin')}
                    className={`px-4 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      isDark 
                        ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' 
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                    data-testid="admin-button"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden lg:inline">Admin</span>
                  </button>
                )}
                {!isAuthenticated && (
                  <button
                    onClick={() => navigate('/login')}
                    className={`px-4 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      isDark 
                        ? 'bg-slate-700 text-white hover:bg-slate-600' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    data-testid="login-button"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">Portal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_50%)]' 
            : 'bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.05),transparent_50%)]'
        }`}></div>
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]' 
            : 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)]'
        }`}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 animate-fade-in">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
              isDark ? 'glass-effect' : 'glass-effect-light'
            }`}>
              <Sparkles className="w-5 h-5 text-cyan-500" />
              <span className={`font-medium ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>Portal de Boas-Vindas</span>
            </div>
            
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Bem-vindo ao
              <span className="text-gradient from-cyan-500 via-blue-600 to-purple-600 block mt-2">
                Futuro dos Condomínios
              </span>
            </h1>
            
            <p className={`text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed font-manrope ${
              isDark ? 'text-slate-300' : 'text-gray-600'
            }`}>
              <strong>Tudo que seu condomínio precisa em um só lugar.</strong> Síndico profissional certificado + gestão completa + todos os tipos de serviços especializados para manter seu patrimônio sempre valorizado.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setShowAdvancedProposal(true)}
                  className={`group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                >
                  <span>Catálogo & Orçamento</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setShowProposalForm(true)}
                  className={`px-6 py-4 font-semibold rounded-full transition-all duration-300 ${
                    isDark 
                      ? 'glass-effect text-white hover:bg-white/20' 
                      : 'glass-effect-light text-gray-700 hover:bg-black/10'
                  }`}
                >
                  Contato Direto
                </button>
              </div>
              <a
                href="#sobre"
                className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'glass-effect text-white hover:bg-white/20' 
                    : 'glass-effect-light text-gray-700 hover:bg-black/10'
                }`}
              >
                Conhecer a Empresa
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 group ${
                  isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
                }`}
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  {stat.number}
                </div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 group ${
                  isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
                }`}
              >
                <benefit.icon className={`w-8 h-8 mb-3 group-hover:scale-110 transition-transform ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
                <p className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {benefit.text}
                </p>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {isSectionEnabled('about') && (
      <section id="sobre" className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-slate-900/50' : 'bg-gray-100/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Sobre a <span className="text-gradient from-cyan-500 to-blue-600">RB HUB</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Transformando complexidade em eficiência através de gestão profissional e soluções integradas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={`p-8 rounded-3xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Nossa Missão</h3>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Ser referência em gestão inteligente, ética e eficiente como síndico profissional, 
                  criando ambientes organizados, seguros e valorizados por meio de inovação, tecnologia 
                  e comunicação clara.
                </p>
              </div>

              <div className={`p-8 rounded-3xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Nossa Visão</h3>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Ser reconhecido como o parceiro estratégico mais completo e flexível em gestão 
                  condominial, impulsionando o sucesso e a valorização dos patrimônios através de um 
                  hub integrado de soluções.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-8 rounded-3xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Nossos Valores</h3>
                <div className="space-y-4">
                  {['Excelência', 'Ética e Transparência', 'Flexibilidade', 'Inovação', 'Resultados'].map((value, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                      <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-8 rounded-3xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
                <div className="flex items-center space-x-4 mb-4">
                  <Award className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <div>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Fundador</p>
                    <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Rennan Brasileiro Moura Cordeiro</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <div>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Localização</p>
                    <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Recife - PE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Main Services Section */}
      {isSectionEnabled('services') && (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Serviços <span className="text-gradient from-cyan-500 to-blue-600">Principais</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Hub completo de soluções para todas as necessidades do seu condomínio
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl transition-all duration-300 group hover:scale-105 ${
                  isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 transition-all ${
                  isDark ? 'group-hover:shadow-glow' : 'group-hover:shadow-glow-light'
                }`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Process Timeline */}
      {isSectionEnabled('timeline') && <ProcessTimeline />}

      {/* Additional Services */}
      {isSectionEnabled('additional-services') && (
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Serviços <span className="text-gradient from-cyan-500 to-blue-600">Complementares</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 group hover:scale-105 ${
                  isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
                }`}
              >
                <service.icon className={`w-8 h-8 mb-4 transition-transform group-hover:scale-110 ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Before/After Gallery */}
      {isSectionEnabled('gallery') && <BeforeAfterGallery />}

      {/* Emergency Services Section */}
      {isSectionEnabled('emergency') && (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDZjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Emergência 24h
            </h2>
            <Clock className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-xl text-white/90 mb-8 font-manrope max-w-3xl mx-auto">
            Situações urgentes não esperam! Nossa equipe está sempre pronta para atender emergências do seu condomínio
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Droplets, title: 'Vazamentos', desc: 'Hidráulicos urgentes' },
              { icon: Zap, title: 'Elétrica', desc: 'Falta de energia' },
              { icon: Shield, title: 'Segurança', desc: 'Problemas de acesso' }
            ].map((emergency, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
                <emergency.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{emergency.title}</h3>
                <p className="text-white/80">{emergency.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5581993119952?text=🚨%20EMERGÊNCIA%20-%20Preciso%20de%20atendimento%20urgente!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-red-600 font-bold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-6 h-6" />
              <span>WhatsApp Emergência</span>
            </a>
            <a
              href="tel:+5581993119952"
              className="px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              <Phone className="w-6 h-6" />
              <span>Ligar Agora</span>
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Budget Calculator */}
      {isSectionEnabled('calculator') && (
      <div id="calculator">
        <BudgetCalculator />
      </div>
      )}

      {/* Testimonials */}
      {isSectionEnabled('testimonials') && (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              O que dizem nossos <span className="text-gradient from-cyan-500 to-blue-600">Clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl transition-all duration-300 ${
                  isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`mb-6 italic ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  "{testimonial.text}"
                </p>
                <div>
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                    {testimonial.building}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Competitive Comparison */}
      {isSectionEnabled('comparison') && <CompetitiveComparison />}

      {/* Interactive FAQ */}
      {isSectionEnabled('faq') && <InteractiveFAQ />}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDZjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Pronto para Transformar seu Condomínio?
          </h2>
          <p className="text-xl text-white/90 mb-8 font-manrope">
            Entre em contato e descubra como podemos elevar o padrão de gestão com transparência e resultados comprovados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowAdvancedProposal(true)}
                className="px-10 py-5 bg-white text-cyan-600 font-bold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg flex items-center justify-center space-x-2"
              >
                <FileText className="w-6 h-6" />
                <span>Catálogo Completo</span>
              </button>
              <button
                onClick={() => setShowProposalForm(true)}
                className="px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-cyan-600 transition-all duration-300 text-lg"
              >
                Contato Rápido
              </button>
            </div>
            <a
              href="https://wa.me/5581993119952"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-cyan-600 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Direto</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {isSectionEnabled('contact') && (
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Entre em <span className="text-gradient from-cyan-500 to-blue-600">Contato</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto font-manrope ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              Estamos prontos para atender você e transformar a gestão do seu condomínio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="tel:+5581993119952"
              className={`p-8 rounded-3xl transition-all duration-300 group text-center ${
                isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 mx-auto transition-all ${
                isDark ? 'group-hover:shadow-glow' : 'group-hover:shadow-glow-light'
              }`}>
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Telefone</h3>
              <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>(81) 9311-9952</p>
              <p className={`text-sm mt-1 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>Clique para ligar</p>
            </a>

            <a
              href="mailto:sindico@rbhubsolucoes.com.br"
              className={`p-8 rounded-3xl transition-all duration-300 group text-center ${
                isDark ? 'glass-effect hover:bg-white/20' : 'glass-effect-light hover:bg-black/10'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 mx-auto transition-all ${
                isDark ? 'group-hover:shadow-glow' : 'group-hover:shadow-glow-light'
              }`}>
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>E-mail</h3>
              <p className={`break-all ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>sindico@rbhubsolucoes.com.br</p>
              <p className={`text-sm mt-1 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>Clique para enviar</p>
            </a>

            <div className={`p-8 rounded-3xl text-center ${
              isDark ? 'glass-effect' : 'glass-effect-light'
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Endereço</h3>
              <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                R. João Eugênio de Lima, 143 Sala 1<br />Boa Viagem, Recife/PE
              </p>
              <p className={`text-sm mt-1 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>CEP: 51021-070</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img 
                src="https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png" 
                alt="RB HUB" 
                className="h-10 w-auto"
              />
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  RB HUB Soluções Integradas LTDA
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  CNPJ: 62.526.708/0001-38
                </p>
              </div>
            </div>
            <div className={`text-sm text-center md:text-right ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              <p>© 2025 RB HUB. Todos os direitos reservados.</p>
              <p className="mt-1">Desenvolvido com 💙 para transformar condomínios</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Proposal Form Modal */}
      {showProposalForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-700 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Solicitar Proposta</h3>
                <button
                  onClick={() => setShowProposalForm(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <form className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome"
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
                    placeholder="seu@email.com"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="(81) 99999-9999"
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
                    placeholder="Condomínio Edifício..."
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
                  Serviços de Interesse
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Síndico Profissional', 'Manutenções', 'Pintura', 'Zeladoria', 'Segurança', 'Outros'].map((service) => (
                    <label key={service} className="flex items-center space-x-2">
                      <input type="checkbox" className="text-cyan-500 focus:ring-cyan-500 rounded" />
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  placeholder="Descreva as necessidades do seu condomínio, número de unidades, localização..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
                  isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Enviar Solicitação</span>
              </button>

              <div className="text-center">
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Ou entre em contato direto via WhatsApp
                </p>
                <a
                  href="https://wa.me/5581993119952"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 transition-colors mt-2 font-semibold ${
                    isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>(81) 9311-9952</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advanced Proposal System */}
      {showAdvancedProposal && (
        <AdvancedProposalSystem onClose={() => setShowAdvancedProposal(false)} />
      )}

      {/* Floating Actions */}
      <FloatingActions onOpenProposal={() => setShowAdvancedProposal(true)} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}
