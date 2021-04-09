/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
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
import useLearningStatistics from "../../hooks/useLearningStatistics";
import { GamesNames } from "../../types/statistics-types";

const LearningStatistics = () => {
  const {
    isFetching,
    statistics,
    dayPercentage,
    gamePercentage,
    formatXAxis,
  } = useLearningStatistics();

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
          <div>
            Сегодня изучено слов: {statistics.optional.today.learnedWordsToday}
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
          {statistics.optional.allTime.length ? (
            <>
              <BarChart
                width={730}
                height={250}
                data={statistics.optional.allTime}
              >
                <XAxis dataKey="date" name="Дата" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="dayLearns" name="Изучено слов" fill="#8884d8" />
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
                  name="Изучаемые слова"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </>
          ) : (
            "Данные за период обучения на данный момент отсутствуют"
          )}
        </>
      )}
    </div>
  );
};

export default LearningStatistics;
