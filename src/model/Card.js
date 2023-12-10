const DECIMAL = 10;
class Card {
  static WEATHER_ELEMENT_INDEX = {
    PoP12h: 0, // 12小時降雨機率
    Wx: 1, // 天氣現象
    AT: 2, // 體感溫度
    T: 3, // 溫度
    RH: 4, //相對濕度
    CI: 5, // 舒適度指數
    WeatherDescription: 6, //天氣預報綜合描述
    PoP6h: 7, //6小時降雨機率
    WS: 8, // 風速
    WD: 9, // 風向
    Td: 10, // 露點露點溫度
  };
  static WEATHER_ICON_SOURCE = {
    CLOUDY: require("../../assets/cloudy.png"), // 雲天 icon
    SUNNY: require("../../assets/sunny.png"), // 晴天 icon
    CLOUDY_WITH_RAIN: require("../../assets/cloudy_with_rain.png"), // 晴時多雲icon
    RAINING: require("../../assets/raining.png"), // 雨天 icon
  };

  constructor(locationData) {
    // console.log("in card");
    const weatherElement = locationData.weatherElement;
    this.tempUnit = "°C"; // 溫度單位
    this.weatherDesc =
      weatherElement[
        Card.WEATHER_ELEMENT_INDEX.WeatherDescription
      ].time[0].elementValue[0].value; // 天氣描述
    this.apparentTemp = parseInt(
      weatherElement[Card.WEATHER_ELEMENT_INDEX.AT].time[0].elementValue[0]
        .value,
      DECIMAL
    ); // 體感溫度
    this.temp = parseInt(
      weatherElement[Card.WEATHER_ELEMENT_INDEX.T].time[0].elementValue[0]
        .value,
      DECIMAL
    ); // 實際溫度
    this.icon = this.getIcon(
      weatherElement[Card.WEATHER_ELEMENT_INDEX.Wx].time[0].elementValue[1]
        .value
    ); // 取得圖片
    this.location = locationData.locationName; // 地點
    this.PoP =
      weatherElement[
        Card.WEATHER_ELEMENT_INDEX.PoP6h
      ].time[0].elementValue[0].value;
    this.windSpeed = weatherElement[Card.WEATHER_ELEMENT_INDEX.WS].time[0];
    this.windDirection = weatherElement[Card.WEATHER_ELEMENT_INDEX.WD].time[0];
    this.relativeHumidity = weatherElement[Card.WEATHER_ELEMENT_INDEX.RH].time[0];
    this.dewPoint = weatherElement[Card.WEATHER_ELEMENT_INDEX.Td].time[0].elementValue[0].value;

    // console.log(
    //   `in card tempUnit : ${this.tempUnit} , weatherDesc: ${this.weatherDesc}, apparentTemp: ${this.apparentTemp} , temp: ${this.temp} , icon : ${this.icon} , location: ${this.location}`
    // );
  }

  /**
   * 依照天氣描述取得icon
   * @param {string} weatherDes
   * @returns {string} icon Path
   */
  getIcon = (weatherDes) => {
    // console.log("in getIcon weatherDes: ", weatherDes);
    let result = ""; // 圖片路徑
    switch (weatherDes) {
      case "1":
      case "2":
        result = Card.WEATHER_ICON_SOURCE.SUNNY;
        break;
      case "4":
      case "5":
      case "6":
      case "7":
        result = Card.WEATHER_ICON_SOURCE.CLOUDY;
        break;
      case "8":
      case "9":
      case "10":
      case "12":
      case "13":
        result = Card.WEATHER_ICON_SOURCE.CLOUDY_WITH_RAIN;
        break;
      case "11":
      case "14":
        result = Card.WEATHER_ICON_SOURCE.RAINING;
        break;
      default:
        result = Card.WEATHER_ICON_SOURCE.CLOUDY_WITH_RAIN;
        break;
    }

    return result;
  };
}

export default Card;
