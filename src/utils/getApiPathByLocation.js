const locationToApiMap = {
  宜蘭縣: "v1/rest/datastore/F-D0047-001",
  桃園市: "v1/rest/datastore/F-D0047-005",
  新北市: "v1/rest/datastore/F-D0047-069",
  新竹縣: "v1/rest/datastore/F-D0047-009",
  苗栗縣: "v1/rest/datastore/F-D0047-013",
  彰化縣: "v1/rest/datastore/F-D0047-017",
  南投縣: "v1/rest/datastore/F-D0047-021",
  雲林縣: "v1/rest/datastore/F-D0047-025",
  嘉義縣: "v1/rest/datastore/F-D0047-029",
  屏東縣: "v1/rest/datastore/F-D0047-033",
  台東縣: "v1/rest/datastore/F-D0047-037",
  花蓮縣: "v1/rest/datastore/F-D0047-041",
  澎湖縣: "v1/rest/datastore/F-D0047-045",
  基隆市: "v1/rest/datastore/F-D0047-049",
  新竹市: "v1/rest/datastore/F-D0047-053",
  嘉義市: "v1/rest/datastore/F-D0047-057",
  臺北市: "v1/rest/datastore/F-D0047-061",
  高雄市: "v1/rest/datastore/F-D0047-065",
  台中市: "v1/rest/datastore/F-D0047-073",
  台南市: "v1/rest/datastore/F-D0047-077",
  連江縣: "v1/rest/datastore/F-D0047-081",
  金門縣: "v1/rest/datastore/F-D0047-085",
};

const getApiPathByLocation = (location) => {
  return locationToApiMap[location] || "v1/rest/datastore/F-D0047-089";
};

export default getApiPathByLocation;
