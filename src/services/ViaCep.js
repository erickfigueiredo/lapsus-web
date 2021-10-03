import axios from 'axios';

class ViaCep {
  static async getAddressByCEP(cep) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      return res.data;
    } catch (err) {
      return err.response.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido' };
    }
  }
}

export default ViaCep;
