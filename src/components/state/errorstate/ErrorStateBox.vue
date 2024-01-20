<template>
  <StateBox
    :icon="attributes.icon"
    :color="attributes.iconColor"
    :title="attributes.title"
    :subtitle="attributes.subTitle"
  ></StateBox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StateBox from "../StateBox.vue";
import { PropType } from "vue";
import { reactive } from "vue";
import {
  BaseErrorMessageHandler,
  ErrorMessageHandler,
} from "./errorhandler/errorMessageHandler";

export default defineComponent({
  name: "ErrorStateBox",
  components: {
    StateBox,
  },
  setup(props) {
    const attributes = reactive({
      icon: "",
      iconColor: "",
      title: "",
      subTitle: "",
    });

    const result = ErrorMessageHandler.instance.handle(
      props.errorMessageHandlerSequence,
      props.errorInstance
    );

    // Set the result to the attributes and set the default value if the value is not defined.
    attributes.icon = result.icon;
    attributes.iconColor = result.iconColor ?? "warning";
    attributes.title = result.title;
    attributes.subTitle = result.subTitle ?? "";

    return {
      attributes,
    };
  },
  props: {
    errorInstance: {
      type: Object,
      required: true,
    },
    errorMessageHandlerSequence: {
      type: Array as PropType<Array<BaseErrorMessageHandler>>,
      required: true,
      default: () => [],
    },
  },
});
</script>
