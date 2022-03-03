import { lapsus, apiURL, defaultErrorMessage } from './AxiosSettings';

class Shapefile {
  static async index(isURI = 'n') {
    try {
      const res = await lapsus.get(`/shapefile/all?is_uri=${isURI}`);

      if (isURI === 'y' && res.data.success) {
        const shapefile = res.data.shapefile.map((link) => {
          const uri = apiURL + link.uri;
          return { uri };
        });

        return { success: true, shapefile };
      }

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async getAmount(token) {
    try {
      const res = await lapsus.get('/shapefile/amount', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(token, data) {
    try {
      const res = await lapsus.post('/shapefile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accepts: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(token, data) {
    try {
      const res = await lapsus.put('/shapefile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async delete(token, id) {
    try {
      const res = await lapsus.delete(`/shapefile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Shapefile;
