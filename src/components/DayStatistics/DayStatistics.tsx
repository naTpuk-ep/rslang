/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from "moment";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";
import { GamesNames } from "../../types/statistics-types";

const DayStatistics = () => {
  const { statistics, isFetching } = useTypedSelector(
    (state) => state.statistics
  );
  const { getStatisticsAction } = useActions();

  useEffect(() => {
    getStatisticsAction();
  }, []);

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

  return (
    <div>
      {isFetching ? (
        ""
      ) : (
        <>
          <div>Общее количество изучаемых слов: {statistics.learnedWords}</div>
          <div>
            Сегодня изучалось слов: {statistics.optional.today.dayLearns}
          </div>
          <div>Процент правильных ответов за день: {dayPercentage()}</div>
          <div>
            Саванна: серия правильных ответов:{" "}
            {statistics.optional.today.savanna.streak}
          </div>
          <div>
            Саванна: процент правильных ответов:{" "}
            {gamePercentage(GamesNames.Savanna)}
          </div>
          <div>
            Спринт: серия правильных ответов:{" "}
            {statistics.optional.today.sprint.streak}
          </div>
          <div>
            Спринт: процент правильных ответов:{" "}
            {gamePercentage(GamesNames.Sprint)}
          </div>
          <div>
            Аудиовызов: серия правильных ответов:{" "}
            {statistics.optional.today.audioCall.streak}
          </div>
          <div>
            Аудиовызов: процент правильных ответов:{" "}
            {gamePercentage(GamesNames.AudioCall)}
          </div>
          <div>
            Угадай слово: серия правильных ответов:{" "}
            {statistics.optional.today.knowWords.streak}
          </div>
          <div>
            Угадай слово: процент правильных ответов:{" "}
            {gamePercentage(GamesNames.KnowWords)}
          </div>
          <BarChart width={730} height={250} data={statistics.optional.allTime}>
            <XAxis dataKey="date" name="Дата" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="learnedWords" name="Слов изучено" fill="#8884d8" />
          </BarChart>
          <AreaChart
            width={730}
            height={250}
            data={statistics.optional.allTime}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" name="Дата" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="learnedWords"
              name="Слов изучено"
              fill="#8884d8"
              stroke="#8884d8"
            />
          </AreaChart>
        </>
      )}
    </div>
  );
};

export default DayStatistics;
