import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { CoinsList } from "../../context/CryptoContext";
import { COIN_URL, COIN_OPTIONS } from "../../env";

export default function CoinDetailsScreen() {
  const { fetchCoins } = useContext(CoinsList);
  const [coin, setCoin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { coinId } = route.params;

  function reformating() {
    const reformated = coin.sparkline.map((item) => {
      return parseInt(item);
    });
    return reformated;
  }

  // console.log(COIN_URL(coinId));

  useEffect(() => {
    // fetchCoins(COIN_URL(coinId), COIN_OPTIONS, setCoin);
    setIsLoading(true);
    fetch(COIN_URL(coinId), COIN_OPTIONS)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data.coin.sparkline);
        setCoin((prev) => (prev = result.data.coin));
        // setIsLoading(false);
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false))
  }, []);

  console.log(isLoading);

  return (
    <>
      {!isLoading && (
        <LineChart
          style={{ height: 200 }}
          data={reformating()}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        >
          <Grid />
        </LineChart>
        // <Text>nesot nesto</Text>
      )}
    </>
  );
}
