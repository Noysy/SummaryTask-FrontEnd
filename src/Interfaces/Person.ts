export interface IPerson {
  name: string;
  favoriteColor: string;
  favoriteAnimal: string;
  favoriteFood: string;
  role: string;
  id: string;
  files?: FileDetails[];
}

export interface ICreatePerson {
  name: string;
  favoriteColor: string;
  favoriteAnimal: string;
  favoriteFood: string;
  role: string;
  group: string;
}

export interface IPersonFunc extends IPerson {
  setPeopleList: Function;
}

export interface IAutocomplete {
  name: string;
  id: string;
}

export interface IPersonDetails extends IPerson {
  setAreSlotsEnabled: Function;
  areSlotsEnabled: boolean;
}

export interface personDisabledDetails extends IPersonDetails {
  deletePerson: Function;
}

export interface personEnabledDetails extends IPersonDetails {
  updatePerson?: Function;
  createPerson?: Function;
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
  role?: string;
  id: string;
}

export interface FileDetails {
  name: string;
  url: string;
}

export interface IPage {
  cookie: string;
}
