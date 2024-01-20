<template>
  <div class="flex flex-row">
    <div>{{ title }}:</div>
    <div class="ml-2 text-zinc-400"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextTitleDetail",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
