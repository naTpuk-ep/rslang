import React, { useState, useEffect } from "react";

import "./Time.scss";

interface ITimeProps {
  finishGame: () => void;
}

const Time: React.FunctionComponent<ITimeProps> = (props: ITimeProps) => {
  const { finishGame } = props;
  const [sec, setSec] = useState(30);

  useEffect(() => {
    const time = setTimeout(() => {
      if (sec === 0) {
        finishGame();
      } else {
        setSec((s) => s - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [sec, finishGame]);

  return (
    <div className="time-container">
      <h1 className="time-value">{sec}</h1>
    </div>
  );
};

export default Time;
