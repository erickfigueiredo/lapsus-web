import { lapsus, defaultErrorMessage } from './AxiosSettings';

class Contribution {
  static async index(x, y) {
    try {
      const res = await lapsus.get(`/contribution/detailed?x=${x}&y=${y}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async indexDetailed(token, page = 0) {
    try {
      const res = await lapsus.get(`/contribution?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/contribution', data, {
        Accepts: 'application/json',
        'Content-Type': 'multipart/form-data',
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async changeStatus(token, data) {
    try {
      const res = await lapsus.put('/contribution', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Contribution;
