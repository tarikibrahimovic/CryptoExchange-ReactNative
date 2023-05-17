import React from "react";
import styled from "styled-components";
import { Linking, Alert } from "react-native";
import { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../theme/index";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <LinkText onPress={handlePress}>{children}</LinkText>;
};

export default function AboutSection({ coin }) {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <Container>
      <SectionHeader>About {coin.name}</SectionHeader>
      <SectionContainer>
        <PointText>Rank:</PointText>
        <PointAnswer>No. {coin.rank}</PointAnswer>
        <PointText>Market Cap:</PointText>
        <PointAnswer>${coin.marketCap}</PointAnswer>
        <PointText>All Time High</PointText>
        <PointAnswer>
          ${parseFloat(coin.allTimeHigh.price).toFixed(2)}
        </PointAnswer>
        <Line />
        <PointText>Volume (24h):</PointText>
        <PointAnswer>${coin["24hVolume"]}</PointAnswer>
        <PointText>Circulating Supply:</PointText>
        <PointAnswer>${coin.supply.circulating}</PointAnswer>
        <PointText>Total Supply:</PointText>
        <PointAnswer>${coin.supply.total}</PointAnswer>
        <Line />
        <PointText>Official Website:</PointText>
        <OpenURLButton url={coin.websiteUrl}>Official Website</OpenURLButton>
        <LinkPoint onPress={() => setShowLinks(!showLinks)}>
          Links{" "}
          {showLinks ? (
            <AntDesign name="up" size={17} color={theme.colors.tertiary} />
          ) : (
            <AntDesign name="down" size={17} color={theme.colors.tertiary} />
          )}
        </LinkPoint>
        {showLinks &&
          coin.links?.map((link) => {
            return (
              <>
                <PointText>{link.name}</PointText>
                <OpenURLButton url={link.url}>{link.name}</OpenURLButton>
              </>
            );
          })}
          <Line />
        <LinkPoint>Introduction:</LinkPoint>
        <AboutText>{coin.description}</AboutText>
      </SectionContainer>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 100px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const LinkPoint = styled.Text`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 17px;
  margin-bottom: 8px;
  width: 100%;
  text-align: left;
`;

const SectionHeader = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-bottom: 8px;
  text-align: center;
  margin-bottom: 16px;
  border-bottom-color: #fff;
  border-bottom-width: 1px;
  padding-bottom: 8px;
  width: 35%;
`;

const SectionContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
`;

const PointText = styled.Text`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 17px;
  margin-bottom: 8px;
  width: 45%;
`;

const PointAnswer = styled.Text`
  color: #fff;
  font-size: 17px;
  margin-bottom: 8px;
  width: 45%;
  text-align: right;
`;

const AboutText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const LinkText = styled.Text`
  color: ${(props) => props.theme.colors.logo};
  font-size: 17px;
  width: 45%;
  text-align: right;
`;

const Line = styled.View`
  border: 1px solid ${(props) => props.theme.colors.tertiary};
  width: 100%;
`;
