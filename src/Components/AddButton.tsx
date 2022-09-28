import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";

interface IProps {
  setIsCreating: Function;
  isCreating: boolean;
}

const AddButton = (props: IProps) => {
  const { isCreating, setIsCreating } = props;

  return (
    <Zoom in={!isCreating}>
      <Fab
        id="add-button"
        color="primary"
        aria-label="add"
        onClick={() => {
          setIsCreating((prevValue: boolean) => !prevValue);
        }}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );
};

export default AddButton;
