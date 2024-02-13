export enum TaskStatus {
  Created = "created",
  Distributed = "distributed",
  Success = "success",
  WorkOnTaskFailure = "work-on-task-failure",
  Unknown = "unknown",
}

export interface TaskCreationModel {
  attribute: any;
}
