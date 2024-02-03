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
            <th class="text-left">Latest Distributed Node ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in attribute.data.tasks" :key="item.id">
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
import { defineComponent } from "vue";
import StatusChip from "@/components/statuschip/StatusChip.vue";
import { useJobStatusDecorator } from "@/components/statuschip/useJobStatusDecorator";
import { useTaskStatusDecorator } from "@/components/statuschip/useTaskStatusDecorator";
import { useGetJobDetail } from "./composable/useGetJobDetail";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobDetailView",
  components: {
    StatusChip,
  },
  setup() {
    const route = useRoute();

    const { attribute } = useGetJobDetail(route.params.jobID as string);

    return {
      attribute,
      useJobStatusDecorator,
      useTaskStatusDecorator,
    };
  },
});
</script>
