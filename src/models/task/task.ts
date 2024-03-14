export enum TaskStatus {
  Created = "created",
  ReadyToDistribute = "ready-to-distribute",
  Distributed = "distributed",
  Success = "success",
  WorkOnTaskFailure = "work-on-task-failure",
  Unknown = "unknown",
}

export interface TaskCreationModel {
  attribute: any;
}
