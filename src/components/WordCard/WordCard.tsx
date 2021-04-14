/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Button,
} from "@material-ui/core";
import "./WordCard.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import React, { useEffect, useState } from "react";
import IUserWordData from "../../types/user-words-types";
import useWordCard from "../../hooks/useWordCard";
import useTypedSelector from "../../hooks/useTypeSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    details: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#ececec",
    },
    content: {
      flex: "1 0 auto",
      padding: theme.spacing(1),
    },
    cover: {
      width: 120,
      height: 120,
      borderRadius: 300,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playButton: {
      padding: theme.spacing(1),
    },
    playIcon: {
      height: 32,
      width: 32,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

interface IWordsCardProps {
  word: IUserWordData;
  difficultCategory?: boolean;
  learnCategory?: boolean;
  deletedCategory?: boolean;
}

const WordCard: React.FC<IWordsCardProps> = (props: IWordsCardProps) => {
  const classes = useStyles();
  const { word, difficultCategory, learnCategory, deletedCategory } = props;
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { bookSettings } = useTypedSelector((state) => state.settings);
  const { isFetching, error } = useTypedSelector((state) => state.statistics);
  const { isUpdating, error: wordError } = useTypedSelector(
    (state) => state.userWords
  );

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (isFetching || error || isUpdating || wordError) setDisable(true);
    else setDisable(false);
  }, [isFetching, error, isUpdating, wordError]);

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
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            onClick={changeHardStatusHandler}
            disabled={disable}
          >
            Сложное
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={changeDeletedStatusHandler}
          disabled={disable}
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
            className={classes.button}
            startIcon={<PresentToAllIcon />}
            onClick={changeNoStatusHandler}
            disabled={disable}
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
            className={classes.button}
            startIcon={<PresentToAllIcon />}
            onClick={changeNoStatusHandler}
            disabled={disable}
          >
            восстановить
          </Button>
        );
      default:
        return buttons;
    }
  };

  return (
    <Card
      className={`word-card group-${word.group + 1} ${word.userWord?.status}`}
    >
      <CardMedia
        className={classes.cover}
        image={`https://rnovikov-rs-lang-back.herokuapp.com/${word.image}`}
        title={word.word}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {word.word} {word.transcription}
          </Typography>
          {bookSettings.isWordTranslate ? (
            <>
              <Typography component="h6" variant="h6">
                {word.wordTranslate}
              </Typography>
            </>
          ) : (
            ""
          )}
          <Typography
            variant="subtitle1"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: `${word.textMeaning}${
                bookSettings.isSentenceTranslate
                  ? `(${word.textMeaningTranslate})`
                  : ""
              }`,
            }}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: `${word.textExample}${
                bookSettings.isSentenceTranslate
                  ? `(${word.textExampleTranslate})`
                  : ""
              }`,
            }}
          />
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            className={classes.playButton}
            aria-label="play/pause"
            onClick={() => {
              wordAudio.play();
            }}
          >
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          {bookSettings.isButtons ? (
            <>{isAuthenticated ? <>{renderButtons()}</> : ""}</>
          ) : (
            ""
          )}
        </div>
      </div>
    </Card>
  );
};

WordCard.defaultProps = {
  difficultCategory: false,
  learnCategory: false,
  deletedCategory: false,
};

export default WordCard;
