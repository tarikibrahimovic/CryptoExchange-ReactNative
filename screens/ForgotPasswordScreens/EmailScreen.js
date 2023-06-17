import React, { useState } from "react";
import CustomHeader from "../../components/UserComponents/CustomHeader";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { theme } from "../../theme/index";
import { BACKEND_URL } from "../../env";
import { useNavigation } from "@react-navigation/native";

export default function EmailScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = () => {
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    console.log(`${BACKEND_URL}/auth/sendEmail`);
    setFetching(true);
    fetch(`${BACKEND_URL}/auth/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "type": "forgotPassword",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // if (data.message) {
          navigation.navigate("HomeStack", {
            screen: "Verify",
            params: { email: email },
          });
        // }
      })
      .catch((err) => {
        alert("Email not sent");
      })
      .finally(() => {
        setFetching(false);
      });
  };

  return (
    <>
      {!fetching ? (
        <>
          <CustomHeader headerText={"Email screen"} />
          <Container>
            <HeaderText>Enter your email</HeaderText>
            <Line />
            <CustomTextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              contentStyle={{ color: "white" }}
              placeholderTextColor={theme.colors.tertiary}
              underlineColor="#FCD434"
              activeUnderlineColor={theme.colors.tertiary}
            />
            <Button onPress={() => handleSubmit()}>
              <ButtonText>Enter Email</ButtonText>
            </Button>
          </Container>
        </>
      ) : (
        <Container>
          <CustomActivityIndicator size="large" color="#FCD434" />
        </Container>
      )}
    </>
  );
}

const CustomActivityIndicator = styled.ActivityIndicator`
  margin-top: 200px;
`;

const CustomTextInput = styled(TextInput)`
  width: 95%;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 15px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.logo};
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Container = styled.View`
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const Line = styled.View`
  width: 90%;
  height: 1px;
  background-color: #fff;
  margin-bottom: 20px;
`;
