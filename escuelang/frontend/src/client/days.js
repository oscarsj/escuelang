import axios from 'axios'

const getNames = (id) => {
    const request = axios.get(`api/days/`);
    return request.then(response => response.data.map(day => day.name))
}

export default {getNames};