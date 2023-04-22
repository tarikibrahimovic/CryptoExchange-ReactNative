import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import styled from "styled-components";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  // background-color: #3c4564;
  background-color: #1f2630;
  // background-color: #697597;
  justify-content: center;
`;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <Container>
    <>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: "#1F2630" }}
          screenOptions={({ route }) => ({

            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "stats-chart-outline";
              } else if (route.name === "Wallet") {
                iconName = "wallet-outline";
              }
              
              return <Ionicons name={iconName} size={24} color={color} />
            },

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
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Wallet" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
    // </Container>
  );
}
