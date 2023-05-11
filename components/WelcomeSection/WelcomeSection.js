import React from "react";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  margin: 0 10px;
  margin-top: 20px;
  padding: 20px 0;
  background-color: #29313c;
  border-radius: 10px;
  gap: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Line = styled.View`
  height: 1px;
  width: 90%;
  background-color: #fff;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export default function WelcomeSection() {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <TextContainer>
          <Title>Welcome to Crypto Exchange</Title>
          <FontAwesome5 name="coins" size={30} color="#FCD434" />
        </TextContainer>
        <Line />
        <ButtonContainer>
          <Button
            mode="outlined"
            textColor="white"
            onPress={() => {
              navigation.navigate("AuthStack", { screen: "Register" });
            }}
          >
            Sign Up
          </Button>
          <Button
            mode="contained"
            buttonColor="#FCD434"
            textColor="#000"
            onPress={() => {
              navigation.navigate("AuthStack", { screen: "Login" });
            }}
          >
            Login
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
}
