import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import { theme } from "../../theme/index";
import { Entypo } from "@expo/vector-icons";
import { Platform, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CoinsList } from "../../context/CryptoContext";
import { BACKEND_URL } from "../../env";
import * as SecureStore from "expo-secure-store";

export default function DetailsHeader({ coinId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setUser } = useContext(CoinsList);
  const [token, setToken] = useState();
  const navigate = useNavigation();

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("jwtToken");
    setToken(token);
  };

  useEffect(() => {
    getToken();
    if (user.favorites.includes(coinId)) {
      setIsFavorite(true);
    }
  }, []);

  const toggleFavorite = async () => {
    if (user.username === "") {
      navigate.navigate("AuthStack", { screen: "Login" });
    }
    else if(user.username !== "" && user.isVerified === false){
      navigate.navigate("AuthStack", { screen: "Verify" });
    }
    if (isFavorite) {
      try {
        const response = await fetch(
          `${BACKEND_URL}/favorites/remove/${coinId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setIsFavorite(false);
        setUser((prev) => {
          return {
            ...prev,
            favorites: prev.favorites.filter((item) => item !== coinId),
          };
        });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const response = await fetch(`${BACKEND_URL}/favorites/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coinId: coinId,
          }),
        });
        const data = await response.json();
        setUser((prev) => {
          return {
            ...prev,
            favorites: [...prev.favorites, coinId],
          };
        });
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(isFavorite);

  return (
    <HeaderContainer>
      <AntDesign
        name="arrowleft"
        size={24}
        color={theme.colors.tertiary}
        onPress={() => navigate.navigate("Home")}
      />
      {isFavorite ? (
        <Entypo
          name="star"
          size={24}
          color={theme.colors.tertiary}
          onPress={() => toggleFavorite()}
        />
      ) : (
        <Entypo
          name="star-outlined"
          size={24}
          color={theme.colors.tertiary}
          onPress={() => toggleFavorite()}
        />
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${Platform.OS === "android" ? "40px" : "16px"};
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
`;
