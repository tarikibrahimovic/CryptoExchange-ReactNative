import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import { theme } from "../../theme/index";
import { Entypo } from "@expo/vector-icons";
import { Platform, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${Platform.OS === "android" ? "40px" : '16px'};
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
`;

export default function DetailsHeader({ coinId }) {

  const navigate = useNavigation();

  return (
      <HeaderContainer>
        <AntDesign name="arrowleft" size={24} color={theme.colors.tertiary}
        onPress={() => (navigate.navigate("Home"))}
        />
        <Entypo name="star-outlined" size={24} color={theme.colors.tertiary} />
        {/* <Entypo name="star" size={24} color="black" /> */}
      </HeaderContainer>
  );
}
