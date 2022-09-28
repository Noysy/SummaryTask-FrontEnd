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
import { IAutocomplete, PersonWithId } from "../../Interfaces/Person";
import PeopleServices from "../../Services/People";
import Groups from "./Groups";
import NameEnabled from "./NameEnabled";
import NameDisabled from "./NameDisabled";
import PeopleOpen from "./PeopleOpen";
import GroupsOpen from "./GroupsOpen";
import { useTranslation } from "react-i18next";

const Group: React.FC<IGroupProps> = ({
  id,
  name,
  setGroupList,
  groupList,
  currentRole,
}) => {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [people, setPeople] = useState<PersonWithId[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupName, setGroupName] = useState(name);
  const [allPeople, setAllPeople] = useState<JSX.Element[]>([]);
  const [allGroups, setAllGroups] = useState<JSX.Element[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>();

  const { t } = useTranslation();

  useEffect(() => {
    getGroups();
  }, [groupList]);

  const deleteGroup = () => {
    GroupServices.deleteGroup(id)
      .then(() => {
        setGroupList((groupList: IGroup[]) =>
          groupList.filter((group) => group.id !== id)
        );
        return toast.success(t("group.delete"));
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
        return toast.success(t("group.update"));
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  useEffect(() => {
    PeopleServices.getAllPeople()
      .then((res) => {
        const peopleId = people.map((person: PersonWithId) => {
          return person.id;
        });
        setAllPeople(
          res.data
            .filter((person: PersonWithId) => !peopleId.includes(person.id))
            .map((person: IAutocomplete, index: number) => {
              return (
                <ListItemButton
                  key={person.id}
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
                  key={group.id}
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
      .then(() => getPeople())
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const addGroup = (groupId: string) => {
    GroupServices.addGroup(groupId, id)
      .then(() => getGroups())
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const getPeople = () => {
    GroupServices.getGroupsPeople(id)
      .then((res) => {
        setPeople(res.data.people);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const getGroups = () => {
    GroupServices.getGroupsChildren(id)
      .then((res) => {
        setGroups(res.data.children);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const peopleAsElements = people.map((person) => {
    return (
      <People
        key={person.id}
        person={person}
        groupId={id}
        getPeople={getPeople}
        currentRole={currentRole}
      />
    );
  });

  const groupsAsElements = groups.map((group) => {
    return (
      <Groups
        id={group.id}
        name={group.name}
        getGroups={getGroups}
        key={group.id}
        currentRole={currentRole}
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
                currentRole={currentRole}
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
                  currentRole={currentRole}
                />
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    getPeople();
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
                  currentRole={currentRole}
                />
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    getGroups();
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
