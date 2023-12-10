import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "@rneui/themed";
import { styles } from "./styles";
const { width,height } = Dimensions.get("window");

const CylinderCard = ({ title, icon, value , height }) => {
  return (
    <View
      style={{
        borderRadius: 30,
        backgroundColor: "white",
        width: width * 0.2,
        height: height,
        marginVertical: 20,
        elevation: 5, // Set the elevation for the shadow effect (Android-specific)
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.5, // Shadow opacity for iOS
        shadowRadius: 5, // Shadow radius for iOS
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Text h4 h4Style={styles.titleText5}>
        {title}
      </Text>
      {/* <Ionicons name="md-water-sharp" size={70} color="#0072E3" /> */}
      {icon}
      <Text
        h4
        h4Style={[styles.titleText5, { fontSize: 18, marginBottom: 10 }]}
      >
        {value}
      </Text>
    </View>
  );
};

export default CylinderCard;
