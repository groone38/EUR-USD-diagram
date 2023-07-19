import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";
import back from "../../assets/img/back.jpg";
import axios from "axios";
import { DataResponse, IResponse } from "../../types/Response";
import { d, h, hs, m, w } from "../../core/time";
import Loader from "../Loader/Loader";
import Block from "../Block/Block";

const App = () => {
  const [data, setData] = useState<DataResponse[]>([]);
  const [date, setDate] = useState<string[]>(m);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    const { data } = await axios.get(
      "https://fcsapi.com/api-v3/forex/candle?id=1&period=15m&access_key=BBvSQJZUJnPZl6UarOcSuXAo"
    );
    setData(data.response);
  };

  useEffect(() => {
    getData();
  }, []);

  const changeTime = async (time: string) => {
    setLoading(true);
    try {
      const res = await axios.get<IResponse>(
        `https://fcsapi.com/api-v3/forex/candle?id=1&period=${time}&access_key=BBvSQJZUJnPZl6UarOcSuXAo`
      );
      setData(res.data.response);
      if (time === "15m") {
        setDate(m);
      } else if (time === "1h") {
        setDate(h);
      } else if (time === "4h") {
        setDate(hs);
      } else if (time === "1d") {
        setDate(d);
      } else {
        setDate(w);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={classes.app}>
      <img src={back} alt="back" />
      {loading ? (
        <Loader />
      ) : (
        <Block data={data} changeTime={changeTime} date={date} />
      )}
    </div>
  );
};

export default App;
