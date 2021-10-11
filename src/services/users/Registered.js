import { lapsus, defaultErrorMessage } from '../AxiosSettings';

class Registered {
  static async create(data) {
    try {
      const res = await lapsus.post('registered', data);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Registered;
