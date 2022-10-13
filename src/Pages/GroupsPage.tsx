import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddButton from "../Components/AddButton";
import GroupServices from "../Services/Groups";
import { groupFromDb, IGroup } from "../Interfaces/Group";
import Group from "../Components/Groups/Group";
import CreateGroup from "../Components/Groups/CreateGroup";
import { IPage } from "../Interfaces/Person";

const GroupPage: React.FC<IPage> = ({ cookie, currentRole }) => {
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    GroupServices.getAllGroups()
      .then((groupList: groupFromDb[]) => {
        if (!groupList) return;
        setGroupList(groupList.map(({ id, name }: IGroup) => ({ id, name })));
      })
      .catch((err) => toast.error(err.response.data));
  }, [cookie]);

  const fullList = groupList.map((group) => {
    return (
      <Group
        key={group.id}
        id={group.id}
        name={group.name}
        setGroupList={setGroupList}
        groupList={groupList}
        currentRole={currentRole}
      />
    );
  });

  return (
    <div id="main-people">
      {fullList}
      {isCreating ? (
        <CreateGroup
          setIsCreating={setIsCreating}
          isCreating={isCreating}
          setGroupList={setGroupList}
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

export default GroupPage;
