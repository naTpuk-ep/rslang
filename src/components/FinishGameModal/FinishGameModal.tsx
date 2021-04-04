import { Modal, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { MAIN } from "../../constants/routes";

interface IFinishGameModalProps {
  totalWordCount: number;
  numberOfCorrectAnswers: number;
  longestSeries: number;
}

const FinishGameModal: FC<IFinishGameModalProps> = ({
  totalWordCount,
  numberOfCorrectAnswers,
  longestSeries,
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
      <div className="modal-content">
        <Typography variant="h4">{`Total word count: ${totalWordCount}`}</Typography>
        <Typography variant="h5">{`Correct answers: ${correctAnswersPercent} %`}</Typography>
        <Typography variant="h5">{`Longest series: ${longestSeries}`}</Typography>
      </div>
    </Modal>
  );
};

export default FinishGameModal;
