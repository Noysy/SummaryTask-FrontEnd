import axios from "axios";
import config from "../config";
const url = `${config.API_BASE_URL}/group`;
class GroupServices {
  static getAllGroups = async () => {
    return (await axios.get(`${url}/`)).data;
  };

  static getGroupMembers = async (groupId: string) => {
    return (await axios.get(`${url}/${groupId}/details`)).data;
  };

  static getGroupsChildren = async (groupId: string) => {
    return (await axios.get(`${url}/${groupId}/children`)).data;
  };

  static removePerson = async (groupId: string, personId: string) => {
    return (await axios.delete(`${url}/${groupId}/person/${personId}`)).data;
  };

  static addPerson = async (groupId: string, personId: string) => {
    return (await axios.put(`${url}/${groupId}/person/${personId}`)).data;
  };

  static removeGroup = async (groupId: string) => {
    return (await axios.delete(`${url}/${groupId}/parent`)).data;
  };

  static addGroup = async (groupId: string, parentId: string) => {
    return (await axios.put(`${url}/${groupId}/parent/${parentId}`)).data;
  };

  static deleteGroup = async (groupId: string) => {
    return (await axios.delete(`${url}/${groupId}`)).data;
  };

  static updateName = async (groupId: string, name: string) => {
    return (await axios.put(`${url}/${groupId}/name`, { name })).data;
  };

  static createGroup = async (name: string) => {
    return (await axios.post(`${url}`, { name })).data;
  };
}

export default GroupServices;
