import axios from 'axios'
import readCookie from "../utils/cookie";


const getAll = () => {
    const request = axios.get('api/courses/');
    return request.then(response => response.data)
}


export default {getAll};