import { Card, Zoom } from '@mui/material';
import { useState } from 'react';
import PersonEnabledDetails from './PersonEnableDetails';
import PersonDisabledDetails from './PersonDisableDetails';
import { IPerson } from '../../Interfaces/Person';

const Person = (props: IPerson) => {
    const [areSlotsEnabled, setAreSlotsEnabled] = useState(false);

    return (
        <Zoom in>
            <Card id="person-card">
                {!areSlotsEnabled ? (
                    <PersonDisabledDetails
                        {...props}
                        setAreSlotsEnabled={setAreSlotsEnabled}
                        areSlotsEnabled={areSlotsEnabled}
                    />
                ) : (
                    <PersonEnabledDetails
                        {...props}
                        setAreSlotsEnabled={setAreSlotsEnabled}
                        areSlotsEnabled={areSlotsEnabled}
                    />
                )}
            </Card>
        </Zoom>
    );
};
export default Person;
