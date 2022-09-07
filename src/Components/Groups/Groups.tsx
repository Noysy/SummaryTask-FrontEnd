import { Card, CardContent, Fab, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { IGroupsProps } from '../../Interfaces/Group';
import GroupServices from '../../Services/Groups';
import DeleteIcon from '@mui/icons-material/Delete';

const Groups = (props: IGroupsProps) => {
    const { gettingGroups } = props;
    const removeGroup = () => {
        GroupServices.removeGroup(props.id)
            .then(() => {
                gettingGroups();
                toast.success(`Byebye ${props.name} :)`);
            })
            .catch((err) => toast.error(err.response.data));
    };

    return (
        <Card id="person-extended-card">
            <CardContent>
                <div id="name-and-buttons">
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.name}
                    </Typography>
                    <Fab
                        color="error"
                        aria-label="delete"
                        className="delete-icon"
                        size="small"
                        onClick={() => {
                            removeGroup();
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: '1em' }} />
                    </Fab>
                </div>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    {props.id}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Groups;
