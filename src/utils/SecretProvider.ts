import RepositoryFactory from "@/repository/repositoryFactory";
import { LocalStorageProvider, LocalStorageKey } from "./LocalStorageProvider";

class SecretProvider {
  private static _instance: SecretProvider;

  public static get instance(): SecretProvider {
    if (!this._instance) {
      this._instance = new SecretProvider();
    }
    return this._instance;
  }

  public getAccessToken(): string | null {
    try {
      return LocalStorageProvider.instance.getItem(
        LocalStorageKey.UserAccessToken
      );
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  public onSignin(token?: string) {
    if (!token) {
      return;
    }

    // Broadcast the new token to all repositories.
    RepositoryFactory.instance.updateAccessToken(token);
    try {
      LocalStorageProvider.instance.setItem(
        LocalStorageKey.UserAccessToken,
        token
      );
    } catch (e) {
      console.error("SecretProvider Error: ", e);
    }
  }

  public onSignoff() {
    try {
      LocalStorageProvider.instance.removeItem(LocalStorageKey.UserAccessToken);
    } catch (e) {
      console.error("SecretProvider SignOff Error: ", e);
    }
  }
}

export default SecretProvider;
