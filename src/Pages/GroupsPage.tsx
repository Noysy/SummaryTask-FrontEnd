import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddButton from '../Components/AddButton';
import GroupServices from '../Services/Groups';
import { IGroup } from '../Interfaces/Group';
import Group from '../Components/Groups/Group';
import CreateGroup from '../Components/Groups/CreateGroup';

const GroupPage = () => {
    const [groupList, setGroupList] = useState<IGroup[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        GroupServices.getAllGroups()
            .then((res) => {
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

    // const deleteGroup = (id: string, gettingGroup: Function) => {
    //     setGroupList((groupList: IGroup[]) => groupList.filter((group) => group.id !== id));
    //     GroupServices.deleteGroup(id)
    //         .then(() => {
    //             console.log(groupList);
                
    //             // setAllGroups((allGroups) => allGroups.filter((group) => group.id !== id))
    //             // console.log(allGroups);

    //             return toast.success('ez');
    //         })
    //         .catch((err) => {
    //             return toast.error(err.response.data);
    //         });
    // };

    // const updateName = (id: string, groupName: string, gettingGroup: Function) => {
    //     GroupServices.updateName(id, groupName)
    //         .then(() => {
    //             groupList.forEach(gettingGroup());
    //             return toast.success('damn.. it worked');
    //         })
    //         .catch((err) => {
    //             return toast.error(err.response.data);
    //         });
    // };

    const fullList = groupList.map((group) => {
        return (
            <Group
                key={group.id}
                id={group.id}
                name={group.name}
                setGroupList={setGroupList}
                groupList={groupList}
                // deleteGroup={deleteGroup}
                // updateName={updateName}
            />
        );
    });


    return (
        <div id="main-people">
            {fullList}
            {!isCreating ? (
                <AddButton isCreating={isCreating} setIsCreating={setIsCreating} />
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
