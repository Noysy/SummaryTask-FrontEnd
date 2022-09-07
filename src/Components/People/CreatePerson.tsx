import { Card, Zoom } from "@mui/material";
import { toast } from "react-toastify";
import { IPerson } from "../../Interfaces/Person";
import PeopleServices from "../../Services/People";
import PersonEnabledDetails from "./EditPerson";

interface IProps {
  setIsCreating: Function;
  isCreating: boolean;
  setPeopleList: Function;
}

const CreatePerson = (props: IProps) => {
  const { isCreating, setIsCreating, setPeopleList } = props;

  const createPerson = (
    name: string,
    favoriteAnimal: string,
    favoriteColor: string,
    favoriteFood: string,
    group: string
  ) => {
    if (!name || !favoriteAnimal || !favoriteColor || !favoriteFood)
      return toast.error("You cannot have an empty field..... ( ͡° ͜つ ͡°)╭∩╮");
    PeopleServices.createPerson({
      name: name,
      favoriteColor: favoriteColor,
      favoriteAnimal: favoriteAnimal,
      favoriteFood: favoriteFood,
      group: group,
    })
      .then((res) => {
        setPeopleList((peopleList: IPerson[]) => [
          ...peopleList,
          {
            id: res.data.id,
            name: res.data.name,
            favoriteAnimal: res.data.favoriteAnimal,
            favoriteFood: res.data.favoriteFood,
            favoriteColor: res.data.favoriteColor,
          },
        ]);

        return toast.success("~(˘▾˘~) Created successfully");
      })
      .catch((err) => toast.error(err.response.data));
  };

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
          createPerson={createPerson}
        />
      </Card>
    </Zoom>
  );
};

export default CreatePerson;
