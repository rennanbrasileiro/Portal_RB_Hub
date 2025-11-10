import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ServiceType } from '@/shared/types';

interface SiteConfig {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  whatsappNumber: string;
  heroConfig: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaSecondaryText: string;
    backgroundImage: string;
  };
  sections: Array<{
    id: string;
    name: string;
    enabled: boolean;
  }>;
  gallery: {
    beforeAfterImages: Array<{
      id: string;
      before: string;
      after: string;
      title: string;
      description: string;
    }>;
  };
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    text: string;
    rating: number;
  }>;
  faq: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
  }>;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

interface AdminContextType {
  siteConfig: SiteConfig;
  services: ServiceType[];
  updateSiteConfig: (config: SiteConfig) => void;
  updateService: (serviceId: string, updates: Partial<ServiceType>) => void;
  toggleSection: (sectionId: string) => void;
  resetToDefaults: () => void;
  isSectionEnabled: (sectionId: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultConfig: SiteConfig = {
  companyName: 'RB HUB Soluções Integradas',
  companyEmail: 'sindico@rbhubsolucoes.com.br',
  companyPhone: '(81) 9311-9952',
  companyAddress: 'R. João Eugênio de Lima, 143 Sala 1, Boa Viagem, Recife/PE - CEP: 51021-070',
  whatsappNumber: '5581993119952',
  heroConfig: {
    title: 'Bem-vindo ao Futuro dos Condomínios',
    subtitle: 'Tudo que seu condomínio precisa em um só lugar. Síndico profissional certificado + gestão completa + todos os tipos de serviços especializados.',
    ctaText: 'Catálogo & Orçamento',
    ctaSecondaryText: 'Contato Direto',
    backgroundImage: ''
  },
  sections: [
    { id: 'hero', name: 'Hero Section', enabled: true },
    { id: 'about', name: 'Sobre Nós', enabled: true },
    { id: 'services', name: 'Serviços', enabled: true },
    { id: 'process', name: 'Processo/Timeline', enabled: true },
    { id: 'gallery', name: 'Galeria Antes/Depois', enabled: true },
    { id: 'emergency', name: 'Emergência 24h', enabled: true },
    { id: 'calculator', name: 'Calculadora', enabled: true },
    { id: 'testimonials', name: 'Depoimentos', enabled: true },
    { id: 'comparison', name: 'Comparativo', enabled: true },
    { id: 'faq', name: 'FAQ', enabled: true },
    { id: 'contact', name: 'Contato', enabled: true }
  ],
  gallery: {
    beforeAfterImages: [
      {
        id: 'gallery-1',
        before: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
        after: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        title: 'Fachada Revitalizada',
        description: 'Pintura completa e modernização'
      },
      {
        id: 'gallery-2',
        before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        title: 'Área de Lazer',
        description: 'Reforma e paisagismo'
      }
    ]
  },
  testimonials: [
    {
      id: 'test-1',
      name: 'Maria Silva',
      role: 'Síndica',
      company: 'Edifício Solar',
      image: 'https://ui-avatars.com/api/?name=Maria+Silva&background=06B6D4&color=fff',
      text: 'A RB HUB transformou a gestão do nosso condomínio. Transparência total e resultados excepcionais!',
      rating: 5
    },
    {
      id: 'test-2',
      name: 'João Santos',
      role: 'Síndico',
      company: 'Residencial Gardens',
      image: 'https://ui-avatars.com/api/?name=Joao+Santos&background=06B6D4&color=fff',
      text: 'Profissionalismo exemplar. Nosso condomínio nunca esteve tão bem administrado.',
      rating: 5
    }
  ],
  faq: [
    {
      id: 'faq-1',
      question: 'Como funciona o serviço de síndico profissional?',
      answer: 'Nosso síndico profissional certificado cuida de toda gestão administrativa e financeira do seu condomínio, com relatórios mensais e total transparência.',
      category: 'Serviços',
      order: 1
    },
    {
      id: 'faq-2',
      question: 'Quais serviços estão inclusos no pacote básico?',
      answer: 'O pacote básico inclui gestão administrativa, prestação de contas, controle de inadimplência, organização de assembleias e representação legal.',
      category: 'Serviços',
      order: 2
    }
  ],
  socialMedia: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  },
  seo: {
    metaTitle: 'RB HUB - Soluções Integradas para Condomínios | Síndico Profissional',
    metaDescription: 'Gestão condominial completa com síndico profissional certificado. Todos os serviços que seu condomínio precisa em um só lugar.',
    keywords: 'síndico profissional, gestão condominial, manutenção predial, condomínio, administração'
  }
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultConfig);
  const [services, setServices] = useState<ServiceType[]>([]);

  // Carregar configurações do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('rbhub_site_config');
    if (stored) {
      try {
        setSiteConfig(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }, []);

  // Salvar configurações no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('rbhub_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  const updateSiteConfig = (config: SiteConfig) => {
    setSiteConfig(config);
  };

  const updateService = (serviceId: string, updates: Partial<ServiceType>) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId ? { ...service, ...updates } : service
      )
    );
  };

  const toggleSection = (sectionId: string) => {
    setSiteConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      )
    }));
  };

  const resetToDefaults = () => {
    setSiteConfig(defaultConfig);
    localStorage.removeItem('rbhub_site_config');
  };

  const isSectionEnabled = (sectionId: string) => {
    const section = siteConfig.sections.find(s => s.id === sectionId);
    return section?.enabled ?? true;
  };

  const value = {
    siteConfig,
    services,
    updateSiteConfig,
    updateService,
    toggleSection,
    resetToDefaults,
    isSectionEnabled
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
