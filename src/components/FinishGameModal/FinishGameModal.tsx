/* eslint-disable react/no-array-index-key */
import { Backdrop, Grid, Paper, Typography } from "@material-ui/core";
import React, { FC, useEffect } from "react";
import ModalCard from "./ModalCard";
import "./FinishGameModal.scss";
import IUserWordData from "../../types/user-words-types";
import useUpdateStatistic from "../../hooks/useUpdateStatistic";
import { GamesNames } from "../../types/statistics-types";
import useTypedSelector from "../../hooks/useTypeSelector";

interface IFinishGameModalProps {
  gameName: GamesNames;
  longestSeries: number;
  correctWords: IUserWordData[];
  mistakes: IUserWordData[];
}

const FinishGameModal: FC<IFinishGameModalProps> = ({
  gameName,
  longestSeries,
  correctWords,
  mistakes,
}: IFinishGameModalProps) => {
  const totalWordCount = correctWords.length + mistakes.length;
  const correctAnswersPercent = Math.round(
    (100 * correctWords.length) / totalWordCount
  );
  const { updateGameStatistics } = useUpdateStatistic();
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      updateGameStatistics(gameName, {
        streak: longestSeries,
        wrong: mistakes.length,
        correct: correctWords.length,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Backdrop open>
      <Paper elevation={3} className="modal-paper">
        <div className="modal-content finish-modal-content">
          <Typography variant="h5">{`Общее колличество слов: ${totalWordCount}`}</Typography>
          <Typography variant="h5">{`Правильные ответы: ${
            Number.isNaN(correctAnswersPercent) ? 0 : correctAnswersPercent
          } %`}</Typography>
          <Typography variant="h5">{`Самая длинная серия: ${longestSeries}`}</Typography>
          <Grid className="finish-modal-content__title" container spacing={3}>
            <Grid item xs={6}>
              <Typography className="finish-modal-words__correct" variant="h4">
                Знаю&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="finish-modal-words__summarize">
                  {correctWords.length}
                </div>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="finish-modal-words__mistake" variant="h4">
                Не знаю&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="finish-modal-words__summarize">
                  {mistakes.length}
                </div>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} className="finish-modal-words">
            <Grid className="finish-modal-words__correct" item xs={6}>
              {correctWords.map((word, i) => (
                <ModalCard key={i} word={word} />
              ))}
            </Grid>
            <Grid className="finish-modal-words__mistake" item xs={6}>
              {mistakes.map((word, i) => (
                <ModalCard key={i} word={word} />
              ))}
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default FinishGameModal;
