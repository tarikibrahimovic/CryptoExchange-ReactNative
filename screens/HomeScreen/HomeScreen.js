import React from "react";
// import WelcomeSection from "../../components/WelcomeSection";
// import CryptoList from "../../components/CryptoList";
import CustomHeader from "../../components/CustomHeader";
import { ScrollView, View } from "react-native";
import HomeBody from "../../components/HomeBody";

export default function HomeScreen() {
  return (
    <>
      <CustomHeader />
      <HomeBody/>
    </>
  );
}
