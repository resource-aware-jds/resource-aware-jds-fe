<template>
  <v-alert
    :icon="controller.icon"
    :text="controller.text"
    :type="controller.type"
    :closable="closable"
    @click:close="onClose"
  ></v-alert>
</template>

<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import { MessageBoxController } from "./types";

export default defineComponent({
  name: "MessageBox",
  props: {
    controller: {
      type: Object as PropType<MessageBoxController>,
      required: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
  },
});
</script>
