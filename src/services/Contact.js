import { lapsus, defaultErrorMessage } from './AxiosSettings';

class Contact {
  static async index(page) {
    try {
      const res = await lapsus.get(`/contact/all?page=${page}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/contact', data);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async toggleVisualization(id) {
    try {
      const res = await lapsus.patch('/contact/toggle_check', { id });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async delete(id) {
    try {
      const res = await lapsus.delete(`/contact/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Contact;
