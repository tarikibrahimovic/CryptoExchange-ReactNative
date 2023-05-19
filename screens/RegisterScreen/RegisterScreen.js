import React from "react";
import { useState } from "react";
import { View, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import logo from "../../assets/logo.js";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { BACKEND_URL } from "../../env.js";
import { useNavigation } from "@react-navigation/native";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  if (password.length < 8) {
    setErrors("Password must be at least 8 characters long");
    return false;
  }
  return true;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState("tarikibrahimovic2016@gmail.com");
  const [password, setPassword] = useState("tarik123");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("Tarik");
  const navigation = useNavigation();

  const handleRegister = () => {
    setErrors("");
    console.log("pokrenulo se");
    if (!validateEmail(email)) {
      setErrors("invalid email");
    } else if (!validatePassword(password)) {
      setErrors("invalid password");
    } else {
      console.log(BACKEND_URL);
      fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.error);
          } else {
            setErrors("");
            navigation.navigate("AuthStack", {
              screen: "Login",
              params: {
                message: "You have successfully registered! Please log in.",
              },
            });
          }
        })
        .catch((error) => {
          setErrors(error.error);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <LogoSection>
          <SvgXml xml={logo()} height="250" color="white" />
          <LogoText>Crypto Exchange</LogoText>
        </LogoSection>
        <InputSection>
          <LoginText>Register</LoginText>
          <Line></Line>
          {errors ? <ErrorText>{errors}</ErrorText> : null}
          <View>
            <Label>Username</Label>
            <TextInput
              value={username}
              outlineColor="#FCD434"
              mode="outlined"
              onChangeText={(text) => setUsername(text)}
              placeholder="username"
              required
            />
          </View>
          <View>
            <Label>Email</Label>
            <TextInput
              value={email}
              outlineColor="#FCD434"
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
              placeholder="email@gmail.com"
              required
            />
          </View>
          <View>
            <Label>Password</Label>
            <TextInput
              mode="outlined"
              outlineColor="#FCD434"
              placeholder="*******"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View>
            <Button
              mode="contained"
              onPress={() => handleRegister()}
              buttonColor="#FCD434"
              textColor="#1F2630"
            >
              Sing Up
            </Button>
          </View>
        </InputSection>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const InputSection = styled.View`
  margin: 0 10px;
  margin-top: 20px;
  padding: 10px;
  background-color: #29313c;
  border-radius: 10px;
  gap: 15px;
`;

const LogoSection = styled.View`
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const LogoText = styled.Text`
  font-size: 34px;
  color: white;
  font-weight: bold;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Label = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 5px;
`;

const LoginText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const ForgotPassword = styled.Text`
  font-size: 16px;
  color: #3837fd;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
