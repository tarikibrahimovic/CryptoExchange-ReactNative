import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import styled from "styled-components";
import { theme } from "../../theme/index";

export default function CreditCardInput() {
  return (
    <Container>
      <InputContainer>
        <LiteCreditCardInput
          onChange={this._onChange}
          inputStyle={{ color: "white", borderRadius: 10 }}
          placeholderColor={theme.colors.tertiary}
        />
      </InputContainer>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.tertiary};
  padding: 10px;
`;
