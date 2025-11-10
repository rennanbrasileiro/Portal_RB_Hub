/**
 * Configurações centralizadas da aplicação
 */

export const config = {
  // URL do Portal (CondoHUB_Portal)
  portalUrl: import.meta.env.VITE_PORTAL_URL || 'http://localhost:3000',
  
  // URL da API (se houver backend)
  apiUrl: import.meta.env.VITE_API_URL || '',
  
  // Modo de desenvolvimento
  isDev: import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV,
  
  // Domínio principal
  domain: 'rbhubsolucoes.com.br',
};

/**
 * Navega para o portal (CondoHUB_Portal) com opções de autenticação
 */
export function navigateToPortal(options?: {
  userId?: string;
  token?: string;
  condominiumId?: string;
}) {
  const url = new URL(config.portalUrl);
  
  // Adicionar parâmetros se fornecidos
  if (options?.userId) {
    url.searchParams.set('userId', options.userId);
  }
  if (options?.token) {
    url.searchParams.set('token', options.token);
  }
  if (options?.condominiumId) {
    url.searchParams.set('condominiumId', options.condominiumId);
  }
  
  window.location.href = url.toString();
}

/**
 * Navega de volta para a landing page
 */
export function navigateToLanding() {
  window.location.href = '/';
}

/**
 * Verifica se está em produção
 */
export function isProduction() {
  return import.meta.env.PROD;
}

/**
 * URLs principais do sistema
 */
export const urls = {
  landing: '/',
  login: '/login',
  admin: '/admin',
  portal: config.portalUrl,
};
