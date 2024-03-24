<template>
  <div>
    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="20">
      <v-card-item>
        <v-card-title> Job Detail for: {{ attribute.data.id }} </v-card-title>
        <v-card-subtitle>
          <h2>Name: {{ attribute.data.name }}</h2>
          <h2>
            Image URl:
            {{ attribute.data.imageURL }}
          </h2>
          Status:
          <StatusChip
            :status="attribute.data.status"
            :decorator-composable="useJobStatusDecorator"
          ></StatusChip>
        <v-spacer></v-spacer>
        <v-switch v-model:model-value="attribute.isAutoReload" v-on:update:model-value="toggleAutoReload">        
          <template v-slot:label>
            Auto Reloading every 3s
            <v-progress-circular
              v-if="attribute.isLoading"
              :indeterminate="true"
              class="ms-2"
              size="24"
            ></v-progress-circular>
          </template>
        </v-switch>
        </v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-card class="mx-3 my-4 rounded-xl text-left" elevation="7">
      <v-table fixed-header height="750px">
        <thead>
          <tr>
            <th class="text-left">TaskID</th>
            <th class="text-left">Task Status</th>
            <th class="text-left">Latest Distributed Node ID</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in attribute.data.tasks"
            :key="item.id"
            @click="onClickEachRow(item.id)"
          >
            <td>{{ item.id }}</td>
            <td>
              <StatusChip
                :status="item.status"
                :decorator-composable="useTaskStatusDecorator"
              ></StatusChip>
            </td>
            <td>
              <i v-if="!item.latestDistributedNodeID">No information</i>
              <b v-else>{{ item.latestDistributedNodeID ?? "-" }}</b>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import StatusChip from "@/components/statuschip/StatusChip.vue";
import { useJobStatusDecorator } from "@/components/statuschip/useJobStatusDecorator";
import { useTaskStatusDecorator } from "@/components/statuschip/useTaskStatusDecorator";
import { useGetJobDetail } from "./composable/useGetJobDetail";
import { useRoute } from "vue-router";
import router from "@/router";

export default defineComponent({
  name: "JobDetailView",
  components: {
    StatusChip,
  },
  setup() {
    const route = useRoute();

    const { attribute, toggleAutoReload, clearAutoReload } = useGetJobDetail(route.params.jobID as string);

    function onClickEachRow(taskID: string) {
      router.push({
        name: "task-detail",
        params: {
          jobID: route.params.jobID,
          taskID: taskID,
        },
      });
    }

    onUnmounted(() => {
      clearAutoReload()
    })

    return {
      attribute,
      useJobStatusDecorator,
      useTaskStatusDecorator,
      onClickEachRow,
      toggleAutoReload,
    };
  },
});
</script>
