import React, { useContext, useEffect, useRef, useState } from "react";
import { Searchbar } from "react-native-paper";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { CoinsList } from "../../context/CryptoContext";
import { ScrollView, ActivityIndicator } from "react-native";
import CryptoListItem from "../../components/CryptoListComponents/CryptoListItem";
import styled from "styled-components";

const SearchBar = styled(Searchbar)`
  margin-top: 50px;
  margin-bottom: 30px;
  background-color: #29313c;
`;

export default function SearchScreen() {
  const { coins, isLoading, setIsLoading } = useContext(CoinsList);
  const ref = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredData([...coins]);
    }, 10);
    setIsLoading(false);
  }, []);

  const handleScrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  useEffect(() => {
    if(!isLoading){
      setTimeout(() => {
        setFilteredData(coins.filter((item) => {
          return item.name.includes(searchQuery);
        }))
      }, 10);
    }
  }, [searchQuery]);

  return (
    <>
      <SearchBar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        placeholderTextColor={"#72798B"}
        iconColor={"#72798B"}
        cursorColor={"#FCD434"}
        inputStyle={{ color: "#fff" }}
      />
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
}
