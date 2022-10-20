import { Card, CardActions, Fab, TextField, Zoom } from "@mui/material";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import GroupServices from "../../Services/Groups";
import { toast } from "react-toastify";
import { groupFromDb, IGroup } from "../../Interfaces/Group";

interface IProps {
  setIsCreating: Function;
  isCreating: boolean;
  setGroupList: Function;
}

const CreateGroup: React.FC<IProps> = ({
  isCreating,
  setIsCreating,
  setGroupList,
}) => {
  const [groupName, setGroupName] = useState("");

  const createGroup = () => {
    if (!groupName)
      return toast.error("You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮");
    GroupServices.createGroup(groupName)
      .then(({ id, name }: groupFromDb) => {
        setGroupList((groupList: IGroup[]) => [...groupList, { id, name }]);

        return toast.success("A new group :o");
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <Zoom in={isCreating}>
      <Card id="group-card">
        <TextField
          sx={{ mb: 1.5, mt: 3, ml: 2 }}
          id="name-slot"
          variant="standard"
          placeholder="Name:"
          value={groupName}
          onChange={(text) => setGroupName(text.target.value)}
        />
        <CardActions sx={{ mb: 5, mt: 3, ml: 1 }}>
          <Fab
            color="success"
            aria-label="edit"
            size="medium"
            onClick={() => {
              setIsCreating((prevValue: boolean) => !prevValue);
              createGroup();
            }}
          >
            <DoneIcon />
          </Fab>
          <Fab
            color="default"
            aria-label="delete"
            size="medium"
            onClick={() => setIsCreating((prevValue: boolean) => !prevValue)}
          >
            <ClearIcon />
          </Fab>
        </CardActions>
      </Card>
    </Zoom>
  );
};

export default CreateGroup;
