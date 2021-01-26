import axios from 'axios'
import readCookie from "../utils/cookie";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': readCookie('csrftoken'),
    }
}

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
    const request = axios.post(`api/seasons/${seasonId}/registers/`, register, config);
    return request.then(response => response.data);    
}

const updateRegister = (registerId, newRegister) => {
    const request = axios.put(`api/registers/${registerId}/`, newRegister, config);
    return request.then(response => response.data);
}

const update = (seasonId, season) => {
    
    const request = axios.put(`api/seasons/${seasonId}/`, season, config);
    return request.then(response => response.data);
}


export default {get, getAll, getRegisters, updateRegister, getChildren, registerChild, update};