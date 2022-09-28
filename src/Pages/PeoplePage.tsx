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
        person={person}
        setPeopleList={setPeopleList}
        currentRole={currentRole}
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
