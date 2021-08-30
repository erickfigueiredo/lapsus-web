import lapsus from './AxiosSettings';

class Shapefile {
  static async create(data) {
    try {
      const response = lapsus.post('/shapefile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default Shapefile;
