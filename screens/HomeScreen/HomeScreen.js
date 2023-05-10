import React, { useEffect, useRef, useState } from "react";
import CustomHeader from "../../components/CryptoListComponents/CustomHeader"
import { ScrollView, View } from "react-native";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import CryptoListHeader from "../../components/CryptoListComponents/CryptoListHeader";
import CryptoList from "../../components/CryptoListComponents/CryptoList";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNavigation, StackActions } from "@react-navigation/native";

export default function HomeScreen(props) {
  const scrollViewRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigation = useNavigation()

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  // useEffect(() => {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     routes: [{ name: 'Home' }],
  //   });

  //   navigation.dangerouslyGetParent().dispatch(resetAction);
  // }, []);

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
        <WelcomeSection />
        <CryptoListHeader />
        <CryptoList />
      </ScrollView>
      {showScrollToTop && <ScrollToTop handleScrollToTop={handleScrollToTop} />}
    </View>
  );
}
