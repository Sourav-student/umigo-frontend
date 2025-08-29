import React from 'react';

function SpotlightCard({ avatarUrl, name, time, location, onApproach, glow = false }) {
  return (
    <div className={[
      'flex items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-sm',
      glow ? 'shadow-[0_0_24px_rgba(255,85,0,0.25)]' : ''
    ].join(' ')}>
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="text-[#ff5500]">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm opacity-80">{time}</p>
          <p className="text-sm opacity-80">{location}</p>
        </div>
      </div>
      <button
        onClick={onApproach}
        className="px-4 py-2 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] transition-colors"
      >
        Approach
      </button>
    </div>
  );
}

export default SpotlightCard;