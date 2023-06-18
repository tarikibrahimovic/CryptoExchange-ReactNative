import React, { useContext, useEffect, useState } from "react";
import { CoinsList } from "../../context/CryptoContext";
import styled from "styled-components";
import CollectionCoin from "./CollectionCoin";
import EmptySection from "./EmptySection";

export default function UserCollection() {
  const { user, getCoin } = useContext(CoinsList);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    setCoins((prev) => {
      return user?.exchanges.map((coin) => getCoin(coin.coinId));
    });
  }, []);

  return (
    <Container>
      <Title>My Collection</Title>
      <Line />
      {coins.length > 0 ? (
        coins?.map((coin, index) => {
          return <CollectionCoin key={index} coin={coin} />;
        })
      ) : (
        <EmptySection
          option="collection"
          title={"You have no coins in your collection!"}
          subtitle={"Buy coins!"}
        />
      )}
      <Line />
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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
