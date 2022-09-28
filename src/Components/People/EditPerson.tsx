import {
  CardContent,
  CardActions,
  TextField,
  Typography,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import {
  Person,
  personEnabledDetails,
  PersonWithId,
} from "../../Interfaces/Person";
import GroupServices from "../../Services/Groups";
import { toast } from "react-toastify";
import { IGroup } from "../../Interfaces/Group";

const PersonEnabledDetails = (props: personEnabledDetails) => {
  const {
    setAreSlotsEnabled,
    areSlotsEnabled,
    updatePerson,
    createPerson,
    person,
  } = props;

  const { id } = person;
  const [newPerson, setNewPerson] = useState(person);
  const [allGroups, setAllGroups] = useState();
  const [group, setGroup] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    GroupServices.getAllGroups()
      .then((res) => {
        setAllGroups(
          res.data.map((group: IGroup) => {
            return (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            );
          })
        );
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, []);

  const editDetailTextBox = (
    fieldName: string,
    field: string,
    mb: number = -1,
    mt: number = 1,
    ml: number = 2,
    fontSize: number = 14
  ) => {
    return (
      <TextField
        InputProps={{ disableUnderline: true, style: { fontSize } }}
        sx={{ mb, ml, mt }}
        placeholder={fieldName}
        variant="standard"
        value={newPerson[field]}
        onChange={(event) =>
          setNewPerson((person: PersonWithId) => ({
            ...person,
            [field]: event.target.value,
          }))
        }
      />
    );
  };

  return (
    <CardContent>
      {editDetailTextBox("Name:", "name", 0.4, -0.5, 0, 16)}
      {editDetailTextBox("Favorite color:", "favoriteColor")}
      {editDetailTextBox("Favorite food:", "favoriteFood")}
      {editDetailTextBox("Favorite animal:", "favoriteAnimal")}
      {editDetailTextBox("Role:", "role")}

      {id ? (
        <Typography
          sx={{ fontSize: 14, mt: 1 }}
          color="text.secondary"
          gutterBottom
        >
          {id}
        </Typography>
      ) : (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Group</InputLabel>
          <Select value={group} onChange={handleChange} label="Group">
            <MenuItem value="">None</MenuItem>
            {allGroups}
          </Select>
        </FormControl>
      )}
      <CardActions>
        {id ? (
          <>
            <Fab
              sx={{ mt: 2, ml: -2 }}
              color="success"
              aria-label="done"
              size="small"
              onClick={() => {
                setAreSlotsEnabled(!areSlotsEnabled);

                if (updatePerson) {
                  updatePerson(newPerson);
                }
              }}
            >
              <DoneIcon />
            </Fab>
            <Fab
              sx={{ mt: 2, ml: -2 }}
              color="inherit"
              aria-label="cancel"
              size="small"
              onClick={() => {
                setNewPerson(person);
                setAreSlotsEnabled(!areSlotsEnabled);
              }}
            >
              <ClearIcon />
            </Fab>
          </>
        ) : (
          <>
            <Fab
              sx={{ mt: 1, ml: 19 }}
              color="primary"
              aria-label="save"
              size="small"
              onClick={() => {
                setAreSlotsEnabled(!areSlotsEnabled);

                if (createPerson) {
                  createPerson(newPerson, group);
                }
              }}
            >
              <SaveIcon />
            </Fab>
            <Fab
              sx={{ mt: 1, ml: -2 }}
              color="inherit"
              aria-label="cancel"
              size="small"
              onClick={() => {
                setAreSlotsEnabled(!areSlotsEnabled);
              }}
            >
              <ClearIcon />
            </Fab>
          </>
        )}
      </CardActions>
    </CardContent>
  );
};

export default PersonEnabledDetails;
