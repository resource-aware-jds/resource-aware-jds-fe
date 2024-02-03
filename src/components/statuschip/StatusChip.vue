<template>
  <v-chip class="text-ellipsis" :prepend-icon="icon" :color="color">{{
    title
  }}</v-chip>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, watch } from "vue";
import EventBusFactory, { Event } from "@/utils/EventBusFactory";

export type DecoratorComposable = () => {
  icon: Ref<string>;
  color: Ref<string>;
  title: Ref<string>;
  updateStatusValue: (status: string) => void;
};

export default defineComponent({
  name: "StatusChip",
  setup(props) {
    const { icon, color, title, updateStatusValue } =
      props.decoratorComposable();
    updateStatusValue(props.status);

    watch(
      () => props.status,
      (newValue) => {
        updateStatusValue(newValue);
      }
    );

    function updateLocals() {
      updateStatusValue(props.status);
    }

    EventBusFactory.instance.eventBus.on(
      Event.LocaleConfigUpdate,
      updateLocals
    );

    return {
      icon,
      title,
      color,
      updateLocals,
    };
  },
  props: {
    status: {
      type: String as PropType<any>,
      default: "unknown",
    },
    decoratorComposable: {
      type: Function as PropType<DecoratorComposable>,
      required: true,
    },
  },
  beforeUnmount() {
    EventBusFactory.instance.eventBus.off(
      Event.LocaleConfigUpdate,
      this.updateLocals
    );
  },
});
</script>
