import lapsus from './AxiosSettings';

class Institution {
  static async indexDetailed(page) {
    try {
      const res = await lapsus.get(`/institution/all/detailed/?page=${page}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/institution', data);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }
}

export default Institution;
