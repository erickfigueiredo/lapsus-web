import lapsus from './AxiosSettings';

class Access {
  static async login(data) {
    try {
      const res = await lapsus.post('/login', data);
      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido' };
    }
  }
}

export default Access;
