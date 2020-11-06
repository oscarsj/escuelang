import axios from 'axios'
import readCookie from "../utils/cookie";


const getAll = () => {
    const request = axios.get('api/children/');
    return request.then(response => response.data)
}

const get = (id) => {
    const request = axios.get(`api/children/${id}/`);
    return request.then(response => response.data)
}

const create = newChild => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': readCookie('csrftoken'),
        }
    }
    const request = axios.post('api/children/', newChild, config);
    return request.then(response => response.data)
}

const update = (id, newChild) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': readCookie('csrftoken'),
        }
    }
    const request = axios.put(`api/children/${id}`, newChild, config);
    return request.then(response => response.data)
}

export default { getAll, get, create, update };
