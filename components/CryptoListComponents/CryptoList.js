import React, { useContext, useEffect, useState } from "react";
import CryptoListItem from "./CryptoListItem";
import { CoinsList } from "../../context/CryptoContext";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { LineChart, Grid } from "react-native-svg-charts";
// import * as shape from "d3-shape";

export default function CryptoList() {
  const {
    active,
    filter,
    isLoading,
    setIsLoading,
    favoriteCoins,
    // coins,
    // setCoins,
    fetchCoins,
  } = useContext(CoinsList);
  
  const [filteredData, setFilteredData] = useState([]);
  const [coins, setCoins] = useState([]);

  // const url =
  //   "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "content-type": "application/octet-stream",
  //     "X-RapidAPI-Key": "07aedaa6bdmsh5086c5b7fe24ecep1ca830jsnc57d502e51b1",
  //     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  //   },
  // };

  const apiUrl = process.env.COINS_URL;
  const apiOptions = process.env.COINS_OPTIONS;

  console.log(process.env.COINS_OPTIONS);

  // console.log(coins);

  // async function getCoins() {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     setCoins(result.data.coins);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    fetchCoins(apiUrl, apiOptions, setCoins);
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

  // function reformating() {
  //   const reformated = sparkline.map((item) => {
  //     return parseInt(item);
  //   });
  //   return reformated;
  // }

  return (
    <>
      {/* <LineChart
        style={{ height: 200 }}
        data={reformating()}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
      >
        <Grid/>
      </LineChart> */}
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
