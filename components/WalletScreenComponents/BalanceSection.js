import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../theme/index";
import { CoinsList } from "../../context/CryptoContext";

export default function BalanceSection() {
  const [showBalance, setShowBalance] = useState(true);
  const { user } = useContext(CoinsList);
  const navigation = useNavigation();

  return (
    <Container>
      <TitleView>
        <Title>Total Balance</Title>
        {showBalance ? (
          <Entypo
            name="eye"
            size={24}
            color={theme.colors.tertiary}
            onPress={() => setShowBalance(false)}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={24}
            color={theme.colors.tertiary}
            onPress={() => setShowBalance(true)}
          />
        )}
      </TitleView>
      <BalanceText>{showBalance ? user.balance : "****"}</BalanceText>
      <BuyButton>
        <BuyText>Buy</BuyText>
      </BuyButton>
      <DepositText>
        Want to deposit?{" "}
        <LogoDepositText
          onPress={() =>
            navigation.navigate("HomeStack", { screen: "Deposit" })
          }
        >
          Deposit Now
        </LogoDepositText>
      </DepositText>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #fff;
`;

const TitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const BalanceText = styled.Text`
  font-size: 36px;
  text-align: center;
  color: #fff;
`;

const BuyButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 15px 140px;
  border-radius: 5px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const BuyText = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const DepositText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.tertiary};
  margin-top: 20px;
`;

const LogoDepositText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.logo};
`;
