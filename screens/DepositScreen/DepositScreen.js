import React, { useContext, useState } from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import styled from "styled-components";
import { theme } from "../../theme/index.js";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/UserComponents/CustomHeader.js";
import { CoinsList } from "../../context/CryptoContext.js";
import { BACKEND_URL } from "../../env.js";

export default function DepositScreen() {
  const [isValid, setIsValid] = useState(false);
  const [amount, setAmount] = useState("");
  const { user, setUser } = useContext(CoinsList);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const _onChange = (formData) => {
    setIsValid(formData.valid);
  };

  const updateUserBalance = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/balanceAdd`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
        }),
      });
      const data = await response.json();
      if (data.error?.length > 0) {
        setError(data.error);
        return;
      }
      setUser((prev) => {
        return { ...prev, balance: data.balance };
      });
      navigation.navigate("Wallet");
    } catch (err) {
      setError(err);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      if (parseFloat(amount) >= 50 && parseFloat(amount) <= 50000) {
        updateUserBalance();
      } else {
        setError("Amount must be between $50 and $50000");
      }
    } else {
      setError("Invalid credit card details");
    }
  };

  return (
    <>
      <CustomHeader headerText="Deposit" />
      <Container>
        {error && <ErrorText>{error}</ErrorText>}
        <AmountContainer>
          <Label>Card Details</Label>
          <InputContainer>
            <LiteCreditCardInput
              onChange={_onChange}
              inputStyle={{ color: "white", borderRadius: 10 }}
              placeholderColor={theme.colors.tertiary}
            />
          </InputContainer>
        </AmountContainer>
        <AmountContainer>
          <Label>Amount</Label>
          <AmountInput
            placeholder="Amount"
            placeholderTextColor={theme.colors.tertiary}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
          />
          <NoteText>Note: Amount must be between $50 and $50000</NoteText>
        </AmountContainer>
        <SubmitButton
          onPress={() => {
            handleSubmit();
          }}
        >
          <SubmitButtonText>Submit</SubmitButtonText>
        </SubmitButton>
      </Container>
    </>
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
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.tertiary};
  padding: 10px;
  width: 100%;
`;

const AmountContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 90%;
`;

const AmountInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.colors.tertiary};
  border-radius: 10px;
  padding: 17px;
  width: 100%;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  border-radius: 10px;
  padding: 17px;
  width: 90%;
  margin-top: 20px;
`;

const SubmitButtonText = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const NoteText = styled.Text`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;
