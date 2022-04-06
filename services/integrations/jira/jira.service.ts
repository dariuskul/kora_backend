import { jira } from "../../../config"
import { IIssues, IJiraBoards } from "../../../types/jira";

export const getAllBoards = async () => {
  const boards = await jira.getAllBoards() as IJiraBoards;
  return boards;
}

export const getIssues = async (boardId: string) => {
  const issues = await jira.getIssuesForBoard(boardId) as IIssues;
  return issues;
}
