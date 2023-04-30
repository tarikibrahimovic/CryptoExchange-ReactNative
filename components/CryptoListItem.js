import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import SvgUri from "react-native-svg-uri";
import styled from "styled-components";

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


  return (
    <View>
      <CustomCard>
        <Card.Title
          title={coin?.name}
          subtitle={coin?.symbol}
          titleStyle={{ color: "#fff" }}
          subtitleStyle={{ color: "#fff" }}
          right={(props) => (
            <>
            <PriceText style={{ color: coin.change < 0 ? "red" : "green", fontSize: 16 }}>{
              coin.price.slice(0,10)              
            }$</PriceText>
            <PercentageText style={{ color: coin.change < 0 ? "red" : "green", fontSize: 16, fontWeight: "bold" }}>
              {coin.change}%
            </PercentageText>
            </>
          )}
        />
      </CustomCard>
    </View>
  );
};

export default CryptoListItem;
