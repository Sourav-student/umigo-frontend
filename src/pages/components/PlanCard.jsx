import React from 'react';

function PlanCard({
  bannerImage,
  avatarUrl,
  name,
  subtitle,
  onJoin,
  glow = false,
  className = '',
}) {
  return (
    <div
      className={[
        'relative bg-white rounded-2xl border border-[#ff5500]/20 shadow-sm overflow-hidden w-full max-w-md mx-auto',
        glow ? 'shadow-[0_0_24px_rgba(255,85,0,0.18)]' : '',
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
          className="absolute -bottom-8 left-4 h-24 w-24 rounded-full object-cover ring-4 ring-white z-10"
        />
      </div>

      {/* Content */}
      <div className="p-4 pt-14">
        <div className="flex justify-between items-center w-full">
          <div className="text-lg mr-14 font-semibold text-[#ff5500]">{name}</div>
          <button
            onClick={onJoin}
            className="px-4 py-2 bg-[#ff5500] text-white rounded-xl hover:bg-[#e64d00] transition-colors whitespace-nowrap"
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
