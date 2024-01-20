enum LocalStorageKey {
  UserAccessToken = "accessToken",
  TimeZone = "tz",
  TimeFormat = "timeFormat",
  Local = "local",
}

class LocalStorageProvider {
  private static _instance: LocalStorageProvider;

  public static get instance(): LocalStorageProvider {
    if (this._instance == null) {
      this._instance = new LocalStorageProvider();
    }
    return this._instance;
  }

  private constructor() {}

  public setItem(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  public removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }

  public getItem(key: LocalStorageKey): string {
    const result = localStorage.getItem(key);
    if (!result) {
      throw Error(`${key} is not exists in localStorage`);
    }
    return result;
  }
}

export { LocalStorageKey, LocalStorageProvider };
