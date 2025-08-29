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
        'flex items-center justify-between gap-4 bg-white rounded-2xl py-2 px-4 border border-stone-300 cursor-pointer max-md:w-[500px] max-[550px]:max-w-[350px] max-[380px]:max-w-[250px] max-[380px]:flex max-[380px]:flex-col',
        glow ? 'shadow-[0_0_24px_rgba(255,85,0,0.18)]' : ''
      ].join(' ')}
    >
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="h-24 w-24 rounded-full object-cover"
        />
        <div className="text-[#1b1b1b] text-left">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-xs text-nowrap opacity-80">Central Park</p>
          {/* <p className="text-sm opacity-80">{time}</p>
          <p className="text-sm opacity-80">{location}</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-22 max-[380px]:gap-3'>
        <p className='text-sm border border-[#ff5500] rounded-2xl px-1'>
          Open To Anything
        </p>
        <button
          onClick={handleApproachClick}
          className="px-2 py-1 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] transition-colors z-10"
        >
          Approach
        </button>
      </div>
    </div>
  );
}

export default SpotlightCard;