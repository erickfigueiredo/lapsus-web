import { lapsus, apiURL, defaultErrorMessage } from './AxiosSettings';

class Shapefile {
  static async index(isURI = 'n') {
    try {
      const res = await lapsus.get(`/shapefile/all?is_uri=${isURI}`);

      if (isURI === 'y') {
        if (res.data.success) {
          const shapefile = res.data.shapefile.map((link) => {
            const parts = link.uri.split(/\\|\//);
            const uri = `${apiURL}/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
            return { uri };
          });

          return { success: true, shapefile };
        }

        return res.data;
      }

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async create(data) {
    try {
      const res = await lapsus.post('/shapefile', data, {
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async update(data) {
    try {
      const res = await lapsus.put('/shapefile', data);

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }

  static async delete(id) {
    try {
      const res = await lapsus.delete(`/shapefile/${id}`);

      return res.data;
    } catch (err) {
      return err.response?.data ? err.response.data : defaultErrorMessage;
    }
  }
}

export default Shapefile;
