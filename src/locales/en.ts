import { Localization } from "./local";
import { en as enDefault } from "vuetify/locale";

const en: Localization = {
  $vuetify: {
    ...enDefault,
  },
  layout: {
    header: {
      title: "Resource Aware Job Distribution",
    },
    navigationItem: {
      dashboard: {
        title: "Dashboard",
        items: {
          home: "Home",
        },
      },
      jobs: {
        title: "Job",
        items: {
          jobList: "Job List",
        },
      },
      setting: {
        title: "Settings",
        items: {
          setting: "Setting",
        },
      },
      node: {
        title: "Node",
        items: {
          nodeList: "Node List",
        },
      },
    },
    accountDetail: {
      signOutButton: "Signout",
    },
    signOutDialogBox: {
      title: "Are you sure?",
      description:
        "You are about to signout from this account. The credential will be removed and you will have to sign in again.",
      actions: {
        yes: "Yes",
        no: "No",
      },
    },
  },
  page: {
    jobList: {
      displayTitle: "Job List",
      table: {
        actionBar: {
          filterStatus: "Filter Status",
          searchPlaceholder: "Search",
          searchButton: "Search",
        },
        headers: {
          jobName: "Job Name",
          status: "Status",
          updatedAt: "Updated At",
        },
      },
    },
    login: {
      description: "Please sign in by using authorized email",
      placeholder: {
        email: "Email",
        password: "Password",
      },
      button: {
        signIn: "SIGN IN",
      },
      messageBox: {
        sessionTimeout: "Session Timeout, Please signin again.",
        signedOut: "Successfully Signed Out.",
        unknownSignInError: "Unknown SignIn Error Occurred.",
        invalidEmailOrPassword: "Invalid Email or Password.",
      },
      loading: {
        signingIn: "Signing you in. Please wait.",
      },
    },
  },
  status: {
    jobStatus: {
      created: "Created",
      distributing: "Distributing",
      done: "Done",
      unknown: "Unknown",
    },
    taskStatus: {
      created: "Created",
      distributed: "Distributed",
      done: "Done",
      unknown: "Unknown",
    },
    nodeStatus: {
      offline: "Offline",
      online: "Online",
      unknown: "Unknown",
    },
  },
  error: {
    http: {
      statusNotFound: {
        title: "Not Found",
        subTitle: "The information you tried to find is not found.",
      },
      statusServerError: {
        title: "An error occurred",
        subTitle:
          "There was an error happen in the server, Please contact server administrator to resolve this problem.",
      },
      statusUnknown: {
        title: "Unknown Request Error",
        subTitle:
          "An unknown request error. Please contact administrator to resolve this problem ({0})",
      },
    },
  },
};

export default en;
