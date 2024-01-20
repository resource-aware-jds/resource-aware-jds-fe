<template>
  <div>
    <v-table fixed-header>
      <thead>
        <tr>
          <th v-for="(item, index) in headers" :key="index" class="text-left">
            {{ item.title }}
          </th>
        </tr>
      </thead>
    </v-table>
    <div class="flex-col justify-centers">
      <error-state-box
        class="pt-5"
        :error-instance="errorInstance"
        :error-message-handler-sequence="[AxiosErrorMessageHandler.instance]"
      ></error-state-box>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { TableHeader } from "../composable/useSearchableDataTable";
import ErrorStateBox from "@/components/state/errorstate/ErrorStateBox.vue";
import { AxiosErrorMessageHandler } from "@/components/state/errorstate/errorhandler/axiosErrorMessageHandler";

export default defineComponent({
  name: "JobTableError",
  components: {
    ErrorStateBox,
  },
  setup() {
    return {
      AxiosErrorMessageHandler,
    };
  },
  props: {
    headers: {
      type: Object as PropType<Array<TableHeader>>,
      required: true,
    },
    errorInstance: {
      type: Object as any,
      required: true,
      default: () => ({}),
    },
  },
});
</script>
