import axios from 'axios';
import configTs from '../config';
import { ICreatePerson, IUpdate } from '../Interfaces/Person';

const url = `${configTs.URL}${configTs.PEOPLE_API}`;

class PeopleServices {
    static getAllPeople = async () => {
        return await axios.get(`${url}/`);
    };

    static createPerson = async (personDetails: ICreatePerson) => {        
        return await axios.post(`${url}/`, personDetails);
    };

    static updatePerson = async (personDetails: IUpdate) => {
        return await axios({
            method: 'patch',
            url: `${url}/${personDetails.id}`,
            data: {
                name: personDetails.name,
                favoriteColor: personDetails.favoriteColor,
                favoriteAnimal: personDetails.favoriteAnimal,
                favoriteFood: personDetails.favoriteFood,
            },
        });
    };

    static deletePerson = async (personId: string) => {
        return await axios.delete(`${configTs.URL}/people/${personId}`);
    };
}

export default PeopleServices;
