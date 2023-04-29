import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CryptoListItem from "./CryptoListItem";
// import { SvgUri } from "react-native-svg";
import SvgUri from "react-native-svg-uri";
// import { useNavigation } from "@react-navigation/native";
// import { LineChart, Grid } from "react-native-svg-charts";
// import * as shape from "d3-shape";

export default function CryptoList() {
  const [coins, setCoins] = useState([]);

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
        //remove 9th element from array
        result.data.coins.splice(9, 1);
        result.data.coins.splice(18, 2);
        console.log(result.data.coins[1].iconUrl);
        setCoins(result.data.coins);
      })
      .catch((error) => console.log("error", error));
  }, []);

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
      {/* <FlatList
        data={coins}
        renderItem={({ item }) => {
        return <CryptoListItem coin={item} iconUrl={item.iconUrl} />
      }}
        keyExtractor={(item) => item.uuid}
      /> */}
      {/* <SvgUri
        width="50"
        height="50"
        // uri={coins[4].iconUrl}
        // uri="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
        source={{uri: "https://cdn.coinranking.com/jkDf8sQbY/usdc.svg"}}
      /> */}
    </>
  );
}
