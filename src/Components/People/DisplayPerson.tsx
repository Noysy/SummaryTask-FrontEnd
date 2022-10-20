import {
  CardContent,
  CardActions,
  Fab,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileDetails, personDisabledDetails } from "../../Interfaces/Person";
import PeopleServices from "../../Services/People";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { StyledLink, StyledTypography } from "../../Styles/styledComponents";

const PersonDisabledDetails = ({
  setAreSlotsEnabled,
  deletePerson,
  person,
  currentRole,
}: personDisabledDetails) => {
  const [personFiles, setPersonFiles] = useState<FileDetails[]>([]);
  const [isFilesOpen, setIsFilesOpen] = useState<boolean>(false);
  const { id, files, name, favoriteAnimal, favoriteColor, favoriteFood, role } =
    person;

  useEffect(() => {
    if (files)
      setPersonFiles(
        files.map((file) => {
          return { name: file.name.split("-")[1], url: file.url };
        })
      );
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    await PeopleServices.uploadFile(id, formData)
      .then((file: FileDetails) => {
        setPersonFiles((files) => {
          return [...files, file];
        });
        return toast.success("The file has been uploaded!");
      })
      .catch((err) => toast.error(err.response.data));
  };

  const OpenFiles = () => {
    return (
      <>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            setIsFilesOpen((prevValue: boolean) => !prevValue);
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Files
        </Button>
        <div id="person-files">
          {personFiles.map((file) => {
            return (
              <StyledLink
                key={file.name}
                id="file"
                href={file.url}
                fontFamily=""
              >
                {file.name}
              </StyledLink>
            );
          })}
        </div>
      </>
    );
  };

  const CloseFiles = () => {
    return (
      <Button
        variant="contained"
        color="inherit"
        onClick={() => {
          setIsFilesOpen((prevValue: boolean) => !prevValue);
        }}
        endIcon={<KeyboardArrowUpIcon />}
      >
        Files
      </Button>
    );
  };

  return (
    <>
      <CardContent>
        <>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {name}
          </Typography>
          <StyledTypography variant="body2">
            <span>Favorite color: {favoriteColor}</span>
            <span>Favorite food: {favoriteFood}</span>
            <span>Favorite animal: {favoriteAnimal}</span>
            <span>Role: {role}</span>
          </StyledTypography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {id}
          </Typography>

          {isFilesOpen ? <OpenFiles /> : <CloseFiles />}
        </>
      </CardContent>
      <div id="person-buttons">
        {currentRole === "ADMIN" && (
          <CardActions>
            <Fab
              color="default"
              aria-label="edit"
              size="small"
              onClick={() => {
                setAreSlotsEnabled((prevValue: boolean) => !prevValue);
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
        )}
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{ m: 1 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={(event) => {
              if (event.target.files) {
                uploadFile(event.target.files[0]);
              }
            }}
          />
        </Button>
      </div>
    </>
  );
};

export default PersonDisabledDetails;
