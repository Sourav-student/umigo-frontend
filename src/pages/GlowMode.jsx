import React, { useState } from 'react';

export default function GlowMode() {
  const [vibe, setVibe] = useState('Netflix & Chill');
  const [duration, setDuration] = useState('1 Hour');
  const [discover, setDiscover] = useState('Public');

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-extrabold text-center text-[#ff5500] mb-5">GlowMode</h1>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-semibold text-[#ff5500] mb-2">Vibe</div>
          <input value={vibe} onChange={(e)=>setVibe(e.target.value)} className="w-full h-12 rounded-xl border border-[#ff5500]/40 px-4 bg-white" />
        </div>

        <div>
          <div className="text-sm font-semibold text-[#ff5500] mb-2">Duration</div>
          <div className="grid grid-cols-3 gap-2">
            {['30 Mins','1 Hour','1 Day'].map(opt => (
              <button key={opt} onClick={()=>setDuration(opt)} className={['h-10 rounded-xl border', duration===opt ? 'bg-[#ff5500] text-white border-[#ff5500]' : 'bg-white border-[#ff5500]/40'].join(' ')}>{opt}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[#ff5500] mb-2">Discoverability</div>
          <div className="grid grid-cols-2 gap-2">
            {['Public','Friends'].map(opt => (
              <button key={opt} onClick={()=>setDiscover(opt)} className={['h-10 rounded-xl border', discover===opt ? 'bg-[#ff5500] text-white border-[#ff5500]' : 'bg-white border-[#ff5500]/40'].join(' ')}>{opt}</button>
            ))}
          </div>
        </div>
      </div>

      <button className="mt-6 w-full h-12 rounded-xl bg-[#ff5500] text-white font-semibold">Save</button>
    </div>
  );
}
