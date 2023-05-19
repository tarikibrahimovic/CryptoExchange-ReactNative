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
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const VerifySectionTitle = styled.Text`
  font-size: 24px;
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
  width: 80%;
`;

const VerifyButtonText = styled.Text`
  font-size: 24px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
