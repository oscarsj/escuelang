import axios from 'axios'

const getNames = () => {
    const request = axios.get(`api/days/`);
    return request.then(response => response.data.map(day => day.name))
}

const get = () => {
    const request = axios.get(`api/days/`);
    return request.then(response => response.data)
}

export default {getNames, get};