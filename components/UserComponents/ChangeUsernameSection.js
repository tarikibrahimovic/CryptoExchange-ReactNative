import React, { useState } from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function ChangeUsernameSection() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <>
      <HeaderSection>
        <HeaderText
          onPress={() => {
            setVisible(!visible);
          }}
        >
          Change username{" "}
          {visible ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </HeaderText>
      </HeaderSection>
      {visible && (
        <Container>
          <Label>Your new username</Label>
          <CustomTextInput
            value={username}
            outlineColor="#FCD434"
            mode="outlined"
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            required={visible}
          />
          <SubmitButton mode="contained" onPress={() => {}}>
            <SubmitButtonText>Submit changes</SubmitButtonText>
          </SubmitButton>
        </Container>
      )}
      <Line />
    </>
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
