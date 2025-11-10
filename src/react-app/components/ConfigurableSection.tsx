import { ReactNode } from 'react';
import { useAdmin } from '@/react-app/contexts/AdminContext';

interface ConfigurableSectionProps {
  sectionId: string;
  children: ReactNode;
}

export default function ConfigurableSection({ sectionId, children }: ConfigurableSectionProps) {
  const { isSectionEnabled } = useAdmin();
  
  if (!isSectionEnabled(sectionId)) {
    return null;
  }
  
  return <>{children}</>;
}
