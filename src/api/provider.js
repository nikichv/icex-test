import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.API_ROOT,
});

export default httpClient;
