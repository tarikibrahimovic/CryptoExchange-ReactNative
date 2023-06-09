import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
import { KeyboardAvoidingView, Platform } from "react-native";
import { BACKEND_URL } from "../../env";
import { useNavigation } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext";
import * as SecureStore from "expo-secure-store";


export default function DeleteAccSection() {
  const [visible, setVisible] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { user, setUser } = useContext(CoinsList);

  const deleteAcc = async () => {
    if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/user/deleteAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          password: password,
        }),
      });
      const data = await response.json();
      setUser((prev) => {
        return {
          username: "",
          email: "",
          role: "",
          token: "",
          isVerified: false,
          favorites: [],
          balance: 0,
          exchanges: [],
          pictureUrl: "",
        };
      });
      await SecureStore.deleteItemAsync("jwtToken");
      await SecureStore.deleteItemAsync("username");
      navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <HeaderSection>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <HeaderText
          onPress={() => {
            setVisible(!visible);
          }}
        >
          Delete Account{" "}
          {visible ? (
            <AntDesign name="up" size={24} color="white" />
          ) : (
            <AntDesign name="down" size={24} color="white" />
          )}
        </HeaderText>
      </HeaderSection>
      {visible && (
        <Container>
          <Label>Your password</Label>
          <CustomTextInput
            mode="outlined"
            outlineColor="#FCD434"
            placeholder="*******"
            required={visible}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            onChangeText={(text) => setPassword(text)}
          />
          <SubmitButton
            mode="contained"
            onPress={() => {
              setModalVisibility(true);
            }}
          >
            <SubmitButtonText>Delete Accoung</SubmitButtonText>
          </SubmitButton>
        </Container>
      )}
      <Line />
      <Modal
        visible={modalVisibility}
        onTouchOutside={() => {
          setModalVisibility(false);
        }}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <ModalContent>
          <ModalHeaderText>
            Are you sure you want to delete your account?
          </ModalHeaderText>
          <ModalButtonContainer>
            <ModalNoButton
              mode="contained"
              onPress={() => {
                setModalVisibility(false);
              }}
            >
              <SubmitButtonTextNo>No</SubmitButtonTextNo>
            </ModalNoButton>
            <ModalYesButton
              mode="contained"
              onPress={() => {
                setModalVisibility(false);
                deleteAcc();
              }}
            >
              <SubmitButtonText>Yes</SubmitButtonText>
            </ModalYesButton>
          </ModalButtonContainer>
        </ModalContent>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const ModalButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

const SubmitButtonTextNo = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const ModalYesButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.logo};
  width: 48%;
`;

const ModalNoButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 48%;
`;

const ModalHeaderText = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  text-align: center;
`;

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
  gap: 10px;
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