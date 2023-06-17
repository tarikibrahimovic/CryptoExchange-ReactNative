import React from "react";
import { useState } from "react";
import { View, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import logo from "../../assets/logo.js";
import styled from "styled-components";
import { TextInput } from "react-native-paper";
import { BACKEND_URL } from "../../env.js";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("tarik333");
  const [confirmPassword, setConfirmPassword] = useState("tarik333");
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [errors, setErrors] = useState("");
  const navigation = useNavigation();
  const { token, email } = useRoute().params;

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validatePassword(password)) {
        setErrors("Password must be at least 8 characters long!");
        return;
      } else if (password !== confirmPassword) {
        setErrors("Passwords do not match!");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/auth/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          token: token,
        }),
      });
      const data = await response.json();
      if (data.message) {
        navigation.navigate("AuthStack", {
          screen: "Login",
          message: "Password reset successfully!",
        });
      } else {
        setErrors(data.error);
      }
    } catch (error) {
      console.log(error);
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
          <LoginText>Reset Password</LoginText>
          <Line></Line>
          {errors?.length > 0 && <ErrorText>{errors}</ErrorText>}
          {registerMessage?.length > 0 && (
            <MessageText>{registerMessage}</MessageText>
          )}
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
            <Label>Confirm password</Label>
            <TextInput
              mode="outlined"
              outlineColor="#FCD434"
              placeholder="*******"
              value={confirmPassword}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          <View>
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              buttonColor="#FCD434"
              textColor="#1F2630"
            >
              Reset Password
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
