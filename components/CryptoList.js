import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import CryptoListItem from "../components/CryptoListItem";
import { useNavigation } from "@react-navigation/native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

export default function CryptoList({ cryptoList }) {
  const [sparkline, setSparkline] = useState([]);

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

  async function getCoins() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setSparkline(result.data.coins[0].sparkline)
    } catch (error) {
      console.error(error);
    }
  }
  getCoins();

  function reformating() {
    const reformated = sparkline.map((item) => {
      return parseInt(item);
    });
    return reformated;
  }

  return (
    <View>
      <LineChart
        style={{ height: 200 }}
        data={reformating()}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
      >
        <Grid/>
      </LineChart>
    </View>
  );
}
