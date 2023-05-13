import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Text } from "react-native";
import { CoinsList } from "../../context/CryptoContext";
import { COIN_URL, COIN_OPTIONS } from "../../env";
import DetailsHeader from "../../components/DetailsScreenComponents/DetailsHeader";

export default function CoinDetailsScreen() {
  const { fetchCoins } = useContext(CoinsList);
  const [coin, setCoin] = useState();
  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [sparkline, setSparkline] = useState([]);
  const [sparklineColor, setSparklineColor] = useState("green");
  const route = useRoute();
  const { coinId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    fetch(COIN_URL(coinId), COIN_OPTIONS)
      .then((response) => response.json())
      .then((data) => {
        setCoin(data.data.coin);
        const reformated = data.data.coin.sparkline.map((item) => {
          return parseInt(item);
        });
        if (reformated[reformated.length - 1] < reformated[reformated.length - 2]) {
          setSparklineColor("red");
        }
        setSparkline(reformated);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(coin);

  return (
    <>
      <DetailsHeader coinId={coinId}/>
      {!isLoading && (
        <LineChart
          style={{ height: 200 }}
          data={sparkline}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{ stroke: sparklineColor }}
        >
          <Grid />
        </LineChart>
      )}
      <Text onPress={() => (navigate.navigate("Home"))}>nesot nesto</Text>
    </>
  );
}
