import lapsus from './AxiosSettings';

class Access {
  static async login(data) {
    try {
      const res = await lapsus.post('/login', data);
      return res.data;
    } catch (err) {
      if (err.response.data) {
        return err.response.data;
      }

      return { success: false, message: 'Houve um erro desconhecido' };
    }
  }
}

export default Access;
