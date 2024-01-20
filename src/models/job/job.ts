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
