export type CreateTaskDTO = {
  description: string;
  aginstId: number;
  assigneeId?: number;
  status?: string;
};

export type TaskFilters = {
  assignee?: number | string;
  projectId?: number | string;
  status?: string;
}
