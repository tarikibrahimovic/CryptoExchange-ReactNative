import React from "react";
import styled from "styled-components";
import { Button } from "react-native-paper";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
`;

const SubmitButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding: 5px;
`;

const SubmitButtonText = styled.Text`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default function LogOutButton() {
  return (
    <>
      <Container>
        <SubmitButton
          onPress={() => {
            console.log("Log out button pressed");
          }}
        >
          <SubmitButtonText>Log out</SubmitButtonText>
        </SubmitButton>
      </Container>
    </>
  );
}
