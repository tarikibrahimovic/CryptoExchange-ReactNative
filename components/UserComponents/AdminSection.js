import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

export default function AdminSection() {
    const navigate = useNavigation();
  return (
    <>
        <HeaderSection onPress={() => navigate.navigate("HomeStack", {screen: "Admin"})}>
            <HeaderText>Admin Section</HeaderText>
        </HeaderSection>
    </>
  );
}

const HeaderSection = styled.TouchableOpacity`
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