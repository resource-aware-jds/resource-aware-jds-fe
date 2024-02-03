import { TaskDetailResponse } from "@/models/job/job";
import RepositoryFactory from "@/repository/repositoryFactory";
import { reactive } from "vue";

export function useGetTaskDetail(taskID: string) {
  const attribute = reactive({
    data: {} as TaskDetailResponse,
  });

  async function getTaskDetail() {
    const response =
      await RepositoryFactory.instance.taskRepository.getTaskDetail(taskID);

    attribute.data = response;
  }

  getTaskDetail();

  return {
    attribute,
  };
}
