import Repository from "./repository";
import {
  CreateJobResponse,
  DataResponse,
  JobDetailResponse,
  JobResponse,
  TaskDetailResponse,
} from "@/models/job/job";
import { AxiosResponse } from "axios";

class TaskRepository extends Repository {
  async getTaskDetail(id: string): Promise<TaskDetailResponse> {
    const response: AxiosResponse<TaskDetailResponse> = await this.sendRequest({
      method: "GET",
      url: `/task/${id}/detail`,
    });

    return response.data;
  }
}

export default TaskRepository;
