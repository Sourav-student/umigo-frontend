import React from 'react';

export default function Pagination({ current = 1, total = 1, onChange }) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        onClick={() => onChange?.(Math.max(1, current - 1))}
        disabled={current === 1}
        className="px-3 py-1 rounded-lg border border-[#ff5500]/30 disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange?.(p)}
          className={[
            'w-9 h-9 rounded-lg border text-sm',
            p === current
              ? 'bg-[#ff5500] text-white border-[#ff5500]'
              : 'bg-white text-[#ff5500] border-[#ff5500]/30'
          ].join(' ')}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange?.(Math.min(total, current + 1))}
        disabled={current === total}
        className="px-3 py-1 rounded-lg border border-[#ff5500]/30 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
