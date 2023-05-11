import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { CoinsList } from "../../context/CryptoContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Option = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #707889;
    padding: 5px 10px;
    border-radius: 15px;
`;

const OptionText = styled.Text`
    color: #fff;
    font-size: 16px;
`;

export default function CalculatorScreen() {
  const { getCoin, allowedCoins } = useContext(CoinsList);
  const coinId = useRoute().params.coinId;
  const [coin, setCoin] = useState();
  const [option, setOption] = useState("Sell");

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Exchange");
    };

  useEffect(() => {
    setCoin(getCoin(coinId));
  }, []);

  console.log(coin);

  return (
    <>
      <Header>
        <AntDesign name="arrowleft" size={24} color="#707889" onPress={handleBackPress}/>
        <Option>
            {option === "Sell" ? (
                <OptionText onPress={() => setOption("Buy")}>Sell</OptionText>
            ) : (
                <OptionText onPress={() => setOption("Sell")}>Buy</OptionText>
            )}
        </Option>
      </Header>
    </>
  );
}
