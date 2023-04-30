import React, { createContext, useState } from "react";

const CoinsList = createContext();

const CryptoContextProvider = ({ children }) => {
  const [active, setActive] = useState("WatchList");
  const [filter, setFilter] = useState("Hot");

  const value = {
    active,
    setActive,
    filter,
    setFilter,
  };

  return <CoinsList.Provider value={value}>{children}</CoinsList.Provider>;
};

export { CryptoContextProvider, CoinsList };