import { useQuery } from '@tanstack/react-query';

import { getProject } from '@/features/project/api/project';
import { type Project } from '@/features/project/schemas/project.schema';

export function useGetProject(projectId: string) {
  return useQuery<Project | null>({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
    enabled: !!projectId,
  });
}
