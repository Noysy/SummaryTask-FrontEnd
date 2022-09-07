import axios from 'axios';
import configTs from '../config';
const url = `${configTs.URL}${configTs.GROUP_API}`;
class GroupServices {
    static getAllGroups = async () => {
        return await axios.get(`${url}/`);
    };

    static getGroupsPeople = async (groupId: string) => {
        return await axios.get(`${configTs.URL}/groupDetails/${groupId}`);
    };

    static getGroupsChildren = async (groupId: string) => {
        return await axios.get(`${url}/children/${groupId}`);
    };

    static removePerson = async (groupId: string, personId: string) => {
        return await axios.delete(`${url}/removePerson/${groupId}/${personId}`);
    };

    static addPerson = async (groupId: string, personId: string) => {
        return await axios.put(`${url}/addPerson/${groupId}/${personId}`);
    };

    static removeGroup = async (groupId: string) => {
        return await axios.delete(`${url}/removeParent/${groupId}`);
    };

    static addGroup = async (groupId: string, parentId: string) => {
        return await axios.put(`${url}/addParent/${groupId}/${parentId}`);
    };

    static deleteGroup = async (groupId: string) => {
        return await axios.delete(`${url}/${groupId}`);
    };

    static updateName = async (groupId: string, name: string) => {
        return await axios.patch(`${url}/updateName/${groupId}`, { name: name });
    };

    static createGroup = async (name: string) => {
        return await axios.post(`${url}`, { name: name });
    };
}

export default GroupServices;
