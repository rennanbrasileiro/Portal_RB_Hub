import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isMaster: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isMaster: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    const storedUser = localStorage.getItem('rbhub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('rbhub_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Credenciais master hardcoded (em produção, isso viria de um backend seguro)
    if (email === 'admin@rbhub.com.br' && password === 'rbhub2025') {
      const masterUser: User = {
        id: 'master-1',
        name: 'Administrador RB HUB',
        email: email,
        isMaster: true
      };
      setUser(masterUser);
      localStorage.setItem('rbhub_user', JSON.stringify(masterUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rbhub_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isMaster: user?.isMaster || false,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
