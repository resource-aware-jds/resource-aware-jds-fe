<template>
  <div>{{ dateDisplay }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { TimeConfigProvider } from "@/utils/setting/TimeConfigProvider";
import { PropType } from "vue";

export default defineComponent({
  name: "DateTime",
  setup(props) {
    const dateDisplay = computed(() => {
      if (props.format) {
        return TimeConfigProvider.instance.getDisplayDateTimeWithCustomFormat(
          props.value,
          props.format
        );
      }
      return TimeConfigProvider.instance.getDisplayDateTime(props.value);
    });

    return {
      dateDisplay,
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    format: {
      type: Object as PropType<string | null>,
      default: null,
    },
  },
});
</script>
