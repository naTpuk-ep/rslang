/* eslint-disable react/no-array-index-key */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link as LinkMaterial,
  Paper,
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

const Main: React.FunctionComponent = () => {
  const { isAuthenticated, loading } = useAuthentication();

  return (
    <main className="main-page">
      <Box mt={4}>
        <Typography variant="h4" component="h3">
          Учить английский легко вместе с RSLang!
        </Typography>
      </Box>
      <Box mt={8}>
        <Typography variant="h4" component="h3">
          {isAuthenticated || loading ? null : (
            <>
              <Link to={SIGN_IN}>Авторизируйся</Link> и:
            </>
          )}
        </Typography>
      </Box>
      <Box mt={4} className="main-page__info-cards">
        <Paper className="main-page__info-cards_card">
          <LibraryBooksTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Изучи 3600 часто употребляемых английских слов
          </Typography>
        </Paper>
        <Paper className="main-page__info-cards_card">
          <VideogameAssetTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">Повторяй слова играя в игры</Typography>
        </Paper>
        <Paper className="main-page__info-cards_card">
          <CollectionsBookmarkTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Составляй свой собственный словарь
          </Typography>
        </Paper>
        <Paper className="main-page__info-cards_card">
          <EqualizerTwoTone fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Оценивай свои успехи в персональной статистике
          </Typography>
        </Paper>
      </Box>
      <Box mt={8}>
        <Typography variant="h4" component="h3">
          Посмотри видео и ознакомься с функциональностью приложения!
        </Typography>
      </Box>
      <Box mt={4}>
        <Paper>{/* video */}</Paper>
      </Box>
      <Box mt={8}>
        <Typography variant="h4" component="h3">
          О комманде:
        </Typography>
      </Box>
      <Box className="main-page__team-cards" mt={4}>
        {team.map((member) => {
          return (
            <Card key={member.name} className="main-page__team-cards_card">
              <CardHeader
                avatar={<Avatar src={member.cover} aria-label="recipe" />}
                title={
                  <Typography variant="button">
                    <LinkMaterial href={member.github}>
                      {member.name}
                    </LinkMaterial>
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                {member.desc.map((item) => {
                  return (
                    <Box mt={1}>
                      <Typography variant="body1">{item}</Typography>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </main>
  );
};

export default Main;
