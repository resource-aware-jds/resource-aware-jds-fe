<template>
  <div class="p-3 overflow-y-scroll text-left gap-2">
    <v-card class="rounded-xl" variant="outlined">
      <v-card-title>Job Status</v-card-title>
      <v-card-text>
        <div class="gap-4 flex flex-col justify-left"></div
      ></v-card-text>
    </v-card>
    <v-card class="rounded-xl" variant="outlined">
      <v-card-title>Job Detail Status</v-card-title>
      <v-card-text>
        <div class="gap-4 flex flex-col justify-left"></div
      ></v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ExampleView",
  components: {},
  setup() {
    return {};
  },
});
</script>
