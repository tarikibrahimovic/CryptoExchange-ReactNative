import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
import * as DocumentPicker from "expo-document-picker";
import { theme } from "../../theme/index";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
  };

  return (
    <Container>
      <FontAwesome
        name="user-circle-o"
        size={70}
        color={theme.colors.logo}
        onPress={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <ModalContent>
          <PickButton onPress={pickDocument}>
            <PickButtonText>Pick a picture</PickButtonText>
          </PickButton>
          <Line />
          <ModalText>Or</ModalText>
          <DeletePicrueButton>
            <DeletePicrueButtonText>
              Delete profile picture
            </DeletePicrueButtonText>
          </DeletePicrueButton>
        </ModalContent>
      </Modal>
      <UsernameText>Username</UsernameText>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PickButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  color: white;
`;

const PickButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 5px;
`;

const DeletePicrueButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

const DeletePicrueButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const ModalText = styled.Text`
    font-size: 24px;
    color: black;
    font-weight: bold;
    text-align: center;
    margin: 5px 0;
    ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const UsernameText = styled.Text`
    font-size: 24px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
