enum Env {
  LOCAL = "local",
  PROD = "PROD",
}

interface AppConfig {
  VITE_ENV: Env;
  VITE_APP_TITLE: string;
  VITE_API_HOST: string;
}

class ConfigProvider {
  private static _instance: ConfigProvider;
  private _config: AppConfig = {
    VITE_ENV: Env.LOCAL,
    VITE_APP_TITLE: "",
    VITE_API_HOST: "",
  };

  private constructor() {
    this._config = window.APP_CONFIG;
    if (typeof window.APP_CONFIG === "undefined") {
      this._config = this.loadConfigFromEnv();
    }
  }

  private loadConfigFromEnv(): AppConfig {
    const appConfig: AppConfig = {
      VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE ?? "RAJDS Admin Portal",
      VITE_ENV: import.meta.env.VITE_ENV ?? Env.LOCAL,
      VITE_API_HOST: import.meta.env.VITE_API_HOST ?? "http://localhost:31313",
    };

    return appConfig;
  }

  public get config(): AppConfig {
    return this._config;
  }

  public static get instance(): ConfigProvider {
    if (!this._instance) {
      this._instance = new ConfigProvider();
    }
    return this._instance;
  }
}

export { AppConfig, ConfigProvider };
