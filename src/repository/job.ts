import Repository from "./repository";
import {
  CreateJobResponse,
  DataResponse,
  JobDetailResponse,
  JobResponse,
} from "@/models/job/job";
import { AxiosResponse } from "axios";
class JobRepository extends Repository {
  async getJob(): Promise<JobResponse> {
    const response: AxiosResponse<JobResponse> = await this.sendRequest({
      method: "GET",
      url: "/job/",
    });

    return {
      data: response.data.data,
      limit: response.data.data.length,
      total: response.data.data.length,
      offset: 0,
    };
  }

  async createJob(body: any): Promise<CreateJobResponse> {
    const response: AxiosResponse<DataResponse<CreateJobResponse>> =
      await this.sendRequest({
        method: "POST",
        url: "/job/",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
      });

    return response.data.data;
  }

  async getJobDetail(id: string): Promise<JobDetailResponse> {
    const response: AxiosResponse<JobDetailResponse> = await this.sendRequest({
      method: "GET",
      url: `/job/${id}/detail`,
    });

    return response.data;
  }
}

export default JobRepository;
