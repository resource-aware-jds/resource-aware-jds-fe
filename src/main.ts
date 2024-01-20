import { createApp } from "vue";
import App from "./App.vue";
import router, { RouterObserver } from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as nativeComponent from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "@/styles/style.css";
import { VDataTable } from "vuetify/labs/VDataTable";
import { Layout } from "@/layouts/layout";
import MainLayout from "@/layouts/main_layout/MainLayout.vue";
import EventBusFactory, { Event } from "./utils/EventBusFactory";
import SecretProvider from "./utils/SecretProvider";
import StartupUtil from "./utils/startup/StartupUtil";
import { ConfigProvider } from "./utils/ConfigProvider";
import NonLayout from "@/layouts/non_layout/NonLayout.vue";
import { useI18n } from "vue-i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { LocalConfigProvider } from "./utils/setting/LocalConfigProvider";
import { I18nManager } from "@/locales/facade";
import RepositoryFactory from "./repository/repositoryFactory";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const i18n = I18nManager.instance.i18n;
const vuetify = createVuetify({
  components: {
    VDataTable,
    ...nativeComponent,
  },
  directives,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);

// Subscribe to all mandatory/global event.
EventBusFactory.instance.eventBus.on(
  Event.Signin,
  SecretProvider.instance.onSignin
);
EventBusFactory.instance.eventBus.on(
  Event.Signoff,
  SecretProvider.instance.onSignoff
);
EventBusFactory.instance.eventBus.on(
  Event.Signoff,
  RouterObserver.instance.onSignoff
);
EventBusFactory.instance.eventBus.on(
  Event.LocaleConfigUpdate,
  LocalConfigProvider.instance.updateAppTitle
);
EventBusFactory.instance.eventBus.on(
  Event.LocaleConfigUpdate,
  RepositoryFactory.instance.onUpdateLocale
);
StartupUtil.instance.run();

// Create Vue Application
app
  .use(store)
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(VCalendar)
  .component(Layout.MainLayout, MainLayout)
  .component(Layout.NonLayout, NonLayout)
  .mount("#app");
