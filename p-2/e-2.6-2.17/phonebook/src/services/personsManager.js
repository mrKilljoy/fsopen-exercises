import axios from 'axios';

const url = '/api/persons';

const getAll = () => {
    const pr = axios.get(url);
    return pr.then(r => r.data);
}

const addPerson = (person) => {
    const pr = axios.post(url, person);
    return pr.then(r => r.data);
}

const deletePerson = (id) => {
    return axios.delete(`${url}/${id}`);
}

const updatePerson = (id, person) => {
    return axios.put(`${url}/${id}`, person)
        .then(r => r.data);
}

export default { getAll, addPerson, deletePerson, updatePerson };