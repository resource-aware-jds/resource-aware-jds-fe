import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PageNotFound from "@/views/errors/PageNotFound.vue";
import SettingView from "@/views/settings/SettingView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import { Layout } from "@/layouts/layout";
import { SignoutReason } from "@/models/authentication/authentication";
import { RouteLocationRaw } from "vue-router";
import { LocalConfigProvider } from "@/utils/setting/LocalConfigProvider";
import JobListVue from "@/views/job/JobList.vue";
import ExampleViewVue from "@/views/example/ExampleView.vue";
import JobDetailVue from "@/views/job/JobDetail.vue";
import TaskDetailVue from "@/views/job/TaskDetail.vue";
import CreateJobVue from "@/views/job/CreateJob.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      layout: Layout.NonLayout,
      requiresAuth: false,
    },
  },
  {
    path: "/job",
    name: "job-list",
    component: JobListVue,
    meta: {
      displayTitle: "page.jobList.displayTitle",
    },
  },
  {
    path: "/job/detail/:jobID",
    name: "job-detail",
    component: JobDetailVue,
    meta: {
      displayTitle: "page.jobDetail.displayTitle",
    },
  },
  {
    path: "/job/detail/:jobID/task/:taskID",
    name: "task-detail",
    component: TaskDetailVue,
    meta: {
      displayTitle: "page.taskDetail.displayTitle",
    },
  },
  {
    path: "/job/create",
    name: "create-job",
    component: CreateJobVue,
    meta: {
      displayTitle: "page.createJob.displayTitle",
    },
  },
  {
    path: "/example",
    name: "example",
    component: ExampleViewVue,
    meta: {
      displayTitle: "Exmple",
    },
  },
  {
    path: "/setting",
    name: "setting",
    component: SettingView,
    meta: {
      displayTitle: "Setting",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async () => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  // if (to.meta.requiresAuth ?? true) {
  // }
});

router.afterEach(async () => {
  // Set the page title based on the displayTitle value.
  LocalConfigProvider.instance.updateAppTitle();
});

export class RouterObserver {
  private static _instance: RouterObserver;

  public static get instance(): RouterObserver {
    if (!RouterObserver._instance) {
      RouterObserver._instance = new RouterObserver();
    }
    return RouterObserver._instance;
  }

  public onSignoff(reason?: SignoutReason) {
    const routeLocation: RouteLocationRaw = {
      name: "login",
    };
    if (!reason) {
      router.replace(routeLocation);
      return;
    }

    routeLocation.query = { reason: reason };
    if (reason == SignoutReason.Signout) {
      router.replace(routeLocation);
      return;
    }

    routeLocation.query.redirect = router.currentRoute.value.fullPath;
    router.replace(routeLocation);
  }
}

export default router;
