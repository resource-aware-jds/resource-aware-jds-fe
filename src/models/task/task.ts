export enum TaskStatus {
  Created = "created",
  Distributed = "distributed",
  Done = "done",
  Unknown = "unknown",
}

export interface TaskCreationModel {
  attribute: Object;
}
