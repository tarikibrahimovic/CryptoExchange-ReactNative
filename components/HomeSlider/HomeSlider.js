import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { View, Text } from "react-native";
import styled from "styled-components";
import { CoinsList } from "../../context/CryptoContext";
import RecommendedCoin from "../WalletScreenComponents/RecommendedCoin";

export default function HomeSlider() {
  const [views, setViews] = useState([]);
  const { coins } = useContext(CoinsList);

  useEffect(() => {
    setViews(
        [...coins].slice(0, 3).map((coin) => <RecommendedCoin key={coin.uuid} coin={coin} />)
    )
  }, []);

  return (
    <Container>
      <Carousel
        data={views}
        renderItem={({ item }) => item}
        sliderWidth={330} // Set the width of the slider
        itemWidth={330} // Set the width of each item/view
      />
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
