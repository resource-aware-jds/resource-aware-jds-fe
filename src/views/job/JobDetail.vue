<template>
  <div>
    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="20">
      <v-card-item>
        <v-card-title> Job Detail for: 1231214124 </v-card-title>
        <v-card-subtitle>
          Status:

          <StatusChip
            status="created"
            :decorator-composable="useJobStatusDecorator"
          ></StatusChip>
        </v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="7">
      <v-table fixed-header height="750px">
        <thead>
          <tr>
            <th class="text-left">TaskID</th>
            <th class="text-left">Task Status</th>
            <th class="text-left">Distributed Node ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 100" :key="item">
            <td>49c42fa6-a5c3-4d5e-8bda-c934ae35aefe</td>
            <td>
              <StatusChip
                status="distributed"
                :decorator-composable="useTaskStatusDecorator"
              ></StatusChip>
            </td>
            <td>a518a5e0-b77d-11ee-a506-0242ac120002</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StatusChip from "@/components/statuschip/StatusChip.vue";
import { useJobStatusDecorator } from "@/components/statuschip/useJobStatusDecorator";
import { useTaskStatusDecorator } from "@/components/statuschip/useTaskStatusDecorator";

export default defineComponent({
  name: "JobDetailView",
  components: {
    StatusChip,
  },
  setup() {
    return {
      useJobStatusDecorator,
      useTaskStatusDecorator,
    };
  },
});
</script>
