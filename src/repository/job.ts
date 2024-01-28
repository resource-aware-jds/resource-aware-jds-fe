import Repository from "./repository";
import { JobResponse } from "@/models/job/job";
import { AxiosResponse } from "axios";
class JobRepository extends Repository {
  async getJob(): Promise<JobResponse> {
    const response: AxiosResponse<JobResponse> = await this.sendRequest({
      method: "GET",
      url: "/job/",
    });

    console.log(response.data);

    return {
      data: response.data.data,
      limit: response.data.data.length,
      total: response.data.data.length,
      offset: 0,
    };
  }
}

export default JobRepository;
