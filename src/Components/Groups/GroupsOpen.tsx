import { Backdrop, Button, List, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

interface IGroupsOpenProps {
  setIsGroupsOpen: Function;
  groupsAsElements: JSX.Element[];
  allGroups: JSX.Element[];
  currentRole: string;
}

const GroupsOpen = (props: IGroupsOpenProps) => {
  const { setIsGroupsOpen, groupsAsElements, allGroups, currentRole } = props;
  const [groupOpen, setGroupOpen] = useState(false);

  const handleGroupClose = () => {
    setGroupOpen(false);
  };
  const handleGroupToggle = () => {
    setGroupOpen(!groupOpen);
  };

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        onClick={() =>
          setIsGroupsOpen((isGroupsOpen: boolean) => !isGroupsOpen)
        }
        endIcon={<KeyboardArrowDownIcon />}
      >
        Groups
      </Button>
      {groupsAsElements}
      {currentRole === "ADMIN" && (
        <>
          {" "}
          <Button onClick={handleGroupToggle}>Add groups</Button>
          <Backdrop
            id="backdrop"
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={groupOpen}
            onClick={handleGroupClose}
          >
            <Typography>Choose a group to add:</Typography>
            <List
              sx={{
                width: 300,
                bgcolor: "background.paper",
                color: "#444444",
                borderRadius: 1,
              }}
              component="nav"
              aria-label="secondary mailbox folder"
            >
              {allGroups}
            </List>
          </Backdrop>{" "}
        </>
      )}
    </>
  );
};

export default GroupsOpen;
