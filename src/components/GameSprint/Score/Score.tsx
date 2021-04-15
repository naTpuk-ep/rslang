import React from "react";

import "./Score.scss";

interface IScoreProps {
  score: number;
}

const Score: React.FunctionComponent<IScoreProps> = (props: IScoreProps) => {
  const { score } = props;
  return <h1 className="game-sprint-score">{`Счёт: ${score}`}</h1>;
};

export default Score;
