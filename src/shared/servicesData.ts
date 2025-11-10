import { Building2, Wrench, Shield, Wifi, Leaf, Briefcase } from 'lucide-react';
import type { ServiceType, ServiceCategoryType } from '@/shared/types';

export const serviceCategories = {
  sindico_professional: {
    name: 'Síndico Profissional',
    icon: Building2,
    color: 'from-blue-500 to-blue-600',
    description: 'Gestão administrativa e financeira completa'
  },
  maintenance_facilities: {
    name: 'Manutenção & Facilities',
    icon: Wrench,
    color: 'from-orange-500 to-red-500',
    description: 'Serviços de manutenção e zeladoria'
  },
  security_automation: {
    name: 'Segurança & Automação',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    description: 'Sistemas de segurança e controle'
  },
  technology_digital: {
    name: 'Tecnologia & Digital',
    icon: Wifi,
    color: 'from-purple-500 to-indigo-500',
    description: 'Soluções digitais e tecnológicas'
  },
  esg_sustainability: {
    name: 'ESG & Sustentabilidade',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    description: 'Práticas sustentáveis e responsabilidade social'
  },
  corporate_isolated: {
    name: 'Serviços Corporativos',
    icon: Briefcase,
    color: 'from-gray-500 to-slate-600',
    description: 'Consultoria empresarial e soluções isoladas'
  }
};

export const allServices: ServiceType[] = [
  // Predefined Professional Sindico Services
  {
    id: 'gestao_administrativa',
    name: 'Gestão Administrativa e Financeira',
    category: 'sindico_professional',
    description: 'Administração completa dos recursos e operações',
    isPredefined: true,
    isRecurring: true,
    unit: 'monthly',
    basePrice: 2500,
    tags: ['gestão', 'administrativo', 'financeiro']
  },
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
