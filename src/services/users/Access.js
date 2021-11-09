import { lapsus, defaultErrorMessage } from '../AxiosSettings';

class Access {
  static async login(data) {
    try {
      const res = await lapsus.post('/login', data);
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async getUserInfo(token) {
    try {
      const res = await lapsus.get('/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Access;