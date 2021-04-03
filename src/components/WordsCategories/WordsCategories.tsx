import {
  Grid,
  makeStyles,
  createStyles,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import "./WordsCategories.scss";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { BOOK } from "../../constants/routes";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

interface IWordsCategoriesProps {
  count: number;
}

const WordsCategories: React.FunctionComponent<IWordsCategoriesProps> = (
  props: IWordsCategoriesProps
) => {
  const classes = useStyles();
  const { count } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {[...Array(count)].map((card, i) => {
          return (
            <Grid item xs={6} key={nanoid()}>
              <Card className={classes.root}>
                <CardActionArea className={`card-action-level-${i + 1}`}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {`Раздел ${i + 1}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`${BOOK}/${i}/0`}
                  >
                    К разделу
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

function mapStateToProps(state: { categories: { count: number } }) {
  return {
    count: state.categories.count,
  };
}

export default connect(mapStateToProps)(WordsCategories);
