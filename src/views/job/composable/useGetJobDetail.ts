import { JobDetailResponse } from "@/models/job/job";
import RepositoryFactory from "@/repository/repositoryFactory";
import { reactive } from "vue";

export function useGetJobDetail(jobID: string) {
  const attribute = reactive({
    data: {} as JobDetailResponse,
    isAutoReload: true,
    isLoading: false,
  });

  async function getJobDetail() {
    attribute.isLoading = true;
    const response =
      await RepositoryFactory.instance.jobRepository.getJobDetail(jobID);

    attribute.data = response;
    attribute.isLoading = false;
  }

  async function autoReload() {
    if (!attribute.isAutoReload) {
      return
    }

    await getJobDetail();

    return new Promise<void>((resolve, reject) => {
      setTimeout(
      () => {
        autoReload();
        resolve();
      }
      , 3000);
    })
  }

  function clearAutoReload() {
    attribute.isAutoReload = false
  }

  function toggleAutoReload() {
    if (attribute.isAutoReload) {
      autoReload()
    }
  }

  getJobDetail();
  toggleAutoReload()

  return {
    attribute,
    getJobDetail,
    toggleAutoReload,
    clearAutoReload,
  };
}
