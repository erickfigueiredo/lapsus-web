import { lapsus, defaultErrorMessage } from '../AxiosSettings';

class Technician {
  static async index(token, page, search = '', idInstitution = '', who = 'both', order = 'asc') {
    try {
      const res = await lapsus.get(`/technician?search=${search}&id_institution=${idInstitution}&page=${page}&who=${who}&order=${order}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async indexByInstitution(token, idInstitution, page) {
    try {
      const res = await lapsus.get(`technician/institution/${idInstitution}/?page=${page}`,
        {
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
      const res = await lapsus.post('/technician', data, {
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
      const res = await lapsus.put('/technician', data, {
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
      const res = await lapsus.patch('/technician', { id }, {
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

export default Technician;
