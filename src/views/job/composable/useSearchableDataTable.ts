import { reactive } from "vue";
import { debounce } from "@/utils/debounce";
import RepositoryFactory from "@/repository/repositoryFactory";
import { I18nManager } from "@/locales/facade";
import { TimeConfigProvider } from "@/utils/setting/TimeConfigProvider";

export interface TableHeader {
  title: string;
  key: string;
  sortable?: boolean;
}

interface FilterList {
  id: number;
  name: string;
}

export function useSearchableDataTable() {
  const t = I18nManager.instance.i18n.global.t as (...args: any[]) => string;

  function getLocaleHeader() {
    return [
      {
        title: t("page.jobList.table.headers.jobName"),
        key: "jobName",
        sortable: false,
      },
      {
        title: t("page.jobList.table.headers.status"),
        key: "status",
      },
      {
        title: t("page.jobList.table.headers.updatedAt"),
        key: "updatedAt",
      },
    ];
  }

  const tableData = reactive({
    header: getLocaleHeader(),
    items: <Array<any>>[],
  });
  const tableAttributes = reactive({
    error: {
      isError: false,
      errorInstance: {} as any,
    },
    isLoading: false,
    sortBy: [],
    search: {
      txtSearch: "",
    },
    filters: {
      filterList: <Array<FilterList>>[],
      filterModel: <number | null>null,
    },
    pagination: {
      pageSize: -1,
      currentPage: 1,
      length: 1,
    },
  });
  const searchAttribute: any = {
    offset: 0,
    limit: 10,
    search: "",
    ctrCmsStatus: null,
    selectedWorkTypeUUIDs: [],
    approvedWorkTypeUUIDs: [],
    provinceCodes: [],
    editType: null,
    grades: [],
    registeredDate: null,
  };

  // Set the filter list
  // Retrieve key and values using Object.entries() method.
  for (const [key, value] of Object.entries([])) {
    // Ignore keys that are numbers
    if (Number.isNaN(Number(key))) {
      continue;
    }

    // Ignore the Unknown Job Status
    const id = Number.parseInt(key);
    if (id === -1) {
      continue;
    }

    // Add keys and values to array
    tableAttributes.filters.filterList.push({
      id: id,
      name: value,
    });
  }

  const deboucingFunction = debounce((page: number) => {
    // Happen When the user change the page
    searchAttribute.offset = (page - 1) * (searchAttribute.limit ?? 0);
    if (searchAttribute.offset < 0) {
      searchAttribute.offset = 0;
    }
    search();
  }, 500);

  function changePage(page: number) {
    tableAttributes.isLoading = true;
    // Implement deboucing
    deboucingFunction(page);
  }

  function calculatePage(pageSize: number, totalSize: number): number {
    let result = Math.ceil(totalSize / pageSize);
    if (result <= 0) {
      result = 1;
    }
    return result;
  }

  function calculateCurrentPage(
    offset: number,
    limit: number,
    totalPage: number
  ): number {
    if (offset < 0 || limit < 1) {
      return 1;
    }
    const result = Math.floor(offset / limit) + 1;
    if (result > totalPage) {
      return totalPage;
    }
    return result;
  }

  function setLoadingState() {
    tableAttributes.isLoading = true;
    tableAttributes.error.isError = false;
  }

  function setErrorState() {
    resetPaginationStatus();
    tableAttributes.isLoading = false;
    tableAttributes.error.isError = true;
  }

  function resetPaginationStatus() {
    searchAttribute.offset = 0;
    tableAttributes.pagination.currentPage = 1;
    tableAttributes.pagination.length = 1;
  }

  function getSearchAttribute(): any {
    return searchAttribute;
  }

  function onLocaleUpdate() {
    tableData.header = getLocaleHeader();
  }

  async function search() {
    setLoadingState();

    if (
      tableAttributes.search.txtSearch !== searchAttribute.search ||
      tableAttributes.filters.filterModel !== searchAttribute.ctrCmsStatus
    ) {
      resetPaginationStatus();
      searchAttribute.search = tableAttributes.search.txtSearch;
      searchAttribute.ctrCmsStatus = tableAttributes.filters.filterModel;
    }

    let response: any;
    try {
      response = await RepositoryFactory.instance.jobRepository.getJob();
    } catch (e) {
      tableAttributes.error.errorInstance = e;
      setErrorState();
      return;
    }

    // Parse the submitDate into integer
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].submitDateInt = TimeConfigProvider.instance.getTimestamp(
        response.data[i].submitDate ?? "0"
      );
    }

    // Set the response value back
    tableData.items = response.data;

    // Set the page size
    tableAttributes.pagination.length = calculatePage(
      response.limit,
      response.total
    );

    // Set current page
    tableAttributes.pagination.currentPage = calculateCurrentPage(
      response.offset,
      response.limit,
      tableAttributes.pagination.length
    );

    // Clear the tableAttributes.isLoading text
    tableAttributes.isLoading = false;
  }

  // expose managed state as return value
  return {
    tableAttributes,
    tableData,
    changePage,
    search,
    getSearchAttribute,
    onLocaleUpdate,
  };
}
