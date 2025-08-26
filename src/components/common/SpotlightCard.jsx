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
        'flex items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-sm cursor-pointer max-md:w-[500px] max-[550px]:max-w-[350px] max-[380px]:max-w-[250px] max-[380px]:flex max-[380px]:flex-col border border-stone-300',
        glow ? 'ring-1 ring-[#ff5500]/30 shadow-[0_0_24px_rgba(255,85,0,0.25)]' : ''
      ].join(' ')}
    >
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="h-24 w-24 rounded-full object-cover"
        />
        <div className="text-[#1b1b1b]">
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