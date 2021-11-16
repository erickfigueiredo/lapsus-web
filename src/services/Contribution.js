import { lapsus, defaultErrorMessage } from './AxiosSettings';

class Contribution {
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
}

export default Contribution;
