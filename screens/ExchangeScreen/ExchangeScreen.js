import React, { useContext, useState, useRef, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { CoinsList } from "../../context/CryptoContext";
import CryptoListItem from "../../components/CryptoListComponents/CryptoListItem";

const SearchBar = styled(Searchbar)`
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: #29313c;
  width: 80%;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CancelText = styled.Text`
  color: #fcd434;
  font-size: 16px;
  margin: 10px;
`;

const HeaderText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  padding-top: 10px;
`;

export default function ExchangeScreen() {
  const { isLoading, setIsLoading, coins, favoriteCoins } =
    useContext(CoinsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigation();

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleScrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  const CancelPressHandler = () => {
    navigate.goBack();
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setFilteredData(
          coins.filter((item) => {
            // favoriteCoins.filter((item) => {
            return item.name.includes(searchQuery);
          })
        );
      }, 10);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <HeaderText>Choose your coin</HeaderText>
      <HeaderContainer>
        <SearchBar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor={"#72798B"}
          iconColor={"#72798B"}
          cursorColor={"#FCD434"}
          inputStyle={{ color: "#fff" }}
        />
        <CancelText onPress={CancelPressHandler}>Cancel</CancelText>
      </HeaderContainer>
      {showScrollToTop && <ScrollToTop handleScrollToTop={handleScrollToTop} />}
      <ScrollView
        ref={ref}
        scrollEventThrottle={16}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 300) {
            setShowScrollToTop(true);
          } else {
            setShowScrollToTop(false);
          }
        }}
      >
        {!isLoading ? (
          filteredData.map((item) => {
            return <CryptoListItem coin={item} type="exchange" />;
          })
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
