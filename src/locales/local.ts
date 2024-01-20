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
          jobID: string;
          jobName: string;
          status: string;
          updatedAt: string;
        };
      };
    };
    jobDetail: {
      displayTitle: string;
    };
    taskDetail: {
      displayTitle: string;
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
      node: {
        title: string;
        items: {
          nodeList: string;
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
  status: {
    jobStatus: {
      created: string;
      distributing: string;
      done: string;
      unknown: string;
    };
    taskStatus: {
      created: string;
      distributed: string;
      done: string;
      unknown: string;
    };
    nodeStatus: {
      offline: string;
      online: string;
      unknown: string;
    };
  };
}
