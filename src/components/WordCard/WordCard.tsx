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
import React, { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import useActions from "../../hooks/useActions";
import IUserWordData from "../../types/userWords-types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "450px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    details: {
      width: "340px",
      display: "flex",
      flexDirection: "column",
      background: "#ececec",
    },
    content: {
      flex: "1 0 auto",
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
    playIcon: {
      height: 38,
      width: 38,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const PATH = "https://rnovikov-rs-lang-back.herokuapp.com/";
interface IWordsCardProps {
  word: IUserWordData;
}

const WordCard: React.FC<IWordsCardProps> = (props: IWordsCardProps) => {
  const classes = useStyles();
  const { word } = props;
  const { createUserWord } = useActions();

  const [wordAudio] = useState(
    new Howl({
      src: [
        `${PATH}${word.audio}`,
        `${PATH}${word.audioExample}`,
        `${PATH}${word.audioMeaning}`,
      ],
      volume: 0.5,
    })
  );

  const createClickHandler = () => {
    createUserWord("605d826946051229947e4eb3", word._id, word.page, {
      status: "hard",
      isLearn: true,
    });
  };

  const deleteClickHandler = () => {
    createUserWord("605d826946051229947e4eb3", word._id, word.page, {
      status: "deleted",
      isLearn: true,
    });
  };

  return (
    <Card
      className={`word-card level-${word.group + 1}${
        word.userWord?.status ? " hard" : ""
      }`}
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
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            aria-label="play/pause"
            onClick={() => {
              wordAudio.play();
            }}
          >
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          {word.userWord?.status === "hard" ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<AddCircleOutlineIcon />}
              onClick={createClickHandler}
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
            onClick={deleteClickHandler}
          >
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WordCard;
