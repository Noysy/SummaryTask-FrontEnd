import axios from "axios";
import Cookies from "universal-cookie";
import config from "../config";
import { ICreatePerson, IUpdate } from "../Interfaces/Person";

const url = `${config.API_BASE_URL}/person`;

axios.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};

  const cookies = new Cookies();
  config.headers!["Authorization"] = cookies.get("jwt");

  return config;
});

class PeopleServices {
  static getAllPeople = async () => {
    return (await axios.get(`${url}/`)).data;
  };

  static getAllPeopleList = async () => {
    return (await axios.get(`${url}/list`)).data;
  };

  static createPerson = async (personDetails: ICreatePerson) => {
    return (await axios.post(`${url}/`, personDetails)).data;
  };

  static updatePerson = async (personDetails: IUpdate) => {
    return (
      await axios.put(`${url}/${personDetails.id}`, personDetails.newPerson)
    ).data;
  };

  static deletePerson = async (personId: string) => {
    return (await axios.delete(`${url}/${personId}`)).data;
  };

  static uploadFile = async (personId: string, file: FormData) => {
    return (await axios.put(`${url}/${personId}/upload-file`, file)).data;
  };

  static selectUser = async (personId: string) => {
    return (await axios.get(`${url}/${personId}/select`)).data;
  };
}

export default PeopleServices;
