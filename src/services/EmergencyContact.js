import { lapsus, defaultErrorMessage } from './AxiosSettings';

class EmergencyContact {
  static async index() {
    try {
      const res = await lapsus.get('/emergency_contact');
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(token, data) {
    try {
      const res = await lapsus.post('/emergency_contact', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(token, data) {
    try {
      const res = await lapsus.put('/emergency_contact', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async delete(token, id) {
    try {
      const res = await lapsus.delete(`/emergency_contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default EmergencyContact;
