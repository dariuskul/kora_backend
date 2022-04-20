export type CreateTaskDTO = {
  description: string;
  aginstId: number;
  assigneeId?: number;
};

export type TaskFilters = {
  assigneeId?: number | string;
  projectId?: number | string;
}