import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const marginLeft = width * 0.05;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "1.5%",
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
    top: "55%",
    marginHorizontal: 10,
    borderRadius: 40,
    backgroundColor: "white",
    width: "95%",
    height: "50%",
    paddingVertical:8
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
    fontWeight:'bold',
    marginLeft: marginLeft,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: "start",
  },
});
