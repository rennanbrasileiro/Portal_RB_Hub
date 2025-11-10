# 🏢 Portal RB HUB - Gestão Condominial Completa

Landing page institucional, catálogo de serviços, sistema de orçamentos e portal de acesso da RB HUB.

## 🌟 Funcionalidades

### ✅ Landing Page Institucional
- Hero section responsiva
- Seções configuráveis via admin
- Dark mode / Light mode
- Design moderno e profissional

### 📊 Sistema de Orçamentos
- Catálogo completo de 60+ serviços
- Calculadora inteligente
- Sugestões baseadas em perfil
- ROI Calculator
- Timeline de implementação
- Comparador de propostas
- Histórico de propostas com auto-save

### 🔐 Sistema de Autenticação
- Login integrado com CondoHUB_Portal
- Proteção de rotas
- Gerenciamento de sessão
- Credenciais:
  - **Master**: admin@rbhub.com.br / rbhub@2025
  - **Demo**: demo@rbhub.com.br / demo123

### ⚙️ Painel Administrativo (CMS)
- **100% Parametrizável** - sem necessidade de alterar código
- Gerenciar 12 seções do site (ativar/desativar)
- Editar 60+ serviços (nome, descrição, preços)
- Configurações gerais (contatos, textos, WhatsApp)
- Persistência automática no localStorage

### 📱 Mobile First
- Menu hambúrguer profissional
- Layout totalmente responsivo
- Touch-friendly
- Otimizado para todos os dispositivos

## 🚀 Tecnologias

- **React 19** + TypeScript
- **Vite** 7.2 (build tool)
- **Tailwind CSS** (styling)
- **React Router** v7 (routing)
- **Lucide Icons** (ícones)
- **Context API** (state management)
- **Zod** (validação)

## 📦 Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Iniciar servidor de desenvolvimento
yarn dev

# Acesse: http://localhost:5173
```

### Build para Produção

```bash
# Gerar build otimizado
yarn build

# Preview do build
yarn preview
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# URL do Portal CondoHUB (área logada)
VITE_PORTAL_URL=http://localhost:3000

# Em produção:
# VITE_PORTAL_URL=https://rbhubsolucoes.com.br/portal
```

## 🔗 Integração com CondoHUB_Portal

Este projeto se integra com o **CondoHUB_Portal** (área logada). 

- **Portal_RB_Hub** (este projeto): Landing page + Catálogo + Login
- **CondoHUB_Portal**: Dashboard logado + Gestão de condomínio

Ver documentação completa: [INTEGRACAO.md](./INTEGRACAO.md)

## 📱 Estrutura do Projeto

```
/app
├── src/
│   ├── react-app/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Landing page
│   │   │   ├── Login.tsx         # Página de login
│   │   │   └── AdminPanel.tsx    # CMS administrativo
│   │   ├── components/
│   │   │   ├── MobileMenu.tsx    # Menu hambúrguer
│   │   │   ├── ToastNotification.tsx
│   │   │   ├── AdvancedProposalSystem.tsx
│   │   │   ├── SmartSuggestions.tsx
│   │   │   ├── ROICalculator.tsx
│   │   │   └── ... (outros)
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx   # Autenticação
│   │   │   ├── AdminContext.tsx  # Configurações CMS
│   │   │   ├── ProposalContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   └── hooks/
│   │       ├── useToast.ts
│   │       └── useLocalStorage.ts
│   └── shared/
│       ├── config.ts             # Configurações globais
│       ├── servicesData.ts       # Catálogo de serviços
│       └── types.ts              # TypeScript types
├── .env                          # Variáveis de ambiente
└── package.json
```

## 🎯 Rotas

```
/               → Landing page
/login          → Página de login
/admin          → Painel administrativo (requer auth master)
```

## 👨‍💻 Uso do Painel Admin

1. **Login como Master**:
   - Email: admin@rbhub.com.br
   - Senha: rbhub@2025

2. **Acessar Admin**:
   - Clique no botão "Admin" no header
   - Ou acesse: `/admin`

3. **Gerenciar Conteúdo**:
   - **Aba 1 - Configurações Gerais**: Editar textos, contatos, WhatsApp
   - **Aba 2 - Seções do Site**: Ativar/desativar seções com um clique
   - **Aba 3 - Serviços e Preços**: Editar todos os serviços

4. **Salvar**:
   - Alterações são salvas automaticamente ou ao clicar em "Salvar"
   - Dados persistem no localStorage

## 🎨 Personalização

### Ativar/Desativar Seções

No painel admin, você pode controlar quais seções aparecem no site:
- Hero
- Sobre
- Serviços
- Timeline
- Galeria
- Emergência 24h
- Calculadora
- Depoimentos
- FAQ
- Contato

### Editar Preços

Todos os 60+ serviços podem ter seus preços editados no admin:
1. Acesse **Admin** > **Serviços e Preços**
2. Clique no ícone de edição
3. Altere nome, descrição ou preço
4. Mudanças refletem imediatamente

## 🔐 Credenciais de Teste

### Usuário Master (Admin)
- **Email**: admin@rbhub.com.br
- **Senha**: rbhub@2025
- **Acesso**: Painel administrativo completo

### Usuário Demo (Cliente)
- **Email**: demo@rbhub.com.br
- **Senha**: demo123
- **Acesso**: Portal do cliente

## 🌐 Deploy

### Domínio
- **Produção**: rbhubsolucoes.com.br
- **Staging**: (configurar se necessário)

### Estrutura de URLs
```
rbhubsolucoes.com.br/        → Este projeto (landing)
rbhubsolucoes.com.br/portal  → CondoHUB_Portal (área logada)
```

## 📝 Licença

© 2025 RB HUB Soluções. Todos os direitos reservados.

## 🆘 Suporte

- **Email**: sindico@rbhubsolucoes.com.br
- **WhatsApp**: (81) 9311-9952
- **Endereço**: R. João Eugênio de Lima, 143 Sala 1, Boa Viagem, Recife/PE
