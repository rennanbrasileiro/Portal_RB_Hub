import { useState } from 'react';
import { History, Trash2, Send, Eye, Copy, Calendar, Building2, DollarSign, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useProposals } from '@/react-app/contexts/ProposalContext';
import { useToast } from '@/react-app/hooks/useToast';

interface ProposalHistoryProps {
  onLoadProposal?: (proposal: any) => void;
}

export default function ProposalHistory({ onLoadProposal }: ProposalHistoryProps) {
  const { isDark } = useTheme();
  const { proposals, deleteProposal, markAsSent } = useProposals();
  const { success, info } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (proposals.length === 0) {
    return (
      <div className={`p-8 rounded-2xl text-center ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
        <History className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
        <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Nenhuma proposta salva ainda
        </p>
      </div>
    );
  }

  const handleCopy = (proposal: any) => {
    const text = `
Proposta RB HUB
Cliente: ${proposal.formData.clientName}
Condomínio: ${proposal.formData.condominiumName}
Unidades: ${proposal.condominiumUnits}
Valor: R$ ${proposal.totalEstimate.toLocaleString('pt-BR')}
    `;
    navigator.clipboard.writeText(text);
    success('Proposta copiada para área de transferência!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta proposta?')) {
      deleteProposal(id);
      success('Proposta excluída com sucesso!');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <History className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Histórico de Propostas
          </h3>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
          isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-700'
        }`}>
          {proposals.length} proposta{proposals.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {proposals.map(proposal => {
          const isExpanded = expandedId === proposal.id;
          const date = new Date(proposal.timestamp);

          return (
            <div
              key={proposal.id}
              className={`p-4 rounded-xl border transition-all ${
                isDark
                  ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building2 className={`w-5 h-5 flex-shrink-0 ${
                      isDark ? 'text-cyan-400' : 'text-cyan-600'
                    }`} />
                    <h4 className={`font-semibold truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {proposal.formData.condominiumName}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                      proposal.status === 'sent'
                        ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                        : isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {proposal.status === 'sent' ? '✓ Enviada' : 'Rascunho'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className={`w-4 h-4 ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`} />
                      <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                        {date.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building2 className={`w-4 h-4 ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`} />
                      <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>
                        {proposal.condominiumUnits} unidades
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className={`w-4 h-4 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`font-semibold ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        R$ {proposal.totalEstimate.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={`mt-4 pt-4 border-t space-y-2 ${
                      isDark ? 'border-slate-700' : 'border-gray-200'
                    }`}>
                      <div>
                        <span className={`text-xs font-semibold uppercase ${
                          isDark ? 'text-slate-500' : 'text-gray-500'
                        }`}>Cliente</span>
                        <p className={`text-sm ${
                          isDark ? 'text-slate-300' : 'text-gray-700'
                        }`}>
                          {proposal.formData.clientName} • {proposal.formData.clientEmail}
                        </p>
                      </div>
                      <div>
                        <span className={`text-xs font-semibold uppercase ${
                          isDark ? 'text-slate-500' : 'text-gray-500'
                        }`}>Serviços</span>
                        <p className={`text-sm ${
                          isDark ? 'text-slate-300' : 'text-gray-700'
                        }`}>
                          {proposal.selectedServices.length} serviço{proposal.selectedServices.length !== 1 ? 's' : ''} selecionado{proposal.selectedServices.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : proposal.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                    title="Ver detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleCopy(proposal)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-slate-700 text-slate-400 hover:text-cyan-400'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-cyan-600'
                    }`}
                    title="Copiar"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {onLoadProposal && (
                    <button
                      onClick={() => onLoadProposal(proposal)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark
                          ? 'hover:bg-slate-700 text-slate-400 hover:text-green-400'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
                      }`}
                      title="Reabrir proposta"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(proposal.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-red-500/20 text-slate-400 hover:text-red-400'
                        : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                    }`}
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
