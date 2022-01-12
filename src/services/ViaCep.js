import axios from './AxiosSettings';

class ViaCep {
  static async getAddressByCEP(cep) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (res.data.erro) return { success: false, message: 'Endereço não encontrado' };
      return { success: true, address: res.data };
    } catch (err) {
      return err.response?.data ? err.response.data : { success: false, message: 'Houve um erro desconhecido!' };
    }
  }
}

export default ViaCep;
