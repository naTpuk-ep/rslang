import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Drawer from "@material-ui/core/Drawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import {
  ExpandLess,
  ExpandMore,
  GamesTwoTone,
  VideogameAssetTwoTone,
  CollectionsBookmarkTwoTone,
  LibraryBooksTwoTone,
  BookmarkTwoTone,
  EqualizerTwoTone,
} from "@material-ui/icons";
import {
  BOOK,
  STUDIED_WORDS,
  DIFFICULT_WORDS,
  DELETED_WORDS,
  SAVANNAH,
  AUDIO_CALL,
  SPRINT,
  OWN_GAME,
  STATISTICS,
} from "../../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 280,
    },
    fullList: {
      width: "auto",
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface IMenuProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  closeMenu: Function;
}

const Menu: React.FunctionComponent<IMenuProps> = ({
  open,
  closeMenu,
}: IMenuProps) => {
  const isAuthorization = true;
  const classes = useStyles();
  const [openBook, setOpenBook] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [openDictionary, setOpenDictionary] = useState(false);

  const handleClickBook = () => setOpenBook(!openBook);
  const handleClickGame = () => setOpenGame(!openGame);
  const handleClickDictionary = () => setOpenDictionary(!openDictionary);

  return (
    <Drawer anchor="left" open={open} onClose={closeMenu(false)}>
      <div className={classes.list} role="presentation">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={handleClickBook}>
            <ListItemIcon>
              <CollectionsBookmarkTwoTone />
            </ListItemIcon>
            <ListItemText primary="Учебник" />
            {openBook ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBook} timeout="auto" unmountOnExit>
            <List component="div" disablePadding onClick={closeMenu(false)}>
              <LinkContainer to={`${BOOK}/0/0`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BookmarkTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Раздел 1" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={`${BOOK}/1/0`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BookmarkTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Раздел 2" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={`${BOOK}/2/0`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BookmarkTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Раздел 3" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={`${BOOK}/3/0`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BookmarkTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Раздел 4" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={`${BOOK}/4/0`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BookmarkTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Раздел 5" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={`${BOOK}/5/0`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BookmarkTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Раздел 6" />
                </ListItem>
              </LinkContainer>
            </List>
          </Collapse>

          <ListItem button onClick={handleClickGame}>
            <ListItemIcon>
              <VideogameAssetTwoTone />
            </ListItemIcon>
            <ListItemText primary="Игры" />
            {openGame ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGame} timeout="auto" unmountOnExit>
            <List component="div" disablePadding onClick={closeMenu(false)}>
              <LinkContainer to={SAVANNAH}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <GamesTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Саванна" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={AUDIO_CALL}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <GamesTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Аудио вызов" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={SPRINT}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <GamesTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Спринт" />
                </ListItem>
              </LinkContainer>
              <LinkContainer to={OWN_GAME}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <GamesTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Своя игра" />
                </ListItem>
              </LinkContainer>
            </List>
          </Collapse>

          {isAuthorization && (
            <>
              <ListItem button onClick={handleClickDictionary}>
                <ListItemIcon>
                  <LibraryBooksTwoTone />
                </ListItemIcon>
                <ListItemText primary="Словарь" />
                {openDictionary ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openDictionary} timeout="auto" unmountOnExit>
                <List component="div" disablePadding onClick={closeMenu(false)}>
                  <LinkContainer to={STUDIED_WORDS}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <BookmarkTwoTone />
                      </ListItemIcon>
                      <ListItemText primary="Изучаемые слова" />
                    </ListItem>
                  </LinkContainer>
                  <LinkContainer to={`${DIFFICULT_WORDS}/0/0`}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <BookmarkTwoTone />
                      </ListItemIcon>
                      <ListItemText primary="Сложные слова" />
                    </ListItem>
                  </LinkContainer>
                  <LinkContainer to={DELETED_WORDS}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <BookmarkTwoTone />
                      </ListItemIcon>
                      <ListItemText primary="Удаленные слова" />
                    </ListItem>
                  </LinkContainer>
                </List>
              </Collapse>

              <LinkContainer to={STATISTICS}>
                <ListItem button onClick={closeMenu(false)}>
                  <ListItemIcon>
                    <EqualizerTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Статистика" />
                </ListItem>
              </LinkContainer>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default Menu;
