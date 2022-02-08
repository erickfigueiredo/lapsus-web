import { lapsus, defaultErrorMessage } from '../AxiosSettings';

class Admin {
  static async index(token, page, search = '', who = 'both', order = 'asc') {
    try {
      const res = await lapsus.get(`/admin/all?search=${search}&page=${page}&who=${who}&order=${order}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(token, data) {
    try {
      const res = await lapsus.post('/admin', data, {
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

export default Admin;
