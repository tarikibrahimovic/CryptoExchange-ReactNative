import React, { useState } from "react";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_URL } from "../../env.js";

export default function VerificationScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState("");
  
  const navigation = useNavigation();

  const handleLogin = () => {
    fetch(`${BACKEND_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: verificationCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrors(data.error);
        } else {
          setErrors("");
          navigation.navigate("AuthStack", { screen: "LoginScreen" });
        }
      })
      .catch((error) => {
        setErrors(error.error);
      });
  };

  return (
    <Container>
      <Title>Verification Screen</Title>
      <TextInput
        label="Verification Code"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
        style={{ width: "80%", marginBottom: 20 }}
      />
      <Button onPress={() => handleLogin()}>
        <ButtonText>Verify</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
`;

const ButtonText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
