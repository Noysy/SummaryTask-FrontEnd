import { useEffect, useState } from "react";
import { IPage, IPerson } from "../Interfaces/Person";
import PeopleServices from "../Services/People";
import CreatePerson from "../Components/People/CreatePerson";
import { toast } from "react-toastify";
import AddButton from "../Components/AddButton";
import Person from "../Components/People/Person";

const PeoplePage = (props: IPage) => {
  const [peopleList, setPeopleList] = useState<IPerson[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const { cookie, currentRole } = props;

  useEffect(() => {
    PeopleServices.getAllPeople()
      .then((res) => {
        if (!res.data) return;
        setPeopleList(res.data);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, [cookie]);

  const fullList = peopleList.map((person) => {
    return (
      <Person
        key={person.id}
        name={person.name}
        favoriteColor={person.favoriteColor}
        favoriteAnimal={person.favoriteAnimal}
        favoriteFood={person.favoriteFood}
        role={person.role}
        files={person.files}
        id={person.id}
        setPeopleList={setPeopleList}
      />
    );
  });

  return (
    <div id="main-people">
      {fullList}
      {!isCreating ? (
        currentRole === "ADMIN" &&
        fullList.length > 0 && (
          <AddButton isCreating={isCreating} setIsCreating={setIsCreating} />
        )
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
