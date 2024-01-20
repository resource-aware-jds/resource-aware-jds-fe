<template>
  <v-layout>
    <v-app-bar :elevation="0">
      <v-app-bar-title class="text-left">
        <div class="flex flex-row gap-9">
          <div class="flex">{{ t("layout.header.title") }}</div>
          <v-card
            v-if="$router.currentRoute.value.meta.displayTitle"
            variant="outlined"
            class="flex px-2 py-1"
          >
            <div class="text-sm font-light">
              {{ t($router.currentRoute.value.meta.displayTitle) }}
            </div>
          </v-card>
        </div>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- <v-menu
        location="bottom"
        content-class="rounded-xl"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar>
              <image-with-shimmer
                v-if="!userProfileAttribute.isLoading"
                :src="userProfileAttribute.profile.profileImage"
                fallback-icon="mdi-account"
              ></image-with-shimmer>
              <shimmer v-else></shimmer>
            </v-avatar>
          </v-btn>
        </template>
        <account-detail :on-click-signout="onClickSignout"></account-detail>
      </v-menu> -->
    </v-app-bar>

    <v-main>
      <div class="flex">
        <v-card class="flex-0 h-screen rounded-0">
          <v-list lines="one" nav>
            <v-list-group
              v-for="(group, i) in navigationGroupItem"
              :key="i"
              :prepend-icon="group.icon"
              :value="group.title"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :title="t(group.title)"
                ></v-list-item>
              </template>

              <v-list-item
                v-for="(item, i) in group.items"
                :key="i"
                :value="i"
                :title="t(item.title)"
                @click="navigateToRoute(item.name)"
              ></v-list-item>
            </v-list-group>
          </v-list>

          <language-switcher v-if="showMultiLanguageBtn"></language-switcher>
        </v-card>
        <div class="flex-1 mx-4 my-5">
          <div class="flex flex-col h-[87vh]">
            <v-card
              v-if="$router.currentRoute.value.meta.breadcrumbs"
              class="rounded-2xl mb-2 justify-left flex items-center"
            >
              <v-btn
                icon
                size="small"
                class="secondary text-center"
                @click="$router.go(-1)"
              >
                <v-icon class="text-center" icon="mdi-chevron-left"></v-icon>
              </v-btn>

              <customized-bread-crumbs
                :breadcrumbs="$router.currentRoute.value.meta.breadcrumbs"
              ></customized-bread-crumbs>
            </v-card>

            <v-card class="flex rounded-2xl h-full">
              <div class="h-full w-full">
                <slot></slot>
              </div>
            </v-card>
          </div>
        </div>
      </div>
      <dialogbox :attribute="dialogBoxAttribute"></dialogbox>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref } from "vue";
import { Layout } from "@/layouts/layout";
import ImageWithShimmer from "@/components/shimmer/ImageWithShimmer.vue";
import CustomizedBreadCrumbs from "./components/CustomizedBreadCrumbs.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import Shimmer from "@/components/shimmer/Shimmer.vue";
import AccountDetail from "./components/AccountDetail.vue";
import { useUserProfile } from "./composable/useUserProfile";
import Dialogbox from "@/components/dialogbox/Dialogbox.vue";
import { useDialogBox } from "@/components/dialogbox/composable/useDialogBox";
import EventBusFactory, { Event } from "@/utils/EventBusFactory";
import { SignoutReason } from "@/models/authentication/authentication";
import { useLocale } from "vuetify/lib/framework.mjs";
import {
  useNavigationItems,
  NavigationGroup,
} from "./composable/useNavigationItems";
import { onMounted } from "vue";

export default defineComponent({
  name: Layout.MainLayout,
  components: {
    ImageWithShimmer,
    CustomizedBreadCrumbs,
    Shimmer,
    AccountDetail,
    Dialogbox,
    LanguageSwitcher,
  },
  setup() {
    const navigationGroupItem = ref<Array<NavigationGroup>>([]);
    const { userProfileAttribute } = useUserProfile();
    const { t } = useLocale();
    const showMultiLanguageBtn = ref(false);

    const { dialogBoxAttribute, dismissDialogBox, showDialogBox } =
      useDialogBox();

    function navigateToRoute(name: string) {
      router.replace({ name: name });
    }

    function onClickSignout() {
      showDialogBox(
        {
          title: t("layout.signOutDialogBox.title"),
          detail: t("layout.signOutDialogBox.description"),
        },
        [
          {
            title: t("layout.signOutDialogBox.actions.yes"),
            color: "red",
            onClick: () => {
              EventBusFactory.instance.eventBus.emit(
                Event.Signoff,
                SignoutReason.Signout
              );
              dismissDialogBox();
            },
          },
          {
            title: t("layout.signOutDialogBox.actions.no"),
            color: "grey",
            onClick: () => {
              dismissDialogBox();
            },
          },
        ],
        true
      );
    }

    onMounted(async () => {
      const navigationGroup = await useNavigationItems();
      navigationGroupItem.value = navigationGroup;

      // Feature MultiLanguageBtn Flag
      showMultiLanguageBtn.value = true;
    });

    return {
      navigationGroupItem,
      userProfileAttribute,
      dialogBoxAttribute,
      t,
      navigateToRoute,
      onClickSignout,
      dismissDialogBox,
      showMultiLanguageBtn,
    };
  },
});
</script>
