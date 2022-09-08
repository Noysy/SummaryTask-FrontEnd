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
import Link from "@mui/material/Link";

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
    files,
  } = props;
  const [personFiles, setPersonFiles] = useState<FileDetails[]>([]);
  const [isFilesOpen, setIsFilesOpen] = useState<boolean>(false);

  useEffect(() => {
    if (files)
      setPersonFiles(
        files.map((file) => {
          const nameArray = file.name.split("-");
          const name = nameArray[1];
          return { name: name, url: file.url };
        })
      );
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    await PeopleServices.uploadFile(id, formData)
      .then((res) => {
        setPersonFiles((files) => {
          return [...files, res.data];
        });
        return toast.success("The file has been uploaded!");
      })
      .catch((err) => toast.error(err.response.data));
  };

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

        {isFilesOpen ? (
          <>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => {
                setIsFilesOpen(!isFilesOpen);
              }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Files
            </Button>
            <div id="person-files">
              {personFiles.map((file) => {
                return (
                  <Link
                    key={file.name}
                    id="file"
                    href={file.url}
                    fontFamily=""
                    mt={1}
                  >
                    {file.name}
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              setIsFilesOpen(!isFilesOpen);
            }}
            endIcon={<KeyboardArrowUpIcon />}
          >
            Files
          </Button>
        )}
      </CardContent>
      <div id="person-buttons">
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
