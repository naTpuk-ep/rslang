import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from "@material-ui/core";
import useTypedSelector from "../../hooks/useTypeSelector";
import useActions from "../../hooks/useActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    popover: {
      padding: 40,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      rowGap: 10,
    },
  })
);

const BookSettings: React.FunctionComponent = () => {
  const { bookSettings } = useTypedSelector((state) => state.settings);

  const { setSettings, resetSettings } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...bookSettings, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-label="settings"
        className={classes.margin}
        onClick={handleClick}
      >
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.popover}>
          <FormControl component="fieldset">
            <Typography component="legend">Настройки учебника:</Typography>
            <FormGroup className={classes.form}>
              <FormControlLabel
                control={
                  <Switch
                    checked={bookSettings.isWordTranslate}
                    onChange={handleChange}
                    name="isWordTranslate"
                  />
                }
                label="Отображать в списке слов перевод изучаемого слова"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={bookSettings.isSentenceTranslate}
                    onChange={handleChange}
                    name="isSentenceTranslate"
                  />
                }
                label="Отображать в списке слов перевод предложений"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={bookSettings.isButtons}
                    onChange={handleChange}
                    name="isButtons"
                  />
                }
                label="Отображать возле каждого слова кнопки"
              />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={resetSettings}>
              Сброс настроек
            </Button>
          </FormControl>
        </div>
      </Popover>
    </>
  );
};

export default BookSettings;
