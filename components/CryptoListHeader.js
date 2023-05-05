import React, { useContext, useState, memo } from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components";
import { CoinsList } from "../context/CryptoContext";
import { AntDesign } from "@expo/vector-icons";

const Header = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 15px;
  background-color: #1f2630;
  border-radius: 10px;
  gap: 10px;
`;

const Section = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
`;

const HeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    font-family: ${Platform.OS === "android" ? "Roboto" : "Avenir"}};
`;

const FilterTextWrapper = styled.View`
  border-radius: 20px;
`;

const FilterText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    font-family: ${Platform.OS === "android" ? "Roboto" : "Avenir"}};
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
`;

const PriceArrowContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default memo(function CryptoListHeader() {
  const { active, setActive, filter, setFilter, setIsLoading } =
    useContext(CoinsList);
  const [filterValue, setFilterValue] = useState("Hot");

  return (
    <Header>
      <Section>
        <HeaderText
          onPress={() => {
            setIsLoading(true);
            setActive("WatchList");
          }}
          style={active === "WatchList" ? { color: "#fff" } : { color: "gray" }}
        >
          WatchList
        </HeaderText>
        <HeaderText
          onPress={() => setActive("Top10")}
          style={active !== "WatchList" ? { color: "#fff" } : { color: "gray" }}
        >
          Top 10
        </HeaderText>
      </Section>
      {active !== "WatchList" && (
        <Section style={{ justifyContent: "space-around" }}>
          <FilterTextWrapper
            style={filter === "Hot" && { backgroundColor: "gray" }}
          >
            <FilterText
              onPress={() => {
                setIsLoading(true);
                setFilter("Hot");
              }}
              style={filter === "Hot" ? { color: "#fff" } : { color: "gray" }}
            >
              Hot
            </FilterText>
          </FilterTextWrapper>
          <FilterTextWrapper
            style={filter === "Market Cap" && { backgroundColor: "gray" }}
          >
            <FilterText
              onPress={() => {
                setIsLoading(true);
                setFilter("Market Cap");
              }}
              style={
                filter === "Market Cap" ? { color: "#fff" } : { color: "gray" }
              }
            >
              Market Cap
            </FilterText>
          </FilterTextWrapper>
          <FilterTextWrapper
            style={[
              (filter === "ASC" || filter === "DESC") && {
                backgroundColor: "gray",
              },
              { flexDirection: "row" },
              { width: 70 },
            ]}
          >
            <FilterText
              onPress={() => {
                setIsLoading(true);
                filter !== "ASC" ? setFilter("ASC") : setFilter("DESC");
              }}
              style={
                filter === "ASC" || filter === "DESC"
                  ? { color: "#fff" }
                  : { color: "gray" }
              }
            >
              Price
            </FilterText>
            <PriceArrowContainer>
              <AntDesign
                name="caretup"
                size={8}
                color={filter === "ASC" ? "#fff" : "#909090"}
              />
              <AntDesign
                name="caretdown"
                size={8}
                color={filter === "DESC" ? "#fff" : "#909090"}
              />
            </PriceArrowContainer>
          </FilterTextWrapper>
        </Section>
      )}
    </Header>
  );
});
