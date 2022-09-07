import { CardContent, CardActions, Fab, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { personDisabledDetails } from "../../Interfaces/Person";

const PersonDisabledDetails = (props: personDisabledDetails) => {
  const {
    setAreSlotsEnabled,
    areSlotsEnabled,
    deletePerson,
    id,
    name,
    favoriteAnimal,
    favoriteColor,
    favoriteFood,
  } = props;

  return (
    <>
      <CardContent>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }} marginLeft={2}>
          Favorite color: {favoriteColor}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }} marginLeft={2}>
          Favorite food: {favoriteFood}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }} marginLeft={2}>
          Favorite animal: {favoriteAnimal}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {id}
        </Typography>
      </CardContent>
      <CardActions>
        <Fab
          color="default"
          aria-label="edit"
          size="small"
          onClick={() => {
            setAreSlotsEnabled(!areSlotsEnabled);
          }}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="error"
          aria-label="delete"
          size="small"
          onClick={() => deletePerson(id)}
        >
          <DeleteIcon />
        </Fab>
      </CardActions>
    </>
  );
};

export default PersonDisabledDetails;
