import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import { theme } from "../../theme/index";
import { Platform } from "react-native";
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

const AboutText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-left: 16px;
`;

export default function CustomHeader({ headerText }) {
    const navigate = useNavigation();

    return (
        <HeaderContainer>
          <AntDesign name="arrowleft" size={24} color={theme.colors.tertiary}
          onPress={() => (navigate.navigate("Home"))}
          />
          
          <AboutText>{headerText}</AboutText>
        </HeaderContainer>
    );
}
