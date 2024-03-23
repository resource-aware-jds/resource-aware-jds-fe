<template>
  <div>
    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="20">
      <v-card-item>
        <v-card-title> Task Detail for : {{ attribute.data.id }} </v-card-title>
        <v-card-subtitle>
          <h2 v-if="attribute.data.latestDistributedNodeID">
            Latest Distributed Node ID:
            {{ attribute.data.latestDistributedNodeID }}
          </h2>

          <h2>
            Job ID:
            {{ attribute.data.jobID }}
          </h2>
          <h2>
            Image URL:
            {{ attribute.data.imageURL }}
          </h2>
          Status:
          <StatusChip
            :status="attribute.data.status"
            :decorator-composable="useTaskStatusDecorator"
          ></StatusChip>

          <v-textarea
            label="Task Attributes"
            v-model:model-value="attribute.taskAttribute"
            disabled
          >
          </v-textarea>
        </v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="7">
      <v-card-item>
        <v-card-title> Task Distribution Log </v-card-title>
      </v-card-item>
      <v-table fixed-header height="400px">
        <thead>
          <tr>
            <th class="text-left">Severity</th>
            <th class="text-left">Parameters</th>
            <th class="text-left">Message</th>
            <th class="text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in attribute.data.logs" :key="index">
            <td>
              <div v-if="item.severity === 'info'" class="flex-row-1">
                <v-tooltip text="Info" location="start">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      icon="mdi-information"
                      color="blue"
                      v-bind="props"
                    ></v-icon>
                  </template>
                </v-tooltip>
              </div>
              <div v-if="item.severity === 'error'" class="flex-row-1">
                <v-tooltip text="Error" location="start">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      icon="mdi-alert-decagram"
                      color="red"
                      v-bind="props"
                    ></v-icon>
                  </template>
                </v-tooltip>
              </div>
              <div v-if="item.severity === 'warn'" class="flex-row-1">
                <v-tooltip text="Warn" location="start">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      icon="mdi-alert"
                      color="yellow"
                      v-bind="props"
                    ></v-icon>
                  </template>
                </v-tooltip>
              </div>
            </td>
            <td>{{ item.parameters }}</td>
            <td>{{ item.message }}</td>
            <td>
              <DateTime :value="item.timestamp"></DateTime>
            </td>
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
import { useGetTaskDetail } from "./composable/useGetTaskDetail";
import { useRoute } from "vue-router";
import DateTime from "@/components/DateTime.vue";

export default defineComponent({
  name: "TaskDetailView",
  components: {
    StatusChip,
    DateTime,
  },
  setup() {
    const route = useRoute();
    const { attribute } = useGetTaskDetail(route.params.taskID as string);

    return {
      attribute,
      useJobStatusDecorator,
      useTaskStatusDecorator,
    };
  },
});
</script>
