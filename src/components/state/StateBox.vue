<template>
  <div>
    <v-icon :icon="icon" class="text-h3" size="x-large" :color="color"></v-icon>
    <div class="pt-5">
      <h1 class="text-h5 font-weight-bold">{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StateBox",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    icon: {
      type: String,
      default: "$warning",
    },
    color: {
      type: String,
      default: "warning",
    },
  },
});
</script>
