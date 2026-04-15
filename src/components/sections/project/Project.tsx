import { useState } from 'react';

import Section from '@/components/layout/section/Section';
import Wrapper from '@/components/layout/wrapper/Wrapper';
import ProjectList from '@/components/sections/project/projectlist/ProjectList';
import { Loading } from '@/components/ui';
import TabMenu from '@/components/ui/tabmenu/TabMenu';
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
