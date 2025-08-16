import React from 'react';

function SpotlightDetailCard({ user, onClose, onApproach, onChat }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#ff5500]/20 p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        {/* Back */}
        <button onClick={onClose} className="text-[#ff5500] mb-2" aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        <div className="border border-[#ff5500]/20 rounded-2xl p-4">
          <img src={user.avatarUrl} alt={user.name} className="h-44 w-44 mx-auto rounded-full object-cover" />

          <div className="text-center text-[#ff5500] mt-4">
            <div className="font-semibold text-lg">{user.name}</div>
            {user.location && (
              <div className="mt-1 flex items-center justify-center gap-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                <span>{user.location}</span>
              </div>
            )}
            {user.note && (
              <div className="mt-2 text-xs opacity-80">{user.note}</div>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={onApproach} className="h-11 rounded-xl bg-[#ff5500] text-white font-semibold hover:bg-[#e64d00]">Approach</button>
          <button onClick={onChat} className="h-11 rounded-xl bg-white border border-[#ff5500]/30 text-[#ff5500] font-semibold">Chat</button>
        </div>
      </div>
    </div>
  );
}

export default SpotlightDetailCard;
