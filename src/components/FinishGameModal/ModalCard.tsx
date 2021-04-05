import { CardContent, Card, IconButton, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import useSound from "use-sound";
import React, { FC } from "react";
import IWordData from "../../types/words-types";
import { BACKEND_PATH } from "../../constants/requestParams";

interface IModalCardProps {
  word: IWordData;
}

const ModalCard: FC<IModalCardProps> = ({ word }: IModalCardProps) => {
  const [playWord] = useSound(`${BACKEND_PATH}${word.audio}`);
  return (
    <Card className="finish-modal-card">
      <CardContent className="finish-modal-card__content">
        <IconButton
          aria-label="play/pause"
          onClick={() => {
            playWord();
          }}
        >
          <PlayArrowIcon />
        </IconButton>
        <Typography component="h5">{word.word}</Typography>-
        <Typography component="h5">{word.wordTranslate}</Typography>
      </CardContent>
    </Card>
  );
};

export default ModalCard;
