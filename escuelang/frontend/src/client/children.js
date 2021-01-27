import axios from 'axios'
import readCookie from "../utils/cookie";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': readCookie('csrftoken'),
    }
}

const getAll = async () => {
    const request = axios.get('api/children/');
    const response = await request;
    return response.data;
}

const get = async (id) => {
    const request = axios.get(`api/children/${id}/`);
    const response = await request;
    return response.data;
}

const create = async newChild => {
    const request = axios.post('api/children/', newChild, config);
    const response = await request;
    return response.data;
}

const update = async (id, newChild) => {
    const request = axios.put(`api/children/${id}/`, newChild, config);
    const response = await request;
    return response.data;
}

const search = async (name, surname) => {
    const request = axios.get(`api/search?name=${name}&surname=${surname}`);
    const response = await request;
    return response.data[0];
}

const deleteChild = async (id) => {
    const request = axios.delete(`api/children/${id}/`, config);
    const response = await request;
    return response.data;
}
export default { getAll, get, create, update, search, deleteChild };
