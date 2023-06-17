import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_URL } from "../../env.js";
import CustomHeader from "../../components/UserComponents/CustomHeader.js";
import { CoinsList } from "../../context/CryptoContext.js";
import * as SecureStore from "expo-secure-store";

async function saveTokenAndUsername(token, username) {
  await SecureStore.setItemAsync("jwtToken", token);
  await SecureStore.setItemAsync("username", username);
}

// async function getTokenAndUsername() {
//   const token = await SecureStore.getItemAsync("jwtToken");
//   const username = await SecureStore.getItemAsync("username");
//   // return { token, username };
// }

export default function VerificationScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState("");
  const { user, setUser } = useContext(CoinsList);
  const [sendEmailPressed, setSendEmailPressed] = useState(false);
  const [emailResendTime, setEmailResendTime] = useState(60);
  const [message, setMessage] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    if (sendEmailPressed) {
      const timer = setInterval(() => {
        setEmailResendTime((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        setSendEmailPressed(false);
        setEmailResendTime(60);
      }, 60000);
    } else {
      setEmailResendTime(60);
    }
  }, [sendEmailPressed]);

  const handleVerify = async () => {
    const response = await fetch(`${BACKEND_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: verificationCode,
      }),
    });
    const data = await response.json();
    if (data.error) {
      setErrors(data.error);
    } else {
      setErrors("");
      await saveTokenAndUsername(data.token, user.username);
      setUser((prev) => ({ ...prev, isVerified: true }));
      navigation.navigate("Home");
    }
  };

  const handleSendEmail = () => {
    setSendEmailPressed(true);
    setTimeout(() => {
      setSendEmailPressed(false);
    }, 60000);
    fetch(`${BACKEND_URL}/auth/sendEmail/${user.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrors(data.error);
        } else {
          setErrors("");
          setMessage(data.message);
        }
      })
      .catch((error) => {
        setErrors(error.error);
        setSendEmailPressed(false);
      });
  };

  return (
    <>
      <CustomHeader headerText={"Verification"} />
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
          />
          <SendEmailButton
            onPress={() => handleSendEmail()}
            disabled={sendEmailPressed}
          >
            <SendEmailButtonText>
              {sendEmailPressed ? `0 : ${emailResendTime}` : "Send Email"}
            </SendEmailButtonText>
          </SendEmailButton>
        </InputContainer>
        <Button onPress={() => handleVerify()}>
          <ButtonText>Verify</ButtonText>
        </Button>
      </Container>
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

const SendEmailButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 4px;
  border-radius: 10px;
  margin: 0 10px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendEmailButtonText = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const CustomTextInput = styled(TextInput)`
  width: 65%;
  margin-bottom: 20px;
`;

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
