import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WalletScreen from "./screens/WalletScreen/WalletScreen";
import { CryptoContextProvider } from "./context/CryptoContext";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import CoinDetailsScreen from "./screens/CoinDetailsScreen/CoinDetailsScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ExchangeScreen from "./screens/ExchangeScreen/ExchangeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import CalculatorScreen from "./screens/CalculatorScreen/CalculatorScreen";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/index";
import styled from "styled-components";
import UserScreen from "./screens/UserScreen/UserScreen";
import { ModalPortal } from "react-native-modals";
import VerificationScreen from "./screens/VerificationScreen/VerificationScreen";
import DepositScreen from "./screens/DepositScreen/DepositScreen";
import AdminScreen from "./screens/AdminScreen/AdminScreen";
import EmailScreen from "./screens/ForgotPasswordScreens/EmailScreen";
import VerifyTokenScreen from "./screens/ForgotPasswordScreens/VerifyTokenScreen";
import ResetPasswordScreen from "./screens/ForgotPasswordScreens/ResetPasswordScreen";
// import NetInfo from "@react-native-community/netinfo";
import React, { useState, useEffect } from "react";
import WithdrawalScreen from "./screens/WithdrawalScreen/WithdrawalScreen";
import { Text } from "react-native";

const CustomSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <>
      {isConnected ? (
        <ThemeProvider theme={theme}>
          <CustomSafeAreaView>
            <CryptoContextProvider>
              <NavigationContainer>
                <MainTabNavigator />
              </NavigationContainer>
              <StatusBar style="light" />
            </CryptoContextProvider>
            <ModalPortal />
          </CustomSafeAreaView>
        </ThemeProvider>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>No Internet Connection</Text>
        </View>
      )}
    </>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={CoinDetailsScreen} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Verify" component={VerifyTokenScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: theme.colors.primary }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return (
              <Ionicons name="stats-chart-outline" size={26} color={color} />
            );
          } else if (route.name === "Exchange") {
            return (
              <View
                style={{
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <MaterialIcons
                  name="compare-arrows"
                  size={32}
                  color="black"
                  style={{ backgroundColor: theme.colors.logo }}
                />
              </View>
            );
          } else if (route.name === "Wallet") {
            return <Ionicons name="wallet-outline" size={26} color={color} />;
          }
        },

        unmountOnBlur: true,

        tabBarLabelStyle: {
          display: "none",
        },

        tabBarStyle: {
          display: "flex",
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",

        tabBarActiveBackgroundColor: theme.colors.primary,
        tabBarInactiveBackgroundColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#fff",
        headerShown: false,
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exchange" component={ExchangeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen
        name="AuthStack"
        options={{ tabBarButton: () => null, tabBarVisible: false }}
        component={AuthStackNavigator}
      />
      <Tab.Screen
        name="HomeStack"
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: "none",
          },
        }}
        component={HomeStackNavigator}
      />
    </Tab.Navigator>
  );
}
