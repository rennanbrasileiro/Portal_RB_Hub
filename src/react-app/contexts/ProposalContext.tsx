import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '@/react-app/hooks/useLocalStorage';
import type { ServiceType } from '@/shared/types';

interface ProposalData {
  id: string;
  timestamp: string;
  keepProfessionalSindico: boolean;
  selectedServices: string[];
  condominiumUnits: number;
  formData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    condominiumName: string;
    condominiumAddress: string;
    message: string;
  };
  totalEstimate: number;
  status: 'draft' | 'sent';
}

interface ProposalContextType {
  proposals: ProposalData[];
  currentDraft: ProposalData | null;
  saveProposal: (proposal: Omit<ProposalData, 'id' | 'timestamp'>) => void;
  saveDraft: (proposal: Partial<ProposalData>) => void;
  loadDraft: () => ProposalData | null;
  clearDraft: () => void;
  deleteProposal: (id: string) => void;
  markAsSent: (id: string) => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useLocalStorage<ProposalData[]>('rb-hub-proposals', []);
  const [currentDraft, setCurrentDraft] = useLocalStorage<ProposalData | null>('rb-hub-draft', null);

  const saveProposal = useCallback((proposal: Omit<ProposalData, 'id' | 'timestamp'>) => {
    const newProposal: ProposalData = {
      ...proposal,
      id: `proposal-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setProposals(prev => [newProposal, ...prev]);
    return newProposal;
  }, [setProposals]);

  const saveDraft = useCallback((proposal: Partial<ProposalData>) => {
    setCurrentDraft(prev => ({
      ...prev,
      ...proposal,
      id: prev?.id || `draft-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'draft'
    } as ProposalData));
  }, [setCurrentDraft]);

  const loadDraft = useCallback(() => {
    return currentDraft;
  }, [currentDraft]);

  const clearDraft = useCallback(() => {
    setCurrentDraft(null);
  }, [setCurrentDraft]);

  const deleteProposal = useCallback((id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
  }, [setProposals]);

  const markAsSent = useCallback((id: string) => {
    setProposals(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'sent' as const } : p
    ));
  }, [setProposals]);

  return (
    <ProposalContext.Provider value={{
      proposals,
      currentDraft,
      saveProposal,
      saveDraft,
      loadDraft,
      clearDraft,
      deleteProposal,
      markAsSent
    }}>
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposals() {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposals must be used within a ProposalProvider');
  }
  return context;
}
