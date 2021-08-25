import axios from './AxiosSettings';

class Access {
  static async login(data) {
    try {
      const res = await axios.post('/login', data);
      return res.data;
    } catch (err) {
      return err;
    }
  }
}

export default Access;
