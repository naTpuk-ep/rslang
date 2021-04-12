/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import { useEffect } from "react";
import { GamesNames } from "../types/statistics-types";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useLearningStatistics = () => {
  const { statistics, isFetching } = useTypedSelector(
    (state) => state.statistics
  );

  const gamePercentage = (gameName: GamesNames) => {
    const percent =
      (statistics.optional.today[gameName].correct /
        (statistics.optional.today[gameName].correct +
          statistics.optional.today[gameName].wrong)) *
      100;
    if (Number.isNaN(percent)) {
      return 0;
    }
    return percent.toFixed(2);
  };

  const dayPercentage = () => {
    const { correctAnswers, wrongAnswers } = statistics.optional.today;

    const percent = (correctAnswers / (correctAnswers + wrongAnswers)) * 100;

    if (Number.isNaN(percent)) {
      return 0;
    }
    return percent.toFixed(2);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatXAxis = (tickItem: any) => {
    return moment(tickItem).format("DD-MM-YYYY");
  };

  return { gamePercentage, dayPercentage, formatXAxis, statistics, isFetching };
};

export default useLearningStatistics;
