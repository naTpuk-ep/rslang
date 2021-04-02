import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./game-field.scss";

const useStyles = makeStyles({
  root: {
    width: 300,
    textAlign: "center",
  },
});

const GameField = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="game-status">
          <span className="game-status-indicator">
            <CheckBox />
          </span>
          <span>
            <CheckBoxOutlineBlank />
          </span>
          <span>
            <CheckBoxOutlineBlank />
          </span>
          <p>+10 очков за слово</p>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
          <LooksOne />
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Слово
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          Перевод
        </Typography>
      </CardContent>
      <CardActions className="game-button-container">
        <Button variant="contained" color="secondary">
          Неверно
        </Button>
        <Button variant="contained" color="primary">
          Верно
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameField;
