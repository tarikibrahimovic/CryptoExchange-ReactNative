import React, { useContext, useEffect, useState } from "react";
import { Avatar, Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { CoinsList } from "../../context/CryptoContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import SvgUri from "react-native-svg-uri";
import defaultCoin from "../../assets/defaultCoin.png";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalculatorScreen() {
  const { getCoin, allowedCoins } = useContext(CoinsList);
  const coinId = useRoute().params.coinId;
  const [coin, setCoin] = useState();
  const [option, setOption] = useState("Sell");
  const [error, setError] = useState(false);
  const [payingOption, setPayinOption] = useState(true);
  const [amount, setAmount] = useState(0.0);
  const [query, setQuery] = useState(0.0);
  const [inputValue, setInputValue] = useState("");

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    let pomCoin = getCoin(coinId);
    setCoin(pomCoin);
  }, []);

  useEffect(() => {
    if (coin && inputValue.length > 0) {
      if (payingOption) {
        setAmount(query / coin.price);
      } else {
        setAmount(query * coin.price);
      }
    }
    else{
      setAmount(0.0);
    }
  }, [query, payingOption]);

  const logoHandler = () => {
    if (allowedCoins.includes(coin?.name)) {
      return (
        <SvgUri
          width="50"
          height="50"
          source={{
            uri: coin?.iconUrl,
          }}
        />
      );
    } else if (coin?.iconUrl.includes("png")) {
      return (
        <Avatar.Image
          size={50}
          source={{
            uri: coin?.iconUrl,
          }}
        />
      );
    } else {
      return (
        <Avatar.Image
          size={50}
          source={{
            uri: `https://cryptoicons.org/api/icon/${coin?.symbol?.toLowerCase()}/200`,
          }}
          onError={() => setError(true)}
        />
      );
    }
  };

  const handleQuery = (text) => {
    setInputValue(`${text}`);
    setQuery(parseFloat(text));
  };

  const handleKeyboard = (number) => {
    let pom = inputValue;
    if (number === -1) {
      pom = pom.slice(0, -1);
      setInputValue(pom);
      setQuery(parseFloat(pom));
    } else if (number === "." && !pom.includes(".")) {
      pom += number;
      setInputValue(pom);
    }
    else if (pom.length < 10) {
      pom += number.toString();
      setInputValue(pom);
      setQuery(parseFloat(pom));
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#707889"
            onPress={handleBackPress}
          />
          <Option>
            {option === "Sell" ? (
              <OptionText onPress={() => setOption("Buy")}>Sell</OptionText>
            ) : (
              <OptionText onPress={() => setOption("Sell")}>Buy</OptionText>
            )}
          </Option>
        </Header>
        <InfoHeader>
          {!error ? (
            logoHandler()
          ) : (
            <Avatar.Image size={50} source={defaultCoin} />
          )}
          <CoinNameText>{coin?.name}</CoinNameText>
        </InfoHeader>
        <Container>
          <LabelContainer>
            <LabelText style={{ color: "#707889" }}>I want to pay</LabelText>
            <Text
              style={{ color: "#FCD434" }}
              onPress={() => setPayinOption(!payingOption)}
            >
              By: {payingOption ? "Quantity" : "Amount"}{" "}
              <MaterialIcons name="compare-arrows" size={16} color="#FCD434" />
            </Text>
          </LabelContainer>
          <InputView>
            {query === 0 ? (
              <LabelText>Please enter the amount</LabelText>
            ) : (
              <OptionText>{inputValue}</OptionText>
            )}
            <LabelText>USD</LabelText>
          </InputView>
          {option === "Sell" && <LabelContainer>
            <OptionButton
              onPress={() => {
                handleQuery(20);
              }}
            >
              <OptionText>20</OptionText>
            </OptionButton>
            <OptionButton
              onPress={() => {
                handleQuery(50);
              }}
            >
              <OptionText>50</OptionText>
            </OptionButton>
            <OptionButton
              onPress={() => {
                handleQuery(100);
              }}
            >
              <OptionText>100</OptionText>
            </OptionButton>
          </LabelContainer>}
          <LabelContainer>
            <LabelText>
              Amount: {amount} {coin?.symbol}
            </LabelText>
          </LabelContainer>
          <Keyboard>
            <KeyboardRow>
              <KeyboardButton onPress={() => handleKeyboard(1)}>
                <KeyboardText>1</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(2)}>
                <KeyboardText>2</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(3)}>
                <KeyboardText>3</KeyboardText>
              </KeyboardButton>
            </KeyboardRow>
            <KeyboardRow>
              <KeyboardButton onPress={() => handleKeyboard(4)}>
                <KeyboardText>4</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(5)}>
                <KeyboardText>5</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(6)}>
                <KeyboardText>6</KeyboardText>
              </KeyboardButton>
            </KeyboardRow>
            <KeyboardRow>
              <KeyboardButton onPress={() => handleKeyboard(7)}>
                <KeyboardText>7</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(8)}>
                <KeyboardText>8</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(9)}>
                <KeyboardText>9</KeyboardText>
              </KeyboardButton>
            </KeyboardRow>
            <KeyboardRow>
              <KeyboardButton onPress={() => handleKeyboard(".")}>
                <KeyboardText>.</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(0)}>
                <KeyboardText>0</KeyboardText>
              </KeyboardButton>
              <KeyboardButton onPress={() => handleKeyboard(-1)}>
                <Feather name="delete" size={24} color="#fff" />
              </KeyboardButton>
            </KeyboardRow>
            <KeyboardRow>
              <FinalButton>
                <KeyboardText>{option === "Sell" ?  "Buy" : "Sell"}</KeyboardText>
              </FinalButton>
            </KeyboardRow>
          </Keyboard>
        </Container>
      </SafeAreaView>
    </>
  );
}

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

const InfoHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 20px;
`;

const CoinNameText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const Container = styled.View`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  flex: 1;
`;

const LabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const LabelText = styled(Text)`
  color: #707889;
  font-size: 14px;
`;

const InputView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #29313c;
  padding: 20px 30px;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: #29313c;
  border-radius: 20px;
  padding: 10px 30px;
  color: #fff;
`;

const Keyboard = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #1f2630;
`;

const KeyboardButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 5px;
  padding: 10px 0px;
  color: #fff;
  border-radius: 10px;
`;

const FinalButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 5px 10px;
  padding: 10px 0px;
  color: #fff;
  border-radius: 10px;
  background-color: #fcd434;
`;

const KeyboardText = styled.Text`
  color: #fff;
  font-size: 32px;
`;

const KeyboardRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
