import React, { useState } from "react";
import { StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const ASSETS_PREFIX = '../../../assets/'

const styles = StyleSheet.create({
  colContainer: {
    flexDirection: "column",
  },

  cardContainer: {
    backgroundColor: "transparent",
  },
  h3Style:{ fontWeight:'bold' ,color:'#6883c5',paddingBottom:5},
  h4Style:{color:'#6883c5',paddingBottom:2},
  cardLeftContainer : {marginTop:60,paddingLeft:10,width:width*0.5}
});
const RectangleCard = ({apparentTemp,tempUnit,location,weatherDesc,temp,PoP,icon}) => {
  console.log(`RectangleCard-data icon: ${ASSETS_PREFIX+icon} averageTemp: ${apparentTemp} location: ${location}`);
  const formatWeatherDesc =(weatherDesc)=>{
    console.log('in formatWeatherDesc',weatherDesc);
    let result = '';
    let array = weatherDesc.split('。').slice(0,4);
    result = array.join('。');
    return result+'...';
  }
  return (
    <View >
      <View style={{ zIndex: 1 }}>
        {icon?
        <Image
          style={{ width: 150, height: 150}}
          source={icon}
          resizeMode="contain"
        />:null}
      </View>

      <View style={{marginTop: -70}}>
        <LinearGradient
          colors={["#9ab5fe", "#e4ebf9"]}
          style={{ height: 150,borderRadius: 20,flexDirection:'row',borderWidth:1,borderColor:'#6883c530',justifyContent:'space-around'}}>
            <View style={styles.cardLeftContainer}>
            {/* <Text h3 h3Style={styles.h3Style}>{averageTempValue}</Text> */}
            <Text h4 h4Style={[styles.h4Style,{marginTop:10}]}>{location}</Text>
            <Text h5 style={styles.h4Style}>{formatWeatherDesc(weatherDesc)}</Text>
            </View>
            <View style={{width:width*0.3,paddingTop:30}}>
              <Text h2 h2Style={{color:'#7c8cc4',fontWeight:'bold',textAlign:'center',paddingBottom:10}}>{`${apparentTemp}${tempUnit}`}</Text>
              <Text h5 style={{color:'#7c8cc4',marginStart:20,paddingBottom:5}}>{`溫度:${temp}${tempUnit}`}</Text>
              <Text h5 style={{color:'#7c8cc4',marginStart:20}}>{`降雨機率:${PoP}%`}</Text>
            </View>

          </LinearGradient>
      </View>
    </View>
  );
};

export default RectangleCard;
