import React, { useContext } from "react";
import CustomHeader from "../../components/UserComponents/CustomHeader";
import HeroSection from "../../components/UserComponents/HeroSection";
import ChangeUsernameSection from "../../components/UserComponents/ChangeUsernameSection";
import ChangePasswordSection from "../../components/UserComponents/ChangePasswordSection";
import DeleteAccSection from "../../components/UserComponents/DeleteAccSection";
import { ScrollView } from "react-native";
import LogOutButton from "../../components/UserComponents/LogOutButton";
import { CoinsList } from "../../context/CryptoContext";
import AdminSection from "../../components/UserComponents/AdminSection";

export default function UserScreen() {
  const { user } = useContext(CoinsList);
  return (
    <>
      <CustomHeader headerText={"Account Info"} />
      <ScrollView>
        <HeroSection />
        {user.type === "Email" && (
          <>
            <ChangeUsernameSection />
            <ChangePasswordSection />
            <DeleteAccSection />
          </>
        )}
        {user.role === "ADMIN" && <AdminSection />}
      </ScrollView>
      <LogOutButton />
    </>
  );
}
