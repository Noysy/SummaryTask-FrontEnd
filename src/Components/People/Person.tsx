import { Card, Zoom } from "@mui/material";
import { useState } from "react";
import PersonEnabledDetails from "./EditPerson";
import PersonDisabledDetails from "./DisplayPerson";
import { IPersonFunc, PersonWithId } from "../../Interfaces/Person";
import { toast } from "react-toastify";
import PeopleServices from "../../Services/People";

const Person = (props: IPersonFunc) => {
  const { setPeopleList, person, currentRole } = props;
  const [areSlotsEnabled, setAreSlotsEnabled] = useState(false);

  const updatePerson = (newPerson: PersonWithId) => {
    const { name, favoriteAnimal, favoriteColor, favoriteFood, role } =
      newPerson;
    const { id, files, ...newDetails } = newPerson;
    if (!name || !favoriteAnimal || !favoriteColor || !favoriteFood || !role)
      return toast.error("You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮");
    PeopleServices.updatePerson({
      id,
      newPerson: newDetails,
    })
      .then(() => {
        setPeopleList((peopleList: PersonWithId[]) => {
          const copiedArray = [...peopleList];
          const personIndex = copiedArray.findIndex(
            (person) => person.id === id
          );
          copiedArray[personIndex] = newPerson;
          return copiedArray;
        });

        return toast.success("~(˘▾˘~) Updated successfully");
      })
      .catch((err) => toast.error(err.response.data));
  };

  const deletePerson = (id: string) => {
    PeopleServices.deletePerson(id)
      .then(() => {
        setPeopleList((peopleList: PersonWithId[]) =>
          peopleList.filter((person) => person.id !== id)
        );

        return toast.success("We got rid of them :)");
      })
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <Zoom in>
      <Card id="person-card">
        {!areSlotsEnabled ? (
          <PersonDisabledDetails
            {...props}
            setAreSlotsEnabled={setAreSlotsEnabled}
            areSlotsEnabled={areSlotsEnabled}
            deletePerson={deletePerson}
            person={person}
            currentRole={currentRole}
          />
        ) : (
          <PersonEnabledDetails
            {...props}
            setAreSlotsEnabled={setAreSlotsEnabled}
            areSlotsEnabled={areSlotsEnabled}
            updatePerson={updatePerson}
          />
        )}
      </Card>
    </Zoom>
  );
};
export default Person;
