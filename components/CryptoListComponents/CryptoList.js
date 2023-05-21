import React, { useContext, useEffect, useState } from "react";
import CryptoListItem from "./CryptoListItem";
import { CoinsList } from "../../context/CryptoContext";
import { ActivityIndicator } from "react-native";
import { COINS_URL, COINS_OPTIONS } from "../../env";

export default function CryptoList() {
  const {
    active,
    filter,
    isLoading,
    setIsLoading,
    favoriteCoins,
    setFavoriteCoins,
    coins,
    setCoins,
    user,
  } = useContext(CoinsList);

  const [filteredData, setFilteredData] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const start = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(COINS_URL, COINS_OPTIONS);
        const data = await response.json();
        setCoins(data.data.coins);
        setFavoriteCoins(data.data.coins.slice(0, 6));
        setIsLoading(false);
        setStart(1);
      } catch (error) {
        console.log(error);
      }
    };
    start();
  }, []);

  useEffect(() => {
    if (start === 0) return;
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
        if (!user.isVerified || user.username === "") {
          setFilteredData([...coins].slice(0, 6));
        } else {
          let pom = coins.filter((coin) => {
            return user.favorites?.includes(coin.uuid);
          });
          setFilteredData(pom);
        }
      }, 10);
    }
    setIsLoading(false);
  }, [filter, active, start]);


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
}
