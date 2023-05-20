import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext.js";

export default function LogOutButton() {
  const { setUser } = useContext(CoinsList);

  const navigation = useNavigation();

  const logOut = async () => {
    await SecureStore.deleteItemAsync("jwtToken");
    await SecureStore.deleteItemAsync("username");
    setUser((prev) => {
      return {
        username: "",
        email: "",
        role: "",
        token: "",
        isVerified: false,
      };
    });
    navigation.navigate("Home");
  };

  return (
    <>
      <Container>
        <SubmitButton
          onPress={() => {
            logOut();
          }}
        >
          <SubmitButtonText>Log out</SubmitButtonText>
        </SubmitButton>
      </Container>
    </>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
`;

const SubmitButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding: 5px;
`;

const SubmitButtonText = styled.Text`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
