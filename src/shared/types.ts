import z from "zod";

// Service Categories
export const ServiceCategory = z.enum([
  'sindico_professional',
  'maintenance_facilities', 
  'security_automation',
  'technology_digital',
  'esg_sustainability',
  'corporate_isolated'
]);

export type ServiceCategoryType = z.infer<typeof ServiceCategory>;

// Individual Service Schema
export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ServiceCategory,
  description: z.string(),
  basePrice: z.number().optional(),
  isPredefined: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  unit: z.enum(['monthly', 'yearly', 'one_time']).default('one_time'),
  tags: z.array(z.string()).default([]),
});

export type ServiceType = z.infer<typeof ServiceSchema>;

// Proposal Schema
export const ProposalSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  clientPhone: z.string(),
  condominiumName: z.string(),
  condominiumUnits: z.number(),
  condominiumAddress: z.string().optional(),
  keepProfessionalSindico: z.boolean().default(true),
  selectedServices: z.array(z.string()),
  totalEstimate: z.number(),
  message: z.string().optional(),
  status: z.enum(['draft', 'sent', 'reviewed', 'approved', 'rejected']).default('draft'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProposalType = z.infer<typeof ProposalSchema>;

// Contact Form Schema
export const ContactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  condominiumName: z.string().min(2, "Nome do condomínio é obrigatório"),
  condominiumUnits: z.number().min(1, "Número de unidades deve ser maior que 0"),
  message: z.string().optional(),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;

// Budget Calculator Schema
export const BudgetCalculatorSchema = z.object({
  units: z.number().min(1).max(1000),
  selectedServices: z.array(z.string()),
  total: z.number(),
  breakdowns: z.array(z.object({
    serviceId: z.string(),
    serviceName: z.string(),
    basePrice: z.number(),
    calculatedPrice: z.number(),
    isRecurring: z.boolean(),
  })),
});

export type BudgetCalculatorType = z.infer<typeof BudgetCalculatorSchema>;
