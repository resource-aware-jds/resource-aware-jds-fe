export enum JobStatus {
  Created = "created",
  Experimenting = "experimenting",
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

export interface JobDetailResponse {
  id: string;
  status: string;
  name: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
  tasks: Array<TaskDetailResponse>;
}

export interface TaskDetailResponse {
  id: string;
  jobID: string;
  imageURL: string;
  status: string;
  taskAttributes: any;
  latestDistributedNodeID: string;
  logs: Array<TaskLogResponse>;
}

export interface TaskLogResponse {
  severity: string;
  message: string;
  parameters: any;
  timestamp: string;
}
