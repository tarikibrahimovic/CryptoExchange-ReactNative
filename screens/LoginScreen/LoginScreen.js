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
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AntDesign } from '@expo/vector-icons';

async function saveTokenAndUsername(token, username) {
  await SecureStore.setItemAsync("jwtToken", token);
  await SecureStore.setItemAsync("username", username);
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [init, setInit] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "638693331166-mb6j43ql4sm8bat0ka1dobhgplnqls0k.apps.googleusercontent.com",
    iosClientId:
      "638693331166-94og1sgd694qe7mmmm6p92kku8fes37e.apps.googleusercontent.com",
  });
  const [email, setEmail] = useState("tarikibrahimovic2016@gmail.com");
  const { setUser } = useContext(CoinsList);
  const [password, setPassword] = useState("tarik123");
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [errors, setErrors] = useState("");
  const navigation = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    if (params?.message) {
      setRegisterMessage(params.message);
    }
  }, [params]);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (init) {
      setInit(false);
    } else {
      handleSignInWithGoogle();
    }
  }, [response]);

  const handleSignInWithGoogle = async () => {
    // console.log(response);
    if (response?.type === "success") {
      // await getUserInfo(response.authentication.accessToken)
      await handleGoogleLogin(
        await getUserInfo(response.authentication.accessToken)
      );
    }
  };

  const handleGoogleLogin = async (userData) => {
    try {
      console.log("userInfo" + userInfo);
      const response = await fetch(`${BACKEND_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.id,
          username: userData.name,
          pictureUrl: userData.picture,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setErrors(data.error);
      }
      console.log("data" + data);
      if (data.token) {
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
            pictureUrl: data.pictureUrl,
            type: "Google",
          };
        });
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      setErrors("Something went wrong, please try again!");
    }
  };

  const getUserInfo = async (token) => {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userInfoResponse = await response.json();
    // console.log(userInfoResponse);
    setUserInfo(userInfoResponse);
    return userInfoResponse;
  };

  const handleLogin = async () => {
    try {
      if (!validateEmail(email)) {
        setErrors("invalid email");
        return;
      } else if (!validatePassword(password)) {
        setErrors("Password must be at least 8 characters long!");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setErrors(data.error);
      }
      if (data.email) {
        if(data.token){
          saveTokenAndUsername(data.token, data.username);
        }
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
            pictureUrl: data.pictureUrl,
            type: "Email",
          };
        });
        navigation.navigate("Home");
      }
    } catch (error) {
      setErrors("Something went wrong, please try again!");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding">
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
            <GoogleButton
              mode="contained"
              onPress={() => promptAsync()}
            >
              <AntDesign name="google" size={16} color="#FCD434" />
              Login with Google
            </GoogleButton>
          </View>
          <View>
            <ForgotPassword
              onPress={() =>
                navigation.navigate("HomeStack", { screen: "Email" })
              }
            >
              Forgot Password?
            </ForgotPassword>
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

const GoogleButton = styled(Button)`
  background-color: #707889;
  color: #1f2630;
`;

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
