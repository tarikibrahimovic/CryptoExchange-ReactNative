import React, { useContext, useEffect, useRef, useState, memo } from "react";
import { Searchbar } from "react-native-paper";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { CoinsList } from "../../context/CryptoContext";
import { ScrollView, ActivityIndicator } from "react-native";
import CryptoListItem from "../../components/CryptoListComponents/CryptoListItem";
import styled from "styled-components";
import { useNavigation, StackActions } from "@react-navigation/native";

const SearchBar = styled(Searchbar)`
  margin-top: 50px;
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
  padding-top: 10px;
`;

export default memo(function SearchScreen() {
  const { fetchCoins, isLoading, setIsLoading, coins } = useContext(CoinsList);
  const ref = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigation();

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleScrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  const CancelPressHandler = () => {
    navigate.goBack();
  };

  console.log("render");
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setFilteredData(
          coins.filter((item) => {
            return item.name.includes(searchQuery);
          })
        );
      }, 10);
    }
  }, [searchQuery]);


  return (
    <>
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
            return <CryptoListItem coin={item} />;
          })
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </>
  );
});
