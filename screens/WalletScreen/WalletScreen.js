import React, { useState, useContext } from "react";
import { CoinsList } from "../../context/CryptoContext";
import BalanceSection from "../../components/WalletScreenComponents/BalanceSection";
import RecommendedSection from "../../components/WalletScreenComponents/RecommendedSection";
import { ScrollView } from "react-native";
import UserCollection from "../../components/WalletScreenComponents/UserCollection";
import EmptySection from "../../components/WalletScreenComponents/EmptySection";

export default function WalletScreen() {
  const { user } = useContext(CoinsList);

  return (
    <>
      {user.username === "" ? (
        <EmptySection
          option="login"
          title={"You are not logged in!"}
          subtitle={"Login!"}
        />
      ) : !user.isVerified ? (
        <EmptySection
          option="verify"
          title={"You are not verified!"}
          subtitle={"Verify!"}
        />
      ) : (
        <ScrollView>
          <BalanceSection />
          <RecommendedSection />
          <UserCollection />
        </ScrollView>
      )}
    </>
  );
}

