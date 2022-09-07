import { useEffect, useState } from "react";
import { IPerson } from "../Interfaces/Person";
import PeopleServices from "../Services/People";
import CreatePerson from "../Components/People/CreatePerson";
import { toast } from "react-toastify";
import AddButton from "../Components/AddButton";
import Person from "../Components/People/Person";

const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<IPerson[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    PeopleServices.getAllPeople()
      .then((res) => {
        setPeopleList(res.data);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, []);

  const fullList = peopleList.map((person) => {
    return (
      <Person
        key={person.id}
        name={person.name}
        favoriteColor={person.favoriteColor}
        favoriteAnimal={person.favoriteAnimal}
        favoriteFood={person.favoriteFood}
        id={person.id}
        setPeopleList={setPeopleList}
      />
    );
  });

  return (
    <div id="main-people">
      {fullList}
      {!isCreating ? (
        <AddButton isCreating={isCreating} setIsCreating={setIsCreating} />
      ) : (
        <CreatePerson
          setIsCreating={setIsCreating}
          isCreating={isCreating}
          setPeopleList={setPeopleList}
        />
      )}
    </div>
  );
};

export default PeoplePage;
