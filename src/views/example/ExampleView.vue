<template>
  <div class="p-3 overflow-y-scroll text-left gap-2">
    <v-card class="rounded-xl" variant="outlined">
      <v-card-title>Job Status</v-card-title>
      <v-card-text>
        <div class="gap-4 flex flex-col justify-left">
          <StatusChip
            v-for="(item, index) in Object.values(JobStatus).filter(
              (v) => !isNaN(Number(v))
            )"
            :key="index"
            :decorator-composable="useJobStatusDecorator"
            :status="item"
            class="w-fit"
          ></StatusChip></div
      ></v-card-text>
    </v-card>
    <v-card class="rounded-xl" variant="outlined">
      <v-card-title>Task Status</v-card-title>
      <v-card-text>
        <div class="gap-4 flex flex-col justify-left">
          <StatusChip
            v-for="(item, index) in Object.values(TaskStatus).filter(
              (v) => !isNaN(Number(v))
            )"
            :key="index"
            :decorator-composable="useTaskStatusDecorator"
            :status="item"
            class="w-fit"
          ></StatusChip></div
      ></v-card-text>
    </v-card>
    <v-card class="rounded-xl" variant="outlined">
      <v-card-title>Node Status</v-card-title>
      <v-card-text>
        <div class="gap-4 flex flex-col justify-left">
          <StatusChip
            v-for="(item, index) in Object.values(NodeStatus).filter(
              (v) => !isNaN(Number(v))
            )"
            :key="index"
            :decorator-composable="useNodeStatusDecorator"
            :status="item"
            class="w-fit"
          ></StatusChip></div
      ></v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StatusChip from "@/components/statuschip/StatusChip.vue";
import { useJobStatusDecorator } from "@/components/statuschip/useJobStatusDecorator";
import { useTaskStatusDecorator } from "@/components/statuschip/useTaskStatusDecorator";
import { useNodeStatusDecorator } from "@/components/statuschip/useNodeStatusDecorator";
import { JobStatus } from "@/models/job/job";
import { TaskStatus } from "@/models/task/task";
import { NodeStatus } from "@/models/node/node";

export default defineComponent({
  name: "ExampleView",
  components: {
    StatusChip,
  },
  setup() {
    return {
      JobStatus,
      TaskStatus,
      NodeStatus,
      useJobStatusDecorator,
      useTaskStatusDecorator,
      useNodeStatusDecorator,
    };
  },
});
</script>
