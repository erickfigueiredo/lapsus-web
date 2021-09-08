import lapsus from './AxiosSettings';

class Shapefile {
  static async index() {
    try {
      const res = await lapsus.get('/shapefile/all');

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
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
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }
}

export default Shapefile;
