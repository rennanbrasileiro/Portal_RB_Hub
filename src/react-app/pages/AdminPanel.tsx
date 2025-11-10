import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Settings, 
  DollarSign, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw,
  LogOut,
  Home,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Package,
  FileText,
  TrendingUp,
  Palette,
  Image as ImageIcon,
  Star,
  Share2,
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/react-app/contexts/AuthContext';
import { useAdmin } from '@/react-app/contexts/AdminContext';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useToast } from '@/react-app/hooks/useToast';
import { ToastContainer } from '@/react-app/components/ToastNotification';
import ThemeToggle from '@/react-app/components/ThemeToggle';

export default function AdminPanel() {
  const { isDark } = useTheme();
  const { user, logout, isMaster } = useAuth();
  const { siteConfig, services, updateSiteConfig, updateService, toggleSection, resetToDefaults, isSectionEnabled } = useAdmin();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'services' | 'hero' | 'gallery' | 'testimonials' | 'social' | 'faq'>('general');
  const [editingService, setEditingService] = useState<string | null>(null);
  const [localConfig, setLocalConfig] = useState(siteConfig);

  const handleSaveConfig = () => {
    updateSiteConfig(localConfig);
    toast.success('✅ Configurações salvas com sucesso!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('⚠️ Tem certeza que deseja restaurar todas as configurações padrão? Esta ação não pode ser desfeita.')) {
      resetToDefaults();
      setLocalConfig(siteConfig);
      toast.success('✅ Configurações restauradas!');
    }
  };

  const handleServiceUpdate = (serviceId: string, field: string, value: any) => {
    updateService(serviceId, { [field]: value });
    toast.success('✅ Serviço atualizado!');
  };

  const handleLogout = () => {
    logout();
    toast.info('👋 Até logo!');
    navigate('/login');
  };

  if (!isMaster) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="mb-4">Você não tem permissão para acessar esta área.</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-cyan-500 text-white rounded-xl">
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

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
            {/* Left Section - Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-xl ${
                isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'
              }`}>
                <Settings className={`w-7 h-7 ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Painel Administrativo RB HUB
                </h1>
                <p className={`text-sm flex items-center space-x-2 ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <span>👋 Olá, <strong>{user?.name}</strong></span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Master
                  </span>
                </p>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle />
              
              {/* Voltar ao Portal Principal */}
              <button
                onClick={() => navigate('/')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg'
                }`}
                data-testid="back-to-portal-button"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Portal Principal</span>
                <span className="md:hidden">Portal</span>
              </button>
              
              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 hover:scale-105 ${
                  isDark 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
                }`}
                data-testid="admin-logout-button"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'general', label: 'Configurações Gerais', icon: Settings },
            { id: 'hero', label: 'Hero & Visual', icon: Sparkles },
            { id: 'sections', label: 'Seções do Site', icon: ToggleLeft },
            { id: 'services', label: 'Serviços e Preços', icon: DollarSign },
            { id: 'gallery', label: 'Galeria', icon: ImageIcon },
            { id: 'testimonials', label: 'Depoimentos', icon: Star },
            { id: 'social', label: 'Redes Sociais & SEO', icon: Share2 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Hero & Visual Settings */}
          {activeTab === 'hero' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Sparkles className="w-6 h-6 mr-2" />
                Hero Section & Identidade Visual
              </h2>

              <div className="space-y-6">
                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={siteConfig.heroConfig.title}
                    onChange={(e) => {
                      const updated = { ...siteConfig };
                      updated.heroConfig.title = e.target.value;
                      updateSiteConfig(updated);
                    }}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Subtítulo
                  </label>
                  <textarea
                    value={siteConfig.heroConfig.subtitle}
                    onChange={(e) => {
                      const updated = { ...siteConfig };
                      updated.heroConfig.subtitle = e.target.value;
                      updateSiteConfig(updated);
                    }}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Texto do Botão Principal
                    </label>
                    <input
                      type="text"
                      value={siteConfig.heroConfig.ctaText}
                      onChange={(e) => {
                        const updated = { ...siteConfig };
                        updated.heroConfig.ctaText = e.target.value;
                        updateSiteConfig(updated);
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Texto do Botão Secundário
                    </label>
                    <input
                      type="text"
                      value={siteConfig.heroConfig.ctaSecondaryText}
                      onChange={(e) => {
                        const updated = { ...siteConfig };
                        updated.heroConfig.ctaSecondaryText = e.target.value;
                        updateSiteConfig(updated);
                      }}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    URL da Imagem de Fundo do Hero (opcional)
                  </label>
                  <input
                    type="url"
                    value={siteConfig.heroConfig.backgroundImage}
                    onChange={(e) => {
                      const updated = { ...siteConfig };
                      updated.heroConfig.backgroundImage = e.target.value;
                      updateSiteConfig(updated);
                    }}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                  {siteConfig.heroConfig.backgroundImage && (
                    <div className="mt-3">
                      <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                        Preview da imagem:
                      </p>
                      <img 
                        src={siteConfig.heroConfig.backgroundImage} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Erro+ao+carregar+imagem';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-xl ${
                  isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'
                }`}>
                  <p className={`text-sm ${
                    isDark ? 'text-cyan-300' : 'text-cyan-700'
                  }`}>
                    💡 <strong>Dica:</strong> Use imagens de alta qualidade (mínimo 1920x1080) 
                    para melhor resultado no hero. Formatos recomendados: JPG ou WebP.
                  </p>
                </div>

                <button
                  onClick={() => toast.success('✅ Configurações do Hero salvas!')}
                  className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center space-x-2 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Salvar Hero</span>
                </button>
              </div>
            </div>
          )}

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Edit3 className="w-6 h-6 mr-2" />
                Configurações Gerais do Site
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    value={localConfig.companyName}
                    onChange={(e) => setLocalConfig({ ...localConfig, companyName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={localConfig.companyEmail}
                    onChange={(e) => setLocalConfig({ ...localConfig, companyEmail: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={localConfig.companyPhone}
                    onChange={(e) => setLocalConfig({ ...localConfig, companyPhone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    WhatsApp (com DDD e DDI)
                  </label>
                  <input
                    type="text"
                    value={localConfig.whatsappNumber}
                    onChange={(e) => setLocalConfig({ ...localConfig, whatsappNumber: e.target.value })}
                    placeholder="5581999999999"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={localConfig.companyAddress}
                    onChange={(e) => setLocalConfig({ ...localConfig, companyAddress: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Título Hero
                  </label>
                  <input
                    type="text"
                    value={localConfig.heroTitle}
                    onChange={(e) => setLocalConfig({ ...localConfig, heroTitle: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Subtítulo Hero
                  </label>
                  <textarea
                    value={localConfig.heroSubtitle}
                    onChange={(e) => setLocalConfig({ ...localConfig, heroSubtitle: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={handleSaveConfig}
                  className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center space-x-2 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Salvar Alterações</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className={`px-6 py-3 font-semibold rounded-xl transition-all flex items-center space-x-2 ${
                    isDark 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Restaurar Padrões</span>
                </button>
              </div>
            </div>
          )}

          {/* Sections Management */}
          {activeTab === 'sections' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <ToggleLeft className="w-6 h-6 mr-2" />
                Gerenciar Seções do Site
              </h2>

              <p className={`mb-6 ${
                isDark ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Ative ou desative seções do site sem alterar o código
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {siteConfig.sections.map(section => {
                  const enabled = isSectionEnabled(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        enabled
                          ? isDark
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-green-500 bg-green-50'
                          : isDark
                            ? 'border-slate-700 bg-slate-800/50'
                            : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {enabled ? (
                          <ToggleRight className={`w-6 h-6 ${
                            isDark ? 'text-green-400' : 'text-green-600'
                          }`} />
                        ) : (
                          <ToggleLeft className={`w-6 h-6 ${
                            isDark ? 'text-slate-500' : 'text-gray-400'
                          }`} />
                        )}
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          enabled
                            ? isDark ? 'bg-green-500/30 text-green-300' : 'bg-green-200 text-green-700'
                            : isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {enabled ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <h3 className={`font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {section.name}
                      </h3>
                      <p className={`text-xs ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        Clique para {enabled ? 'desativar' : 'ativar'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Services & Pricing */}
          {activeTab === 'services' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <DollarSign className="w-6 h-6 mr-2" />
                Gerenciar Serviços e Preços
              </h2>

              <p className={`mb-6 ${
                isDark ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Edite preços, nomes e descrições dos serviços
              </p>

              <div className="space-y-4">
                {services.map(service => {
                  const isEditing = editingService === service.id;
                  return (
                    <div
                      key={service.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDark
                          ? 'border-slate-700 bg-slate-800/50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {isEditing ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={service.name}
                                onChange={(e) => handleServiceUpdate(service.id, 'name', e.target.value)}
                                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                                  isDark
                                    ? 'bg-slate-900 border-slate-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                              />
                              <textarea
                                value={service.description}
                                onChange={(e) => handleServiceUpdate(service.id, 'description', e.target.value)}
                                rows={2}
                                className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                                  isDark
                                    ? 'bg-slate-900 border-slate-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                              />
                              {service.basePrice && (
                                <div className="flex items-center space-x-2">
                                  <span className={`text-sm font-semibold ${
                                    isDark ? 'text-slate-300' : 'text-gray-700'
                                  }`}>R$</span>
                                  <input
                                    type="number"
                                    value={service.basePrice}
                                    onChange={(e) => handleServiceUpdate(service.id, 'basePrice', parseFloat(e.target.value))}
                                    className={`w-32 px-3 py-2 rounded-lg border text-sm ${
                                      isDark
                                        ? 'bg-slate-900 border-slate-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                  />
                                  {service.isRecurring && (
                                    <span className={`text-xs ${
                                      isDark ? 'text-slate-400' : 'text-gray-500'
                                    }`}>/{service.unit === 'monthly' ? 'mês' : service.unit === 'yearly' ? 'ano' : 'único'}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <h3 className={`font-semibold mb-1 ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {service.name}
                              </h3>
                              <p className={`text-sm mb-2 ${
                                isDark ? 'text-slate-400' : 'text-gray-600'
                              }`}>
                                {service.description}
                              </p>
                              {service.basePrice && (
                                <p className={`font-bold ${
                                  isDark ? 'text-green-400' : 'text-green-600'
                                }`}>
                                  R$ {service.basePrice.toLocaleString('pt-BR')}
                                  {service.isRecurring && (
                                    <span className="text-xs font-normal">/{service.unit === 'monthly' ? 'mês' : service.unit === 'yearly' ? 'ano' : 'único'}</span>
                                  )}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setEditingService(isEditing ? null : service.id)}
                          className={`ml-4 p-2 rounded-lg transition-all ${
                            isDark
                              ? 'hover:bg-slate-700 text-cyan-400'
                              : 'hover:bg-gray-200 text-cyan-600'
                          }`}
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gallery Management */}
          {activeTab === 'gallery' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold flex items-center ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <ImageIcon className="w-6 h-6 mr-2" />
                  Galeria Antes/Depois
                </h2>
                <button
                  onClick={() => {
                    const newImage = {
                      id: `gallery-${Date.now()}`,
                      before: '',
                      after: '',
                      title: 'Nova transformação',
                      description: 'Descrição da transformação'
                    };
                    const updated = { ...siteConfig };
                    updated.gallery.beforeAfterImages.push(newImage);
                    updateSiteConfig(updated);
                    toast.success('✅ Nova imagem adicionada!');
                  }}
                  className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center space-x-2`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Imagem</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {siteConfig.gallery.beforeAfterImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Imagem {index + 1}
                      </h3>
                      <button
                        onClick={() => {
                          const updated = { ...siteConfig };
                          updated.gallery.beforeAfterImages = updated.gallery.beforeAfterImages.filter(
                            img => img.id !== image.id
                          );
                          updateSiteConfig(updated);
                          toast.success('✅ Imagem removida!');
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          isDark
                            ? 'hover:bg-red-500/20 text-red-400'
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={image.title}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const imgIndex = updated.gallery.beforeAfterImages.findIndex(
                            img => img.id === image.id
                          );
                          updated.gallery.beforeAfterImages[imgIndex].title = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="Título"
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      <textarea
                        value={image.description}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const imgIndex = updated.gallery.beforeAfterImages.findIndex(
                            img => img.id === image.id
                          );
                          updated.gallery.beforeAfterImages[imgIndex].description = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="Descrição"
                        rows={2}
                        className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      <input
                        type="url"
                        value={image.before}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const imgIndex = updated.gallery.beforeAfterImages.findIndex(
                            img => img.id === image.id
                          );
                          updated.gallery.beforeAfterImages[imgIndex].before = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="URL imagem ANTES"
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      <input
                        type="url"
                        value={image.after}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const imgIndex = updated.gallery.beforeAfterImages.findIndex(
                            img => img.id === image.id
                          );
                          updated.gallery.beforeAfterImages[imgIndex].after = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="URL imagem DEPOIS"
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      {image.before && image.after && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                              Antes:
                            </p>
                            <img
                              src={image.before}
                              alt="Before"
                              className="w-full h-24 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Erro';
                              }}
                            />
                          </div>
                          <div>
                            <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                              Depois:
                            </p>
                            <img
                              src={image.after}
                              alt="After"
                              className="w-full h-24 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Erro';
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials Management */}
          {activeTab === 'testimonials' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold flex items-center ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <Star className="w-6 h-6 mr-2" />
                  Depoimentos de Clientes
                </h2>
                <button
                  onClick={() => {
                    const newTestimonial = {
                      id: `test-${Date.now()}`,
                      name: 'Novo Cliente',
                      role: 'Síndico',
                      company: 'Condomínio',
                      image: 'https://ui-avatars.com/api/?name=Novo+Cliente&background=06B6D4&color=fff',
                      text: 'Depoimento do cliente...',
                      rating: 5
                    };
                    const updated = { ...siteConfig };
                    updated.testimonials.push(newTestimonial);
                    updateSiteConfig(updated);
                    toast.success('✅ Novo depoimento adicionado!');
                  }}
                  className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center space-x-2`}
                >
                  <Plus className="w-5 h-5" />
                  <span>Adicionar Depoimento</span>
                </button>
              </div>

              <div className="space-y-4">
                {siteConfig.testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className={`font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            Depoimento {index + 1}
                          </h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const updated = { ...siteConfig };
                          updated.testimonials = updated.testimonials.filter(
                            t => t.id !== testimonial.id
                          );
                          updateSiteConfig(updated);
                          toast.success('✅ Depoimento removido!');
                        }}
                        className={`p-2 rounded-lg transition-all ${
                          isDark
                            ? 'hover:bg-red-500/20 text-red-400'
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const testIndex = updated.testimonials.findIndex(
                            t => t.id === testimonial.id
                          );
                          updated.testimonials[testIndex].name = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="Nome"
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const testIndex = updated.testimonials.findIndex(
                            t => t.id === testimonial.id
                          );
                          updated.testimonials[testIndex].role = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="Cargo (ex: Síndico)"
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      <input
                        type="text"
                        value={testimonial.company}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const testIndex = updated.testimonials.findIndex(
                            t => t.id === testimonial.id
                          );
                          updated.testimonials[testIndex].company = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="Condomínio"
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />

                      <input
                        type="url"
                        value={testimonial.image}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          const testIndex = updated.testimonials.findIndex(
                            t => t.id === testimonial.id
                          );
                          updated.testimonials[testIndex].image = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="URL da foto"
                        className={`px-3 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-900 border-slate-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <textarea
                      value={testimonial.text}
                      onChange={(e) => {
                        const updated = { ...siteConfig };
                        const testIndex = updated.testimonials.findIndex(
                          t => t.id === testimonial.id
                        );
                        updated.testimonials[testIndex].text = e.target.value;
                        updateSiteConfig(updated);
                      }}
                      placeholder="Depoimento"
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border text-sm resize-none mt-3 ${
                        isDark
                          ? 'bg-slate-900 border-slate-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media & SEO */}
          {activeTab === 'social' && (
            <div className={`p-6 rounded-2xl ${
              isDark ? 'glass-effect' : 'glass-effect-light bg-white'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Share2 className="w-6 h-6 mr-2" />
                Redes Sociais & SEO
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Redes Sociais
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(siteConfig.socialMedia).map(([platform, url]) => (
                      <div key={platform}>
                        <label className={`block font-semibold mb-2 capitalize ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {platform}
                        </label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => {
                            const updated = { ...siteConfig };
                            updated.socialMedia[platform as keyof typeof siteConfig.socialMedia] = e.target.value;
                            updateSiteConfig(updated);
                          }}
                          placeholder={`https://${platform}.com/...`}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-gray-50 border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`border-t pt-6 ${
                  isDark ? 'border-slate-700' : 'border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    SEO - Otimização para Buscadores
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Título da Página (Meta Title)
                      </label>
                      <input
                        type="text"
                        value={siteConfig.seo.metaTitle}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          updated.seo.metaTitle = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        maxLength={60}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                      <p className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        {siteConfig.seo.metaTitle.length}/60 caracteres
                      </p>
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Descrição (Meta Description)
                      </label>
                      <textarea
                        value={siteConfig.seo.metaDescription}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          updated.seo.metaDescription = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        maxLength={160}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                      <p className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        {siteConfig.seo.metaDescription.length}/160 caracteres
                      </p>
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Palavras-chave (Keywords)
                      </label>
                      <input
                        type="text"
                        value={siteConfig.seo.keywords}
                        onChange={(e) => {
                          const updated = { ...siteConfig };
                          updated.seo.keywords = e.target.value;
                          updateSiteConfig(updated);
                        }}
                        placeholder="síndico profissional, gestão condominial, ..."
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                      <p className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        Separe as palavras por vírgula
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toast.success('✅ SEO e Redes Sociais atualizados!')}
                  className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all hover:scale-105 flex items-center space-x-2 ${
                    isDark ? 'hover:shadow-glow' : 'hover:shadow-glow-light'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Salvar Configurações</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}
