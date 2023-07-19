import React from "react";
import classes from "./Block.module.scss";
import { DataResponse } from "types/Response";
import AreaChart from "../BarChart/BarChart";
import { time } from "../../core/time";

interface BlockProps {
  data: DataResponse[];
  changeTime: (time: string) => void;
  date: string[];
}

const Block = ({ data, changeTime, date }: BlockProps) => {
  return (
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
          {time.map((item, idx: number) => (
            <span key={idx} onClick={() => changeTime(item)}>
              {item}
            </span>
          ))}
        </div>
      </>
    </div>
  );
};

export default Block;
