import React from 'react';

function TabSwitcher({ active = 'Plans', onChange }) {
  const tabs = ['Plans', 'Spotlight'];
  return (
    <div className="inline-flex bg-white rounded-xl p-1 border border-[#ff5500]/20">
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            className={[
              'px-5 py-2 rounded-lg font-semibold transition-all',
              isActive ? 'bg-[#ff5500] text-white shadow-sm' : 'text-[#ff5500] hover:bg-[#ffd3bf]'
            ].join(' ')}
            aria-pressed={isActive}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default TabSwitcher;