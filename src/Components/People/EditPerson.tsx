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
import { personEnabledDetails } from "../../Interfaces/Person";
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

  const { name, favoriteAnimal, favoriteColor, favoriteFood, role, id } =
    person;
  const [newName, setName] = useState(name);
  const [newFavoriteColor, setFavoriteColor] = useState(favoriteColor);
  const [newFavoriteAnimal, setFavoriteAnimal] = useState(favoriteAnimal);
  const [newFavoriteFood, setFavoriteFood] = useState(favoriteFood);
  const [newRole, setRole] = useState(role);
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
        value={newName}
        onChange={(text) => setName(text.target.value)}
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ ml: 2, mb: -1 }}
        id="details-slot"
        variant="standard"
        placeholder="Favorite color:"
        value={newFavoriteColor}
        onChange={(text) => setFavoriteColor(text.target.value)}
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ ml: 2, mb: -1 }}
        id="details-slot"
        variant="standard"
        placeholder="Favorite food:"
        value={newFavoriteFood}
        onChange={(text) => setFavoriteFood(text.target.value)}
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ mb: -1, ml: 2 }}
        id="details-slot"
        placeholder="Favorite animal:"
        variant="standard"
        value={newFavoriteAnimal}
        onChange={(text) => setFavoriteAnimal(text.target.value)}
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        sx={{ mb: -1, ml: 2 }}
        id="details-slot"
        placeholder="Role:"
        variant="standard"
        value={newRole}
        onChange={(text) => setRole(text.target.value)}
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
                  updatePerson({
                    id,
                    name: newName,
                    favoriteAnimal: newFavoriteAnimal,
                    favoriteColor: newFavoriteColor,
                    favoriteFood: newFavoriteFood,
                    role: newRole,
                  });
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
                setName(name);
                setFavoriteColor(favoriteColor);
                setFavoriteFood(favoriteFood);
                setFavoriteAnimal(favoriteAnimal);
                setRole(role);
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
                  createPerson(
                    {
                      name: newName,
                      favoriteAnimal: newFavoriteAnimal,
                      favoriteColor: newFavoriteColor,
                      favoriteFood: newFavoriteFood,
                      role: newRole,
                    },
                    group
                  );
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
