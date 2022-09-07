export interface IPerson extends IAddPerson {
    id: string;
}

export interface IAutocomplete {
    name: string;
    id: string;
}

export interface IAddPerson {
    name: string;
    favoriteColor: string;
    favoriteAnimal: string;
    favoriteFood: string;
}

export interface IPersonDetails extends IPerson {
    setAreSlotsEnabled: Function;
    areSlotsEnabled: boolean;
}

export interface IPeopleProps {
    setPeopleList: Function;
}

export interface IPeoplePageProps {
    peopleList: JSX.Element[];
}

export interface IUpdate {
    name?: string;
    favoriteColor?: string;
    favoriteAnimal?: string;
    favoriteFood?: string;
    id: string;
}
