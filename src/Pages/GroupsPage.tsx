import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddButton from "../Components/AddButton";
import GroupServices from "../Services/Groups";
import { IGroup } from "../Interfaces/Group";
import Group from "../Components/Groups/Group";
import CreateGroup from "../Components/Groups/CreateGroup";

const GroupPage = () => {
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    GroupServices.getAllGroups()
      .then((res) => {
        if (!res.data) return;
        setGroupList(
          res.data.map((group: IGroup) => {
            return { id: group.id, name: group.name };
          })
        );
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, []);

  const fullList = groupList.map((group) => {
    return (
      <Group
        key={group.id}
        id={group.id}
        name={group.name}
        setGroupList={setGroupList}
        groupList={groupList}
      />
    );
  });

  return (
    <div id="main-people">
      {fullList}
      {!isCreating ? (
        fullList.length > 0 && (
          <AddButton isCreating={isCreating} setIsCreating={setIsCreating} />
        )
      ) : (
        <CreateGroup
          setIsCreating={setIsCreating}
          isCreating={isCreating}
          setGroupList={setGroupList}
        />
      )}
    </div>
  );
};

export default GroupPage;
