import { useState } from 'react';
import { GitCompare, CheckCircle2, X, TrendingUp } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import { useProposals } from '@/react-app/contexts/ProposalContext';

export default function ProposalComparison() {
  const { isDark } = useTheme();
  const { proposals } = useProposals();
  const [selectedProposals, setSelectedProposals] = useState<string[]>([]);

  const toggleProposal = (id: string) => {
    setSelectedProposals(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      }
      if (prev.length >= 3) {
        return prev; // Máximo 3 comparações
      }
      return [...prev, id];
    });
  };

  const selectedData = proposals.filter(p => selectedProposals.includes(p.id));

  if (proposals.length < 2) {
    return (
      <div className={`p-8 rounded-2xl text-center ${
        isDark ? 'glass-effect' : 'glass-effect-light'
      }`}>
        <GitCompare className={`w-12 h-12 mx-auto mb-4 ${
          isDark ? 'text-slate-600' : 'text-gray-400'
        }`} />
        <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
          É necessário pelo menos 2 propostas para comparar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <GitCompare className={`w-6 h-6 ${
          isDark ? 'text-cyan-400' : 'text-cyan-600'
        }`} />
        <h3 className={`text-xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Comparar Propostas
        </h3>
      </div>

      {/* Seleção */}
      <div className={`p-4 rounded-xl ${
        isDark ? 'glass-effect' : 'glass-effect-light'
      }`}>
        <p className={`text-sm mb-3 ${
          isDark ? 'text-slate-400' : 'text-gray-600'
        }`}>
          Selecione até 3 propostas para comparar:
        </p>
        <div className="flex flex-wrap gap-2">
          {proposals.map(proposal => {
            const isSelected = selectedProposals.includes(proposal.id);
            return (
              <button
                key={proposal.id}
                onClick={() => toggleProposal(proposal.id)}
                disabled={!isSelected && selectedProposals.length >= 3}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : isDark
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {proposal.formData.condominiumName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparação */}
      {selectedData.length >= 2 && (
        <div className={`overflow-x-auto rounded-2xl ${
          isDark ? 'glass-effect' : 'glass-effect-light'
        }`}>
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDark ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <th className={`text-left p-4 font-semibold ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Característica
                </th>
                {selectedData.map(proposal => (
                  <th key={proposal.id} className={`text-left p-4 font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {proposal.formData.condominiumName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${
                isDark ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <td className={`p-4 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Unidades
                </td>
                {selectedData.map(proposal => (
                  <td key={proposal.id} className={`p-4 font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {proposal.condominiumUnits}
                  </td>
                ))}
              </tr>
              
              <tr className={`border-b ${
                isDark ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <td className={`p-4 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Valor Total
                </td>
                {selectedData.map(proposal => (
                  <td key={proposal.id} className={`p-4 font-bold ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>
                    R$ {proposal.totalEstimate.toLocaleString('pt-BR')}
                  </td>
                ))}
              </tr>

              <tr className={`border-b ${
                isDark ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <td className={`p-4 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Custo por Unidade
                </td>
                {selectedData.map(proposal => {
                  const costPerUnit = proposal.totalEstimate / proposal.condominiumUnits;
                  return (
                    <td key={proposal.id} className={`p-4 font-semibold ${
                      isDark ? 'text-cyan-400' : 'text-cyan-600'
                    }`}>
                      R$ {costPerUnit.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                    </td>
                  );
                })}
              </tr>

              <tr className={`border-b ${
                isDark ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <td className={`p-4 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Nº de Serviços
                </td>
                {selectedData.map(proposal => (
                  <td key={proposal.id} className={`p-4 font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {proposal.selectedServices.length}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-4 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Síndico Profissional
                </td>
                {selectedData.map(proposal => (
                  <td key={proposal.id} className="p-4">
                    {proposal.keepProfessionalSindico ? (
                      <CheckCircle2 className={`w-5 h-5 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`} />
                    ) : (
                      <X className={`w-5 h-5 ${
                        isDark ? 'text-red-400' : 'text-red-600'
                      }`} />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedData.length >= 2 && (
        <div className={`p-4 rounded-xl flex items-start space-x-3 ${
          isDark ? 'bg-cyan-500/20' : 'bg-cyan-50'
        }`}>
          <TrendingUp className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
            isDark ? 'text-cyan-400' : 'text-cyan-600'
          }`} />
          <div>
            <p className={`font-semibold mb-1 ${
              isDark ? 'text-cyan-300' : 'text-cyan-700'
            }`}>
              Análise de Custo-Benefício
            </p>
            <p className={`text-sm ${
              isDark ? 'text-cyan-200' : 'text-cyan-600'
            }`}>
              Compare o valor por unidade e o número de serviços incluídos para 
              identificar a proposta com melhor relação custo-benefício.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
