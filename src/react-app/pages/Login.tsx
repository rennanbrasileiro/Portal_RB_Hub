import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, LogIn, Home } from 'lucide-react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import ThemeToggle from '@/react-app/components/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-cyan-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${
        isDark ? 'glass-effect shadow-2xl' : 'glass-effect-light shadow-xl border-b border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img 
                src="https://mocha-cdn.com/019a4c3a-1129-78a3-9d58-262da3722e9c/rb-hub-logo.png" 
                alt="RB HUB" 
                className="h-10 w-auto drop-shadow-2xl"
              />
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  RB HUB
                </h1>
                <p className={`text-xs font-medium ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                  Soluções Integradas
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-20">
        <div className={`w-full max-w-md rounded-3xl shadow-2xl ${
          isDark ? 'glass-effect' : 'glass-effect-light bg-white'
        }`}>
          <div className="p-8">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 mb-4`}>
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Área Administrativa
              </h2>
              <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Faça login para acessar o painel
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`p-4 rounded-xl mb-6 ${
                isDark 
                  ? 'bg-red-500/20 border-2 border-red-500/30 text-red-400' 
                  : 'bg-red-50 border-2 border-red-200 text-red-700'
              }`}>
                <p className="text-sm font-semibold flex items-center">
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-slate-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@rbhub.com.br"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                }`}
              >
                <LogIn className="w-5 h-5" />
                <span>{loading ? 'Entrando...' : 'Entrar'}</span>
              </button>
            </form>

            {/* Info */}
            <div className={`mt-6 p-4 rounded-xl ${
              isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'
            }`}>
              <p className={`text-xs text-center ${
                isDark ? 'text-cyan-300' : 'text-cyan-700'
              }`}>
                🔒 <strong>Acesso Restrito</strong> - Apenas administradores autorizados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
