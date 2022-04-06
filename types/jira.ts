interface IBoardLocation {
  projectId: number;
  displayName: string;
  projectName: string;
  projectKey: string;
  projectTypeKey: string;
  name: string;
}

export interface IJiraBoard {
  id: number;
  self: string;
  name: string;
  type: string;
  location: IBoardLocation;
}

export interface IIssues {
  issues: Array<IIssue>;
}

export interface IIssue {
  id: number;
  fields: {
    summary: string
    project: {
      id: string;
    }
  }
}

export interface IJiraBoards {
  values: Array<IJiraBoard>;
}