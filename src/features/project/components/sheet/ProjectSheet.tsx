import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import { CloseIcon } from '@/components/ui';
import useToggle from '@/hooks/useToggle';
import { useProjectStore } from '@/store/projectStore';

import { useGetProject } from '../../hooks/useGetProject';
import AddProject from '../add/AddProject';
import ProjectDetail from '../detail/ProjectDetail';
import EditProject from '../edit/EditProject';

import styles from './ProjectSheet.module.scss';

export default function ProjectSheet({
  projectId,
}: {
  projectId?: string | null;
}) {
  const type = useProjectStore((state) => state.type);
  const closeProject = useProjectStore((state) => state.closeProject);
  const container = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { data: project, isPending } = useGetProject(projectId ?? '');
  const [projectOpen, toggleProject, setProjectOpen] = useToggle(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1 }
    );
  }, []);

  return (
    <div className={styles.projectSheet} ref={container}>
      <div onClick={closeProject} className={styles.projectSheetBackDrop} />
      <div className={styles.projectSheetPanel} ref={contentRef}>
        <div className={styles.projectHeader}>
          <button
            className={styles.projectSheetCloseButton}
            onClick={closeProject}
          >
            <CloseIcon />
          </button>
        </div>
        {type === 'add' && <AddProject />}
        {type === 'detail' && (
          <ProjectDetail
            isPending={isPending}
            project={project}
            projectOpen={projectOpen}
            setProjectOpen={setProjectOpen}
            toggleProject={toggleProject}
          />
        )}
        {type === 'edit' && <EditProject project={project} />}
      </div>
    </div>
  );
}
