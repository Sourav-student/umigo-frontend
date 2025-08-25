import React from 'react';

function TabSwitcher({ active = 'Plans', onChange }) {
  const tabs = ['Plans', 'Spotlight'];
  return (
   <div
  className="flex gap-2 bg-white p-1 rounded-xl sm:border sm:border-[#ff5500]/20 w-[90%] min-[550px]:w-auto"
>
  {tabs.map((tab) => {
    const isActive = active === tab;
    return (
      <button
        key={tab}
        onClick={() => onChange?.(tab)}
        className={[
          "flex-1 sm:flex-none px-4 py-2 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 rounded-xl",
          isActive
            ? "bg-[#ff5500] text-white shadow-sm"
            : "text-[#ff5500] hover:bg-[#ffd3bf]"
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