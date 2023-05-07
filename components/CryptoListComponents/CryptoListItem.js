import React from "react";
import { Avatar, Card, IconButton } from "react-native-paper";
import SvgUri from "react-native-svg-uri";
import styled from "styled-components";
import defaultCoin from "../../assets/defaultCoin.png"

const CustomCard = styled(Card)`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #29313c;
`;

const PriceText = styled.Text`
  color: ${(props) => (props.positive ? "red" : "green")};
  font-size: 16px;
`;

const PercentageText = styled.Text`
  color: ${(props) => (props.positive ? "red" : "green")};
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

const CryptoListItem = ({ coin }) => {
  let allowedCoins = [
    "Bitcoin",
    "Ethereum",
    "Litecoin",
    "Ripple",
    "Dogecoin",
    "Tether USD",
    "BNB",
    "Cardano",
    "Polkadot",
    "XRP",
    "Bitcoin Cash",
    "Ethereum Classic",
  ];
  return (
    <>
      <CustomCard>
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
            ) : (
              allowedCoins.includes(coin.name) ? (
                <SvgUri
                  {...props}
                  width="50"
                  height="50"
                  source={{
                    uri: coin.iconUrl,
                  }}
                />
              ) :
              // <SvgXml xml={logo()} height="70" width="70" {...props} color="white" />
              <Avatar.Image {...props} size={50} source={defaultCoin} />
            )
          }
          right={(props) => (
            <>
              <PriceText
                style={{
                  color: coin.change < 0 ? "red" : "green",
                  fontSize: 16,
                }}
              >
                {coin.price.slice(0, 10)}$
              </PriceText>
              <PercentageText
                style={{
                  color: coin.change < 0 ? "red" : "green",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {coin.change}%
              </PercentageText>
            </>
          )}
        />
      </CustomCard>
    </>
  );
};

export default CryptoListItem;
