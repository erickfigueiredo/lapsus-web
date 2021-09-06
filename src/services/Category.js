import lapsus from './AxiosSettings';

class Category {
  static async index() {
    try {
      const res = await lapsus.get('/category/all');
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/category', data);
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }

  static async update(data) {
    try {
      const res = await lapsus.put('/category', data);
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }

  static async delete(id) {
    try {
      const res = await lapsus.delete(`/category/${id}`);
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }
}

export default Category;
