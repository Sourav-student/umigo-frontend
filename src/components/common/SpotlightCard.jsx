import React from 'react';
import { toast } from 'react-toastify';

function SpotlightCard({ 
  avatarUrl, 
  name, 
  time, 
  location, 
  onCardClick, 
  onApproach, 
  glow = false 
}) {
  const handleApproachClick = (e) => {
    e.stopPropagation();
    if (onApproach) {
      onApproach();
    }
    toast.success(`Approach message sent to ${name}!`, {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const handleCardClick = (e) => {
    if (!e.target.closest('button') && onCardClick) {
      onCardClick();
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={[
        'flex items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-sm cursor-pointer',
        glow ? 'ring-1 ring-[#ff5500]/30 shadow-[0_0_24px_rgba(255,85,0,0.25)]' : ''
      ].join(' ')}
    >
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
        onClick={handleApproachClick}
        className="px-4 py-2 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] transition-colors z-10"
      >
        Approach
      </button>
    </div>
  );
}

export default SpotlightCard;