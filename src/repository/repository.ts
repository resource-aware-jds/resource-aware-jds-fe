import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

abstract class Repository {
  private _axios: Axios;

  constructor(axios: Axios) {
    this._axios = axios;
  }

  async sendRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this._axios.request(config);
  }

  public get axiosInstance(): Axios {
    if (!this._axios) {
      this._axios = new Axios();
    }
    return this._axios;
  }

  public setAxiosInstance(axios: Axios) {
    this._axios = axios;
  }
}

export default Repository;
