import React, { useContext, useRef, useState } from "react";
import CustomHeader from "../../components/CryptoListComponents/CustomHeader";
import { ScrollView, View } from "react-native";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import CryptoListHeader from "../../components/CryptoListComponents/CryptoListHeader";
import CryptoList from "../../components/CryptoListComponents/CryptoList";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { CoinsList } from "../../context/CryptoContext";
import VerifySection from "../../components/WelcomeSection/VerifySection";
import LoginSection from "../../components/WelcomeSection/LoginSection";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

export default function HomeScreen(props) {
  const scrollViewRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { user } = useContext(CoinsList);

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <ScrollView
        stickyHeaderIndices={[2]}
        style={{ flex: 1, position: "relative" }}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 300) {
            setShowScrollToTop(true);
          } else {
            setShowScrollToTop(false);
          }
        }}
      >
        {user.username === "" ? (
          <LoginSection />
        ) : !user.isVerified ? (
          <VerifySection />
        ) : (
          <WelcomeSection />
        )}
        <HomeSlider />
        <CryptoListHeader />
        <CryptoList />
      </ScrollView>
      {showScrollToTop && <ScrollToTop handleScrollToTop={handleScrollToTop} />}
    </View>
  );
}
