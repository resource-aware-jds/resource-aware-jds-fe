import { JobDetailResponse } from "@/models/job/job";
import RepositoryFactory from "@/repository/repositoryFactory";
import { reactive } from "vue";

export function useGetJobDetail(jobID: string) {
  const attribute = reactive({
    data: {} as JobDetailResponse,
  });

  async function getJobDetail() {
    const response =
      await RepositoryFactory.instance.jobRepository.getJobDetail(jobID);

    attribute.data = response;
  }

  getJobDetail();

  return {
    attribute,
    getJobDetail,
  };
}
