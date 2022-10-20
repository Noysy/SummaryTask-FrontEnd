export interface decodedJwt {
  iat: number;
  id: string;
  name: string;
  role: string;
}

export interface Person {
  name: string;
  favoriteColor: string;
  favoriteAnimal: string;
  favoriteFood: string;
  role: string;
}

export interface PersonWithId extends Person {
  files?: FileDetails[];
  id: string;
  [key: string]: unknown;
}

export interface ICreatePerson {
  person: Person;
  group: string;
}

export interface IPersonFunc {
  person: PersonWithId;
  setPeopleList: Function;
  currentRole: string;
}

export interface IAutocomplete {
  name: string;
  id: string;
}

export interface IPersonDetails {
  person: PersonWithId;
  setAreSlotsEnabled: Function;
  areSlotsEnabled: boolean;
}

export interface personDisabledDetails extends IPersonDetails {
  deletePerson: Function;
  currentRole: string;
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
  newPerson?: Person;
  id: string;
}

export interface FileDetails {
  name: string;
  url: string;
}

export interface IPage {
  cookie: string;
  currentRole: string;
}

export interface editableField {
  fieldName: string;
  field: string;
  fieldType: "title" | "normal";
}
