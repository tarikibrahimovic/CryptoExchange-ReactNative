import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { View, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import logo from "../../assets/logo.js";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { BACKEND_URL } from "../../env.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext.js";
import * as SecureStore from "expo-secure-store";

async function saveTokenAndUsername(token, username) {
  await SecureStore.setItemAsync("jwtToken", token);
  await SecureStore.setItemAsync("username", username);
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function LoginScreen() {
  const [email, setEmail] = useState("tarikibrahimovic2016@gmail.com");
  const { user, setUser } = useContext(CoinsList);
  const [password, setPassword] = useState("tarik123");
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [errors, setErrors] = useState();
  const navigation = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    if (params?.message) {
      setRegisterMessage(params.message);
    }
  }, [params]);

  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrors("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    setErrors("");
    if (!validateEmail(email)) {
      setErrors("invalid email");
    } else if (!validatePassword(password)) {
      setErrors("invalid password");
    } else {
      fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrors(data.error);
          } else {
            setErrors("");
            saveTokenAndUsername(data.token, data.username);
            setUser((prev) => {
              return {
                username: data.username,
                email: data.email,
                role: data.role,
                token: data.token,
                isVerified: data.token ? true : false,
                favorites: data.favorites?.map((coin) => coin.coinId),
                balance: data.balance,
                exchanges: data.exchanges,
              };
            });

            navigation.navigate("Home");
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
          <LoginText>Login</LoginText>
          <Line></Line>
          {errors?.length > 0 && <ErrorText>{errors}</ErrorText>}
          {registerMessage?.length > 0 && (
            <MessageText>{registerMessage}</MessageText>
          )}
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
              value={password}
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
              onPress={() => handleLogin()}
              buttonColor="#FCD434"
              textColor="#1F2630"
            >
              Login
            </Button>
          </View>
          <View>
            <ForgotPassword>Forgot Password?</ForgotPassword>
          </View>
          <Line />
          <View>
            <ForgotPassword
              onPress={() =>
                navigation.navigate("AuthStack", { screen: "Register" })
              }
            >
              Don't have an account? Sign Up!
            </ForgotPassword>
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

const MessageText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;
