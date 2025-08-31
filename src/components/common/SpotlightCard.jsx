import React from 'react';
import { toast } from 'react-toastify';

function SpotlightCard({
  avatarUrl,
  name,
  time,
  location,
  onCardClick,
  onApproach,
  approach = false,
  glow = false
}) {

  const handleApproachClick = (e) => {
    e.stopPropagation();
    if (onApproach) {
      onApproach();
    }

    //   if (!approach) {
    //     toast.success(`Approach message sent to ${name}!`, {
    //       position: 'top-center',
    //       autoClose: 3000,
    //     });
    //   } else {
    //     toast.info(`You already approached ${name}.`, {
    //       position: 'top-center',
    //       autoClose: 2000,
    //     });
    //   }
  };

  const handleCardClick = (e) => {
    if (!e.target.closest('button') && onCardClick) {
      onCardClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      // className={[
      className='flex items-center justify-between gap-4 bg-white rounded-2xl py-2 px-4 cursor-pointer max-[380px]:max-w-[250px] max-[380px]:flex max-[380px]:flex-col max-[380px]:ml-[5%]'
    // glow ? 'shadow-[0_0_24px_rgba(255,85,0,0.18)]' : ''
    // ].join(' ')}
    >
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="h-24 w-24 rounded-full object-cover"
        />
        <div className="text-[#1b1b1b] text-left">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-xs text-nowrap opacity-60">{location}</p>
          {/* <p className="text-sm opacity-80">{time}</p>
          <p className="text-sm opacity-80">{location}</p> */}
        </div>
      </div>
      <div className='flex flex-col gap-7 max-[380px]:gap-3 items-end'>
        <p className='text-[8px] w-fit py-1 border border-[#ff5500] rounded-2xl px-2 bg-[#ff5500]/10 font-bold'>
          Open To Anything
        </p>
        <button
          onClick={handleApproachClick}
          className={`px-2 py-1 rounded-xl z-10 cursor-pointer text-lg transition-all duration-300 ${approach
              ? 'bg-white text-[#ff5500] border border-[#ff5500] cursor-not-allowed'
              : 'bg-[#ff5500] text-white hover:bg-[#e64d00]'
            }`}
        >
          {approach ? 'Approached' : 'Approach'}
        </button>
      </div>
    </div>
  );
}

export default SpotlightCard;