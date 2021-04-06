import { Grid, Modal, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { MAIN } from "../../constants/routes";
import IWordData from "../../types/words-types";
import ModalCard from "./ModalCard";
import "./FinishGameModal.scss";

interface IFinishGameModalProps {
  totalWordCount: number;
  numberOfCorrectAnswers: number;
  longestSeries: number;
  correctWords: IWordData[];
  mistakes: IWordData[];
}

const FinishGameModal: FC<IFinishGameModalProps> = ({
  totalWordCount,
  numberOfCorrectAnswers,
  longestSeries,
  correctWords,
  mistakes,
}: IFinishGameModalProps) => {
  const [open, setOpen] = useState(true);
  const correctAnswersPercent = Math.round(
    (100 * numberOfCorrectAnswers) / totalWordCount
  );
  return !open ? (
    <Redirect to={MAIN} />
  ) : (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="modal"
    >
      <div className="modal-content finish-modal-content">
        <Typography variant="h5">{`Общее колличество слов: ${totalWordCount}`}</Typography>
        <Typography variant="h5">{`Правильные ответы: ${
          Number.isNaN(correctAnswersPercent) ? 0 : correctAnswersPercent
        } %`}</Typography>
        <Typography variant="h5">{`Самая длинная серия: ${longestSeries}`}</Typography>
        <Grid className="finish-modal-content__title" container spacing={3}>
          <Grid item xs={6}>
            <Typography className="finish-modal-words__correct" variant="h4">
              Знаю&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="finish-modal-words__summarize">
                {correctWords.length}
              </div>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="finish-modal-words__mistake" variant="h4">
              Не знаю&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="finish-modal-words__summarize">
                {mistakes.length}
              </div>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="finish-modal-words">
          <Grid className="finish-modal-words__correct" item xs={6}>
            {correctWords.map((word) => (
              <ModalCard word={word} />
            ))}
          </Grid>
          <Grid className="finish-modal-words__mistake" item xs={6}>
            {mistakes.map((word) => (
              <ModalCard word={word} />
            ))}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default FinishGameModal;
