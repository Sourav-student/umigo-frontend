import React from 'react';

function PlanDetailCard({ plan, onClose, onJoin, onChat }) {
  if (!plan) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#ff5500]/20 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          {/* Back */}
          <button onClick={onClose} className="text-[#ff5500] mb-2" aria-label="Back">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>

          {/* Banner */}
          {plan.bannerImage && (
            <div className="relative mb-4">
              <img src={plan.bannerImage} alt="" className="w-full h-28 object-cover rounded-2xl opacity-85" />
            </div>
          )}

          {/* Profile row */}
          <div className="flex items-center gap-3">
            <img src={plan.avatarUrl} alt={plan.name} className="h-14 w-14 rounded-full object-cover" />
            <div className="text-[#ff5500] font-semibold text-lg">{plan.name}</div>
          </div>

          {/* Details */}
          <div className="mt-4 space-y-3 text-[#ff5500]">
            {plan.subtitle && (
              <div className="flex items-center gap-2 text-sm">
                <span role="img" aria-label="movie">🎬</span>
                <span>{plan.subtitle}</span>
              </div>
            )}
            {plan.time && (
              <div className="flex items-center gap-2 text-sm">
                <span role="img" aria-label="time">🕒</span>
                <span>{plan.time}</span>
              </div>
            )}
            {plan.location && (
              <div className="flex items-center gap-2 text-sm">
                <span role="img" aria-label="location">📍</span>
                <span>{plan.location}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={onJoin} className="h-11 rounded-xl bg-[#ff5500] text-white font-semibold hover:bg-[#e64d00]">Join</button>
            <button onClick={onChat} className="h-11 rounded-xl bg-white border border-[#ff5500]/30 text-[#ff5500] font-semibold">Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanDetailCard;
