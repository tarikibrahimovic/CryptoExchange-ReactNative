import React from "react";
import CustomHeader from "../../components/UserComponents/CustomHeader";
import HeroSection from "../../components/UserComponents/HeroSection";
import ChangeUsernameSection from "../../components/UserComponents/ChangeUsernameSection";
import ChangePasswordSection from "../../components/UserComponents/ChangePasswordSection";
import DeleteAccSection from "../../components/UserComponents/DeleteAccSection";
import { ScrollView } from "react-native";
import LogOutButton from "../../components/UserComponents/LogOutButton";

export default function UserScreen() {

  return (
    <>
      <CustomHeader />
      <ScrollView>
        <HeroSection />
        <ChangeUsernameSection />
        <ChangePasswordSection />
        <DeleteAccSection />
      </ScrollView>
      <LogOutButton />
    </>
  );
}
