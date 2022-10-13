import axios from "axios";
import Cookies from "universal-cookie";
import config from "../config";
import { ICreatePerson, IUpdate } from "../Interfaces/Person";

const peopleApiRoute = `${config.API_BASE_URL}/person`;

axios.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};

  const cookies = new Cookies();
  config.headers!["Authorization"] = `Bearer ${cookies.get("jwt")}`;

  return config;
});

class PeopleServices {
  static getAllPeople = async () => {
    return (await axios.get(`${peopleApiRoute}/`)).data;
  };

  static getAllPeopleList = async () => {
    return (await axios.get(`${peopleApiRoute}/list`)).data;
  };

  static createPerson = async (personDetails: ICreatePerson) => {
    return (await axios.post(`${peopleApiRoute}/`, personDetails)).data;
  };

  static updatePerson = async (personDetails: IUpdate) => {
    return (
      await axios.put(
        `${peopleApiRoute}/${personDetails.id}`,
        personDetails.newPerson
      )
    ).data;
  };

  static deletePerson = async (personId: string) => {
    return (await axios.delete(`${peopleApiRoute}/${personId}`)).data;
  };

  static uploadFile = async (personId: string, file: FormData) => {
    return (await axios.put(`${peopleApiRoute}/${personId}/upload-file`, file))
      .data;
  };

  static selectUser = async (personId: string) => {
    return (await axios.get(`${peopleApiRoute}/${personId}/login`)).data;
  };
}

export default PeopleServices;
