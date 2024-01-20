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

    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="20">
      <v-card-item>
        <v-card-title> Task Detail for : 1231214124 </v-card-title>
        <v-card-subtitle>
          Status:

          <StatusChip
            status="distributed"
            :decorator-composable="useTaskStatusDecorator"
          ></StatusChip>
        </v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="7">
      <v-card-item>
        <v-card-title> Task Log </v-card-title>
      </v-card-item>
      <v-table fixed-header height="750px">
        <thead>
          <tr>
            <th class="text-left">Type</th>
            <th class="text-left">Severity</th>
            <th class="text-left">Parameters</th>
            <th class="text-left">Message</th>
            <th class="text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 100" :key="item">
            <td>Distribution Log</td>
            <td>INFO</td>
            <td>{"nodeID": "abcd"}</td>
            <td>Successfully Distributed to node</td>
            <td>1212412412</td>
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
  name: "TaskDetailView",
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
