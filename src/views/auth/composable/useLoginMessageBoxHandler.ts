import { SignoutReason } from "@/models/authentication/authentication";
import { reactive, ref } from "vue";
import { SignInError, SignInErrorCode } from "./useLoginProvider";
import { useLocale } from "vuetify/lib/framework.mjs";

export function useLoginMessageBoxHandler() {
  const messageBoxAttributes = reactive({
    text: "",
    icon: "",
    type: "info" as "error" | "success" | "warning" | "info" | undefined,
  });
  const isShown = ref(false);
  const { t } = useLocale();
  let textTranslationObj: () => string = () => "";

  function handleReason(reason: SignoutReason) {
    switch (reason) {
      case SignoutReason.Signout:
        messageBoxAttributes.icon = "mdi-information";
        messageBoxAttributes.type = "info";
        textTranslationObj = () => t("page.login.messageBox.signedOut");
        break;
      case SignoutReason.Timeout:
        messageBoxAttributes.icon = "mdi-alert";
        messageBoxAttributes.type = "warning";
        textTranslationObj = () => t("page.login.messageBox.sessionTimeout");
        break;
      default:
        return;
    }
    renderText();
    isShown.value = true;
  }

  function handleError(e: any) {
    if (e === null) {
      return;
    }

    if (!(e instanceof SignInError)) {
      messageBoxAttributes.icon = "mdi-alert";
      textTranslationObj = () => t("page.login.messageBox.unknownSignInError");
      messageBoxAttributes.type = "warning";
      return;
    }

    switch (e.code) {
      case SignInErrorCode.FailedToGetIDToken:
        break;
    }
    renderText();
    isShown.value = true;
  }

  function renderText() {
    messageBoxAttributes.text = textTranslationObj();
  }

  return {
    messageBoxAttributes,
    isShown,
    handleReason,
    handleError,
    renderText,
  };
}
