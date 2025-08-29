import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const openSearch = () => setShowSearch(true);
  const closeSearch = () => setShowSearch(false);

  return (
    <SearchContext.Provider value={{ showSearch, toggleSearch, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}