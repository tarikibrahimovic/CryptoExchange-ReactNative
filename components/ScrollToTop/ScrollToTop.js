import React from 'react';
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

const ScrollToButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #fcd434;
  padding: 10px;
  border-radius: 10px;
`;

export default function ScrollToTop({ handleScrollToTop }) {
  return (
    <ScrollToButton onPress={handleScrollToTop}>
        <AntDesign name="arrowup" size={24} color="black" />
      </ScrollToButton>
  )
}
