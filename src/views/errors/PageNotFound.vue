<template>
  <div class="h-full flex justify-center items-center">
    <state-box
      title="404 Page Not found."
      subtitle="Please check your route again."
    ></state-box>
    <v-snackbar v-model="showSnackBar" timeout="5000" color="warning">
      <v-icon icon="$warning" size="x-large"></v-icon>
      Sorry, The page you tried to reach is not found.
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StateBox from "@/components/state/StateBox.vue";

export default defineComponent({
  name: "PageNotFound",
  components: {
    StateBox,
  },
  setup() {
    const showSnackBar = ref(true);

    return {
      showSnackBar,
    };
  },
});
</script>
