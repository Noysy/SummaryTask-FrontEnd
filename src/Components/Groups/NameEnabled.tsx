import { CardActions, Fab, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

interface INameProps {
  setIsNameEditable: Function;
  groupName: string;
  updateName: Function;
  setGroupName: Function;
}

const NameEnabled = ({
  setIsNameEditable,
  groupName,
  updateName,
  setGroupName,
}: INameProps) => {
  const [currentGroupName, setCurrentGroupName] = useState(groupName);

  return (
    <>
      <TextField
        sx={{ mb: 0.4, mt: -0.5 }}
        id="name-slot"
        variant="standard"
        placeholder="Name:"
        value={groupName}
        onChange={(text) => setGroupName(text.target.value)}
      />
      <CardActions>
        <Fab
          color="success"
          aria-label="edit"
          size="medium"
          onClick={() => {
            setIsNameEditable((prevValue: boolean) => !prevValue);
            updateName();
            setCurrentGroupName(groupName);
          }}
        >
          <DoneIcon />
        </Fab>
        <Fab
          color="default"
          aria-label="delete"
          size="medium"
          onClick={() => {
            setGroupName(currentGroupName);
            setIsNameEditable((prevValue: boolean) => !prevValue);
          }}
        >
          <ClearIcon />
        </Fab>
      </CardActions>
    </>
  );
};

export default NameEnabled;
