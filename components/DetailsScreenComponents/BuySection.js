import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext";

export default function BuySection({ coin }) {
  const { user } = useContext(CoinsList);
  const navigation = useNavigation();
  return (
    <Container>
      <PriceText>Current Price: ${parseFloat(coin.price).toFixed(2)}</PriceText>
      <BuyButton
        onPress={() => {
          if (user.username === "") {
            navigation.navigate("AuthStack", { screen: "Login" });
          } else if (!user.isVerified) {
            navigation.navigate("HomeStack", { screen: "Verification" });
          } else {
            navigation.navigate("HomeStack", {
              screen: "Calculator",
              params: { coin },
            });
          }
        }}
      >
        <BuyText>
          {user.username === ""
            ? "Log In to Buy"
            : user.isVerified
            ? "Buy"
            : "Verify to Buy"}
        </BuyText>
      </BuyButton>
    </Container>
  );
}

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
