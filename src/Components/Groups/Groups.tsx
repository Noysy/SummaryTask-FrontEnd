import { Card, CardContent, Fab, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { IGroupsProps } from "../../Interfaces/Group";
import GroupServices from "../../Services/Groups";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

const Groups: React.FC<IGroupsProps> = ({ getGroups, currentRole, id, name }) => {
  const { t } = useTranslation();

  const removeGroup = () => {
    GroupServices.removeGroup(id)
      .then(() => {
        getGroups();
        const success = t("group.removeParent");
        toast.success(`${success} ${name} :)`);
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
              onClick={() => {
                removeGroup();
              }}
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

export default Groups;
