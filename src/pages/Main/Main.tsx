/* eslint-disable react/no-array-index-key */
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  LibraryBooksTwoTone,
  EqualizerTwoTone,
  VideogameAssetTwoTone,
  CollectionsBookmarkTwoTone,
} from "@material-ui/icons";
import "./Main.scss";
import { Link } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { SIGN_IN } from "../../constants/routes";
import team from "../../constants/team";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
  card: {
    marginBottom: 20,
  },
  part: {
    padding: 0,
  },
  avatar: {
    width: 200,
  },
}));

const Main: React.FunctionComponent = () => {
  const { isAuthenticated, loading } = useAuthentication();
  const classes = useStyles();

  return (
    <main className="main-page">
      <div className="abilities__container">
        <Typography variant="h4" component="h3" className="main-page__title">
          Учить английский легко вместе с RSLang!
        </Typography>
        <Typography className="main-page__title" variant="h5" component="h4">
          {isAuthenticated || loading ? null : (
            <>
              <Link to={SIGN_IN}>Авторизируйся</Link> и:
            </>
          )}
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Card className="ability-item" raised>
              <CardContent className="ability-content">
                <LibraryBooksTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Изучи 3600 часто употребляемых английских слов
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="ability-item" raised>
              <CardContent className="ability-content">
                <VideogameAssetTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Повторяй слова играя в игры
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            {" "}
            <Card className="ability-item" raised>
              <CardContent className="ability-content">
                <CollectionsBookmarkTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Составляй свой собственный словарь
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="ability-item" raised>
              <CardContent className="ability-content">
                <EqualizerTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Оценивай свои успехи в персональной статистике
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className="video">
        <Typography className="main-page__title" variant="h5" component="h4">
          Посмотри видео и ознакомься с функциональностью приложения!
        </Typography>
        <Card raised className="video__card">
          <CardContent>
            <div /> {/* video */}
          </CardContent>
        </Card>
      </div>
      <div className="team">
        <Typography className="main-page__title" variant="h5" component="h4">
          О комманде:
        </Typography>

        <List className={classes.root}>
          {team.map((member, i) => {
            return (
              <Card className={classes.card}>
                <ListItem key={i} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={member.name} src={member.cover} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Link to={member.github}>{member.name}</Link>}
                    secondary={
                      <List component="ul">
                        {member.desc.map((part, j) => {
                          return (
                            <ListItem className={classes.part} key={j}>
                              <Typography component="p" color="textSecondary">
                                {part}
                              </Typography>
                            </ListItem>
                          );
                        })}
                      </List>
                    }
                  />
                </ListItem>
              </Card>
            );
          })}
        </List>

        {/* {team.map((member, i) => {
          return (
            <Card key={i} raised className={classes.root}>
              <CardMedia
                className={classes.cover}
                image={member.cover}
                title={member.github}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h6">
                    <Link to={member.github}>{member.name}</Link>
                  </Typography>
                  <Typography component="h5" variant="h6">
                    Участие:
                  </Typography>
                  <List component="ul">
                    {member.desc.map((part, j) => {
                      return (
                        <ListItem key={j}>
                          <Typography
                            component="p"
                            variant="h6"
                            color="textSecondary"
                          >
                            {part}
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </div>
            </Card>
          );
        })} */}
      </div>
    </main>
  );
};

export default Main;
