import axios from 'axios'
import readCookie from "../utils/cookie";


const getAll = () => {
    const request = axios.get('api/seasons/');
    return request.then(response => response.data)
}

const getActive = () => {
    const request = axios.get('api/seasons/active/');
    return request.then(response => response.data)
}

const getActiveRegisters = () => {
    const request = axios.get('api/seasons/active/registers/');
    return request.then(response => response.data)
}

const getActiveChildren= () => {
    const request = axios.get('api/seasons/active/children/');
    return request.then(
        response => response.data.map(register => register.child)
    )
}


export default {getAll, getActive, getActiveRegisters, getActiveChildren};