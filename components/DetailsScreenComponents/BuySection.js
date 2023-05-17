import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.primary};
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

const BuyButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 40%;
`;

const BuyText = styled.Text`
  color: black;
  font-size: 18px;
  text-align: center;
`;

const PriceText = styled.Text`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 16px;
  width: 50%;
`;

export default function BuySection({ coin }) {
    const navigation = useNavigation();
  return (
    <Container>
      <PriceText>Current Price: ${parseFloat(coin.price).toFixed(2)}</PriceText>
      <BuyButton
        onPress={() => {
            console.log("pressed");
            navigation.navigate("HomeStack", { screen: "Calculator", params: { coin } });
        }}
      >
        <BuyText>Buy</BuyText>
      </BuyButton>
    </Container>
  );
}
