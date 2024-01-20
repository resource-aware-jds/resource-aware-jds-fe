import {
  LocalStorageKey,
  LocalStorageProvider,
} from "@/utils/LocalStorageProvider";
import { Task } from "../StartupUtil";
import SecretProvider from "@/utils/SecretProvider";
import RepositoryFactory from "@/repository/repositoryFactory";

class CheckAuthenticationStatus implements Task {
  async run(): Promise<void> {
    // Load the Token from local storage.
    let accessToken: string;
    try {
      accessToken = LocalStorageProvider.instance.getItem(
        LocalStorageKey.UserAccessToken
      );
    } catch (e) {
      // Emit the signOff Event.
      SecretProvider.instance.onSignoff();
      return;
    }

    // Broadcast the new token to all repositories.
    RepositoryFactory.instance.updateAccessToken(accessToken);
  }
}

export default CheckAuthenticationStatus;
