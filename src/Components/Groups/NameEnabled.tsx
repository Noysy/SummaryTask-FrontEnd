import { CardActions, Fab, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

interface INameProps {
    setIsNameEditable: Function;
    groupName: string;
    updateName: Function;
    setGroupName: Function;
}

const NameEnabled = (props: INameProps) => {
    const { setIsNameEditable, groupName, updateName, setGroupName } = props;

    return (
        <>
            <TextField
                sx={{ mb: 0.4, mt: -0.5 }}
                id="name-slot"
                variant="standard"
                placeholder="Name:"
                value={groupName}
                onChange={(text) => setGroupName(text.target.value)}
            />
            <CardActions>
                <Fab
                    color="success"
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                        setIsNameEditable((isNameEditable: boolean) => !isNameEditable);
                        updateName();
                    }}
                >
                    <DoneIcon />
                </Fab>
                <Fab
                    color="default"
                    aria-label="delete"
                    size="medium"
                    onClick={() => setIsNameEditable((isNameEditable: boolean) => !isNameEditable)}
                >
                    <ClearIcon />
                </Fab>
            </CardActions>
        </>
    );
};

export default NameEnabled;
