import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Logo from "../images/Logo.png";

export default function InitialHeader() {
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={require("../images/Logo.png")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#15c3d6",
    borderBottomWidth: 1,
    borderColor: "#15c3d6",
    paddingTop: 44,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    maxWidth: 100,
    maxHeight: 30,
  },
});
