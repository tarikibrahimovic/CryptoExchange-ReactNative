import React, { useRef } from "react";
import WelcomeSection from "./WelcomeSection.js";
import CryptoList from "./CryptoList.js";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import CryptoListHeader from "./CryptoListHeader.js";
import { Button } from "react-native-paper";
import styled from "styled-components";

const ScrollToButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`;


export default function HomeBody() {
  const ref = useRef(null)
  return (
    <>
      <ScrollView
      style={{flex: 1, position: "relative"}}
        ref={ref}
        stickyHeaderIndices={[1]}
      >
        <WelcomeSection />
        {/* <Button mode="contained" onPress={() => {
          //to the top
          ref.current.scrollTo({ x: 0, y: 0, animated: true })
        }}
        style={{position: "absolute", bottom: 0, right: 0, zIndex: 1000}}
        >
          Press me
        </Button> */}
        <CryptoListHeader />
        <CryptoList />

      </ScrollView>
    </>
  );
}
