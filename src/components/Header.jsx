import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>
  )},
  { to: '/notifications', label: 'Alerts', icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/></svg>
  )},
  { to: '/create', label: 'Add', icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
  )},
  { to: '/chat', label: 'Chat', icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 00-4-4H7a4 4 0 00-4 4v4l4-2h10l4 2v-4z"/></svg>
  )},
  { to: '/profile', label: 'Me', icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12a5 5 0 100-10 5 5 0 000 10z"/><path d="M20 21a8 8 0 10-16 0"/></svg>
  )},
];

export default function Header() {
  const [glowEnabled, setGlowEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('glowMode');
    if (saved !== null) setGlowEnabled(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('glowMode', JSON.stringify(glowEnabled));
    // Notify pages listening for glow changes
    window.dispatchEvent(new CustomEvent('glowModeChange', { detail: glowEnabled }));
  }, [glowEnabled]);

  return (
    <>
      {/* Top header (visible on all sizes) */}
      <header className="sticky top-0 bg-[#f9f9f9]/95 backdrop-blur z-40 border-b border-[#ff5500]/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img 
              src="/src/Images/logo.jpg" 
              alt="Logo" 
              className="h-10 w-auto object-contain rounded-md"
            />
          </NavLink>

          {/* Center nav (desktop only) */}
          <nav className="hidden md:flex items-center gap-6 text-[#ff5500]">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} className={({isActive}) => [
                'flex items-center gap-2', isActive ? 'font-semibold' : ''
              ].join(' ')}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right icons + glow toggle */}
          <div className="flex items-center gap-4">
            {/* <NavLink to="/notifications" aria-label="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" /></svg>
            </NavLink> */}

            {/* Glow switch */}
            <div
              role="switch"
              aria-checked={glowEnabled}
              aria-label="Enable glow mode"
              tabIndex={0}
              onClick={() => setGlowEnabled(v => !v)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setGlowEnabled(v => !v)}
              className={[
                'relative h-6 w-14 rounded-full transition-colors cursor-pointer shrink-0 flex items-center px-1',
                glowEnabled ? 'bg-[#ff5500]' : 'bg-gray-200'
              ].join(' ')}
            >
              <span
                className={[
                  'h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                  glowEnabled ? 'translate-x-8' : 'translate-x-0'
                ].join(' ')}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-2 left-0 right-0 z-40">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl bg-white border border-[#ff5500]/20 shadow-sm flex items-center justify-between px-2 py-1">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} className={({isActive}) => [
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl',
                isActive ? 'bg-[#ffd3bf]' : ''
              ].join(' ')}>
                {item.icon}
                {/* <span className="text-xs">{item.label}</span> */}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
