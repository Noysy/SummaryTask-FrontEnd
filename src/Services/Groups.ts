import axios from "axios";
import config from "../config";
const url = `${config.API_BASE_URL}/group`;
class GroupServices {
  static getAllGroups = () => {
    return axios.get(`${url}/`);
  };

  static getGroupsPeople = (groupId: string) => {
    return axios.get(`${url}/${groupId}/details`);
  };

  static getGroupsChildren = (groupId: string) => {
    return axios.get(`${url}/${groupId}/children`);
  };

  static removePerson = (groupId: string, personId: string) => {
    return axios.delete(`${url}/${groupId}/person/${personId}`);
  };

  static addPerson = (groupId: string, personId: string) => {
    return axios.put(`${url}/${groupId}/person/${personId}`);
  };

  static removeGroup = (groupId: string) => {
    return axios.delete(`${url}/${groupId}/parent`);
  };

  static addGroup = (groupId: string, parentId: string) => {
    return axios.put(`${url}/${groupId}/parent/${parentId}`);
  };

  static deleteGroup = (groupId: string) => {
    return axios.delete(`${url}/${groupId}`);
  };

  static updateName = (groupId: string, name: string) => {
    return axios.put(`${url}/${groupId}/name`, { name });
  };

  static createGroup = (name: string) => {
    return axios.post(`${url}`, { name });
  };
}

export default GroupServices;
