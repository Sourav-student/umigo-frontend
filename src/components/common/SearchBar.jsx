import React from 'react';

function SearchBar({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="w-full max-w-2xl mx-auto h-16 flex items-center">
      <label htmlFor="page-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <input
          id="page-search"
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white placeholder-gray-400 text-current focus:outline-none focus:ring-2 focus:ring-[#ff5500] border border-gray-200 text-sm md:text-base"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center text-current/60">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;