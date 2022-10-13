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
import {
  groupFromDb,
  groupWithPopulatedChildren,
  groupWithPopulatedPeople,
  IGroup,
  IGroupProps,
} from "../../Interfaces/Group";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import People from "./People";
import GroupServices from "../../Services/Groups";
import { toast } from "react-toastify";
import { IAutocomplete, PersonWithId } from "../../Interfaces/Person";
import PeopleServices from "../../Services/People";
import Groups from "./Groups";
import NameEnabled from "./NameEnabled";
import NameDisabled from "./NameDisabled";
import PeopleDropdown from "./PeopleDropdown";
import GroupsDropdown from "./GroupsDropdown";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

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

  const getGroups = () => {
    GroupServices.getGroupsChildren(id)
      .then(({ children }: groupWithPopulatedChildren) => {
        setGroups(children);
      })
      .catch((err) => toast.error(err.response.data));
  };

  const getPeople = () => {
    GroupServices.getGroupMembers(id)
      .then(({ people }: groupWithPopulatedPeople) => {
        setPeople(people);
      })
      .catch((err) => toast.error(err.response.data));
  };

  useEffect(() => {
    getGroups();
  }, [groupList]);

  const deleteGroup = async () => {
    try {
      await GroupServices.deleteGroup(id);
      setGroupList((groupList: IGroup[]) =>
        groupList.filter((group) => group.id !== id)
      );
      return toast.success(t("group.delete"));
    } catch (err) {
      if (err instanceof AxiosError) return toast.error(err.response!.data);
    }
  };

  const updateName = async () => {
    try {
      const updatedGroup = await GroupServices.updateName(id, groupName);
      setGroupList((groupList: IGroup[]) => {
        const copiedArray = [...groupList];

        const groupIndex = copiedArray.findIndex((group) => group.id === id);
        copiedArray[groupIndex] = {
          id: updatedGroup.id,
          name: updatedGroup.name,
        };
        return copiedArray;
      });
      return toast.success(t("group.update"));
    } catch (err) {
      if (err instanceof AxiosError) return toast.error(err.response!.data);
    }
  };

  useEffect(() => {
    const updatePeopleList = async () => {
      const peopleList: PersonWithId[] = await PeopleServices.getAllPeople();
      const peopleId = people.map(({ id }) => id);
      setAllPeople(
        peopleList
          .filter((person: PersonWithId) => !peopleId.includes(person.id))
          .map((person: IAutocomplete, index: number) => {
            return (
              <ListItemButton
                key={person.id}
                selected={selectedIndex === index}
                onClick={(_event) => {
                  setSelectedIndex(1);
                  addPerson(person.id);
                }}
              >
                <ListItemText primary={person.name} />
              </ListItemButton>
            );
          })
      );
    };
    updatePeopleList().catch((err) => toast.error(err.response.data));
  }, [people]);

  useEffect(() => {
    const updateChildrenList = async () => {
      const groupList: groupFromDb[] = await GroupServices.getAllGroups();

      const groupId = groups.map((group: IGroup) => group.id);
      setAllGroups(
        groupList
          .filter(
            (group: IGroup) => id !== group.id && !groupId.includes(group.id)
          )
          .map((group: IAutocomplete, index: number) => (
            <ListItemButton
              key={group.id}
              selected={selectedGroupIndex === index}
              onClick={(_event) => {
                setSelectedGroupIndex(1);
                addGroup(group.id);
              }}
            >
              <ListItemText primary={group.name} />
            </ListItemButton>
          ))
      );
    };

    updateChildrenList().catch((err) => toast.error(err.response.data));
  }, [groups]);

  const addPerson = (personId: string) => {
    GroupServices.addPerson(id, personId)
      .then(getPeople)
      .catch((err) => toast.error(err.response.data));
  };

  const addGroup = (groupId: string) => {
    GroupServices.addGroup(groupId, id)
      .then(getGroups)
      .catch((err) => toast.error(err.response.data));
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

  const groupsAsElements = groups.map((group) => (
    <Groups
      id={group.id}
      name={group.name}
      getGroups={getGroups}
      key={group.id}
      currentRole={currentRole}
    />
  ));

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
                <PeopleDropdown
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
                    setIsPeopleOpen((prevValue: boolean) => !prevValue);
                  }}
                  endIcon={<KeyboardArrowUpIcon />}
                >
                  People
                </Button>
              )}
            </div>
            <div className="dropdown">
              {isGroupsOpen ? (
                <GroupsDropdown
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
                    setIsGroupsOpen((prevValue: boolean) => !prevValue);
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
