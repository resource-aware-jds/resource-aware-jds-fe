import axios from "axios";
import {
  ErrorDecoration,
  BaseErrorMessageHandler,
} from "./errorMessageHandler";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
import { I18nManager } from "@/locales/facade";

export class AxiosErrorMessageHandler implements BaseErrorMessageHandler {
  private static _instance: AxiosErrorMessageHandler;

  private constructor() {}

  handle(e: any): ErrorDecoration | null {
    if (!axios.isAxiosError(e)) {
      return null;
    }

    const t = I18nManager.instance.i18n.global.t as (
      ...params: any[]
    ) => string;

    switch (e.response?.status) {
      case HttpStatusCode.ClientErrorNotFound:
        return {
          icon: "mdi-help-circle",
          iconColor: "grey",
          title: t("error.http.statusNotFound.title"),
          subTitle: t("error.http.statusNotFound.subTitle"),
        };
      case HttpStatusCode.ServerErrorBadGateway:
      case HttpStatusCode.ServerErrorInternal:
      case HttpStatusCode.ServerErrorGatewayTimeout:
        return {
          icon: "$warning",
          title: t("error.http.statusServerError.title"),
          subTitle: t("error.http.statusServerError.subTitle"),
        };
      default:
        return {
          icon: "$warning",
          title: t("error.http.statusUnknown.title"),
          subTitle: t("error.http.statusUnknown.subTitle", [
            e.response?.status,
          ]),
        };
    }
  }

  public static get instance(): AxiosErrorMessageHandler {
    if (!AxiosErrorMessageHandler._instance) {
      AxiosErrorMessageHandler._instance = new AxiosErrorMessageHandler();
    }
    return AxiosErrorMessageHandler._instance;
  }
}
