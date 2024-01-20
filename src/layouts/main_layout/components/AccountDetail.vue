<template>
  <v-list class="w-[20vw] !bg-google-account-grey">
    <v-list-item class="w-full justify-center">
      <image-with-shimmer
        v-if="!userProfileAttribute.isLoading"
        :src="userProfileAttribute.profile.profileImage"
        fallback-icon="mdi-account"
      ></image-with-shimmer>
      <shimmer v-else></shimmer>
    </v-list-item>
    <v-list-item class="justify-center">
      {{ userProfileAttribute.profile.displayName }}
    </v-list-item>
    <v-list-item class="justify-center w-full inline-text">
      <v-icon class="mr-2" icon="mdi-email"></v-icon
      >{{ userProfileAttribute.profile.email }}
    </v-list-item>
    <v-list-item class="justify-center">
      <v-btn
        prepend-icon="mdi-account-arrow-left-outline"
        color="red"
        rounded="full"
        class="w-full"
        @click="onClickSignout"
      >
        {{ t("layout.accountDetail.signOutButton") }}
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserProfile } from "@/layouts/main_layout/composable/useUserProfile";
import ImageWithShimmer from "@/components/shimmer/ImageWithShimmer.vue";
import Shimmer from "@/components/shimmer/Shimmer.vue";
import { useLocale } from "vuetify/lib/framework.mjs";
export default defineComponent({
  name: "AccountDetail",
  components: {
    ImageWithShimmer,
    Shimmer,
  },
  setup() {
    const { userProfileAttribute } = useUserProfile();
    const { t } = useLocale();

    return {
      userProfileAttribute,
      t,
    };
  },
  props: {
    onClickSignout: {
      type: Function,
      default: () => {},
    },
  },
});
</script>
