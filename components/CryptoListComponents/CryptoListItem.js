import React, { useContext } from "react";
import { Avatar, Card } from "react-native-paper";
import SvgUri from "react-native-svg-uri";
import styled from "styled-components";
import defaultCoin from "../../assets/defaultCoin.png";
import { useNavigation } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext";

const CustomCard = styled(Card)`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #29313c;
`;

const PriceText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const PercentageText = styled.Text`
  color: ${(props) => (props.positive ? "green" : "red")};
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

const CryptoListItem = ({ coin, type = "details" }) => {
  const { allowedCoins } = useContext(CoinsList);

  const navigation = useNavigation();

  return (
    <>
      <CustomCard
        onPress={() => {
          type === "details"
            ? navigation.navigate("HomeStack", {
                screen: "Details",
                params: { coinId: coin.uuid },
              })
            : navigation.navigate("HomeStack", {
                screen: "Calculator",
                params: { coinId: coin.uuid },
              });
        }}
      >
        <Card.Title
          title={coin?.name}
          subtitle={coin?.symbol}
          titleStyle={{ color: "#fff" }}
          subtitleStyle={{ color: "#fff" }}
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
            <>
              <PercentageText
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {coin.change}%
              </PercentageText>
              <PriceText
                style={{
                  fontSize: 16,
                }}
              >
                {coin.price.slice(0, 10)}$
              </PriceText>
            </>
          )}
        />
      </CustomCard>
    </>
  );
};

export default CryptoListItem;
