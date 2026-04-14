import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useProjectStore } from '@/store/projectStore';
import { useToastStore } from '@/store/toastStore';
import { extractThumbnail } from '@/utils/image';

import { usePostProject } from '../../hooks/usePostProject';
import { type ProjectFormValues } from '../../schemas/project.schema';
import { projectSchema } from '../../schemas/project.schema';
import ProjectForm from '../form/ProjectForm';

export default function AddProject() {
  const { showToast } = useToastStore();
  const { closeProject } = useProjectStore();
  const { mutate: addProject, isPending } = usePostProject();
  const queryClient = useQueryClient();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      imageURL: '',
    },
    mode: 'onChange',
  });

  const handleUploadProject = (data: ProjectFormValues) => {
    const thumbnailUrl = extractThumbnail(data.description);

    const uploadData = {
      ...data,
      imageURL: thumbnailUrl || '',
    };

    addProject(uploadData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['project'],
        });
        showToast({ type: 'success', message: '프로젝트가 등록되었습니다.' });
        closeProject();
      },
      onError: () => {
        showToast({ type: 'warning', message: '업로드에 실패하였습니다.' });
      },
    });
  };

  return (
    <ProjectForm
      form={form}
      onUpdateProject={handleUploadProject}
      isPending={isPending}
    />
  );
}
