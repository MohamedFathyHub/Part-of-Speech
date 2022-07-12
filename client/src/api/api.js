import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getData = () => API.get('/getPost')

export const postData = async (score) => API.post('/postRank', score )