import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";
import back from "./assets/img/back.jpg";
import axios from "axios";
import { d, h, hs, m, time, w } from "./core/time";
import { DataResponse, IResponse } from "./types/Response";
import Loader from "./components/Loader/Loader";
import AreaChart from "./components/BarChart/BarChart";

const App = () => {
  const [data, setData] = useState<DataResponse[]>([]);
  const [date, setDate] = useState<string[]>(m);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const response = async () => {
      setLoading(true);
      try {
        const res = await axios.get<IResponse>(
          "https://fcsapi.com/api-v3/forex/candle?id=1&period=15m&access_key=BBvSQJZUJnPZl6UarOcSuXAo"
        );
        setData(res.data.response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    response();
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
        <div className={classes.block}>
          <>
            <div className={classes.header}>
              <span className={classes.price}>EUR/USD Price Chart</span>
              <span className={classes.data}>
                {new Date().getDate() +
                  " " +
                  new Date().toLocaleString("default", { month: "long" }) +
                  " " +
                  new Date().toLocaleTimeString().slice(0, -3)}
              </span>
            </div>
            <div className={classes.main}>
              <div className={classes.barchar}>
                <AreaChart data={data} labels={date} />
              </div>
              <div className={classes.velues}>
                <div className={classes.value}>
                  <p>Open/Close</p>
                  <span>{data[0]?.o}</span>
                  <span>{data[0]?.c}</span>
                </div>
                <div className={classes.value}>
                  <p>High/Low</p>
                  <span>{data[0]?.h}</span>
                  <span>{data[0]?.l}</span>
                </div>
                <div className={classes.value}>
                  <p>Change/Amplitude</p>
                  <span>{data[0]?.ch}</span>
                  <span>{data[0]?.cp}</span>
                </div>
              </div>
            </div>
            <div className={classes.footer}>
              <p>Time</p>
              {time.map((item, idx) => (
                <span key={idx} onClick={() => changeTime(item)}>
                  {item}
                </span>
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default App;
