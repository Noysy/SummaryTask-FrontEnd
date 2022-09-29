import { Backdrop, Button, List, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

interface IPeopleOpenProps {
  setIsPeopleOpen: Function;
  peopleAsElements: JSX.Element[];
  allPeople: JSX.Element[];
  currentRole: string;
}

const PeopleOpen = (props: IPeopleOpenProps) => {
  const { setIsPeopleOpen, peopleAsElements, allPeople, currentRole } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevValue: boolean) => !prevValue);
  };

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => setIsPeopleOpen((prevValue: boolean) => !prevValue)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        People
      </Button>
      {peopleAsElements}
      {currentRole === "ADMIN" && (
        <div id="add-to-group">
          <Button onClick={handleToggle}>Add people</Button>
          <Backdrop
            id="backdrop"
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
          >
            <Typography>Choose a person to add:</Typography>
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
              {allPeople}
            </List>
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default PeopleOpen;
