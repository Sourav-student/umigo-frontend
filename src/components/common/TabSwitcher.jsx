import React from 'react';

function TabSwitcher({ active = 'Plans', onChange, showSpotlight = false }) {
  const tabs = showSpotlight ? ['Plans', 'Spotlight'] : ['Plans'];
  // Calculate width class based on whether spotlight is shown
  const containerClass = showSpotlight 
    ? "flex gap-3 bg-white p-1 rounded-xl sm:border sm:border-[#fff]/20 w-[360px] max-[380px]:w-auto"
    : "flex bg-white p-1 rounded-xl sm:border sm:border-[#fff]/20 w-auto";

  return (
    <div className={containerClass}>
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            className={[
              showSpotlight 
                ? "w-[170px] max-[380px]:w-auto flex-1 sm:flex-none px-4 py-2 font-semibold transition-all focus:outline-none rounded-xl cursor-pointer"
                : "px-16 py-2 font-semibold transition-all focus:outline-none rounded-xl w-full text-center cursor-pointer",
              isActive
                ? "bg-[#ff550032] text-[#ff5500] shadow-sm"
                : "text-[#000000] hover:bg-[#fff0e9]"
            ].join(" ")}
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