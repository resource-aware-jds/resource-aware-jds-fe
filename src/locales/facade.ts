import en from "./en";
import { I18n, createI18n } from "vue-i18n";
import { LocalConfigProvider } from "@/utils/setting/LocalConfigProvider";

// Load the localization config from the LocalStorage

const messages = {
  en: en,
};

class I18nManager {
  private static _instance: I18nManager;
  private _i18nInstance: I18n;

  private constructor() {
    this._i18nInstance = createI18n({
      legacy: false, // Vuetify does not support the legacy mode of vue-i18n
      locale: LocalConfigProvider.instance.getConfig(),
      fallbackLocale: "en",
      messages,
    }) as I18n;
  }

  public get i18n(): I18n {
    return this._i18nInstance;
  }

  public static get instance(): I18nManager {
    if (!this._instance) {
      this._instance = new I18nManager();
    }
    return this._instance;
  }
}

export { I18nManager, messages };
