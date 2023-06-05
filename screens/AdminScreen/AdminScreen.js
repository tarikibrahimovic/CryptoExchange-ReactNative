import React, { useState, useContext, useEffect } from "react";
import { CoinsList } from "../../context/CryptoContext";
import styled from "styled-components";
import CustomHeader from "../../components/UserComponents/CustomHeader";
import { BACKEND_URL } from "../../env";
import { ScrollView, ActivityIndicator } from "react-native";
import UserCard from "../../components/AdminScreenComponents/UserCard";
import { Searchbar } from "react-native-paper";

export default function AdminScreen() {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const { user } = useContext(CoinsList);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/admin/getUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
      setFilteredData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setFilteredData(
          users.filter((item) => {
            return item.username.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
          })
        );
      }, 10);
    }
  },[searchQuery, users])

  return (
    <>
      <CustomHeader headerText={"Admin"} />
      <SearchBarContainer>
        <SearchBar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor={"#72798B"}
          iconColor={"#72798B"}
          cursorColor={"#FCD434"}
          inputStyle={{ color: "#fff" }}
        />
      </SearchBarContainer>
      <ScrollView>
        {!isLoading ? filteredData.map((user, index) => (
          <UserCard key={index} data={user} setUsers={setUsers} />
        )) : <ActivityIndicator size="large" color="#fff" />}
      </ScrollView>
    </>
  );
}

const SearchBar = styled(Searchbar)`
  margin-top: 10px;
  margin-bottom: 30px;
  background-color: #29313c;
  width: 95%;
`;

const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
