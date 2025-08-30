import React, { createContext, useContext, useState, useEffect } from 'react';

const CommonContext = createContext();

export function CommonProvider({ children }) {
  // Search state
  const [showSearch, setShowSearch] = useState(false);
  // Glow mode state
  const [glowEnabled, setGlowEnabled] = useState(false);
  const [glowBtnVisible, setGlowBtnVisible] = useState(false);

  // Initialize glow mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('glowMode');
    if (saved !== null) setGlowEnabled(JSON.parse(saved));
  }, []);

  // Save glow mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('glowMode', JSON.stringify(glowEnabled));
    window.dispatchEvent(new CustomEvent('glowModeChange', { detail: glowEnabled }));
  }, [glowEnabled]);

  // Search handlers
  const toggleSearch = () => setShowSearch(prev => !prev);
  const openSearch = () => setShowSearch(true);
  const closeSearch = () => setShowSearch(false);

  // Glow mode handlers
  const toggleGlowMode = () => setGlowEnabled(prev => !prev);
  const setGlowMode = (value) => setGlowEnabled(value);
  const setGlowButtonVisibility = (isVisible) => setGlowBtnVisible(isVisible);

  const value = {
    // Search
    showSearch,
    toggleSearch,
    openSearch,
    closeSearch,
    
    // Glow Mode
    glowEnabled,
    glowBtnVisible,
    toggleGlowMode,
    setGlowMode,
    setGlowButtonVisibility
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export function useCommon() {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useCommon must be used within a CommonProvider');
  }
  return context;
}
