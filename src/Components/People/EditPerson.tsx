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
  editableField,
  personEnabledDetails,
  PersonWithId,
} from "../../Interfaces/Person";
import GroupServices from "../../Services/Groups";
import { toast } from "react-toastify";
import { groupFromDb } from "../../Interfaces/Group";

const PersonEnabledDetails = ({
  setAreSlotsEnabled,
  updatePerson,
  createPerson,
  person,
}: personEnabledDetails) => {
  const { id } = person;
  const [newPerson, setNewPerson] = useState(person);
  const [allGroups, setAllGroups] = useState<JSX.Element[]>();
  const [group, setGroup] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    GroupServices.getAllGroups()
      .then((groups: groupFromDb[]) => {
        setAllGroups(
          groups.map((group: groupFromDb) => {
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

  const EditDetailTextBox = (props: editableField) => {
    const { fieldName, field, fieldType } = props;
    return (
      <TextField
        InputProps={{
          disableUnderline: true,
          style: { fontSize: fieldType === "title" ? 16 : 14 },
        }}
        sx={
          fieldType === "title"
            ? { mb: 1.1, mt: -0.5 }
            : { mb: 0.3, mt: -0.5, ml: 1 }
        }
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
      <EditDetailTextBox
        fieldName={"Name:"}
        field={"name"}
        fieldType={"title"}
      />
      <EditDetailTextBox
        fieldName={"Favorite color:"}
        field={"favoriteColor"}
        fieldType={"normal"}
      />
      <EditDetailTextBox
        fieldName={"Favorite food:"}
        field={"favoriteFood"}
        fieldType={"normal"}
      />
      <EditDetailTextBox
        fieldName={"Favorite animal:"}
        field={"favoriteAnimal"}
        fieldType={"normal"}
      />
      <EditDetailTextBox
        fieldName={"Role:"}
        field={"role"}
        fieldType={"normal"}
      />

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
                setAreSlotsEnabled((prevValue: boolean) => !prevValue);

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
                setAreSlotsEnabled((prevValue: boolean) => !prevValue);
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
                setAreSlotsEnabled((prevValue: boolean) => !prevValue);

                if (createPerson) {
                  const { id, ...personToCreate } = newPerson;
                  createPerson(personToCreate, group);
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
                setAreSlotsEnabled((prevValue: boolean) => !prevValue);
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
