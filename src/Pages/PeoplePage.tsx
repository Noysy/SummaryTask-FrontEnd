import { useEffect, useState } from "react";
import { IPage, PersonWithId } from "../Interfaces/Person";
import PeopleServices from "../Services/People";
import CreatePerson from "../Components/People/CreatePerson";
import { toast } from "react-toastify";
import AddButton from "../Components/AddButton";
import Person from "../Components/People/Person";

const PeoplePage: React.FC<IPage> = ({ cookie, currentRole }) => {
  const [peopleList, setPeopleList] = useState<PersonWithId[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    PeopleServices.getAllPeople()
      .then((personList: PersonWithId[]) => {
        if (!personList) return;
        setPeopleList(personList);
      })
      .catch((err) => toast.error(err.response.data));
  }, [cookie]);

  const fullList = peopleList.map((person) => (
    <Person
      key={person.id}
      person={person}
      setPeopleList={setPeopleList}
      currentRole={currentRole}
    />
  ));

  return (
    <div id="main-people">
      {fullList}
      {isCreating ? (
        <CreatePerson
          setIsCreating={setIsCreating}
          isCreating={isCreating}
          setPeopleList={setPeopleList}
        />
      ) : (
        currentRole === "ADMIN" &&
        fullList.length > 0 && (
          <AddButton isCreating={isCreating} setIsCreating={setIsCreating} />
        )
      )}
    </div>
  );
};

export default PeoplePage;
