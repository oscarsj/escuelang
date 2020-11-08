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
    const request = axios.get(`api/seasons/${id}/registers/`);
    return request.then(response => response.data)
}

const getChildren= (id) => {
    const request = axios.get(`api/seasons/${id}/children/`);
    return request.then(
        response => response.data.map(register => register.child)
    )
}


export default {get, getAll, getRegisters, getChildren};