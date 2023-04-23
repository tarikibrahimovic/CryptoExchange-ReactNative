import React from "react";
import WelcomeSection from "../../components/WelcomeSection";
import CustomHeader from "../../components/CustomHeader";
import CryptoList from "../../components/CryptoList";

export default function HomeScreen() {
  return (
    <>
      <CustomHeader/>
      <WelcomeSection />
      <CryptoList/>
    </>
  );
}
