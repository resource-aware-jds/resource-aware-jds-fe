import router from "@/router";
import EventBusFactory, { Event } from "../EventBusFactory";
import { LocalStorageKey, LocalStorageProvider } from "../LocalStorageProvider";
import { I18nManager } from "@/locales/facade";
import { ConfigProvider } from "../ConfigProvider";

export enum SupportedLocalization {
  en = "en",
}

class LocalConfigProvider {
  private static _instance: LocalConfigProvider;
  private _localizationList = Object.values(SupportedLocalization);

  private constructor() {}

  public getConfig(): string {
    // Load the localization config from the LocalStorage
    let localization = "en";
    try {
      localization = LocalStorageProvider.instance.getItem(
        LocalStorageKey.Local
      );
    } catch (e) {
      console.warn("Skip loading the localization: ", e);
    }

    return localization;
  }

  public setConfig(language: string) {
    if (!this._localizationList.includes(language as SupportedLocalization)) {
      throw new Error("The language is not supported");
    }
    // Check if language is the same
    try {
      const currentLanguage = LocalStorageProvider.instance.getItem(
        LocalStorageKey.Local
      );

      if (currentLanguage === language) {
        console.warn("Language is not changed.");
        return;
      }
    } catch (e) {
      // Nothing to do, Continue the process.
    }

    // Set the local config to local storage
    LocalStorageProvider.instance.setItem(LocalStorageKey.Local, language);

    // Broadcast the update throughout the app.
    EventBusFactory.instance.eventBus.emit(Event.LocaleConfigUpdate, language);
  }

  public static get instance(): LocalConfigProvider {
    if (!LocalConfigProvider._instance) {
      LocalConfigProvider._instance = new LocalConfigProvider();
    }
    return LocalConfigProvider._instance;
  }

  public updateAppTitle() {
    const displayTitle = router.currentRoute.value.meta.displayTitle;
    if (displayTitle) {
      const { t } = I18nManager.instance.i18n.global;
      document.title =
        (t as (value: string) => string)(displayTitle) +
        " | " +
        ConfigProvider.instance.config.VITE_APP_TITLE;
    }
  }
}

LocalConfigProvider.instance;

export { LocalConfigProvider };
