import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LineChart, Grid } from "react-native-svg-charts";
import { COIN_URL, COIN_OPTIONS } from "../../env";
import DetailsHeader from "../../components/DetailsScreenComponents/DetailsHeader";
import HeroSection from "../../components/DetailsScreenComponents/HeroSection";
import AboutSection from "../../components/DetailsScreenComponents/AboutSection";
import styled from "styled-components";
import BuySection from "../../components/DetailsScreenComponents/BuySection";

export default function CoinDetailsScreen() {
  const [coin, setCoin] = useState();
  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
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
        if (data.data.coin.change < 0) {
          setSparklineColor("red");
        }
        setSparkline(reformated);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <DetailsHeader coinId={coinId} />
          <CustomScrollView>
            <HeroSection coin={coin} />
            <LineChart
              style={{ height: 200 }}
              data={sparkline}
              contentInset={{ top: 30, bottom: 30 }}
              svg={{ stroke: sparklineColor }}
            >
              <Grid />
            </LineChart>
            <AboutSection coin={coin} />
          </CustomScrollView>
          <BuySection coin={coin} />
        </>
      )}
    </>
  );
}

const CustomScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;
`;
