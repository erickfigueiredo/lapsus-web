import { lapsus, defaultErrorMessage } from './AxiosSettings';

class Settings {
  static async getOrg() {
    try {
      const res = await lapsus.get('/organization');
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(token, data) {
    try {
      const res = await lapsus.put('/organization', data, {
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

export default Settings;
