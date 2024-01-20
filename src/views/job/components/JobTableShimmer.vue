<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th v-for="(item, index) in headers" :key="index" class="text-left">
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in Array(10)" :key="item">
        <td v-for="i in 3" :key="i">
          <div class="h-3">
            <Shimmer class="rounded-xl"></Shimmer>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Shimmer from "@/components/shimmer/Shimmer.vue";
import { TableHeader } from "../composable/useSearchableDataTable";

export default defineComponent({
  name: "JobTableShimmer",
  components: {
    Shimmer,
  },
  props: {
    headers: {
      type: Object as PropType<Array<TableHeader>>,
      required: true,
    },
  },
});
</script>
