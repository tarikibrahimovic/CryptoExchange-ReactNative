import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import SvgUri from "react-native-svg-uri";
import { theme } from "../../theme/index.js";

export default function RecommendedCoin({ coin }) {
  const navigation = useNavigation();

  return (
    <Container>
      <Card.Title
        title={coin.name}
        subtitle={parseFloat(coin.price).toFixed(2) + " $"}
        titleStyle={{ color: "#fff" }}
        subtitleStyle={{ color: theme.colors.tertiary }}
        left={(props) => (
          <SvgUri
            {...props}
            width="50"
            height="50"
            source={{
              uri: coin.iconUrl,
            }}
          />
        )}
        right={(props) => (
          <BuyButton
            onPress={() =>
              navigation.navigate("HomeStack", {
                screen: "Details",
                params: { coinId: coin.uuid },
              })
            }
          >
            <BuyButtonText>See</BuyButtonText>
          </BuyButton>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  flex-direction: column;
  border-radius: 10px;
  width: 95%;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
`;

const BuyButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  width: 100px;
  align-items: center;
  justify-content: center;
`;

const BuyButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;
