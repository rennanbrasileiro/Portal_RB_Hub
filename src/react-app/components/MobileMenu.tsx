import { useState, useEffect } from 'react';
import { X, Home, Building2, Calculator, Phone, LogIn, Settings, Menu } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useNavigate } from 'react-router';

interface MobileMenuProps {
  onOpenProposal: () => void;
  onOpenContact: () => void;
}

export default function MobileMenu({ onOpenProposal, onOpenContact }: MobileMenuProps) {
  const { isDark } = useTheme();
  const { isAuthenticated, isMaster } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { 
      icon: Home, 
      label: 'Início', 
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    { 
      icon: Building2, 
      label: 'Sobre', 
      action: () => {
        document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    { 
      icon: Calculator, 
      label: 'Catálogo & Orçamento', 
      action: () => {
        onOpenProposal();
        setIsOpen(false);
      },
      highlight: true
    },
    { 
      icon: Phone, 
      label: 'Contato Rápido', 
      action: () => {
        onOpenContact();
        setIsOpen(false);
      }
    },
  ];

  // Add admin button for master users
  if (isMaster) {
    menuItems.push({
      icon: Settings,
      label: 'Painel Admin',
      action: () => {
        navigate('/admin');
        setIsOpen(false);
      }
    });
  }

  // Add login/portal button if not authenticated
  if (!isAuthenticated) {
    menuItems.push({
      icon: LogIn,
      label: 'Acessar Portal',
      action: () => {
        navigate('/login');
        setIsOpen(false);
      }
    });
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`lg:hidden p-2 rounded-xl transition-all ${
          isDark 
            ? 'hover:bg-slate-700 text-white' 
            : 'hover:bg-gray-100 text-gray-900'
        }`}
        aria-label="Abrir menu"
        data-testid=\"mobile-menu-button\"
      >
        <Menu className=\"w-6 h-6\" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className=\"fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden animate-fade-in\"
          onClick={() => setIsOpen(false)}
          data-testid=\"mobile-menu-overlay\"
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 lg:hidden transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDark 
            ? 'bg-slate-900 border-l border-slate-700' 
            : 'bg-white border-l border-gray-200'
        }`}
        data-testid=\"mobile-menu-panel\"
      >
        <div className=\"flex flex-col h-full\">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className=\"flex items-center space-x-3\">
              <img 
                src=\"https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png\" 
                alt=\"RB HUB\" 
                className=\"h-10 w-auto drop-shadow-lg\"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-xl transition-all ${
                isDark 
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Fechar menu"
            >
              <X className=\"w-6 h-6\" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className=\"flex-1 overflow-y-auto p-4\">
            <div className=\"space-y-2\">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl font-semibold transition-all ${
                      item.highlight
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] shadow-lg'
                        : isDark
                          ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                    data-testid={`mobile-menu-item-${item.label.toLowerCase().replace(/\\s+/g, '-')}`}
                  >
                    <Icon className=\"w-5 h-5 flex-shrink-0\" />
                    <span className=\"text-left\">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className={`p-6 border-t ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className={`text-center text-xs ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}>
              <p className=\"font-semibold mb-1\">RB HUB Soluções</p>
              <p>Gestão Condominial Completa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
