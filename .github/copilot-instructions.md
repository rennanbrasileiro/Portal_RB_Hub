# AI Agent Instructions for Portal RB HUB

## Project Overview
This is a React/TypeScript project for RB HUB's landing page, service catalog, and proposal system. It integrates with a separate portal (CondoHUB_Portal) for authenticated access.

## Key Architecture Points

### Project Structure
- `/src/react-app/` - Main React application
  - `pages/` - Route components (Home, Login, AdminPanel)
  - `components/` - Reusable UI components
  - `contexts/` - React Context providers
  - `hooks/` - Custom React hooks
- `/src/shared/` - Cross-cutting concerns, types, and configuration
- `/src/worker/` - Web worker related code

### Critical Design Patterns
1. **Context-Based State Management**
   ```typescript
   // Use AuthContext for authentication state
   const { user, login } = useAuth();
   // Use AdminContext for CMS configuration
   const { settings, updateSettings } = useAdmin();
   ```

2. **Local Storage Persistence**
   - User settings and authentication persist in localStorage
   - See `useLocalStorage` hook for implementation pattern

3. **Mobile-First Responsive Design**
   - All components must handle mobile views
   - Use Tailwind's responsive classes consistently

## Development Workflow

### Setup
```bash
yarn install
cp .env.example .env  # Configure VITE_PORTAL_URL
yarn dev             # Starts at http://localhost:5173
```

### Key Commands
- `yarn dev` - Development server
- `yarn build` - Production build
- `yarn preview` - Preview production build

### Environment Variables
- `VITE_PORTAL_URL` - URL of CondoHUB_Portal (required)
  - Dev: `http://localhost:3000`
  - Prod: `https://rbhubsolucoes.com.br/portal`

## Integration Points

### CondoHUB_Portal Integration
1. Authentication flow:
   - Login occurs in this project
   - Redirects to CondoHUB_Portal with user data
   - Data shared via localStorage or URL parameters

2. Navigation pattern:
   ```typescript
   import { navigateToPortal } from 'src/shared/config';
   
   // After successful login:
   navigateToPortal({ 
     userId: user.id,
     condominiumId: selected.id 
   });
   ```

## Common Patterns

### Component Organization
- Business logic in contexts
- UI components in components/
- Pages combine multiple components
- Shared types in types.ts

### State Management
- Use contexts for global state
- Use hooks for reusable logic
- Prefer local state for UI-only concerns

### Error Handling
- Toast notifications via `useToast` hook
- Consistent error boundaries in page components
- Form validation using Zod

## Testing & Quality

### Manual Testing Credentials
- Admin: admin@rbhub.com.br / rbhub@2025
- Demo: demo@rbhub.com.br / demo123

### Key Test Cases
1. Authentication flow
2. Admin panel CMS operations
3. Mobile responsiveness
4. Integration with CondoHUB_Portal

## Security Considerations
- Authentication state in AuthContext
- Protected routes require valid session
- CMS access restricted to admin role
- Sanitize user input in forms