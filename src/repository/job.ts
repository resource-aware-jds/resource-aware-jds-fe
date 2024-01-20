import Repository from "./repository";
import { JobResponse } from "@/models/job/job";
class JobRepository extends Repository {
  async getJob(): Promise<JobResponse> {
    return {
      data: [
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobA",
          status: "created",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobB",
          status: "distributing",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobC",
          status: "done",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobD",
          status: "done",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobE",
          status: "distributing",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobF",
          status: "distributing",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobG",
          status: "created",
          updatedAt: "2024-01-20T04:32:12Z",
        },
        {
          id: "507f1f77bcf86cd799439011",
          name: "JobH",
          status: "created",
          updatedAt: "2024-01-20T04:32:12Z",
        },
      ],
      limit: 10,
      total: 100,
      offset: 0,
    };
  }
}

export default JobRepository;
