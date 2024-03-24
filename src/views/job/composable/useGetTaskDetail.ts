import { TaskDetailResponse } from "@/models/job/job";
import RepositoryFactory from "@/repository/repositoryFactory";
import { reactive } from "vue";

export function useGetTaskDetail(taskID: string) {
  const attribute = reactive({
    data: {} as TaskDetailResponse,
    taskAttribute: "" as string,
    isAutoReload: true,
    isLoading: false,
  });

  async function getTaskDetail() {
    const response =
      await RepositoryFactory.instance.taskRepository.getTaskDetail(taskID);

    attribute.taskAttribute = JSON.stringify(response.taskAttributes);

    attribute.data = response;
  }

  function clearAutoReload() {
    attribute.isAutoReload = false;
  }

  async function autoReload() {
    if (!attribute.isAutoReload) {
      return;
    }

    await getTaskDetail();

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        autoReload();
        resolve();
      }, 3000);
    });
  }

  function toggleAutoReload() {
    if (attribute.isAutoReload) {
      autoReload();
    }
  }

  getTaskDetail();
  toggleAutoReload();

  return {
    attribute,
    toggleAutoReload,
    clearAutoReload,
  };
}
