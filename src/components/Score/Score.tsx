import React, { FC, useEffect, useMemo } from "react";
import { Progress } from "react-sweet-progress";
import { Box, LinearProgress } from "@material-ui/core";
import useTypedSelector from "../../hooks/useTypeSelector";
import "react-sweet-progress/lib/style.css";
import "./Score.scss";

const Score: FC = () => {
  const { score } = useTypedSelector((state) => state.score);
  const { loading } = useTypedSelector((state) => state.auth);
  const scorePerLevel = useMemo(() => 300, []);

  const scoreData = {
    levelPercent: ((score % scorePerLevel) * 100) / scorePerLevel,
    level: Math.floor(score / scorePerLevel),
  };

  return (
    <div className="level">
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <div className="level__label">
            {`Level `}
            <Box borderRadius="50%" className="level__number">
              {scoreData.level}
            </Box>
          </div>
          <Progress
            percent={scoreData.levelPercent}
            symbolClassName="level__label__symbol"
          />
        </>
      )}
    </div>
  );
};

export default Score;
