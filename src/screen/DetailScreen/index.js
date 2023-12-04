import React, { useEffect, useState } from "react";
import { Button, View } from 'react-native';
import {styles} from '../DetailScreen/styles'
import { LinearGradient } from "expo-linear-gradient";
import { Header as HeaderRNE, SearchBar } from "@rneui/themed";
import { Text } from "@rneui/themed";
import moment from 'moment';
import LinearBackgroundSection from "../../component/section/LinearBackgroundSection";
const minute = 60000;
/**
 * 未來七天的天氣預報、每小時天氣
 */
function DetailsScreen({ route,navigation }) {

  const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DD HH:mm'));
  const { location } = route.params;
  // 每分鐘更新一次page
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, minute); 
    // 當畫面移除時，解除監聽
    return () => clearInterval(intervalId);
  }, []);


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
        <Text h3 h3Style={[styles.titleText,{textAlign:'center'}]}>
            {location}
          </Text>

          <Text h4 h4Style={[styles.titleText]}>
            現在時間：{currentTime}
          </Text>
        
          <View style={{ alignItems: "center" }}>
          <LinearBackgroundSection></LinearBackgroundSection>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.background2}>
        
      </View>
    </View>
    );
  }
export default DetailsScreen