import React, { useContext, useEffect, useRef, useState, memo } from "react";
import { Searchbar } from "react-native-paper";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { CoinsList } from "../../context/CryptoContext";
import { ScrollView, ActivityIndicator } from "react-native";
import CryptoListItem from "../../components/CryptoListComponents/CryptoListItem";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/UserComponents/CustomHeader";

export default memo(function SearchScreen() {
  const { isLoading, coins } = useContext(CoinsList);
  const ref = useRef(null);
  const navigate = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
            return item.name.includes(searchQuery);
          })
        );
      }, 10);
    }
  }, [searchQuery]);

  return (
    <>
      <CustomHeader headerText={"Search"} />
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

const SearchBar = styled(Searchbar)`
  margin-bottom: 30px;
  background-color: #29313c;
  width: 80%;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.logo};
  font-size: 16px;
  margin: 15px 10px;
`;
 