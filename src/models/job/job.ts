export enum JobStatus {
  Created = "created",
  Distributing = "distributing",
  Done = "done",
  Unknown = "unknown",
}

export interface Job {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface JobResponse {
  data: Array<Job>;
  limit: number;
  total: number;
  offset: number;
}

export interface DataResponse<T> {
  data: T;
}

export interface CreateJobResponse {
  id: string;
  name: string;
  status: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
}
