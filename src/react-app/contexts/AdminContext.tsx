import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '@/react-app/hooks/useLocalStorage';
import { allServices as defaultServices } from '@/shared/servicesData';
import type { ServiceType } from '@/shared/types';

interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaSecondaryText: string;
  showVideo: boolean;
  videoUrl: string;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

interface SiteConfig {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  whatsappNumber: string;
  logo: string;
  favicon: string;
  heroConfig: HeroConfig;
  colorScheme: ColorScheme;
  sections: SectionConfig[];
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
}

interface AdminContextType {
  siteConfig: SiteConfig;
  services: ServiceType[];
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  updateService: (serviceId: string, updates: Partial<ServiceType>) => void;
  toggleSection: (sectionId: string) => void;
  resetToDefaults: () => void;
  isSectionEnabled: (sectionId: string) => boolean;
}

const DEFAULT_CONFIG: SiteConfig = {
  companyName: 'RB HUB',
  companyEmail: 'sindico@rbhubsolucoes.com.br',
  companyPhone: '(81) 9311-9952',
  companyAddress: 'R. João Eugênio de Lima, 143 Sala 1, Boa Viagem, Recife/PE',
  whatsappNumber: '5581993119952',
  logo: 'https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png',
  favicon: 'https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png',
  heroConfig: {
    title: 'Bem-vindo ao Futuro dos Condomínios',
    subtitle: 'Tudo que seu condomínio precisa em um só lugar. Síndico profissional certificado + gestão completa + todos os tipos de serviços especializados.',
    backgroundImage: '',
    ctaText: 'Catálogo & Orçamento',
    ctaSecondaryText: 'Contato Rápido',
    showVideo: false,
    videoUrl: ''
  },
  colorScheme: {
    primary: '#06B6D4',
    secondary: '#3B82F6',
    accent: '#8B5CF6'
  },
  socialMedia: {
    facebook: 'https://facebook.com/rbhubsolucoes',
    instagram: 'https://instagram.com/rbhubsolucoes',
    linkedin: 'https://linkedin.com/company/rbhubsolucoes',
    youtube: 'https://youtube.com/@rbhubsolucoes'
  },
  seo: {
    metaTitle: 'RB HUB - Gestão Condominial Completa | Síndico Profissional',
    metaDescription: 'Síndico profissional certificado + gestão completa de condomínios. Manutenção, segurança, tecnologia e sustentabilidade em um só lugar.',
    keywords: 'síndico profissional, gestão condominial, administração de condomínios, manutenção predial, Recife, PE'
  },
  gallery: {
    beforeAfterImages: [
      {
        id: 'gallery-1',
        before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        after: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        title: 'Revitalização de Fachada',
        description: 'Transformação completa da fachada com pintura e iluminação'
      },
      {
        id: 'gallery-2',
        before: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
        after: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        title: 'Área de Lazer',
        description: 'Modernização completa da área de lazer e piscina'
      }
    ]
  },
  testimonials: [
    {
      id: 'test-1',
      name: 'Maria Silva',
      role: 'Síndica',
      company: 'Condomínio Solar das Palmeiras',
      image: 'https://ui-avatars.com/api/?name=Maria+Silva&background=06B6D4&color=fff',
      text: 'A RB HUB transformou a gestão do nosso condomínio. Profissionalismo e transparência em cada detalhe!',
      rating: 5
    },
    {
      id: 'test-2',
      name: 'João Santos',
      role: 'Morador',
      company: 'Residencial Vista Mar',
      image: 'https://ui-avatars.com/api/?name=Joao+Santos&background=3B82F6&color=fff',
      text: 'Excelente serviço! A comunicação melhorou muito e os custos diminuíram.',
      rating: 5
    }
  ],
  sections: [
    { id: 'hero', name: 'Seção Hero', enabled: true, order: 1 },
    { id: 'about', name: 'Sobre a Empresa', enabled: true, order: 2 },
    { id: 'services', name: 'Serviços Principais', enabled: true, order: 3 },
    { id: 'timeline', name: 'Timeline de Processo', enabled: true, order: 4 },
    { id: 'additional-services', name: 'Serviços Complementares', enabled: true, order: 5 },
    { id: 'gallery', name: 'Galeria Antes/Depois', enabled: true, order: 6 },
    { id: 'emergency', name: 'Emergência 24h', enabled: true, order: 7 },
    { id: 'calculator', name: 'Calculadora de Orçamento', enabled: true, order: 8 },
    { id: 'testimonials', name: 'Depoimentos', enabled: true, order: 9 },
    { id: 'comparison', name: 'Comparação Competitiva', enabled: true, order: 10 },
    { id: 'faq', name: 'Perguntas Frequentes', enabled: true, order: 11 },
    { id: 'contact', name: 'Contato', enabled: true, order: 12 }
  ]
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [siteConfig, setSiteConfig] = useLocalStorage<SiteConfig>('rb-hub-site-config', DEFAULT_CONFIG);
  const [services, setServices] = useLocalStorage<ServiceType[]>('rb-hub-services', defaultServices);

  const updateSiteConfig = useCallback((config: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...config }));
  }, [setSiteConfig]);

  const updateService = useCallback((serviceId: string, updates: Partial<ServiceType>) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, ...updates } : service
    ));
  }, [setServices]);

  const toggleSection = useCallback((sectionId: string) => {
    setSiteConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      )
    }));
  }, [setSiteConfig]);

  const resetToDefaults = useCallback(() => {
    setSiteConfig(DEFAULT_CONFIG);
    setServices(defaultServices);
  }, [setSiteConfig, setServices]);

  const isSectionEnabled = useCallback((sectionId: string) => {
    const section = siteConfig.sections.find(s => s.id === sectionId);
    return section?.enabled ?? true;
  }, [siteConfig.sections]);

  return (
    <AdminContext.Provider
      value={{
        siteConfig,
        services,
        updateSiteConfig,
        updateService,
        toggleSection,
        resetToDefaults,
        isSectionEnabled
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
