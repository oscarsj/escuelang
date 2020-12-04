import axios from 'axios'
import readCookie from "../utils/cookie";


const getAll = () => {
    const request = axios.get('api/seasons/');
    return request.then(response => response.data)
}

const get = (id) => {
    const request = axios.get(`api/seasons/${id}/`);
    return request.then(response => response.data)
}

const getRegisters = (id) => {
    const request = axios.get(`api/seasons/${id}/children/`);
    return request.then(response => response.data);
}

const getChildren = (id) => {
    const request = axios.get(`api/seasons/${id}/children/`);
    return request.then(
        response => response.data.map(register => register.child)
    )
}
const registerChild = (seasonId, register) => {
    
}

const update = (seasonId, season) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': readCookie('csrftoken'),
        }
    }
    const request = axios.put(`api/seasons/${seasonId}/`, season, config);
    return request.then(response => response.data)
}


export default {get, getAll, getRegisters, getChildren, registerChild, update};