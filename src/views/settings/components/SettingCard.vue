<template>
  <v-card
    class="rounded-xl px-5 py-2 my-5"
    :prepend-icon="icon"
    :title="title"
    variant="outlined"
  >
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "mdi-setting",
    },
  },
});
</script>
