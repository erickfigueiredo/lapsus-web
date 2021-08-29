import axios from 'axios';

const mainConfig = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: '3000',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default mainConfig;
