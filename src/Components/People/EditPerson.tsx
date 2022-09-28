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

  return (
    <CardContent>
      <Typography variant="h5" component="div"></Typography>
      <TextField
        sx={{ mb: 0.4, mt: -0.5 }}
        id="name-slot"
        variant="standard"
        placeholder="Name:"
        value={newPerson.name}
        onChange={(event) =>
          setNewPerson((person: PersonWithId) => ({
            ...person,
            name: event.target.value,
          }))
        }
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ ml: 2, mb: -1 }}
        id="details-slot"
        variant="standard"
        placeholder="Favorite color:"
        value={newPerson.favoriteColor}
        onChange={(event) =>
          setNewPerson((person: PersonWithId) => ({
            ...person,
            favoriteColor: event.target.value,
          }))
        }
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ ml: 2, mb: -1 }}
        id="details-slot"
        variant="standard"
        placeholder="Favorite food:"
        value={newPerson.favoriteFood}
        onChange={(event) =>
          setNewPerson((person: PersonWithId) => ({
            ...person,
            favoriteFood: event.target.value,
          }))
        }
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ mb: -1, ml: 2 }}
        id="details-slot"
        placeholder="Favorite animal:"
        variant="standard"
        value={newPerson.favoriteAnimal}
        onChange={(event) =>
          setNewPerson((person: PersonWithId) => ({
            ...person,
            favoriteAnimal: event.target.value,
          }))
        }
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ mb: -1, ml: 2 }}
        id="details-slot"
        placeholder="Role:"
        variant="standard"
        value={newPerson.role}
        onChange={(event) =>
          setNewPerson((person: PersonWithId) => ({
            ...person,
            role: event.target.value,
          }))
        }
      />
      {id ? (
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
