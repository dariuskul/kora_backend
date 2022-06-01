import { jira } from "../../../config"
import Project from "../../../db/models/project";
import Task from "../../../db/models/task";
import { IIssues, IJiraBoards } from "../../../types/jira";

export const getAllBoards = async () => {
  const boards = await jira.getAllBoards() as IJiraBoards;
  return boards;
}

export const getIssues = async (boardId: string) => {
  const issues = await jira.getIssuesForBoard(boardId) as IIssues;
  return issues;
}

export const synchronizeProjects = async () => {
  const boards = await getAllBoards();
  const projects = await Project.findAll();
  const projectsNames = projects.map((project) => project.name);
  const projectIds = projects.map((project) => project.id);
  const newProjects = boards.values.filter(
    (board) => !projectsNames.includes(board.name)
  );
  const projectsIds = projects.map(item => item.id);
  // check ids of new projects and projects that are not in the database
  const projectsNotInDatabase = newProjects.filter(
    (project) => !projectsIds.includes(project.location.projectId));
  projectsNotInDatabase.forEach(async (board) => {
    await Project.create({
      id: board.location.projectId,
      name: board.name,
      isJiraProject: true,
      isPublic: true,
      isArchived: false,
      budget: 0,
    });
  });
  // update projects
  const updatedProjects = boards.values.filter(
    (board) => projectIds.includes(board.location.projectId)
  );
  updatedProjects.forEach(async (board) => {
    try {
      const project = await Project.findByPk(board.location.projectId.toString());
      console.log(project);
      if (project) {
        await project.update({
          id: board.location.projectId,
          name: board.location.projectName,
          isJiraProject: true,
          isPublic: true,
          isArchived: false,
          budget: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  )
};

export const synchronizeTasks = async (boardId: number) => {
  const issues = await getIssues(String(boardId));
  const tasks = issues.issues.map((issue) => {
    return {
      description: issue.fields.summary,
      projectId: issue.fields.project.id,
      id: issue.id,
      status: 'Active',
    };
  });
  tasks.forEach(async (task) => {
    const existingTask = await Task.findOne({
      where: {
        id: task.id,
      },
    });
    if (!existingTask) {
      const project = await Project.findByPk(task.projectId);
      if (!project) {
        return;
      }
      const newTask = await Task.create(task);
      await project.addTask(newTask);
    } else {
      await existingTask.update({ description: task.description });
      const project = await Project.findByPk(task.projectId);
      if (!project) {
        return;
      }
      await project.addTask(existingTask);
    }
  });
}

export const synchronizeData = async () => {
  await synchronizeProjects();
  const boards = await getAllBoards();
  boards.values.forEach(async (project) => {
    await synchronizeTasks(project.id);
  });
  // get projects and tasks
}
