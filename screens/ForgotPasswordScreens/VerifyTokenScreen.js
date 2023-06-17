import React, { useState } from "react";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BACKEND_URL } from "../../env.js";
import CustomHeader from "../../components/UserComponents/CustomHeader.js";
import { theme } from "../../theme/index.js";
import { ActivityIndicator } from "react-native";

export default function VerifyTokenScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState("");
  const { email } = useRoute().params;
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const response = await fetch(
      `${BACKEND_URL}/auth/checkForgotPasswordToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          token: verificationCode,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      setErrors(data.error);
    } else {
      setErrors("");
      setMessage(data.message);
    navigation.navigate("HomeStack", {
        screen: "ResetPassword",
        params: { email: email, token: verificationCode },
      });
    }
  };

  return (
    <>
      {!fetching ? (<><CustomHeader headerText={"Verification"} />
      <Container>
        <Title>Check your email for the token</Title>
        <Line />
        {message && <MessageText>{message}</MessageText>}
        {errors && <ErrorText>{errors}</ErrorText>}
        <InputContainer>
          <CustomTextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            contentStyle={{ color: "white" }}
            placeholderTextColor={theme.colors.tertiary}
            underlineColor="#FCD434"
            activeUnderlineColor={theme.colors.tertiary}
          />
        </InputContainer>
        <Button onPress={() => handleSubmit()}>
          <ButtonText>Check Token</ButtonText>
        </Button>
      </Container></>) : (<ActivityIndicator size="large" color="#FCD434" />)}
    </>
  );
}

const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const MessageText = styled.Text`
  font-size: 16px;
  color: white;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Line = styled.View`
  width: 90%;
  height: 1px;
  background-color: #fff;
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors.primary};
`;

const CustomTextInput = styled(TextInput)`
  width: 95%;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
`;

const Container = styled.View`
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
  margin: 20px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
