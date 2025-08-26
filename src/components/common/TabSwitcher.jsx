import React from 'react';

function TabSwitcher({ active = 'Plans', onChange }) {
  const tabs = ['Plans', 'Spotlight'];
  return (
   <div
  className="flex gap-3 bg-white p-1 rounded-xl sm:border sm:border-[#000]/20 w-[360px] max-[380px]:w-auto"
>
  {tabs.map((tab) => {
    const isActive = active === tab;
    return (
      <button
        key={tab}
        onClick={() => onChange?.(tab)}
        className={[
          "w-[170px] max-[380px]:w-auto flex-1 sm:flex-none px-4 py-2 font-semibold transition-all focus:outline-none rounded-xl",
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