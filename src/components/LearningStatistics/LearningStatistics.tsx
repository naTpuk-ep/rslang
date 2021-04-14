/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import moment from "moment";
import { nanoid } from "nanoid";
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
import useTypedSelector from "../../hooks/useTypeSelector";
import { GamesNames } from "../../types/statistics-types";

const LearningStatistics: React.FunctionComponent = () => {
  const {
    dayPercentage,
    gamePercentage,
    formatXAxis,
  } = useLearningStatistics();

  const { statistics, isFetching } = useTypedSelector(
    (state) => state.statistics
  );

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
          <div>
            Процент правильных ответов за день:{" "}
            {dayPercentage(statistics.optional.today)}
          </div>
          <div>
            Саванна: серия правильных ответов:{" "}
            {statistics.optional.today.savanna.streak}
          </div>
          <div>
            Саванна: процент правильных ответов:{" "}
            {gamePercentage(statistics.optional.today, GamesNames.Savanna)}
          </div>
          <div>
            Спринт: серия правильных ответов:{" "}
            {statistics.optional.today.sprint.streak}
          </div>
          <div>
            Спринт: процент правильных ответов:{" "}
            {gamePercentage(statistics.optional.today, GamesNames.Sprint)}
          </div>
          <div>
            Аудиовызов: серия правильных ответов:{" "}
            {statistics.optional.today.audioCall.streak}
          </div>
          <div>
            Аудиовызов: процент правильных ответов:{" "}
            {gamePercentage(statistics.optional.today, GamesNames.AudioCall)}
          </div>
          <div>
            Угадай слово: серия правильных ответов:{" "}
            {statistics.optional.today.knowWords.streak}
          </div>
          <div>
            Угадай слово: процент правильных ответов:{" "}
            {gamePercentage(statistics.optional.today, GamesNames.KnowWords)}
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
              Подробная статистика по дням:
              {statistics.optional.allTime.map((s) => {
                return (
                  <div key={nanoid()}>
                    <div>{moment(s.date).format("YYYY-MM-DD")}:</div>
                    <div>В этот день изучалось слов: {s.dayLearns}</div>
                    <div>В этот день изучено слов: {s.learnedWordsToday}</div>
                    <div>
                      Процент правильных ответов за день: {dayPercentage(s)}
                    </div>
                    <div>
                      Саванна: серия правильных ответов: {s.savanna.streak}
                    </div>
                    <div>
                      Саванна: процент правильных ответов:{" "}
                      {gamePercentage(s, GamesNames.Savanna)}
                    </div>
                    <div>
                      Спринт: серия правильных ответов: {s.sprint.streak}
                    </div>
                    <div>
                      Спринт: процент правильных ответов:{" "}
                      {gamePercentage(s, GamesNames.Sprint)}
                    </div>
                    <div>
                      Аудиовызов: серия правильных ответов: {s.audioCall.streak}
                    </div>
                    <div>
                      Аудиовызов: процент правильных ответов:{" "}
                      {gamePercentage(s, GamesNames.AudioCall)}
                    </div>
                    <div>
                      Угадай слово: серия правильных ответов:{" "}
                      {s.knowWords.streak}
                    </div>
                    <div>
                      Угадай слово: процент правильных ответов:{" "}
                      {gamePercentage(s, GamesNames.KnowWords)}
                    </div>
                  </div>
                );
              })}
              ;
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
