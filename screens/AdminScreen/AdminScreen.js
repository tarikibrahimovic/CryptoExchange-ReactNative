import React, { useState, useContext, useEffect } from "react";
import { CoinsList } from "../../context/CryptoContext";
import styled from "styled-components";
import CustomHeader from "../../components/UserComponents/CustomHeader";
import { BACKEND_URL } from "../../env";
import { ScrollView } from "react-native";
import UserCard from "../../components/AdminScreenComponents/UserCard";

export default function AdminScreen() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(CoinsList);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <CustomHeader headerText={"Admin Section"} />
        <ScrollView>
            {users.map((user) => (
                <UserCard key={user}/>
            ))}
        </ScrollView>
    </>
  );
}
