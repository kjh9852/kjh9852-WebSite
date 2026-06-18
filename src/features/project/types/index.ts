import type { Dispatch, SetStateAction } from 'react';

import type { Project, UpdateProjectValues } from '../schemas/project.schema';

export type EditProjectProps = {
  project: Project | null | undefined;
};

export type EditProjectVariables = {
  projectId: string;
  updateProject: UpdateProjectValues;
};

export type ProjectDetailProps = {
  project: Project | null | undefined;
  isPending: boolean;
  projectOpen: boolean;
  setProjectOpen: Dispatch<SetStateAction<boolean>>;
  toggleProject: () => void;
};
