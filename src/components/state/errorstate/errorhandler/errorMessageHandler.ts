export interface ErrorDecoration {
  icon: string;
  iconColor?: string;
  title: string;
  subTitle?: string;
}

export abstract class BaseErrorMessageHandler {
  abstract handle(error: any): ErrorDecoration | null;
}

export class ErrorMessageHandler {
  private static _instance: ErrorMessageHandler;

  public handle(
    messageHandlerSequence: Array<BaseErrorMessageHandler>,
    e: any
  ): ErrorDecoration {
    for (let i = 0; i < messageHandlerSequence.length; i++) {
      const result = messageHandlerSequence[i].handle(e);

      if (result) {
        return result;
      }
    }
    return {
      icon: "$warning",
      iconColor: "warning",
      title: "Unknown error occurred",
      subTitle:
        "An unknown error occurred. Please contact system administrator to resolve this problem.",
    };
  }

  public static get instance(): ErrorMessageHandler {
    if (!ErrorMessageHandler._instance) {
      ErrorMessageHandler._instance = new ErrorMessageHandler();
    }
    return ErrorMessageHandler._instance;
  }
}
