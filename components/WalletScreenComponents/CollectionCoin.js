import React, { useState, useContext, useEffect } from "react";
import { CoinsList } from "../../context/CryptoContext";
import styled from "styled-components";
import { Avatar, Card } from "react-native-paper";
import SvgUri from "react-native-svg-uri";
import defaultCoin from "../../assets/defaultCoin.png";
import { theme } from "../../theme/index.js";
import { useNavigation } from "@react-navigation/native";

export default function CollectionCoin({ coin }) {
  const { user, allowedCoins } = useContext(CoinsList);
  const [paidPrice, setPaidPrice] = useState(0.0);
  const [percentage, setPercentage] = useState(0.0);

  const navigation = useNavigation();

  useEffect(() => {
    const price = parseFloat(
      user?.exchanges?.find((item) => item.coinId === coin.uuid)?.coinPrice
    ).toFixed(2);
    setPercentage(((coin.price - price) / price) * 100);
    setPaidPrice(price);
  }, []);

  return (
    <Container
      onPress={() =>
        navigation.navigate("HomeStack", {
          screen: "Details",
          params: { coinId: coin.uuid },
        })
      }
    >
      <Card.Title
        title={coin?.name}
        subtitle={`Bought for: ${paidPrice}`}
        titleStyle={{ color: "#fff" }}
        subtitleStyle={{ color: theme.colors.tertiary }}
        left={(props) =>
          coin.iconUrl.includes("png" || "jpg") ? (
            <Avatar.Image
              {...props}
              size={50}
              source={{
                uri: coin.iconUrl,
              }}
            />
          ) : allowedCoins.includes(coin.name) ? (
            <SvgUri
              {...props}
              width="50"
              height="50"
              source={{
                uri: coin.iconUrl,
              }}
            />
          ) : (
            <Avatar.Image {...props} size={50} source={defaultCoin} />
          )
        }
        right={(props) => (
          <TextContainer>
            <PercentageText
              style={{ color: percentage > 0 ? "#00ff00" : "#ff0000" }}
            >
              {percentage > 0
                ? `+${percentage.toFixed(2)}%`
                : `${percentage.toFixed(2)}%`}
            </PercentageText>
            <CurrentPriceText>
              $ {parseFloat(coin?.price).toFixed(2)}
            </CurrentPriceText>
          </TextContainer>
        )}
      />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  flex-direction: column;
  border-radius: 10px;
  width: 95%;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
`;

const PercentageText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
`;

const CurrentPriceText = styled.Text`
  font-size: 16px;
  margin: 5px;
  color: ${(props) => props.theme.colors.tertiary};
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 10px;
`;
