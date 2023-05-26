import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { KeyboardAvoidingView, Platform } from "react-native";
import { BACKEND_URL } from "../../env";
import { CoinsList } from "../../context/CryptoContext";

export default function ChangeUsernameSection() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [succesText, setSuccesText] = useState("");
  const { user, setUser } = useContext(CoinsList);

  const changeUsername = async () => {
    if (!username) {
      setError("Username is required");
      return;
    } else if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/user/changeUsername`, {
        method: "Patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setUser((prev) => {
        return { ...prev, username: username, token: data.token };
      });
      setError("");
      setUsername("");
      setSuccesText("Username changed succesfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <HeaderSection>
        <HeaderText
          onPress={() => {
            setVisible(!visible);
          }}
        >
          Change Username{" "}
          {visible ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </HeaderText>
      </HeaderSection>
      {visible && (
        <Container>
          {succesText && <SuccesText>{succesText}</SuccesText>}
          {error && <ErrorText>{error}</ErrorText>}
          <Label>Your new username</Label>
          <CustomTextInput
            value={username}
            outlineColor="#FCD434"
            mode="outlined"
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            required={visible}
          />
          <SubmitButton
            mode="contained"
            onPress={() => {
              changeUsername();
            }}
          >
            <SubmitButtonText>Submit changes</SubmitButtonText>
          </SubmitButton>
        </Container>
      )}
      <Line />
    </KeyboardAvoidingView>
  );
}

const SubmitButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.logo};
  width: 100%;
  margin: 10px 0;
`;

const SubmitButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const CustomTextInput = styled(TextInput)`
  width: 100%;
`;

const Label = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Line = styled.View`
  border: 1px solid #e5e5e5;
  width: 100%;
  margin: 10px 0;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
`;

const HeaderSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
`;

const SuccesText = styled.Text`
  font-size: 16px;
  color: green;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;