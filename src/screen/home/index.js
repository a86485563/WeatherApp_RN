import React, { useContext, useEffect, useState,useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header as HeaderRNE, SearchBar, Icon, Divider } from "@rneui/themed";
import { styles } from "./styles";
import RectangleCard from "../../component/card/RectangleCard";
import getAllLocalWeather from "../../hooks/getAllLocalWeather"; // get api
import Card from "../../model/Card";
import { Context } from "../../redux/MyLocationContext";
import { Ionicons,FontAwesome } from "@expo/vector-icons";
import { locationToApiMap } from '../../utils/getApiPathByLocation';
import LocationPicker from "../../component/picker/LocationPicker";

function HomeScreen({ navigation }) {
  const ADD_ICON_COUNT = 1;
  const [term, setTerm] = useState("");
  const { state,deleteLocation,addLocation } = useContext(Context); // 從context 中取出state、和定義的action
  const [isExpanded, setIsExpanded] = useState(false); // header 收合
  const [selectedValue,setSelectedValue] = useState(''); // picker 選項的值
  const [fetchData, result, loading, errorMessage] = getAllLocalWeather(
    "v1/rest/datastore/F-D0047-089"
  );
  const [bigCard, setBigCard] = useState(null);

  // 由location 去搜尋api 建立卡片
  const createCardByLocation = (location) => {
    if (result == null) {
      return;
    }
    if (location == null) {
      return;
    }
    const card = result.find((card) => location === card.location);
    return card;
  };

  const renderCardList = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onCardPress(item)}>
        <RectangleCard
          apparentTemp={item.apparentTemp}
          tempUnit={item.tempUnit}
          location={item.location}
          weatherDesc={item.weatherDesc}
          temp={item.temp}
          PoP={item.PoP}
          icon={item.icon}
        />
      </TouchableOpacity>
    );
  };

  /**
   * 處理search bar輸入事件，當輸入超過三個字時執行filter
   * @param {string} term
   */
  const handleSearchTermChange = (term) => {
    // search bar 字發生變化
    setTerm(term);
    // 如果取消搜尋，bigCard設空值
    if (!term) {
      setBigCard(null);
    }
    // term長度大於等於3 執行query
    if (term.length >= 3) {
      setBigCard(createCardByLocation(term));
    }
  };

  useEffect(() => {
    setBigCard(createCardByLocation("新北市"));
  }, [result]);

  /**
   * card list 中卡片點擊事件
   * @param {string} location
   */
  const onCardPress = (card) => {
    // 點擊卡片跳轉至detail頁面
    navigation.navigate("Details", {
      card,
    });
  };

  // header menu 點擊事件
  const toggleExpansion = () => {
    // 計算畫面要往下推多少，預設的新增icon加上我的偏好區域個數
    const headerItemCount = ADD_ICON_COUNT + state.length;
    // 設定header收闔
    setIsExpanded(!isExpanded);
  };

  // header偏好區域
  const renderFavoriteLocation = (item) => {
    return <View>
      <Divider width={1} />
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={() => {
        const card = createCardByLocation(item.location);
        onCardPress(card);
        // 關閉收闔
        setIsExpanded(!isExpanded)
      } }>
        <Text h4 h4style={{ color: "black" }}>
          {item.location}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        console.log(item)
        deleteLocation(item.id)}}
        >
      <FontAwesome name="trash-o" size={30} color="black" />
      </TouchableOpacity>
      </View>
    </View>;
  }
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={["#d6e2fa", "#6a85cc"]}
        style={styles.background1}
      >
        <HeaderRNE
          barStyle="default"
          rightComponent={
            <TouchableOpacity onPress={toggleExpansion}>
              <Icon name="menu" color="#fff" />
            </TouchableOpacity>
          }
          containerStyle={{
            flexDirection: "row",
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          }}
        />
        <View style={styles.titleContainer}>
          {isExpanded && (
            <View style={{ borderColor: "gray", borderWidth: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={()=>{
                  console.log(selectedValue);
                  addLocation(selectedValue);
                }}>
                  <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>
                <LocationPicker selectedValue={selectedValue} onValueChange={setSelectedValue}/>
              </View>
              <View style={{ marginLeft: 30 }}>
                <FlatList
                  data={state}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    console.log("item", item);
                    return (
                      renderFavoriteLocation(item)
                    );
                  }}
                />
              </View>
            </View>
          )}
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
              <TouchableOpacity onPress={() => onCardPress(bigCard)}>
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
      <View
        style={[
          styles.background2,
          isExpanded ? { top: `${55 + state.length * 5}%` } : null,
        ]}
      >
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={result}
          renderItem={renderCardList}
          keyExtractor={(item) => item.location}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
