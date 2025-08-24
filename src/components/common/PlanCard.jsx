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
        'relative bg-white rounded-2xl border border-[#ff5500]/20 shadow-sm overflow-hidden w-full max-w-md mx-auto cursor-pointer transition-transform hover:scale-[1.02]',
        glow ? 'ring-1 ring-[#ff5500]/30 shadow-[0_0_24px_rgba(255,85,0,0.18)]' : '',
        className,
      ].join(' ')}
    >
      {/* Banner */}
      <div
        className="relative h-28 w-full bg-cover bg-center"
        style={{ backgroundImage: bannerImage ? `url(${bannerImage})` : 'none' }}
      >
        <div className="absolute inset-0 bg-[#ff5500]/10 z-0" />
        {/* Avatar overlapping the banner */}
        <img
          src={avatarUrl}
          alt={name}
          className="absolute -bottom-8 left-4 h-16 w-16 rounded-full object-cover ring-4 ring-white z-10"
        />
      </div>

      {/* Content */}
      <div className="p-4 pt-14">
        <div className="flex justify-between items-center w-full">
          <div className="text-lg mr-14 font-semibold text-[#ff5500]">{name}</div>
          <button
            onClick={handleJoinClick}
            className="px-4 py-2 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] transition-colors whitespace-nowrap z-10"
          >
            Join
          </button>
        </div>

        {subtitle && (
          <div className="mt-3 text-[#ff5500] flex items-center gap-2">
            <span role="img" aria-label="place">🛒</span>
            <span className="opacity-90">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
