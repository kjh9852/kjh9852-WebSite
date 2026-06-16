import { useState } from 'react';

import { Section, Wrapper } from '@/components/layout';
import ProjectList from '@/components/sections/project/projectlist/ProjectList';
import { Loading, TabMenu } from '@/components/ui';
import { PROJECT_CATEGORY, type Category } from '@/constants/projectCategory';
import { useGetProjects } from '@/features/project';

import styles from './Project.module.scss';

export default function Project() {
  const [selectMenu, setSelectMenu] = useState<Category>('all');
  const { data: projectList, isPending } = useGetProjects(selectMenu);

  return (
    <Section sectionId="project">
      <TabMenu
        tabs={PROJECT_CATEGORY}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
      <Wrapper>
        {isPending ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : (
          <div className={styles.projectListContainer}>
            <ProjectList projectList={projectList} />
          </div>
        )}
      </Wrapper>
    </Section>
  );
}
