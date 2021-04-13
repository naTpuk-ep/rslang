import React, { useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button } from "@material-ui/core";
import useTypedSelector from "../../hooks/useTypeSelector";
import useActions from "../../hooks/useActions";

const BookSettings: React.FunctionComponent = () => {
  const { bookSettings } = useTypedSelector((state) => state.settings);

  const { setSettings, resetSettings } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...bookSettings, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Настройки учебника:</FormLabel>
      <FormGroup>
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
  );
};

export default BookSettings;
