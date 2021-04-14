/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, List, ListItem, Paper, Typography } from "@material-ui/core";
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
    <Box mt={2}>
      {isFetching ? (
        ""
      ) : (
        <>
          <Paper>
            <List dense>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Общее количество изучаемых слов: ${statistics.learnedWords}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Сегодня изучалось слов: ${statistics.optional.today.dayLearns}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Сегодня изучено слов: ${statistics.optional.today.learnedWordsToday}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Процент правильных ответов за день: ${dayPercentage(
                    statistics.optional.today
                  )}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Саванна: серия правильных ответов: ${statistics.optional.today.savanna.streak}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Саванна: процент правильных ответов: ${gamePercentage(
                    statistics.optional.today,
                    GamesNames.Savanna
                  )}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Спринт: серия правильных ответов: ${statistics.optional.today.sprint.streak}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Спринт: процент правильных ответов: ${gamePercentage(
                    statistics.optional.today,
                    GamesNames.Sprint
                  )}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Аудиовызов: серия правильных ответов: ${statistics.optional.today.audioCall.streak}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Аудиовызов: процент правильных ответов: ${gamePercentage(
                    statistics.optional.today,
                    GamesNames.AudioCall
                  )}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Угадай слово: серия правильных ответов: ${statistics.optional.today.knowWords.streak}`}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Box mt={1}>
                  <Typography variant="body1">{`Угадай слово: процент правильных ответов: ${gamePercentage(
                    statistics.optional.today,
                    GamesNames.KnowWords
                  )}`}</Typography>
                </Box>
              </ListItem>
            </List>
          </Paper>

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
    </Box>
  );
};

export default LearningStatistics;
