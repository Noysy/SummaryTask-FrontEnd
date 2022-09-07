import { CardActions, Fab, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface INameProps {
    setIsNameEditable: Function;
    groupName: string;
    deleteGroup: Function;
    groupId: string;
}

const NameDisabled = (props: INameProps) => {
    const { setIsNameEditable, groupName, deleteGroup, groupId } = props;

    return (
        <>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {groupName}
            </Typography>
            <CardActions>
                <Fab
                    color="default"
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                        setIsNameEditable((isNameEditable: boolean) => !isNameEditable);
                    }}
                >
                    <EditIcon />
                </Fab>
                <Fab
                    color="error"
                    aria-label="delete"
                    size="medium"
                    onClick={() => deleteGroup(groupId, groupName)}
                >
                    <DeleteIcon />
                </Fab>
            </CardActions>
        </>
    );
};

export default NameDisabled;
