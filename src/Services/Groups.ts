import axios from "axios";
import config from "../config";
const url = `${config.API_BASE_URL}${config.GROUP_API}`;
class GroupServices {
  static getAllGroups = async () => {
    return await axios.get(`${url}/`);
  };

  static getGroupsPeople = async (groupId: string) => {
    return await axios.get(`${url}/${groupId}/details`);
  };

  static getGroupsChildren = async (groupId: string) => {
    return await axios.get(`${url}/${groupId}/children`);
  };

  static removePerson = async (groupId: string, personId: string) => {
    return await axios.delete(`${url}/${groupId}/person/${personId}`);
  };

  static addPerson = async (groupId: string, personId: string) => {
    return await axios.put(`${url}/${groupId}/person/${personId}`);
  };

  static removeGroup = async (groupId: string) => {
    return await axios.delete(`${url}/${groupId}/parent`);
  };

  static addGroup = async (groupId: string, parentId: string) => {
    return await axios.put(`${url}/${groupId}/parent/${parentId}`);
  };

  static deleteGroup = async (groupId: string) => {
    return await axios.delete(`${url}/${groupId}`);
  };

  static updateName = async (groupId: string, name: string) => {
    return await axios.put(`${url}/${groupId}/name`, { name });
  };

  static createGroup = async (name: string) => {
    return await axios.post(`${url}`, { name });
  };
}

export default GroupServices;
