import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export default function VerifySection() {
    const navigation = useNavigation();
  return (
    <VerifySectionContainer>
      <VerifySectionTitle>Verify your account</VerifySectionTitle>
      <VerifyButton
        onPress={() =>
          navigation.navigate("HomeStack", { screen: "Verification" })
        }
      >
        <VerifyButtonText>Verify</VerifyButtonText>
      </VerifyButton>
    </VerifySectionContainer>
  );
}

const VerifySectionContainer = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  margin: 0 10px;
  margin-top: 20px;
  padding: 20px 0;
  border-radius: 10px;
  gap: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const VerifySectionTitle = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const VerifyButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 10px;
  border-radius: 10px;
  width: 50%;
`;

const VerifyButtonText = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
