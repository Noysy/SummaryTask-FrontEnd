import { CardContent, CardActions, TextField, Typography, Fab } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IPersonDetails } from '../../Interfaces/Person';
import PeopleServices from '../../Services/People';

const PersonEnabledDetails = (props: IPersonDetails) => {
    const { setAreSlotsEnabled, areSlotsEnabled } = props;
    const [name, setName] = useState(props.name);
    const [favoriteColor, setFavoriteColor] = useState(props.favoriteColor);
    const [favoriteAnimal, setFavoriteAnimal] = useState(props.favoriteAnimal);
    const [favoriteFood, setFavoriteFood] = useState(props.favoriteFood);

    const updatePerson = () => {
        if (!name || !favoriteAnimal || !favoriteColor || !favoriteFood)
            return toast.error('You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮');
        PeopleServices.updatePerson({
            id: props.id,
            name: name,
            favoriteColor: favoriteColor,
            favoriteAnimal: favoriteAnimal,
            favoriteFood: favoriteFood,
        })
            .then(() => {
                toast.success('~(˘▾˘~) Updated successfully');
            })
            .catch((err) => toast.error(err.response.data));
    };

    const addPerson = () => {
        if (!name || !favoriteAnimal || !favoriteColor || !favoriteFood)
            return toast.error('You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮');
        PeopleServices.createPerson({
            name: name,
            favoriteColor: favoriteColor,
            favoriteAnimal: favoriteAnimal,
            favoriteFood: favoriteFood,
        })
            .then((_res) => {
                toast.success('~(˘▾˘~) Added successfully');
            })
            .catch((err) => toast.error(err.response.data));
    };

    return (
        <CardContent>
            <Typography variant="h5" component="div"></Typography>
            <TextField
                sx={{ mb: 0.4, mt: -0.5 }}
                id="name-slot"
                variant="standard"
                placeholder="Name:"
                value={name}
                onChange={(text) => setName(text.target.value)}
            />
            <TextField
                InputProps={{ disableUnderline: true }}
                sx={{ ml: 2, mb: -1 }}
                id="details-slot"
                variant="standard"
                placeholder="Favorite color:"
                value={favoriteColor}
                onChange={(text) => setFavoriteColor(text.target.value)}
            />
            <TextField
                InputProps={{ disableUnderline: true }}
                sx={{ ml: 2, mb: -1 }}
                id="details-slot"
                variant="standard"
                placeholder="Favorite food:"
                value={favoriteFood}
                onChange={(text) => setFavoriteFood(text.target.value)}
            />
            <TextField
                InputProps={{ disableUnderline: true }}
                sx={{ mb: 0.7, ml: 2 }}
                id="details-slot"
                placeholder="Favorite animal:"
                variant="standard"
                value={favoriteAnimal}
                onChange={(text) => setFavoriteAnimal(text.target.value)}
            />
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.id}
            </Typography>
            <CardActions>
                {props.id ? (
                    <>
                        <Fab
                            sx={{ mt: 2, ml: -2 }}
                            color="success"
                            aria-label="done"
                            size="small"
                            onClick={() => {
                                setAreSlotsEnabled(!areSlotsEnabled);
                                updatePerson();
                            }}
                        >
                            <DoneIcon />
                        </Fab>
                        <Fab
                            sx={{ mt: 2, ml: -2 }}
                            color="inherit"
                            aria-label="cancel"
                            size="small"
                            onClick={() => {
                                setName(props.name);
                                setFavoriteColor(props.favoriteColor);
                                setFavoriteFood(props.favoriteFood);
                                setFavoriteAnimal(props.favoriteAnimal);
                                setAreSlotsEnabled(!areSlotsEnabled);
                            }}
                        >
                            <ClearIcon />
                        </Fab>
                    </>
                ) : (
                    <>
                        <Fab
                            sx={{ mt: 4.5, ml: 19 }}
                            color="primary"
                            aria-label="save"
                            size="small"
                            onClick={() => {
                                setAreSlotsEnabled(!areSlotsEnabled);
                                addPerson();
                            }}
                        >
                            <SaveIcon />
                        </Fab>
                        <Fab
                            sx={{ mt: 4.5, ml: -2 }}
                            color="inherit"
                            aria-label="cancel"
                            size="small"
                            onClick={() => {
                                setAreSlotsEnabled(!areSlotsEnabled);
                            }}
                        >
                            <ClearIcon />
                        </Fab>
                    </>
                )}
            </CardActions>
        </CardContent>
    );
};

export default PersonEnabledDetails;
