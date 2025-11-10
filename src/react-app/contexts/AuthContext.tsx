import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/react-app/hooks/useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'master' | 'admin' | 'user';
  condominiumId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isMaster: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários padrão (em produção, isso viria de um backend)
const DEFAULT_USERS = [
  {
    id: 'master-1',
    name: 'Rennan Brasileiro',
    email: 'admin@rbhub.com.br',
    password: 'rbhub@2025',
    role: 'master' as const
  },
  {
    id: 'demo-1',
    name: 'Cliente Demo',
    email: 'demo@rbhub.com.br',
    password: 'demo123',
    role: 'user' as const,
    condominiumId: 'condo-demo'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('rb-hub-user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = DEFAULT_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isMaster = user?.role === 'master';
  const isAdmin = user?.role === 'master' || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isMaster,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
