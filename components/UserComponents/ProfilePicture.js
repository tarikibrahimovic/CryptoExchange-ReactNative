import React from "react";
import { Image } from "react-native";

export default function ProfilePicture({ source }) {
  return (
    <Image
      source={source}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        alignSelf: "center",
        marginBottom: 10,
      }}
    />
  );
}
