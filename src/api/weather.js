import axios from "axios";

export default axios.create({
    baseURL: "https://opendata.cwa.gov.tw/api/",
    headers: {
        Authorization:"CWB-D5232860-D17E-494D-BF25-8CD0F69DEE31",
        Accept: 'application/json'
    },
});

//https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-D5232860-D17E-494D-BF25-8CD0F69DEE31&format=JSON