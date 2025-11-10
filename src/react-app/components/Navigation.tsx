import { useState } from 'react';
import { Menu, X, LogIn, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useAuth } from '@/react-app/contexts/AuthContext';
import ThemeToggle from '@/react-app/components/ThemeToggle';

interface NavigationProps {
  scrolled: boolean;
  onOpenProposal: () => void;
  onOpenContact: () => void;
}

export default function Navigation({ scrolled, onOpenProposal, onOpenContact }: NavigationProps) {
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Sobre', id: 'sobre' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Calculadora', id: 'calculator' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? isDark 
          ? 'glass-effect shadow-2xl' 
          : 'glass-effect-light shadow-xl border-b border-gray-200/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('top')}>
            <img 
              src="https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png" 
              alt="RB HUB" 
              className="h-10 w-auto drop-shadow-2xl transition-transform hover:scale-105"
            />
            <div>
              <h1 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>RB HUB</h1>
              <p className={`text-xs font-medium ${
                isDark ? 'text-cyan-300' : 'text-cyan-600'
              }`}>Soluções Integradas</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={onOpenContact}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              Contato
            </button>
            <button
              onClick={onOpenProposal}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Catálogo & Orçamento
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                isDark ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-black/5'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-left transition-all ${
                    isDark 
                      ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-left transition-all ${
                  isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                Contato Rápido
              </button>
              <button
                onClick={() => {
                  onOpenProposal();
                  setMobileMenuOpen(false);
                }}
                className="mx-4 mt-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg text-center"
              >
                Catálogo & Orçamento
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
