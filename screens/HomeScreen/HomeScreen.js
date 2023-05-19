import React, { useContext, useRef, useState } from "react";
import CustomHeader from "../../components/CryptoListComponents/CustomHeader"
import { ScrollView, View } from "react-native";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import CryptoListHeader from "../../components/CryptoListComponents/CryptoListHeader";
import CryptoList from "../../components/CryptoListComponents/CryptoList";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { CoinsList } from "../../context/CryptoContext";
import VerifySection from "../../components/WelcomeSection/VerifySection";

export default function HomeScreen(props) {
  const scrollViewRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const {user} = useContext(CoinsList);

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  console.log(user);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <ScrollView
        stickyHeaderIndices={[1]}
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
        {user.username === "" ? <WelcomeSection /> : (!user.isVerified ? <VerifySection /> : null)}
        <CryptoListHeader />
        <CryptoList />
      </ScrollView>
      {showScrollToTop && <ScrollToTop handleScrollToTop={handleScrollToTop} />}
    </View>
  );
}
