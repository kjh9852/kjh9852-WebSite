import { type SetStateAction } from 'react';

import { Dropdown, DotMenu, Loading } from '@/components/ui';
import { TiptapViewer } from '@/features/editor';
import { useProjectStore } from '@/store/projectStore';
import { useToastStore } from '@/store/toastStore';

import { useDeleteProject } from '../../hooks/useDeleteProject';
import { type Project } from '../../schemas/project.schema';

interface ProjectProps {
  project: Project | null | undefined;
  isPending: boolean;
  projectOpen: boolean;
  setProjectOpen: React.Dispatch<SetStateAction<boolean>>;
  toggleProject: () => void;
}

export default function ProjectDetail({
  project,
  isPending,
  projectOpen,
  setProjectOpen,
  toggleProject,
}: ProjectProps) {
  const showToast = useToastStore((state) => state.showToast);
  const openProject = useProjectStore((state) => state.openProject);
  const closeProject = useProjectStore((state) => state.closeProject);
  const { mutate: deleteProject } = useDeleteProject();

  if (isPending) {
    return <Loading />;
  }

  if (!project) {
    return null;
  }

  const handleDeleteProject = () => {
    deleteProject(project.id, {
      onSuccess: () => {
        showToast({ type: 'success', message: '프로젝트가 삭제되었습니다.' });
        closeProject();
      },
      onError: (error: Error) => {
        const message = error.message ?? '삭제에 실패하였습니다.';
        showToast({ type: 'warning', message: message });
      },
    });
  };

  const PROJECT_MENU = [
    {
      label: '수정하기',
      value: 'edit',
    },
    {
      label: '삭제하기',
      value: 'remove',
    },
  ] as const;

  return (
    <TiptapViewer
      title={project?.title ?? ''}
      description={project?.description ?? ''}
      actions={
        <Dropdown
          dropdownList={PROJECT_MENU}
          isOpen={projectOpen}
          setOpen={setProjectOpen}
          onSelect={(value) => {
            if (value === 'edit') openProject('edit', project.id);
            if (value === 'remove') handleDeleteProject();
          }}
        >
          <DotMenu onUserAction={toggleProject} />
        </Dropdown>
      }
    />
  );
}
