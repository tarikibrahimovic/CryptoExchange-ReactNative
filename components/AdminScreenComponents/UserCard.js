import React, { useState, useContext } from "react";
import { Avatar, Card } from "react-native-paper";
import styled from "styled-components";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
import { Text } from "react-native";
import { theme } from "../../theme/index";
import { BACKEND_URL } from "../../env";
import { CoinsList } from "../../context/CryptoContext";

export default function UserCard({ data, setUsers }) {
  const [visible, setVisible] = useState(false);
  const { user } = useContext(CoinsList);

  const deleteUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/deleteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      const res = await response.json();
      setVisible(false);
      setUsers((prev) => prev.filter((item) => item.email !== data.email));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CustomCard>
        <Card.Title
          title={data?.username}
          subtitle={data?.email}
          titleStyle={{ color: "#fff" }}
          subtitleStyle={{ color: theme.colors.tertiary }}
          left={(props) => {
            return data?.pictureUrl ? (
              <Avatar.Image
                {...props}
                size={50}
                source={{ uri: data?.pictureUrl }}
              />
            ) : (
              <Avatar.Icon {...props} size={50} icon="account" />
            );
          }}
          right={(props) => {
            return (
              <DeleteAccButton
                onPress={() => {
                  setVisible(true);
                }}
              >
                <DeleteAccText>Delete</DeleteAccText>
              </DeleteAccButton>
            );
          }}
        />
      </CustomCard>
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
          <ModalContainer>
            <Text>Are you sure?</Text>
            <ModalButtonContainer>
              <ModalButton
                style={{ backgroundColor: theme.colors.logo }}
                onPress={() => {
                  deleteUser();
                }}
              >
                <ModalButtonText>Delete</ModalButtonText>
              </ModalButton>
              <ModalButton
                style={{ backgroundColor: theme.colors.tertiary }}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <ModalButtonText>Cancel</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>
          </ModalContainer>
        </ModalContent>
      </Modal>
    </>
  );
}

const CustomCard = styled(Card)`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #29313c;
`;

const DeleteAccButton = styled.TouchableOpacity`
  background-color: #ff0000;
  padding: 7px;
  border-radius: 10px;
  margin-right: 10px;
  width: 100%;
  align-items: center;
`;

const DeleteAccText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const ModalContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButtonText = styled.Text`
  color: black;
  font-size: 16px;
`;
