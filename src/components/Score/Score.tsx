import React, { FC, useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";

const Score: FC = () => {
  const { fetchScore, updateScore } = useActions();
  const { score } = useTypedSelector((state) => state.score);
  const { userId, token } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    console.log("level", { score, level: Math.floor(score / 300) });
  }, [score]);
  return <div />;
};

export default Score;
