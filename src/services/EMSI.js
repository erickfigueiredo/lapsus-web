import { lapsus, defaultErrorMessage } from './AxiosSettings';

class EMSI {
  static async list() {
    try {
      const res = await lapsus.get('/emsi/lists');
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/emsi', data, {
        headers: {
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
