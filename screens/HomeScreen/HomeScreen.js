import React, { useRef } from "react";
import CustomHeader from "../../components/CustomHeader";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import HomeBody from "../../components/HomeBody";
import WelcomeSection from "../../components/WelcomeSection";
import CryptoListHeader from "../../components/CryptoListHeader";
import CryptoList from "../../components/CryptoList";

export default function HomeScreen() {
  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <ScrollView
        stickyHeaderIndices={[1]}
        style={{ flex: 1, position: "relative" }}
        ref={scrollViewRef}
      >
        <WelcomeSection />
        <CryptoListHeader />
        <CryptoList />
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "red",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={handleScrollToTop}
      >
        <Text style={{ color: "#fff" }}>Press me</Text>
      </TouchableOpacity>
    </View>
  );
}
