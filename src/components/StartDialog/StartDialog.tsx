import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const groups = [
  "Раздел 1",
  "Раздел 2",
  "Раздел 3",
  "Раздел 4",
  "Раздел 5",
  "Раздел 6",
];

export interface IStartDialogProps {
  open: boolean;
  selectGroup: (value: number) => void;
}

const StartDialog: React.FunctionComponent<IStartDialogProps> = (
  props: IStartDialogProps
) => {
  const { selectGroup, open } = props;

  const handleListItemClick = (value: number) => {
    selectGroup(value);
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Выберите раздел</DialogTitle>
      <List>
        {groups.map((group, index) => (
          <ListItem
            button
            onClick={() => handleListItemClick(index)}
            key={group}
          >
            <ListItemText primary={group} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default StartDialog;
