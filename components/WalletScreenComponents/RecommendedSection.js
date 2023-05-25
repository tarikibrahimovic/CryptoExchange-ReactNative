import React, { useContext } from "react";
import { CoinsList } from "../../context/CryptoContext";
import RecommendedCoin from "./RecommendedCoin";
import styled from "styled-components";

export default function RecommendedSection() {
  const { coins } = useContext(CoinsList);

  return (
    <Container>
      <Title>Recommended Coins</Title>
      <Line />
      {coins.map((coin, index) => {
        if (index < 3) return <RecommendedCoin coin={coin} />;
      })}
      <Line />
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin: 10px;
  text-align: center;
`;

const Line = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 1px;
  margin: 10px;
`;
