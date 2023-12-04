import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header as HeaderRNE, SearchBar } from "@rneui/themed";
import { styles } from "./styles";
import RectangleCard from "../../component/card/RectangleCard";
import getAllLocalWeather from "../../hooks/getAllLocalWeather"; // get api
import Card from "../../model/Card";

function HomeScreen({ navigation }) {
  const [term, setTerm] = useState("");
  const insets = useSafeAreaInsets();
  const DATA = [
    {
      icon: require("../../../assets/sunny.png"),
      location: "嘉義縣",
      averageTemp: {
        parameterName: "26",
        parameterValue: "°C",
      },
      minTemp: {
        parameterName: "22",
        parameterValue: "°C",
      },
      highTemp: {
        parameterName: "30",
        parameterValue: "°C",
      },
      commentTemp: {
        parameterName: "舒適",
        parameterValue: "",
      },
      weatherDes: {
        parameterName: "晴時多雲",
        parameterValue: "",
      },
      rainProbability: {
        parameterName: "10",
        parameterValue: "%",
      },
    },
    {
      icon: require("../../../assets/sunny.png"),
      location: "台北市",
      averageTemp: {
        parameterName: "26",
        parameterValue: "°C",
      },
      minTemp: {
        parameterName: "22",
        parameterValue: "°C",
      },
      highTemp: {
        parameterName: "30",
        parameterValue: "°C",
      },
      commentTemp: {
        parameterName: "舒適",
        parameterValue: "",
      },
      weatherDes: {
        parameterName: "晴時多雲",
        parameterValue: "",
      },
      rainProbability: {
        parameterName: "10",
        parameterValue: "%",
      },
    },
    {
      icon: require("../../../assets/sunny.png"),
      location: "新北市",
      averageTemp: {
        parameterName: "26",
        parameterValue: "°C",
      },
      minTemp: {
        parameterName: "22",
        parameterValue: "°C",
      },
      highTemp: {
        parameterName: "30",
        parameterValue: "°C",
      },
      commentTemp: {
        parameterName: "舒適",
        parameterValue: "",
      },
      weatherDes: {
        parameterName: "晴時多雲",
        parameterValue: "",
      },
      rainProbability: {
        parameterName: "10",
        parameterValue: "%",
      },
    },
    {
      icon: require("../../../assets/sunny.png"),
      location: "台中市",
      averageTemp: {
        parameterName: "26",
        parameterValue: "°C",
      },
      minTemp: {
        parameterName: "22",
        parameterValue: "°C",
      },
      highTemp: {
        parameterName: "30",
        parameterValue: "°C",
      },
      commentTemp: {
        parameterName: "舒適",
        parameterValue: "",
      },
      weatherDes: {
        parameterName: "晴時多雲",
        parameterValue: "",
      },
      rainProbability: {
        parameterName: "10",
        parameterValue: "%",
      },
    },
    {
      icon: require("../../../assets/sunny.png"),
      location: "高雄市",
      averageTemp: {
        parameterName: "26",
        parameterValue: "°C",
      },
      minTemp: {
        parameterName: "22",
        parameterValue: "°C",
      },
      highTemp: {
        parameterName: "30",
        parameterValue: "°C",
      },
      commentTemp: {
        parameterName: "舒適",
        parameterValue: "",
      },
      weatherDes: {
        parameterName: "晴時多雲",
        parameterValue: "",
      },
      rainProbability: {
        parameterName: "10",
        parameterValue: "%",
      },
    },
    {
      icon: require("../../../assets/sunny.png"),
      location: "台南市",
      averageTemp: {
        parameterName: "26",
        parameterValue: "°C",
      },
      minTemp: {
        parameterName: "22",
        parameterValue: "°C",
      },
      highTemp: {
        parameterName: "30",
        parameterValue: "°C",
      },
      commentTemp: {
        parameterName: "舒適",
        parameterValue: "",
      },
      weatherDes: {
        parameterName: "晴時多雲",
        parameterValue: "",
      },
      rainProbability: {
        parameterName: "10",
        parameterValue: "%",
      },
    },
  ];
  const TIME_FLAG = {
    MORNING_TO_NIGHT: "1", // 06-18
    NIGHT_TO_TOMORROW_MORNING: "2", // 18-06
    TOMORROW_MORNING_TO_TOMORROW_NIGHT: "3", // 06-18
  };
  const [fetchData, result, loading, errorMessage] = getAllLocalWeather(
    "v1/rest/datastore/F-D0047-089",
  );
  const [bigCard, setBigCard] = useState(null);

  console.log("hi there");
  // // 根據api result 設定大卡片(所在地)的資料，整理資料
  const queryCardByLocation = (location) => {
    if (result == null) {
      console.log("result null");
      return;
    }
    if (location == null) {
      console.log("location null");
      return;
    }
    console.log("**** start filter");
    const card = result.find((card) => location === card.location);
    return card;
  };

  const renderItem = ({ item }) => {
    return (
      <RectangleCard
                  apparentTemp={item.apparentTemp}
                  tempUnit={item.tempUnit}
                  location={item.location}
                  weatherDesc={item.weatherDesc}
                  temp={item.temp}
                  PoP={item.PoP}
                  icon={item.icon}
                />
    );
  };
  const getCardList = () => {
    console.log("in createCardList");
    if (result == null) {
      return result;
    }
    const locationData = result?.records?.location;
    const cardList = locationData.map((element) => new Card(element));

    return cardList;
  };

  /**
   * 處理search bar輸入事件，當輸入的字為三個字時執行filter
   * @param {string} term
   */
  const handleSearchTermChange = (term) => {
    console.log("handleSearchTermChange term:", term);
    // search bar 字發生變化
    setTerm(term);
    // 如果取消搜尋，bigCard設空值
    if (!term) {
      setBigCard(null);
    }
    // term長度大於等於3 執行query
    if (term.length >= 3) {
      console.log("term>=3");
      setBigCard(queryCardByLocation(term));
    }
  };

  useEffect(() => {
    console.log("in set bigCard");
    setBigCard(queryCardByLocation("新北市"));
  }, [result]);

  /**
   * call api and navigate to detail page
   * @param {string} location
   */
  const onCardPress = (location) => {
    console.log('onCardPress location is ',location);
    navigation.navigate("Details",{
      location
    });
  };
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={["#d6e2fa", "#6a85cc"]}
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
          <Text h2 h2Style={styles.titleText}>
            Weather
          </Text>
          <SearchBar
            placeholder="please input a location"
            onChangeText={(text) => handleSearchTermChange(text)}
            value={term}
            onCancel={() => setBigCard(null)}
            containerStyle={{ backgroundColor: "transparent", marginTop: -15 }}
            inputContainerStyle={{
              backgroundColor: "#7f97e230",
              borderRadius: 15,
            }}
            platform="ios"
          />
          <Text h3 h3Style={styles.titleText}>
            My Location
          </Text>
          <View style={{ alignItems: "center" }}>
            {bigCard ? (
              <TouchableOpacity onPress={() => onCardPress(bigCard.location)}>
                <RectangleCard
                  apparentTemp={bigCard.apparentTemp}
                  tempUnit={bigCard.tempUnit}
                  location={bigCard.location}
                  weatherDesc={bigCard.weatherDesc}
                  temp={bigCard.temp}
                  PoP={bigCard.PoP}
                  icon={bigCard.icon}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </LinearGradient>
      <View style={styles.background2}>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={result}
          renderItem={renderItem}
          keyExtractor={(item) => item.location}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
