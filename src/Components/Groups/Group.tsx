import {
  Button,
  Card,
  CardContent,
  ListItemButton,
  ListItemText,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IGroup, IGroupProps } from "../../Interfaces/Group";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import People from "./People";
import GroupServices from "../../Services/Groups";
import { toast } from "react-toastify";
import { IAutocomplete, IPerson } from "../../Interfaces/Person";
import PeopleServices from "../../Services/People";
import Groups from "./Groups";
import NameEnabled from "./NameEnabled";
import NameDisabled from "./NameDisabled";
import PeopleOpen from "./PeopleOpen";
import GroupsOpen from "./GroupsOpen";

const Group: React.FC<IGroupProps> = ({
  id,
  name,
  setGroupList,
  groupList,
}) => {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [people, setPeople] = useState<IPerson[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupName, setGroupName] = useState(name);
  const [allPeople, setAllPeople] = useState<JSX.Element[]>([]);
  const [allGroups, setAllGroups] = useState<JSX.Element[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>();

  useEffect(() => {
    gettingGroups();
  }, [groupList]);

  const deleteGroup = () => {
    GroupServices.deleteGroup(id)
      .then(() => {
        setGroupList((groupList: IGroup[]) =>
          groupList.filter((group) => group.id !== id)
        );

        return toast.success("ez");
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const updateName = () => {
    GroupServices.updateName(id, groupName)
      .then(() => {
        setGroupList((groupList: IGroup[]) =>
          groupList.map((group: IGroup) => {
            if (group.id === id) return { id: id, name: groupName };
            return { id: group.id, name: group.name };
          })
        );
        return toast.success("damn.. it worked");
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  useEffect(() => {
    PeopleServices.getAllPeople()
      .then((res) => {
        const peopleId = people.map((person: IPerson) => {
          return person.id;
        });
        setAllPeople(
          res.data
            .filter((person: IPerson) => !peopleId.includes(person.id))
            .map((person: IAutocomplete, index: number) => {
              return (
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => {
                    handleListItemClick(event, 1);
                    addPerson(person.id);
                  }}
                >
                  <ListItemText primary={person.name} />
                </ListItemButton>
              );
            })
        );
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, [people]);

  useEffect(() => {
    GroupServices.getAllGroups()
      .then((res) => {
        const groupId = groups.map((group: IGroup) => {
          return group.id;
        });
        setAllGroups(
          res.data
            .filter(
              (group: IGroup) =>
                !groupId.includes(group.id) && !(id === group.id)
            )
            .map((group: IAutocomplete, index: number) => {
              return (
                <ListItemButton
                  selected={selectedGroupIndex === index}
                  onClick={(event) => {
                    handleGroupListItemClick(event, 1);
                    addGroup(group.id);
                  }}
                >
                  <ListItemText primary={group.name} />
                </ListItemButton>
              );
            })
        );
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, [groups]);

  const addPerson = (personId: string) => {
    GroupServices.addPerson(id, personId)
      .then(() => gettingPeople())
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const addGroup = (groupId: string) => {
    GroupServices.addGroup(groupId, id)
      .then(() => gettingGroups())
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const gettingPeople = () => {
    GroupServices.getGroupsPeople(id)
      .then((res) => {
        setPeople(res.data[0].people);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const gettingGroups = () => {
    GroupServices.getGroupsChildren(id)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const peopleAsElements = people.map((person) => {
    return (
      <People
        key={person.id}
        id={person.id}
        name={person.name}
        favoriteAnimal={person.favoriteAnimal}
        favoriteColor={person.favoriteColor}
        favoriteFood={person.favoriteFood}
        groupId={id}
        gettingPeople={gettingPeople}
      />
    );
  });

  const groupsAsElements = groups.map((group) => {
    return (
      <Groups
        id={group.id}
        name={group.name}
        gettingGroups={gettingGroups}
        key={group.id}
      />
    );
  });

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleGroupListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedGroupIndex(index);
  };

  return (
    <Zoom in>
      <Card id="group-card">
        <CardContent>
          <div id="name-and-buttons">
            {isNameEditable ? (
              <NameEnabled
                setGroupName={setGroupName}
                setIsNameEditable={setIsNameEditable}
                groupName={groupName}
                updateName={updateName}
              />
            ) : (
              <NameDisabled
                setIsNameEditable={setIsNameEditable}
                groupName={groupName}
                deleteGroup={deleteGroup}
                groupId={id}
              />
            )}
          </div>
          <div id="groups-and-people">
            <div className="dropdown">
              {isPeopleOpen ? (
                <PeopleOpen
                  setIsPeopleOpen={setIsPeopleOpen}
                  peopleAsElements={peopleAsElements}
                  allPeople={allPeople}
                />
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    gettingPeople();
                    setIsPeopleOpen(!isPeopleOpen);
                  }}
                  endIcon={<KeyboardArrowUpIcon />}
                >
                  People
                </Button>
              )}
            </div>
            <div className="dropdown">
              {isGroupsOpen ? (
                <GroupsOpen
                  setIsGroupsOpen={setIsGroupsOpen}
                  groupsAsElements={groupsAsElements}
                  allGroups={allGroups}
                />
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    gettingGroups();
                    setIsGroupsOpen(!isGroupsOpen);
                  }}
                  endIcon={<KeyboardArrowUpIcon />}
                >
                  Groups
                </Button>
              )}
            </div>
          </div>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {id}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default Group;
