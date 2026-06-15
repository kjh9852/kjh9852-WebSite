import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useProjectStore } from '@/store/projectStore';
import { useToastStore } from '@/store/toastStore';
import { extractThumbnail } from '@/utils/image';

import { useEditProject } from '../../hooks/useEditProject';
import {
  projectSchema,
  type Project,
  type ProjectFormValues,
} from '../../schemas/project.schema';
import ProjectForm from '../form/ProjectForm';

interface EditProjectProps {
  project: Project | null | undefined;
}

export default function EditProject({ project }: EditProjectProps) {
  const showToast = useToastStore((state) => state.showToast);
  const closeProject = useProjectStore((state) => state.closeProject);
  const { mutate: editProject, isPending } = useEditProject();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? '',
      description: project?.description ?? '',
      category: project?.category ?? '',
      imageURL: project?.imageURL ?? '',
    },
    mode: 'onChange',
  });
  const queryClient = useQueryClient();

  if (!project) {
    return null;
  }

  const handleEditProject = (data: ProjectFormValues) => {
    const thumbnailUrl = extractThumbnail(data.description);

    const uploadData = {
      ...data,
      imageURL: data.imageURL ?? thumbnailUrl ?? '',
    };

    editProject(
      { projectId: project.id, data: uploadData },
      {
        onSuccess: () => {
          console.log('업로드');
          queryClient.invalidateQueries({
            queryKey: ['project'],
          });
          showToast({ type: 'success', message: '프로젝트가 수정되었습니다.' });
          closeProject();
        },
        onError: (error: Error) => {
          const message = error.message ?? '수정에 실패하였습니다.';
          showToast({ type: 'warning', message: message });
        },
      }
    );
  };

  return (
    <ProjectForm
      form={form}
      onUpdateProject={handleEditProject}
      isPending={isPending}
      isEdit={true}
    />
  );
}
