import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import CryptoList from "../../components/CryptoListComponents/CryptoList";
import { ScrollView } from "react-native";

export default function SearchScreen() {
  return (
    <>
      <SearchBar />
      <ScrollToTop />
      <ScrollView>
        <CryptoList />
      </ScrollView>
    </>
  );
}
