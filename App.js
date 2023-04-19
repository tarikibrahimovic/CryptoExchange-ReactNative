import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  // background-color: #3c4564;
  background-color: #1F2630;
  // background-color: #697597;  
  justify-content: center;
`;

export default function App() {
  return (
    <Container>
      <LoginScreen/>
      <StatusBar style="light" />
    </Container>
  );
}

