import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { locationToApiMap } from "../../utils/getApiPathByLocation";
const LocationPicker = ({  selectedValue, onValueChange}) => {
  const locations = Object.keys(locationToApiMap).map(location => ( {
    label: location,
    value: location,
  }));


  const placeholder = {
    label: '選擇地區...',
    value: null,
    color: '#9EA0A4',
  };


  return (
    <RNPickerSelect
    style={{
      ...pickerSelectStyles,
      placeholder: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent:'center'
      },
      iconContainer: {
        top: 10,
        right: 12,
      },
    }}
      placeholder = {placeholder}
      onValueChange={(value) => {
        console.log(value);
        onValueChange(value);
      }}
      items={locations}
      value={selectedValue}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent:'center',
    paddingVertical: 10,
    // paddingHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default LocationPicker;
