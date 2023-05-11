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
import { SafeAreaView } from "react-native";
import CoinDetailsScreen from "./screens/CoinDetailsScreen/CoinDetailsScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ExchangeScreen from "./screens/ExchangeScreen/ExchangeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import CalculatorScreen from "./screens/CalculatorScreen/CalculatorScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1F2630" }}>
      <CryptoContextProvider>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </CryptoContextProvider>
    </SafeAreaView>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#1F2630",
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#1F2630",
        },
      }}
    >
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "#1F2630" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return (
              <Ionicons name="stats-chart-outline" size={24} color={color} />
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
                  style={{ backgroundColor: "#FCD434" }}
                />
              </View>
            );
          } else if (route.name === "Wallet") {
            return <Ionicons name="wallet-outline" size={24} color={color} />;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },

        unmountOnBlur: true,

        tabBarLabel: "",

        tabBarStyle: {
          display: "flex",
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",

        tabBarActiveBackgroundColor: "#1F2630",
        tabBarInactiveBackgroundColor: "#1F2630",
        headerStyle: {
          backgroundColor: "#1F2630",
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
