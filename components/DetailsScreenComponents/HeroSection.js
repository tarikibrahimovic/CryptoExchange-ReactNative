import React from "react";
import styled from "styled-components";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const SymbolText = styled.Text`
  margin-bottom: 18px;
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 16px;
`;

const NameText = styled.Text`
  color: #fff;
  font-size: 24px;
`;

const ChangeText = styled.Text`
  margin-top: 18px;
  font-size: 18px;
`;

export default function HeroSection({ coin }) {
  let price = parseFloat(coin.price);
  return (
    <Container>
      <SymbolText>{coin.symbol}</SymbolText>
      <NameText>{coin.name}</NameText>
      <NameText>${price.toFixed(2)}</NameText>
      <ChangeText 
        style={{ color: coin.change > 0 ? "#4caf50" : "#f44336" }}
      >{coin.change}%</ChangeText>
    </Container>
  );
}
