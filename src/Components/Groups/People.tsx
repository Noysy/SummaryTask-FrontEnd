import { Card, CardContent, Fab, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { IPeopleProps } from "../../Interfaces/Group";
import GroupServices from "../../Services/Groups";
import DeleteIcon from "@mui/icons-material/Delete";

const People: React.FC<IPeopleProps> = ({ getPeople, currentRole, person, groupId }) => {
  const { name, id } = person;

  const removePerson = () => {
    GroupServices.removePerson(groupId, id)
      .then(() => {
        getPeople();
        toast.success(`${name} will be missed...`);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <Card id="person-extended-card">
      <CardContent>
        <div id="name-and-buttons">
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {name}
          </Typography>
          {currentRole === "ADMIN" && (
            <Fab
              color="error"
              aria-label="delete"
              className="delete-icon"
              size="small"
              onClick={() => removePerson()}
            >
              <DeleteIcon sx={{ fontSize: "1em" }} />
            </Fab>
          )}
        </div>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default People;
