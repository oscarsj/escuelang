import axios from 'axios'

const get = () => {
    const request = axios.get(`api/monitors/`);
    return request.then(response => response.data);
}

export default {get};