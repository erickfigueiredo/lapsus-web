import lapsus from './AxiosSettings';

class Shapefile {
  static async create(data) {
    try {
      const response = lapsus.post('/shapefile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido' };
    }
  }
}

export default Shapefile;
