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
  heroTitle: 'Bem-vindo ao Futuro dos Condomínios',
  heroSubtitle: 'Tudo que seu condomínio precisa em um só lugar. Síndico profissional certificado + gestão completa + todos os tipos de serviços especializados.',
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
