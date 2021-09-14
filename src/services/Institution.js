import lapsus from './AxiosSettings';

class Institution {
  static async index() {
    try {
      const res = await lapsus.get('/institution/all');

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }
}

export default Institution;
