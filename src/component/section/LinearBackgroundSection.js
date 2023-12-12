import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity,FlatList } from "react-native";
import { View, Image } from "react-native";
import {  Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import {styles} from './styles'
import { Ionicons,Feather,Entypo,FontAwesome5 } from '@expo/vector-icons';
import CylinderCard from '../card/CylinderCard'

const { width,height } = Dimensions.get("window");

const LinearBackgroundSection = ({card}) => {
  const cylinderCards = [
    {title: '相對濕度', icon:<Ionicons name="md-water-sharp" size={70} color="#0072E3"/>, value: card.relativeHumidity.elementValue[0].value+'%',height:height*0.19},
    {title: '風速', icon: <Feather name="wind" size={70} color="black" />, value: card.windSpeed.elementValue[0].value+card.windSpeed.elementValue[0].measures,height:height*0.19},
    {title: '體感溫度', icon: <Entypo name="emoji-happy" size={65} color="#844200" />, value: card.apparentTemp+card.tempUnit,height:height*0.19},
    {title: '露點溫度', icon: <FontAwesome5 name="snowflake" size={65} color="black"/>, value:card.dewPoint+card.tempUnit,height:height*0.19}
  ]
  return (
    <View style={{marginTop:5}}>
      <Text h4 h4Style={styles.titleText}>詳細資訊：</Text>
      <View style={{alignItems:'center',marginTop:20}}>
      <LinearGradient
        colors={["#FFFFFF", "#D0DBF8"]}
        style={{
          width: width*0.85,
          height: height*0.24,
          borderRadius: 20,
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#6883c530",
          marginTop:10,
        }}
      >
        <View style={{flexDirection:'row',width: width*0.85}}>
        <FlatList
        data={cylinderCards}
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        renderItem={({ item }) => (
          <View style={styles.cylinderCardStyle}>
            <CylinderCard title={item.title} icon={item.icon} value={item.value} height={item.height}/>
          </View>
        )}
      />
        </View>
      </LinearGradient>
      </View>
    </View>
  );
};
export default LinearBackgroundSection;
