import { lapsus, defaultErrorMessage } from './AxiosSettings';

class MapLegend {
  static async index() {
    try {
      const res = await lapsus.get('/map-legend');
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default MapLegend;
