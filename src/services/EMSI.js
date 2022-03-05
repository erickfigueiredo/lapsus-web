import { lapsus, defaultErrorMessage } from './AxiosSettings';

class EMSI {
  static async index(x, y) {
    try {
      const res = await lapsus.get(`/emsi/all?x=${x}&y=${y}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async list(token) {
    try {
      const res = await lapsus.get('/emsi/lists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data, token) {
    try {
      const res = await lapsus.post('/emsi', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accepts: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default EMSI;
