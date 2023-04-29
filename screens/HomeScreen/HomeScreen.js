import React from "react";
import WelcomeSection from "../../components/WelcomeSection";
import CustomHeader from "../../components/CustomHeader";
import CryptoList from "../../components/CryptoList";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <CustomHeader/>
      <WelcomeSection />
      <CryptoList/>
    </ScrollView>
  );
}
