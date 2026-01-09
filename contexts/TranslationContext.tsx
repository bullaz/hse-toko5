import React, { createContext, useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const TranslationContext = createContext<ReturnType<typeof useTranslation> | null>(null);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const translation = useTranslation();

  if (!translation.isReady) {
    return null; // or a loading screen
  }

  return (
    <TranslationContext.Provider value={translation}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useAppTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useAppTranslation must be used within TranslationProvider');
  }
  return context;
}