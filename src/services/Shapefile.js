import { lapsus, defaultErrorMessage } from './AxiosSettings';

class Shapefile {
  static async index() {
    try {
      const res = await lapsus.get('/shapefile/all');

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/shapefile', data, {
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(data) {
    try {
      const res = await lapsus.put('/shapefile', data);

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async delete(id) {
    try {
      const res = await lapsus.delete(`/shapefile/${id}`);

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Shapefile;
