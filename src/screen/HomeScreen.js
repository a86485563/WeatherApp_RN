import * as React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";
const { width } = Dimensions.get('window');
const marginLeft = width*0.05;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "1%",
    borderRadius: 40,
  },
  background1: {
    width: "95%",
    height: "90%",
    marginHorizontal: 10,
    borderRadius: 40,
  },
  background2: {
    position: "absolute",
    top: "45%",
    marginHorizontal: 10,
    borderRadius: 40,
    backgroundColor: "white",
    width: "95%",
    height: "70%",
  },
  heading: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
  },
  titleText: {
    color: "white",
    fontSize: 22,
    marginLeft: marginLeft
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "start",
  },
});

function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={["#A4CCFCCC", "#3856a4"]}
        style={styles.background1}
      >
        <HeaderRNE
          barStyle="default"
          rightComponent={{
            icon: "menu",
            color: "#fff",
          }}
          containerStyle={{
            flexDirection: "row",
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Weather</Text>
        </View>
      </LinearGradient>
      <View style={styles.background2}>
        <Text style={styles.text}>測試</Text>
      </View>
    </View>
  );
}

export default HomeScreen;
