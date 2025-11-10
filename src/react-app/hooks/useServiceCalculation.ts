import { useMemo } from 'react';
import type { ServiceType } from '@/shared/types';

/**
 * Hook compartilhado para cálculo unificado de valores de serviços
 * Garante consistência entre Catálogo & Orçamento e Calculadora
 */
export function useServiceCalculation(
  services: ServiceType[],
  selectedServiceIds: string[],
  condominiumUnits: number
) {
  const calculations = useMemo(() => {
    let total = 0;
    const breakdowns: Array<{
      serviceId: string;
      serviceName: string;
      basePrice: number;
      calculatedPrice: number;
      isRecurring: boolean;
      unit: string;
    }> = [];

    selectedServiceIds.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (!service || !service.basePrice) return;

      let calculatedPrice = service.basePrice;
      
      // Aplicar multiplicadores baseados no tipo de serviço e número de unidades
      if (service.isRecurring && service.unit === 'monthly') {
        // Serviços que escalam significativamente com unidades
        if (['gestao_administrativa', 'sindico', 'zeladoria', 'portaria'].includes(serviceId)) {
          calculatedPrice += condominiumUnits * 25;
        }
        // Serviços de manutenção e limpeza
        else if (['limpeza_conservacao', 'manutencao_preventiva', 'manutencao'].includes(serviceId)) {
          calculatedPrice += condominiumUnits * 15;
        }
        // Serviços de segurança e tecnologia
        else if (['cftv_monitoramento', 'controle_acesso', 'seguranca'].includes(serviceId)) {
          calculatedPrice += condominiumUnits * 30;
        }
        // Outros serviços mensais com escala menor
        else if (
          ['jardinagem', 'dedetizacao', 'gestao_residuos', 'manutencao_eletrica', 
           'manutencao_hidraulica', 'climatizacao', 'combate_incendio'].includes(serviceId)
        ) {
          calculatedPrice += condominiumUnits * 5;
        }
      }
      // Serviços únicos que escalam com área/unidades
      else if (!service.isRecurring || service.unit === 'one_time') {
        if (['pintura', 'pintura_reparos', 'impermeabilizacao'].includes(serviceId)) {
          calculatedPrice += condominiumUnits * 150;
        } else if (['obras_reformas', 'pequenas_reformas'].includes(serviceId)) {
          calculatedPrice += condominiumUnits * 100;
        } else if (['projetos_adequacao', 'sinalizacao'].includes(serviceId)) {
          calculatedPrice += condominiumUnits * 50;
        }
      }

      breakdowns.push({
        serviceId: service.id,
        serviceName: service.name,
        basePrice: service.basePrice,
        calculatedPrice,
        isRecurring: service.isRecurring || false,
        unit: service.unit || 'one_time'
      });

      total += calculatedPrice;
    });

    return { total, breakdowns };
  }, [services, selectedServiceIds, condominiumUnits]);

  return calculations;
}

/**
 * Função auxiliar para calcular preço individual de um serviço
 */
export function calculateServicePrice(
  service: ServiceType,
  condominiumUnits: number
): number {
  if (!service.basePrice) return 0;
  
  let price = service.basePrice;
  
  // Aplicar a mesma lógica do hook
  if (service.isRecurring && service.unit === 'monthly') {
    if (['gestao_administrativa', 'sindico', 'zeladoria', 'portaria'].includes(service.id)) {
      price += condominiumUnits * 25;
    } else if (['limpeza_conservacao', 'manutencao_preventiva', 'manutencao'].includes(service.id)) {
      price += condominiumUnits * 15;
    } else if (['cftv_monitoramento', 'controle_acesso', 'seguranca'].includes(service.id)) {
      price += condominiumUnits * 30;
    } else if (
      ['jardinagem', 'dedetizacao', 'gestao_residuos', 'manutencao_eletrica',
       'manutencao_hidraulica', 'climatizacao', 'combate_incendio'].includes(service.id)
    ) {
      price += condominiumUnits * 5;
    }
  } else if (!service.isRecurring || service.unit === 'one_time') {
    if (['pintura', 'pintura_reparos', 'impermeabilizacao'].includes(service.id)) {
      price += condominiumUnits * 150;
    } else if (['obras_reformas', 'pequenas_reformas'].includes(service.id)) {
      price += condominiumUnits * 100;
    } else if (['projetos_adequacao', 'sinalizacao'].includes(service.id)) {
      price += condominiumUnits * 50;
    }
  }
  
  return price;
}
