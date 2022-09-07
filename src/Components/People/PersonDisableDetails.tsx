import { CardContent, CardActions, Fab, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { IPersonDetails } from '../../Interfaces/Person';
import PeopleServices from '../../Services/People';

const PersonDisabledDetails = (props: IPersonDetails) => {
    const { setAreSlotsEnabled, areSlotsEnabled } = props;

    const deletePerson = () => {
        PeopleServices.deletePerson(props.id)
            .then(() => {
                toast.success('We got rid of them :)');
            })
            .catch((err) => toast.error(err.response.data));
    };

    return (
        <>
            <CardContent>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} marginLeft={2}>
                    Favorite color: {props.favoriteColor}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} marginLeft={2}>
                    Favorite food: {props.favoriteFood}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }} marginLeft={2}>
                    Favorite animal: {props.favoriteAnimal}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.id}
                </Typography>
            </CardContent>
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
                <Fab color="error" aria-label="delete" size="small" onClick={() => deletePerson()}>
                    <DeleteIcon />
                </Fab>
            </CardActions>
        </>
    );
};

export default PersonDisabledDetails;
