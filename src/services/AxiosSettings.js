import axios from 'axios';

export default axios.create({ timeout: 4000 });

export const apiURL = 'http://localhost:3001';

export const lapsus = axios.create({
  baseURL: apiURL,
  timeout: 8000, // 8 segundos de espera
  headers: {
    'Content-Type': 'application/json',
  },
});

export const defaultErrorMessage = {
  success: false,
  message: 'Houve um erro de conexão com o servidor!',
};
