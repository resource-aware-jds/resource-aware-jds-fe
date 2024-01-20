<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <v-card
      class="h-fit w-2/6 min-w-fit min-h-fit p-10 rounded-3xl flex flex-col gap-5"
    >
      <div>
        <div class="text-h4 font-weight-bold">
          {{ t("layout.header.title") }}
        </div>
        <div>{{ t("page.login.description") }}</div>
        <div class="mt-4">
          <message-box
            v-if="isShown"
            :controller="messageBoxAttributes"
          ></message-box>
        </div>
      </div>
      <div class="h-full flex flex-col inters-cente justify-center">
        <div class="my-3">
          <email-and-password-input
            :on-submit="loginWithEmailAndPassword"
          ></email-and-password-input>
        </div>
        <div
          v-if="isShowGoogleSignInFlag"
          class="flex flex-row my-3 justify-center items-center gap-4"
        >
          <v-divider thickness="2"></v-divider>
          or
          <v-divider thickness="2"></v-divider>
        </div>
      </div>
      <div class="flex flex-row justify-end">
        <language-switcher></language-switcher>
      </div>
    </v-card>

    <v-dialog
      v-model="attributes.isLoading"
      :close-on-back="false"
      :close-on-content-click="false"
      :persistent="true"
      width="auto"
    >
      <v-card class="m-4">
        <v-card-text>
          <div class="flex flex-col justify-center items-center gap-6">
            <v-progress-circular
              indeterminate
              :size="48"
              :width="8"
            ></v-progress-circular>
            {{ t("page.login.loading.signingIn") }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useLoginProvider } from "./composable/useLoginProvider";
import router from "@/router/index";
import { SignoutReason } from "@/models/authentication/authentication";
import EmailAndPasswordInput from "./components/EmailAndPasswordInput.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import MessageBox from "@/components/messagebox/MessageBox.vue";
import { IsUserLoggedIn } from "@/utils/IsUserLoggedIn";
import { useLocale } from "vuetify/lib/framework.mjs";
import { useLoginMessageBoxHandler } from "./composable/useLoginMessageBoxHandler";
import { watch } from "vue";
import EventBusFactory, { Event } from "@/utils/EventBusFactory";

export default defineComponent({
  name: "LoginView",
  components: {
    EmailAndPasswordInput,
    LanguageSwitcher,
    MessageBox,
  },
  setup() {
    const isShowGoogleSignInFlag = ref(false);
    const { attributes, loginWithEmailAndPassword } = useLoginProvider();
    const { t } = useLocale();
    const {
      messageBoxAttributes,
      isShown,
      renderText,
      handleReason,
      handleError,
    } = useLoginMessageBoxHandler();

    const reasonFromReq = Number.parseInt(
      router.currentRoute.value.query.reason?.toString() ?? "0"
    ) as SignoutReason;

    if (reasonFromReq != 0) {
      handleReason(reasonFromReq);
    }

    onMounted(async () => {
      // Feature GoogleSignInButton Flag
      isShowGoogleSignInFlag.value = false;
    });

    async function checkIsLoggedIn() {
      if (await IsUserLoggedIn()) {
        router.replace({ name: "dashboard" });
      }
    }

    EventBusFactory.instance.eventBus.on(Event.LocaleConfigUpdate, renderText);

    watch(attributes.error, () => {
      if (!attributes.error.isError) {
        isShown.value = false;
        return;
      }
      handleError(attributes.error.instance);
    });

    checkIsLoggedIn();

    return {
      isShowGoogleSignInFlag,
      attributes,
      messageBoxAttributes,
      isShown,
      t,
      loginWithEmailAndPassword,
      renderText,
    };
  },

  beforeUnmount() {
    EventBusFactory.instance.eventBus.off(
      Event.LocaleConfigUpdate,
      this.renderText
    );
  },
});
</script>
