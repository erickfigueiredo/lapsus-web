import lapsus from './AxiosSettings';

class Category {
  static async create(data) {
    try {
      const res = await lapsus.post('/category', data);
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }

  static async index() {
    try {
      const res = await lapsus.get('/category/all');
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }
}

export default Category;
