import React, { useContext, useEffect, useState } from "react";
import CryptoListItem from "./CryptoListItem";
import { CoinsList } from "../context/CryptoContext";
// import { useNavigation } from "@react-navigation/native";
// import { LineChart, Grid } from "react-native-svg-charts";
// import * as shape from "d3-shape";

export default function CryptoList() {
  const [coins, setCoins] = useState([]);
  const { active, filter } = useContext(CoinsList);
  const [filteredData, setFilteredData] = useState([]);
  const [hotCoins, setHotCoins] = useState([]);

  const url =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "07aedaa6bdmsh5086c5b7fe24ecep1ca830jsnc57d502e51b1",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  // async function getCoins() {
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     setCoins(result.data.coins)
  //     // console.log(result.data.coins[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // getCoins();

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        setCoins(result.data.coins);
        setFilteredData(result.data.coins);
        // console.log(result.data.coins[0], result.data.coins[1], result.data.coins[2]);
      })
      .catch((error) => console.log("error", error));
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
    if (filter === "Hot") {
      setFilteredData(coins.sort((a, b) => a["24hVolume"] - b["24hVolume"]));
    } else if (filter === "Market Cap") {
      setFilteredData(coins.sort((a, b) => a.marketCap - b.marketCap));
    } else if (filter === "Price") {
      setFilteredData(coins.sort((a, b) => a.price - b.price));
    }
  }, [filter]);

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
      {filteredData.map((item, index) => 
      (
        <CryptoListItem coin={item} index={index} />
      )
        
      )}
    </>
  );
}
