import React, { createContext, useState } from "react";

const CoinsList = createContext();

const CryptoContextProvider = ({ children }) => {
  const [active, setActive] = useState("WatchList");
  const [filter, setFilter] = useState("Hot");
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    active,
    setActive,
    filter,
    setFilter,
    isLoading,
    setIsLoading,
  };

  return <CoinsList.Provider value={value}>{children}</CoinsList.Provider>;
};

export { CryptoContextProvider, CoinsList };