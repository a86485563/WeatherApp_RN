import {useEffect, useState} from "react";
import weather from "../api/weather";
import Card from "../model/Card";

export default(path, params) => {
    const [result, setResult] = useState(null); // 接收資料
    const [loading, setLoading] = useState(false); // spinner
    const [errorMessage, setErrorMessage] = useState(''); // errorMessage
    // errorMessage

    // 定義api function
    const fetchData = async (path, params) => {
        try { 
            setLoading(true);// 開始loading
            const response = await weather.get(path, {params: params}); // call api
            // 設定api result
            const records = response?.data?.records.locations[0];
            // 設定cardList
            const cardList = records.location.map((element) => new Card(element));
            setResult(cardList);
            setLoading(false);// 關閉loading
        } catch (error) {
            setErrorMessage("Error getting the data");
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData(path,params);
    },[]);
    // 回傳出去
    return [fetchData, result,loading ,errorMessage];
};
