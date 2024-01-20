<template>
  <div class="h-full w-full grid grid-rows-jobGrid">
    <!-- Searching Area -->
    <div class="p-3 mx-5 rounded-md text-right">
      <v-btn class="rounded-xl mt-4" prepend-icon="mdi-plus">Create Job</v-btn>
      <!-- <v-form class="flex flex-row w-full" @submit="search">
        <div class="w-fit min-w-[10%] pt-3">
          <v-select
            clearable
            v-model:model-value="tableAttributes.filters.filterModel"
            :items="tableAttributes.filters.filterList"
            item-title="name"
            item-value="id"
            variant="plain"
          >
            <template v-slot:label>
              {{ t("page.jobList.table.actionBar.filterStatus") }}
            </template>
            <template v-slot:selection="{ item }">
              <status-chip
                :status="item.value"
                :decorator-composable="useJobStatusDecorator"
              ></status-chip>
            </template>
            <template v-slot:item="{ item, props }">
              <v-list-item @click="props.onClick">
                <status-chip
                  :status="item.value"
                  :decorator-composable="useJobStatusDecorator"
                ></status-chip>
              </v-list-item>
            </template>
          </v-select>
        </div>
        <v-card-text class="w-fit">
          <v-text-field
            :loading="tableAttributes.isLoading"
            density="compact"
            variant="solo"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="search"
            v-on:keyup.enter="search"
            v-model:model-value="tableAttributes.search.txtSearch"
          >
            <template v-slot:label>
              {{ t("page.jobList.table.actionBar.searchPlaceholder") }}
            </template>
          </v-text-field>
        </v-card-text>
        <div class="pt-5 w-fit">
          <v-btn @click="search">{{
            t("page.jobList.table.actionBar.searchButton")
          }}</v-btn>
        </div>
      </v-form> -->
    </div>

    <!-- Shimmer Table -->
    <job-table-shimmer
      height="100%"
      :headers="tableData.header"
      v-if="tableAttributes.isLoading && !tableAttributes.error.isError"
    ></job-table-shimmer>

    <!-- Error Table -->
    <job-table-error
      v-if="!tableAttributes.isLoading && tableAttributes.error.isError"
      height="100%"
      :headers="tableData.header"
      :error-instance="tableAttributes.error.errorInstance"
    ></job-table-error>

    <!-- Actual Data Table -->
    <v-data-table
      class="overflow-y-scroll"
      height="100%"
      v-if="!tableAttributes.isLoading && !tableAttributes.error.isError"
      v-model:sort-by="tableAttributes.sortBy"
      :headers="tableData.header"
      :items="tableData.items"
      fixed-header
      :items-per-page="tableAttributes.pagination.pageSize"
      hide-default-footer
      @click:row="onClickRow"
    >
      <template v-slot:item="{ item }">
        <tr class="cursor-pointer" @click="onClickRow(item.name)">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <status-chip
              :status="item.status"
              :decorator-composable="useJobStatusDecorator"
            ></status-chip>
          </td>
          <td>
            <date-time :value="item.updatedAt"></date-time>
          </td>
        </tr>
      </template>

      <template v-slot:bottom> </template>
    </v-data-table>

    <!-- Pagination Zone (Always display) -->

    <div class="w-full flex flex-row justify-center">
      <!-- Fix the locale to be en due to the Bug RangeError: Incorrect locale information provided -->
      <v-locale-provider locale="en">
        <v-pagination
          class="max-w-xl"
          :length="tableAttributes.pagination.length"
          @update:model-value="changePage"
          v-model:model-value="tableAttributes.pagination.currentPage"
          total-visible="5"
        ></v-pagination>
      </v-locale-provider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSearchableDataTable } from "./composable/useSearchableDataTable";
import ImageWithShimmer from "@/components/shimmer/ImageWithShimmer.vue";
import JobTableShimmer from "./components/JobTableShimmer.vue";
import JobTableError from "./components/JobTableError.vue";
import DateTime from "@/components/DateTime.vue";
import router from "@/router";
import { useLocale } from "vuetify/lib/framework.mjs";
import EventBusFactory, { Event } from "@/utils/EventBusFactory";
import StatusChip from "@/components/statuschip/StatusChip.vue";
import { useJobStatusDecorator } from "@/components/statuschip/useJobStatusDecorator";

export default defineComponent({
  name: "JobList",
  components: {
    ImageWithShimmer,
    JobTableShimmer,
    JobTableError,
    DateTime,
    StatusChip,
  },
  setup() {
    const { tableAttributes, tableData, changePage, search, onLocaleUpdate } =
      useSearchableDataTable();
    const { t } = useLocale();

    function onClickRow(jobID: string) {
      router.push({
        name: "job-detail",
        params: {
          jobID: jobID,
        },
      });
    }

    EventBusFactory.instance.eventBus.on(
      Event.LocaleConfigUpdate,
      onLocaleUpdate
    );
    EventBusFactory.instance.eventBus.on(Event.LocaleConfigUpdate, search);

    search();
    return {
      tableAttributes,
      tableData,
      t,
      changePage,
      search,
      onClickRow,
      onLocaleUpdate,
      useJobStatusDecorator,
    };
  },
  beforeUnmount() {
    EventBusFactory.instance.eventBus.off(
      Event.LocaleConfigUpdate,
      this.onLocaleUpdate
    );
    EventBusFactory.instance.eventBus.off(
      Event.LocaleConfigUpdate,
      this.search
    );
  },
});
</script>
