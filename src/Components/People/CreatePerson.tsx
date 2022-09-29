import { Card, Zoom } from "@mui/material";
import { toast } from "react-toastify";
import { Person, PersonWithId } from "../../Interfaces/Person";
import PeopleServices from "../../Services/People";
import PersonEnabledDetails from "./EditPerson";

interface IProps {
  setIsCreating: Function;
  isCreating: boolean;
  setPeopleList: Function;
}

const CreatePerson = (props: IProps) => {
  const { isCreating, setIsCreating, setPeopleList } = props;

  const createPerson = (person: Person, group: string) => {
    const { name, favoriteAnimal, favoriteColor, favoriteFood, role } = person;
    if (!name || !favoriteAnimal || !favoriteColor || !favoriteFood || !role)
      return toast.error("You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮");

    PeopleServices.createPerson({
      person: person,
      group: group,
    })
      .then((res) => {
        setPeopleList((peopleList: PersonWithId[]) => [
          ...peopleList,
          {
            id: res.id,
            name: res.name,
            favoriteAnimal: res.favoriteAnimal,
            favoriteFood: res.favoriteFood,
            favoriteColor: res.favoriteColor,
            role: role,
          },
        ]);

        return toast.success("~(˘▾˘~) Created successfully");
      })
      .catch((err) => toast.error(err.response.data));
  };

  const emptyPerson: PersonWithId = {
    name: "",
    favoriteColor: "",
    favoriteAnimal: "",
    favoriteFood: "",
    role: "",
    id: "",
  };

  return (
    <Zoom in={isCreating}>
      <Card id="person-card">
        <PersonEnabledDetails
          person={emptyPerson}
          setAreSlotsEnabled={setIsCreating}
          areSlotsEnabled={isCreating}
          createPerson={createPerson}
        />
      </Card>
    </Zoom>
  );
};

export default CreatePerson;
