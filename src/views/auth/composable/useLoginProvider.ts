import { reactive } from "vue";
import router from "@/router";
import { RouteLocationRaw } from "vue-router";

export function useLoginProvider() {
  const attributes = reactive({
    isLoading: false,
    error: {
      isError: false,
      instance: {} as any | null,
    },
  });

  function clearError() {
    attributes.error.isError = false;
    attributes.error.instance = null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setError(e: any) {
    attributes.error.isError = true;
    attributes.error.instance = e;
    attributes.isLoading = false;
  }

  async function singUserIn() {
    // Route user back to where they were redirected from or to dashboard insted.
    const currentRoute = router.currentRoute;
    let routeLocation: RouteLocationRaw;

    if (currentRoute.value.query.redirect) {
      routeLocation = {
        path: currentRoute.value.query.redirect?.toString(),
      };
    } else {
      routeLocation = {
        name: "dashboard",
      };
    }
    router.replace(routeLocation);

    // Clear the loading state
    attributes.isLoading = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function loginWithEmailAndPassword(email: string, password: string) {
    clearError();
    attributes.isLoading = true;

    await singUserIn();
  }

  return {
    attributes,
    clearError,
    loginWithEmailAndPassword,
  };
}

export enum SignInErrorCode {
  FailedToGetIDToken = 0,
}
export class SignInError extends Error {
  private _code: SignInErrorCode;
  private _instance: any;

  constructor(code: SignInErrorCode, instance: any) {
    super();
    this._code = code;
    this._instance = instance;
  }

  public get code(): SignInErrorCode {
    return this._code;
  }

  public get instance(): any {
    return this._instance;
  }
}
