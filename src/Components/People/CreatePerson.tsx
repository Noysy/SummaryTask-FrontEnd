import { Card, Zoom } from '@mui/material';
import PersonEnabledDetails from './PersonEnableDetails';

interface IProps {
    setIsCreating: Function;
    isCreating: boolean;
}

const CreatePerson = (props: IProps) => {
    const { isCreating, setIsCreating } = props;

    return (
        <Zoom in={isCreating}>
            <Card id="person-card">
                <PersonEnabledDetails
                    name=""
                    favoriteColor=""
                    favoriteAnimal=""
                    favoriteFood=""
                    id=""
                    setAreSlotsEnabled={setIsCreating}
                    areSlotsEnabled={isCreating}
                />
            </Card>
        </Zoom>
    );
};

export default CreatePerson;
