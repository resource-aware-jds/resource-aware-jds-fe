<template>
  <div v-for="(item, index) in breadcrumbs" :key="item.title">
    <v-breadcrumbs-item @click="navigateToRoute(item.routeName)"
      ><div :class="getBreadcrumbsClass(index < breadcrumbs.length - 1)">
        {{ t(item.title) }}
      </div></v-breadcrumbs-item
    >
    <v-breadcrumbs-divider
      v-if="index < breadcrumbs.length - 1"
      divider="/"
    ></v-breadcrumbs-divider>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { PropType, defineComponent } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export interface BreadcrumbsItem {
  title: string;
  routeName: string;
}

export default defineComponent({
  name: "CustomizedBreadCrumbs",
  props: {
    breadcrumbs: {
      type: Array as PropType<Array<BreadcrumbsItem>>,
      default: () => [],
    },
  },
  setup() {
    const { t } = useLocale();

    function navigateToRoute(name: string) {
      router.replace({ name: name });
    }

    function getBreadcrumbsClass(isEnabled: boolean) {
      if (isEnabled) {
        return "cursor-pointer hover:underline";
      }
      return "text-neutral-500";
    }

    return {
      t,
      navigateToRoute,
      getBreadcrumbsClass,
    };
  },
});
</script>
