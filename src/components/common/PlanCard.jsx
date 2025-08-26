import React from 'react';
import { toast } from 'react-toastify';

function PlanCard({
  bannerImage,
  avatarUrl,
  name,
  subtitle,
  time,
  location,
  onCardClick,
  onJoin,
  glow = false,
  className = '',
}) {
  const handleJoinClick = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    if (onJoin) {
      onJoin();
    } else {
      toast.success(`You've joined ${name}'s plan!`, {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      onClick={onCardClick}
      className={[
        'relative bg-white rounded-2xl shadow-sm overflow-hidden w-full max-w-md mx-auto cursor-pointer transition-transform hover:scale-[1.02] border border-stone-300',
        glow ? 'ring-1 ring-[#ff5500]/30 shadow-[0_0_24px_rgba(255,85,0,0.18)]' : '',
        className,
      ].join(' ')}
    >
      {/* Banner */}
      <div
        className="relative h-28 w-full bg-cover bg-center"
        style={{ backgroundImage: bannerImage ? `url(${bannerImage})` : 'none' }}
      >
        <div className="relative inset-0 bg-[#ff5500]/10 z-0" />
        {/* Avatar overlapping the banner */}
        <img
          src={avatarUrl}
          alt={name}
          className="absolute -bottom-14 left-4 h-24 w-24 rounded-full object-cover ring-4 ring-white z-10"
        />
        <div className="absolute -bottom-10 right-0 text-lg mr-14 font-semibold text-[#000000]">{name}</div>
      </div>

      {/* Content */}
      <div className="w-full p-4 pt-14 flex justify-between">
        {subtitle && (
          <div className="mt-3 text-[#2b2b2b] flex items-center gap-2">
            <span role="img" aria-label="place">🛒</span>
            <span className="opacity-90">{subtitle}</span>
          </div>
        )}
        <div>
          <button
            onClick={handleJoinClick}
            className="px-4 py-2 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] transition-colors whitespace-nowrap z-10"
          >
            Join
          </button>
        </div>

        {/* {subtitle && (
          <div className="mt-3 text-[#2b2b2b] flex items-center gap-2">
            <span role="img" aria-label="place">🛒</span>
            <span className="opacity-90">{subtitle}</span>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default PlanCard;
