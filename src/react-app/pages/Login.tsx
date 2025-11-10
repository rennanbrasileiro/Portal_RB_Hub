import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, Lock, Mail, Eye, EyeOff, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useToast } from '@/react-app/hooks/useToast';
import { ToastContainer } from '@/react-app/components/ToastNotification';

export default function Login() {
  const { isDark } = useTheme();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast.success('✅ Login realizado com sucesso!');
      setTimeout(() => {
        // Redirecionar para o portal (CondoHUB_Portal)
        const portalUrl = import.meta.env.VITE_PORTAL_URL || 'http://localhost:3000';
        window.location.href = portalUrl;
      }, 1500);
    } else {
      setError('E-mail ou senha inválidos');
      toast.error('❌ Credenciais inválidas');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-cyan-50'
    }`}>
      {/* Background decorations */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_50%)]' 
          : 'bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.05),transparent_50%)]'
      }`} />
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]' 
          : 'bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)]'
      }`} />

      <div className={`w-full max-w-md relative z-10`}>
        {/* Logo e Titulo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png" 
              alt="RB HUB" 
              className="h-16 w-auto drop-shadow-2xl"
            />
          </div>
          <h1 className={`text-3xl font-black mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Portal RB HUB
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Acesse sua área exclusiva
          </p>
        </div>

        {/* Card de Login */}
        <div className={`p-8 rounded-3xl shadow-2xl ${
          isDark ? 'glass-effect' : 'glass-effect-light bg-white'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className={`block font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                E-mail
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className={`block font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`p-3 rounded-xl flex items-center space-x-2 ${
                isDark ? 'bg-red-500/20 border border-red-500' : 'bg-red-50 border border-red-500'
              }`}>
                <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`} />
                <span className={`text-sm font-medium ${
                  isDark ? 'text-red-300' : 'text-red-700'
                }`}>
                  {error}
                </span>
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Acessar Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Credenciais de Teste */}
          <div className={`mt-6 p-4 rounded-xl border-2 border-dashed ${
            isDark ? 'border-slate-700 bg-slate-800/50' : 'border-gray-300 bg-gray-50'
          }`}>
            <p className={`text-xs font-semibold mb-2 ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              🔑 Credenciais de Teste:
            </p>
            <div className={`space-y-1 text-xs ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <p><strong>Master:</strong> admin@rbhub.com.br / rbhub@2025</p>
              <p><strong>Cliente:</strong> demo@rbhub.com.br / demo123</p>
            </div>
          </div>

          {/* Link para voltar */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-semibold transition-colors ${
                isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
              }`}
            >
              ← Voltar para o site
            </button>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}
