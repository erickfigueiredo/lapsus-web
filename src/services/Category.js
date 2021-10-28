import { lapsus, defaultErrorMessage } from './AxiosSettings';

class Category {
  static async index() {
    try {
      const res = await lapsus.get('/category/all');
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/category', data, {
        headers: {
          // Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(data) {
    try {
      const res = await lapsus.put('/category', data);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async delete(id) {
    try {
      const res = await lapsus.delete(`/category/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Category;
