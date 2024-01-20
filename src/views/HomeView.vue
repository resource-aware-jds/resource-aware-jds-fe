<template>
  <div class="home h-full overflow-y-scroll"></div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    router.replace({ name: "job-list" });
  },
});
</script>
