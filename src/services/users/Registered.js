import { lapsus, defaultErrorMessage } from '../AxiosSettings';

class Registered {
  static async index(token, page, search = '', who = 'both', order = 'asc') {
    try {
      const res = await lapsus.get(`/registered/all?search=${search}&page=${page}&who=${who}&order=${order}`, {
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
      const res = await lapsus.post('/registered', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(token, data) {
    try {
      const res = await lapsus.put('/registered', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async toggleStatus(token, id) {
    try {
      const res = await lapsus.patch('/registered', { id }, {
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

export default Registered;
