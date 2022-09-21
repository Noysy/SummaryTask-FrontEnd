import axios from "axios";
import Cookies from "universal-cookie";
import configTs from "../config";
import { ICreatePerson, IUpdate } from "../Interfaces/Person";

const url = `${configTs.URL}${configTs.PEOPLE_API}`;

axios.interceptors.request.use((config) => {
  if (config.headers === undefined) config.headers = {};

  const cookies = new Cookies();
  config.headers!["Authorization"] = cookies.get("jwt");

  return config;
});

class PeopleServices {
  static getAllPeople = async () => {
    return await axios.get(`${url}/`);
  };

  static getAllPeopleList = async () => {
    return await axios.get(`${url}/list`);
  };

  static createPerson = async (personDetails: ICreatePerson) => {
    return await axios.post(`${url}/`, personDetails);
  };

  static updatePerson = async (personDetails: IUpdate) => {
    return await axios.patch(`${url}/${personDetails.id}`, {
      name: personDetails.name,
      favoriteColor: personDetails.favoriteColor,
      favoriteAnimal: personDetails.favoriteAnimal,
      favoriteFood: personDetails.favoriteFood,
      role: personDetails.role,
    });
  };

  static deletePerson = async (personId: string) => {
    return await axios.delete(`${url}/${personId}`);
  };

  static uploadFile = async (personId: string, file: FormData) => {
    return await axios.put(`${url}/${personId}/upload-file`, file);
  };

  static selectUser = async (personId: string) => {
    return await axios.get(`${url}/${personId}/select`);
  };
}

export default PeopleServices;
