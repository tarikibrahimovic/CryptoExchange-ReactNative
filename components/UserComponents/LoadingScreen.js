import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components";

export default function LoadingScreen() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  );
}

const Container = styled.View`
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.primary };
    width: 100%;
    height: 100%;
    z-index: 100;
`;