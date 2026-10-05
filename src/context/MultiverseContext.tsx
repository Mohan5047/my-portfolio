import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SectionId, SectionState } from '../types/multiverse';

interface MultiverseContextType {
  activeSection: SectionId;
  sectionStates: Record<SectionId, SectionState>;
  setSectionState: (id: SectionId, state: SectionState) => void;
  scrollToSection: (id: SectionId) => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isIntroComplete: boolean;
  completeIntro: () => void;
}

const defaultStates: Record<SectionId, SectionState> = {
  home: 'active',
  about: 'idle',
  projects: 'idle',
  tech: 'idle',
  experience: 'idle',
  hackathons: 'idle',
  resume: 'idle',
  contact: 'idle',
};

const MultiverseContext = createContext<MultiverseContextType | undefined>(undefined);

export const MultiverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [sectionStates, setSectionStates] = useState<Record<SectionId, SectionState>>(defaultStates);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('multiverse_intro_seen') === 'true';
    }
    return false;
  });

  const setSectionState = useCallback((id: SectionId, state: SectionState) => {
    setSectionStates((prev) => {
      if (prev[id] === state) return prev;
      return { ...prev, [id]: state };
    });
    if (state === 'active') {
      setActiveSection(id);
    }
  }, []);

  const scrollToSection = useCallback((id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('light-mode', nextTheme === 'light');
      }
      return nextTheme;
    });
  }, []);

  const completeIntro = useCallback(() => {
    setIsIntroComplete(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('multiverse_intro_seen', 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('light-mode', theme === 'light');
    }
  }, [theme]);

  return (
    <MultiverseContext.Provider
      value={{
        activeSection,
        sectionStates,
        setSectionState,
        scrollToSection,
        isAudioEnabled,
        toggleAudio,
        theme,
        toggleTheme,
        isIntroComplete,
        completeIntro,
      }}
    >
      {children}
    </MultiverseContext.Provider>
  );
};

export const useMultiverse = (): MultiverseContextType => {
  const context = useContext(MultiverseContext);
  if (!context) {
    throw new Error('useMultiverse must be used within a MultiverseProvider');
  }
  return context;
};
