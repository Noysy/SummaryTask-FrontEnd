import { IPerson } from './Person';

export interface INewGroup {
    name: string;
}

export interface IGroup extends INewGroup {
    id: string;
}

export interface IGroupProps extends IGroup {
    setGroupList: Function;
    groupList: IGroup[];
}

export interface IGroupsProps extends IGroup {
    gettingGroups: Function;
}

export interface IIdProps {
    id: string;
}

export interface IPeopleProps extends IPerson {
    groupId: string;
    gettingPeople: Function;
}

export interface IUpdateNameProps extends IGroup {
    isNameEditable: boolean;
    setIsNameEditable: Function;
}
