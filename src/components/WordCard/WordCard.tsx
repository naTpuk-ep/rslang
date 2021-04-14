/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, IconButton, Button, Paper } from "@material-ui/core";
import "./WordCard.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import React from "react";
import IUserWordData from "../../types/user-words-types";
import useWordCard from "../../hooks/useWordCard";
import useTypedSelector from "../../hooks/useTypeSelector";

interface IWordsCardProps {
  word: IUserWordData;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const WordCard: React.FC<IWordsCardProps> = (props: IWordsCardProps) => {
  // const classes = useStyles();
  const { word, difficultCategory, learnCategory, deletedCategory } = props;
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const {
    wordAudio,
    changeHardStatusHandler,
    changeDeletedStatusHandler,
    changeNoStatusHandler,
  } = useWordCard(word);

  const renderButtons = () => {
    const buttons = (
      <>
        {word.userWord?.status === "hard" ? (
          ""
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddCircleOutlineIcon />}
            onClick={changeHardStatusHandler}
          >
            Сложное
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={changeDeletedStatusHandler}
        >
          Удалить
        </Button>
      </>
    );
    switch (true) {
      case deletedCategory === false &&
        learnCategory === false &&
        difficultCategory === false:
        return buttons;
      case deletedCategory === true:
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PresentToAllIcon />}
            onClick={changeNoStatusHandler}
          >
            восстановить
          </Button>
        );
      case difficultCategory === true:
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PresentToAllIcon />}
            onClick={changeNoStatusHandler}
          >
            восстановить
          </Button>
        );
      default:
        return <></>;
    }
  };

  return (
    <Paper
      className={`word-card group-${word.group + 1} ${word.userWord?.status}`}
    >
      <div
        className="word-card__media"
        style={{
          backgroundImage: `url(https://rnovikov-rs-lang-back.herokuapp.com/${word.image})`,
        }}
      />
      <div className="word-card__content">
        <Typography component="h6" variant="h6">
          {word.word} {word.transcription}
        </Typography>
        <Typography component="h6" variant="h6">
          {word.wordTranslate}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${word.textMeaning}(${word.textMeaningTranslate})`,
          }}
        />
        <Typography
          variant="subtitle1"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${word.textExample}(${word.textExampleTranslate})`,
          }}
        />
        <div className="word-card__content_buttons">
          <IconButton
            aria-label="play/pause"
            onClick={() => {
              wordAudio.play();
            }}
          >
            <PlayArrowIcon />
          </IconButton>
          {isAuthenticated ? <>{renderButtons()}</> : ""}
        </div>
      </div>
      <div className="word-card__statistics" />
    </Paper>
  );
};

WordCard.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default WordCard;
