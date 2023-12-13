# WeatherApp_RN

簡單的天氣預報app練習。

因為api回傳的資料區間是以6小時為單位故以1200為一個區隔，抓今日預報資料或是明日的資料。作品如下圖。

![demo](./WeatherAppDemo.gif)

## 簡介

* 使用[氣象資料開放平臺](https://opendata.cwa.gov.tw/index)提供的api。
* 使用 React-Native 作為App框架。
* 使用 React Hook & axios 實作api 呼叫。
* 使用 Redux 完成 header 儲存偏好區域。
* 使用 [React Native Element](https://reactnativeelements.com/) 元件。
* 使用 [React Native Navigation](https://reactnavigation.org/) 當作路由。
###### tags: `JavaScript` `React-Native` `Redux` `React Native Element`

## Getting Started

### Dependencies
1.  @react-native-picker/picker 
2.  react-native-picker-select
3.  react native element

### Installing

* npm install

### project structure

```
├── src/
│   ├── api/  <--- create axios
│   └── component/...  <--- 存放共用的元件
│   └── hook/...  <--- 呼叫api 並做資料整理
│   └── model/...  <--- data object
│   └── redux/...  <--- redux
│   └── screen/...  <--- 呈現畫面
│   └── utils/...  <--- 小工具
├── assets/
├── package.json
└── App.js  //管理navigation，定義路由
```

## Reference
1.  [氣象資料開放平臺](https://opendata.cwa.gov.tw/index)
2.  [React Native Element](https://reactnativeelements.com/)
3.  [React Native Navigation](https://reactnavigation.org/)
4.  [create custom hook to call api](https://dev.to/hey_yogini/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj)
5.  [Redux and hook example](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)