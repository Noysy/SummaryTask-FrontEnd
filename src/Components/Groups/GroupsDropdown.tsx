import { Backdrop, Button, List, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

interface IGroupsOpenProps {
  setIsGroupsOpen: Function;
  groupsAsElements: JSX.Element[];
  allGroups: JSX.Element[];
  currentRole: string;
}

const GroupsDropdown = ({
  setIsGroupsOpen,
  groupsAsElements,
  allGroups,
  currentRole,
}: IGroupsOpenProps) => {
  const [groupOpen, setGroupOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => setIsGroupsOpen((prevValue: boolean) => !prevValue)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Groups
      </Button>
      {groupsAsElements}
      {currentRole === "ADMIN" && (
        <>
          {" "}
          <Button
            onClick={() => {
              setGroupOpen((prevValue: boolean) => !prevValue);
            }}
          >
            Add groups
          </Button>
          <Backdrop
            id="backdrop"
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={groupOpen}
            onClick={() => {
              setGroupOpen(false);
            }}
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

export default GroupsDropdown;
