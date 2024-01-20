<template>
  <div class="py-5">
    <div class="text-h6 font-weight-bold">
      <p v-if="!localization">{{ title }}</p>
      <p v-else>{{ t(title) }}</p>
    </div>
    <div v-if="subtitle" class="pt-2 text-subtitle-1">
      <p v-if="!localization">{{ subtitle }}</p>
      <p v-else>{{ t(subtitle) }}</p>
    </div>
    <div class="py-4">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLocale } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "SettingItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    localization: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useLocale();

    return {
      t,
    };
  },
});
</script>
