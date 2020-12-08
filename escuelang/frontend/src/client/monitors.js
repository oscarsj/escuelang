import axios from 'axios'

const get = () => {
    const request = axios.get(`api/days/`);
    return request.then(response => response.data.map(day => day.name))
}

export default {get};