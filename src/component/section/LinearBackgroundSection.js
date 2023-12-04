import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");

const LinearBackgroundSection = () => {
  console.log("hi LinearBackgroundSection");
  return (
    <View>
      <Text>hi LinearBackgroundSection</Text>
      <LinearGradient
        colors={["#FFFFFF", "#D0DBF8"]}
        style={{
          width: width*0.8,
          height: 150,
          borderRadius: 20,
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#6883c530",
          justifyContent: "space-around",
        }}
      >
        <View ></View>
      </LinearGradient>
    </View>
  );
};
export default LinearBackgroundSection;
