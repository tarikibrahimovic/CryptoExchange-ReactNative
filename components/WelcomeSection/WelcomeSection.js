import React from 'react'
import styled from 'styled-components'

export default function WelcomeSection() {
  return (
    <Container>
      <Title>Welcome to Crypto Exchange</Title>
      <SubTitle>Trade with us!</SubTitle>
    </Container>
  )
}

const Container = styled.View`
  margin: 0 10px;
  padding: 20px 0;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  gap: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.logo};
  font-weight: bold;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;

const SubTitle = styled.Text`
  font-size: 16px;
  color: #fff;
  ${Platform.OS === "ios" ? "Helvetica" : "Roboto"}
`;