import React from "react";

import "./score.scss";

interface IScoreProps {
  score: number;
}

const Score: React.FunctionComponent<IScoreProps> = (props: IScoreProps) => {
  const { score } = props;
  return <h1>{score}</h1>;
};

export default Score;
