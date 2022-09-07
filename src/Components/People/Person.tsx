import { Card, Zoom } from "@mui/material";
import { useState } from "react";
import PersonEnabledDetails from "./EditPerson";
import PersonDisabledDetails from "./DisplayPerson";
import { IPerson, IPersonFunc } from "../../Interfaces/Person";
import { toast } from "react-toastify";
import PeopleServices from "../../Services/People";

const Person = (props: IPersonFunc) => {
  const { setPeopleList } = props;
  const [areSlotsEnabled, setAreSlotsEnabled] = useState(false);

  const updatePerson = (
    id: string,
    name: string,
    favoriteAnimal: string,
    favoriteColor: string,
    favoriteFood: string
  ) => {
    if (!name || !favoriteAnimal || !favoriteColor || !favoriteFood)
      return toast.error("You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮");
    PeopleServices.updatePerson({
      id: id,
      name: name,
      favoriteColor: favoriteColor,
      favoriteAnimal: favoriteAnimal,
      favoriteFood: favoriteFood,
    })
      .then(() => {
        setPeopleList((peopleList: IPerson[]) =>
          peopleList.map((person: IPerson) => {
            if (person.id === id)
              return {
                id: id,
                name: name,
                favoriteColor: favoriteColor,
                favoriteAnimal: favoriteAnimal,
                favoriteFood: favoriteFood,
              };
            return {
              id: person.id,
              name: person.name,
              favoriteColor: person.favoriteColor,
              favoriteAnimal: person.favoriteAnimal,
              favoriteFood: person.favoriteFood,
            };
          })
        );
        return toast.success("~(˘▾˘~) Updated successfully");
      })
      .catch((err) => toast.error(err.response.data));
  };

  const deletePerson = (id: string) => {
    PeopleServices.deletePerson(id)
      .then(() => {
        setPeopleList((peopleList: IPerson[]) =>
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
