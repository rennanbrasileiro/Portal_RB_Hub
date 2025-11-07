import { useState } from 'react';
import { MessageSquare, Phone, Calculator, FileText, Plus, X } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

interface FloatingActionsProps {
  onOpenProposal: () => void;
}

export default function FloatingActions({ onOpenProposal }: FloatingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  const actions = [
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      color: 'from-green-500 to-green-600',
      action: () => window.open('https://wa.me/5581993119952', '_blank')
    },
    {
      icon: Phone,
      label: 'Ligar',
      color: 'from-blue-500 to-blue-600',
      action: () => window.open('tel:+5581993119952')
    },
    {
      icon: FileText,
      label: 'Proposta',
      color: 'from-purple-500 to-purple-600',
      action: () => {
        onOpenProposal();
        setIsOpen(false);
      }
    },
    {
      icon: Calculator,
      label: 'Calcular',
      color: 'from-orange-500 to-orange-600',
      action: () => {
        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Action Buttons */}
        {isOpen && (
          <div className="flex flex-col space-y-3 animate-slide-up">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`flex items-center space-x-3 px-4 py-3 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 group ${
                  isDark ? 'backdrop-blur-xl' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-semibold text-sm whitespace-nowrap">{action.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group ${
            isDark ? 'shadow-glow backdrop-blur-xl' : 'shadow-glow-light'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          ) : (
            <Plus className="w-6 h-6 group-hover:rotate-45 transition-transform" />
          )}
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
