import { Axios, RawAxiosRequestHeaders } from "axios";
import JobRepository from "./job";
import Repository from "./repository";
import EventBusFactory, { Event } from "@/utils/EventBusFactory";
import { SignoutReason } from "@/models/authentication/authentication";
import SecretProvider from "@/utils/SecretProvider";
import { ConfigProvider } from "@/utils/ConfigProvider";

class RepositoryFactory {
  private static _instance: RepositoryFactory;
  private _repositories: Array<Repository>;
  private _jobRepository?: JobRepository;
  private _axiosInstance: Axios;

  private constructor() {
    this._axiosInstance = this.generateAxiosInstance(null);
    this._repositories = [];
  }

  public get jobRepository(): JobRepository {
    if (!this._jobRepository) {
      this._jobRepository = new JobRepository(this._axiosInstance);
      this._repositories.push(this._jobRepository);
    }
    return this._jobRepository;
  }

  public updateAccessToken(accessToken: string) {
    // Create new Axios Instance
    this._axiosInstance = this.generateAxiosInstance(accessToken);

    this._repositories.forEach((repository) => {
      repository.setAxiosInstance(this._axiosInstance);
    });
  }

  public onUpdateLocale() {
    RepositoryFactory._instance._axiosInstance =
      RepositoryFactory._instance.generateAxiosInstance(
        SecretProvider.instance.getAccessToken()
      );

    RepositoryFactory._instance._repositories.forEach((repository) => {
      repository.setAxiosInstance(RepositoryFactory._instance._axiosInstance);
    });
  }

  private generateAxiosInstance(authorization: string | null): Axios {
    const headers: Partial<RawAxiosRequestHeaders> = {};

    if (authorization) {
      headers["Authorization"] = `Bearer ${authorization}`;
    }

    return new Axios({
      headers: headers,
      baseURL: ConfigProvider.instance.config.VITE_API_HOST,
      validateStatus: (status: number) => {
        if (status == 401 || status == 403) {
          EventBusFactory.instance.eventBus.emit(
            Event.Signoff,
            SignoutReason.Timeout
          );
        }
        return status >= 200 && status < 300;
      },
      transformResponse: (data) => {
        let parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          return data;
        }
        return parsedData;
      },
    });
  }

  public static get instance(): RepositoryFactory {
    if (!RepositoryFactory._instance) {
      RepositoryFactory._instance = new RepositoryFactory();
    }
    return RepositoryFactory._instance;
  }
}

export default RepositoryFactory;
