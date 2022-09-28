import { PersonWithId } from "./Person";

export interface INewGroup {
  name: string;
}

export interface IGroup extends INewGroup {
  id: string;
}

export interface IGroupProps extends IGroup {
  setGroupList: Function;
  groupList: IGroup[];
  currentRole: string;
}

export interface IGroupsProps extends IGroup {
  gettingGroups: Function;
  currentRole: string;
}

export interface IIdProps {
  id: string;
}

export interface IPeopleProps {
  person: PersonWithId;
  groupId: string;
  gettingPeople: Function;
  currentRole: string;
}

export interface IUpdateNameProps extends IGroup {
  isNameEditable: boolean;
  setIsNameEditable: Function;
}
