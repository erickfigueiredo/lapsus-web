import { lapsus, defaultErrorMessage } from '../AxiosSettings';

class Technician {
  static async indexByInstitution(idInstitution, page) {
    try {
      const res = await lapsus.get(`technician/institution/${idInstitution}/?page=${page}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Technician;
