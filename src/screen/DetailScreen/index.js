import React, { useEffect, useState } from "react";
import { Button, View, FlatList,Dimensions } from "react-native";
import { styles, marginLeft } from "../DetailScreen/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Header as HeaderRNE, SearchBar } from "@rneui/themed";
import { Text } from "@rneui/themed";
import moment from "moment";
import LinearBackgroundSection from "../../component/section/LinearBackgroundSection";
import getAllLocalWeather from "../../hooks/getAllLocalWeather";
import RectangleCard from "../../component/card/RectangleCard";
import getApiPathByLocation from "../../utils/getApiPathByLocation";

const minute = 60000;
const {height,width} = Dimensions.get("window");

function DetailsScreen({ route, navigation }) {
  /**
   * 傳入當前時間，判斷要搜尋當日1200或是隔日
   * @param {moment} time 
   * @returns {string} queryTime
   */
  const getQueryTime = (time)=>{
    console.log('*****',time);
    let result = '';
    const noon = moment('12:00','HH:mm');
    const currentHour =time.hour();
    const [year, month, day] = time.toArray().slice(0, 3);
    if (currentHour < noon) {
      // result = `${time.year()}-${time.month()+1}-${time.day()} 12:00`;
      result = moment([year, month, day, 12]).format("YYYY-MM-DD HH:mm");
      console.log('***',result);
    } else {
      result = moment([year, month, day+1, 12]).format("YYYY-MM-DD HH:mm");
    }
    return result;
  }

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
  const [currentTime, setCurrentTime] = useState(
    moment().format("YYYY-MM-DD HH:mm")
  );

  const card = route.params.card;
  const apiPath = getApiPathByLocation(card.location);
  console.log('apiPath: ',apiPath);
  const queryTime = getQueryTime(moment());

  const [fetchData, result, loading, errorMessage] = getAllLocalWeather(
    apiPath,
    {
      timeTo: queryTime,
    }
  );

  // 每分鐘更新一次page
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = moment().format("YYYY-MM-DD HH:mm");
      setCurrentTime(currentTime);
      // 檢查是否超過1200，因為轉換成moment採用格林威治時間，故要加8h
      const queryTime = getQueryTime(moment(currentTime).add(8,'h'));
      // 每分鐘更新各地區域
      fetchData(apiPath,{
        timeTo : queryTime
      });
    }, minute);
    // 當畫面移除時，解除監聽
    return () => clearInterval(intervalId);
  }, []);

  // console.log("result****", result);

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
        <View style={[styles.titleContainer]}>
          <Text h2 h2Style={[styles.titleText, { textAlign: "center" }]}>
            {card.location}
          </Text>

          <Text h4 h4Style={[styles.titleText]}>
            現在時間：{currentTime}
          </Text>

          <View>
            <LinearBackgroundSection card={card} />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.background2}>
        <Text
          h4
          h4Style={[styles.titleText, { marginTop: 12, color: "black" }]}
        >
          各地區詳細資料 :
        </Text>
        <View style={{height:1,width:width*0.85,borderWidth:1,marginLeft,borderColor:'grey'}}/>
        <View style={{height:height*0.4,paddingBottom:5,}}>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={result}
          renderItem={renderItem}
          keyExtractor={(item) => item.location}
        />
        </View>
      </View>
    </View>
  );
}
export default DetailsScreen;
