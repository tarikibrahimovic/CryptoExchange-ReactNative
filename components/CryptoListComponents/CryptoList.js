import React, { useContext, useEffect, useState } from "react";
import CryptoListItem from "./CryptoListItem";
import { CoinsList } from "../../context/CryptoContext";
import { ActivityIndicator } from "react-native";
import {COINS_URL, COINS_OPTIONS} from "../../env";


export default function CryptoList() {
  const {
    active,
    filter,
    isLoading,
    setIsLoading,
    favoriteCoins,
    coins,
    setCoins,
    fetchCoins,
  } = useContext(CoinsList);
  
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchCoins(COINS_URL, COINS_OPTIONS, setCoins);
  }, []);

  // useEffect(() => {
  //   fetch("https://api.coingecko.com/api/v3/search/trending", {
  //     method: "GET",
  //   }).then((response) => response.json())
  //   .then((result) => {
  //     setHotCoins(result.coins);
  //     console.log(result.coins);
  //   }).catch((error) => console.log("error", error));
  // }, []);


  useEffect(() => {
    setIsLoading(true);
    if (active === "Top10") {
      let pom = [...coins];
      setFilteredData([]);
      setTimeout(() => {
        if (filter === "Hot") {
          setFilteredData(pom);
        } else if (filter === "Market Cap") {
          setFilteredData(
            pom.sort(
              (a, b) => parseFloat(a.marketCap) + parseFloat(b.marketCap)
            )
          );
        } else if (filter === "ASC") {
          setFilteredData(
            pom.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
          );
        } else if (filter === "DESC") {
          setFilteredData(
            pom.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
          );
        }
      }, 10);
    } else if (active === "WatchList") {
      setFilteredData([]);
      setTimeout(() => {
        setFilteredData(favoriteCoins);
      }, 10);
    }
    setIsLoading(false);
  }, [filter, active]);


  return (
    <>
      {!isLoading ? (
        filteredData.map((item, index) => (
          <CryptoListItem coin={item} index={index} />
        ))
      ) : (
        <ActivityIndicator size="large" />
      )}
    </>
  );
  isLoading;
}
