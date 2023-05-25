import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

export default function EmptySection({ title, subtitle, option = "collection" }) {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>
        {/* You have nothing in your collection! */}
        {title}
      </Title>
      <SubTitle
        onPress={() =>
          option === "collection" && navigation.navigate("Exchange")
        }
      >
        {/* {option === "collection"
          ? "Buy some coins!"
          : "Add some coins to your favorite List!"} */}
        {subtitle}
      </SubTitle>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin: 10px;
  text-align: center;
`;

const SubTitle = styled.Text`
  color: ${(props) => props.theme.colors.logo};
  font-size: 20px;
  margin: 10px;
  text-align: center;
`;
