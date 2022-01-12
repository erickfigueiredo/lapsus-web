import axios from 'axios';

export default axios.create({ timeout: '3000' });

export const apiURL = 'http://localhost:3001';

export const lapsus = axios.create({
  baseURL: apiURL,
  timeout: '3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const defaultErrorMessage = {
  success: false,
  message: 'Houve um erro de conexão com o servidor!',
};
