import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../../theme/index";
import { CoinsList } from "../../context/CryptoContext";
import { BACKEND_URL } from "../../env";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import LoadingScreen from "./LoadingScreen";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const { user, setUser } = useContext(CoinsList);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    });
    if (response.cancelled) {
      return;
    }
    const formData = new FormData();

    formData.append("image", {
      uri: response.assets[0].uri,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    });
    setPicture(formData);
  };

  const uploadPicture = async () => {
    try {
      setIsLoading(true);
      let data = await fetch(`${BACKEND_URL}/user/uploadImage`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
        body: picture,
      });
      let response = await data.json();
      setUser((prev) => {
        return { ...prev, pictureUrl: response.pictureUrl };
      });
      setVisible(false);
      setPicture(null);
    } catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async () => {
    try {
      setIsLoading(true);
      let data = await fetch(`${BACKEND_URL}/user/deleteImage`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      let response = await data.json();
      setUser((prev) => {
        return { ...prev, pictureUrl: "" };
      });
      setVisible(false);
    } catch (err) {
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setVisible(true);
  };

  return (
    <>
    {!isLoading ? <Container>
      {user.pictureUrl ? (
        <TouchableOpacity onPress={openModal}>
          <Image
            source={{ uri: user.pictureUrl }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
        </TouchableOpacity>
      ) : (
        <FontAwesome
          name="user-circle-o"
          size={70}
          color={theme.colors.logo}
          onPress={openModal}
        />
      )}
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
          <PickButton onPress={pickImage}>
            <PickButtonText>Pick a picture</PickButtonText>
          </PickButton>
          <Line />
          {user.pictureUrl && (
            <>
              <ModalText>Or</ModalText>
              <DeletePicrueButton onPress={deleteImage}>
                <DeletePicrueButtonText>
                  Delete profile picture
                </DeletePicrueButtonText>
              </DeletePicrueButton>
            </>
          )}
          {picture && (
            <PickButton onPress={uploadPicture}>
              <PickButtonText>Upload</PickButtonText>
            </PickButton>
          )}
        </ModalContent>
      </Modal>
      <UsernameText>{user.username}</UsernameText>
    </Container> : <LoadingScreen/>}
    </>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
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
