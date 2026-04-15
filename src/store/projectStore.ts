import { create } from 'zustand';

type ProjectType = 'add' | 'edit' | 'detail' | null;

type ProjectStore = {
  projectId: string | null;
  type: ProjectType;
  openProject: (type: ProjectType, id: string) => void;
  closeProject: () => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projectId: null,
  type: null,

  openProject: (type, id) =>
    set({
      type: type,
      projectId: id,
    }),

  closeProject: () =>
    set({
      type: null,
      projectId: null,
    }),
}));
