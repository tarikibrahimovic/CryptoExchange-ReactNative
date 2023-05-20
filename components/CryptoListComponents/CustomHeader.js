import React, {useContext} from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext.js";

export default function CustomHeader() {
  const {user} = useContext(CoinsList);
  const navigation = useNavigation();

  return (
    <Header>
      <Container>
        <FontAwesome
          name="search"
          size={24}
          color="white"
          onPress={() => {
            navigation.navigate("HomeStack", { screen: "Search" });
          }}
        />
        {user.isVerified && <FontAwesome
          name="user-circle-o"
          size={24}
          color="white"
          onPress={() => {
            navigation.navigate("HomeStack", { screen: "User" });
          }}
        />}
      </Container>
    </Header>
  );
}

const Header = styled.View`
  background-color: #1f2630;
  height: ${Platform.OS === "ios" ? "60px" : "100px"};
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Container = styled.View`
  display: flex;
  width: 40%;
  flex-direction: row;
  gap: 15px;
  padding-right: 20px;
  justify-content: flex-end;
`;
