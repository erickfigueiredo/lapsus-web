import axios from 'axios';

export const lapsus = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: '3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const defaultErrorMessage = { success: false, message: 'Houve um erro de conexão com o servidor!' };
