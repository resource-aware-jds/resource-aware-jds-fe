import { LocaleMessages } from "vuetify/lib/framework.mjs";

export interface Localization extends LocaleMessages {
  page: {
    login: {
      description: string;
      placeholder: {
        email: string;
        password: string;
      };
      button: {
        signIn: string;
      };
      messageBox: {
        sessionTimeout: string;
        signedOut: string;
        unknownSignInError: string;
        invalidEmailOrPassword: string;
      };
      loading: {
        signingIn: string;
      };
    };
    jobList: {
      displayTitle: string;
      table: {
        actionBar: {
          filterStatus: string;
          searchPlaceholder: string;
          searchButton: string;
        };
        headers: {
          profilePhoto: string;
          name: string;
          phoneNumber: string;
          status: string;
          submitDate: string;
        };
      };
    };
  };
  layout: {
    header: {
      title: string;
    };
    accountDetail: {
      signOutButton: string;
    };
    navigationItem: {
      dashboard: {
        title: string;
        items: {
          home: string;
        };
      };
      jobs: {
        title: string;
        items: {
          jobList: string;
        };
      };
      setting: {
        title: string;
        items: {
          setting: string;
        };
      };
    };
    signOutDialogBox: {
      title: string;
      description: string;
      actions: {
        yes: string;
        no: string;
      };
    };
  };
  error: {
    http: {
      statusNotFound: {
        title: string;
        subTitle: string;
      };
      statusServerError: {
        title: string;
        subTitle: string;
      };
      statusUnknown: {
        title: string;
        subTitle: string;
      };
    };
  };
}
