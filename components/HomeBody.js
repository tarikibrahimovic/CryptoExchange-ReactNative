import React from "react";
import WelcomeSection from "./WelcomeSection.js";
import CryptoList from "./CryptoList.js";
import { ScrollView, View, Text } from "react-native";
import CryptoListHeader from "./CryptoListHeader.js";

export default function HomeBody() {
  return (
    <>
      <ScrollView
        stickyHeaderIndices={[1]}
      >
        <WelcomeSection />
        <CryptoListHeader />
        <CryptoList />

      </ScrollView>
    </>
  );
}
