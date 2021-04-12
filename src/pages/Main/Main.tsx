import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
  // ExpandLess,
  // ExpandMore,
  // GamesTwoTone,
  // BookmarkTwoTone,
  LibraryBooksTwoTone,
  EqualizerTwoTone,
  VideogameAssetTwoTone,
  CollectionsBookmarkTwoTone,
} from "@material-ui/icons";
import "./Main.scss";
import { Link } from "react-router-dom";

const Main: React.FunctionComponent = () => {
  return (
    <main className="main-page">
      <div className="main-img" />
      <div className="abilities__container">
        <Typography variant="h4" component="h4" className="main-page__title">
          Учить английский легко вместе с RSLang!
        </Typography>
        <Typography className="main-page__title" variant="h5" component="h5">
          <Link to="/">Авторизируйся</Link> и сможешь:
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Card raised>
              <CardContent className="ability-content">
                <LibraryBooksTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Изучить 3600 часто употребляемых английских слов
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card raised>
              <CardContent className="ability-content">
                <VideogameAssetTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Повторять слова играя в игры
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            {" "}
            <Card raised>
              <CardContent className="ability-content">
                <CollectionsBookmarkTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Составить свой собственный словарь
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card raised>
              <CardContent className="ability-content">
                <EqualizerTwoTone
                  fontSize="large"
                  className="ability-content__icon"
                />
                <Typography variant="body1">
                  Оценивать свои успехи в персональной статистике
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className="video">
        <Typography className="main-page__title" variant="h5" component="h5">
          Посмотри видео и ознакомься с функциональностью приложения!
        </Typography>
        <Card raised className="video__card">
          <CardContent>
            <div /> {/* video */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Main;
