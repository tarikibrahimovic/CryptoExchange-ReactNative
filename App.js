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
          let iconName;

          if (route.name === "Home") {
            iconName = "stats-chart-outline";
          } else if (route.name === "Wallet") {
            iconName = "wallet-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },

        unmountOnBlur: true,

        tabBarStyle: {
          display: route.name === "Search" ? "none" : "flex",
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
