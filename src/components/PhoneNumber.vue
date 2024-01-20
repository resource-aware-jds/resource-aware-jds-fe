<template>
  <div>(+{{ countryCode ?? "?" }}) {{ phoneNumberDisplay }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "PhoneNumber",
  setup(props) {
    const phoneNumberDisplay = computed(() => {
      if (!props.value) {
        return "Unknown";
      }
      if (props.value.length != 10) {
        return props.value;
      }
      return `${props.value.substring(0, 3)}-${props.value.substring(
        3,
        6
      )}-${props.value.substring(6)}`;
    });
    return {
      phoneNumberDisplay,
    };
  },
  props: {
    value: {
      type: String,
      default: "Unknown",
      required: true,
    },
    countryCode: {
      type: String,
    },
  },
});
</script>
