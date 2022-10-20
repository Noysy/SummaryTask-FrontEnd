import axios from "axios";
import config from "../config";
const groupApiRoute = `${config.API_BASE_URL}/group`;
class GroupServices {
  static getAllGroups = async () => (await axios.get(`${groupApiRoute}/`)).data;

  static getGroupMembers = async (groupId: string) =>
    (await axios.get(`${groupApiRoute}/${groupId}/details`)).data;

  static getGroupsChildren = async (groupId: string) =>
    (await axios.get(`${groupApiRoute}/${groupId}/children`)).data;

  static removePerson = async (groupId: string, personId: string) =>
    (await axios.patch(`${groupApiRoute}/${groupId}/person/${personId}`)).data;

  static addPerson = async (groupId: string, personId: string) =>
    (await axios.put(`${groupApiRoute}/${groupId}/person/${personId}`)).data;

  static removeGroup = async (groupId: string) =>
    (await axios.patch(`${groupApiRoute}/${groupId}/parent`)).data;

  static addGroup = async (groupId: string, parentId: string) =>
    (await axios.put(`${groupApiRoute}/${groupId}/parent/${parentId}`)).data;

  static deleteGroup = async (groupId: string) =>
    (await axios.delete(`${groupApiRoute}/${groupId}`)).data;

  static updateName = async (groupId: string, name: string) =>
    (await axios.put(`${groupApiRoute}/${groupId}/name`, { name })).data;

  static createGroup = async (name: string) =>
    (await axios.post(`${groupApiRoute}`, { name })).data;
}

export default GroupServices;
