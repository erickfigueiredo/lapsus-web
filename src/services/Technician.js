import lapsus from './AxiosSettings';

class Technician {
  static async indexByInstitution(idInstitution, page) {
    try {
      const res = await lapsus.get(`technician/institution/${idInstitution}/?page=${page}`);
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido' };
    }
  }
}

export default Technician;
