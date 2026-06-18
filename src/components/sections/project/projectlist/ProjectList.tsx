import NoneImage from '@/assets/images/none_image.png';
import { type Project } from '@/features/project';
import { useProjectStore } from '@/store/projectStore';

import styles from './ProjectList.module.scss';

export default function ProjectList({
  projectList,
}: {
  projectList: Project[] | undefined;
}) {
  const { openProject } = useProjectStore();

  if (!projectList || projectList.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <p>등록된 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {projectList?.map((item) => (
        <article
          onClick={() => openProject('detail', item.id as string)}
          key={item.id}
          className={styles.projectList}
        >
          <button className={styles.projectButton}>
            <div className={styles.projectImage}>
              <img
                loading="lazy"
                src={item.imageURL ? item.imageURL : NoneImage}
                alt={`${item.title} 미리보기`}
              />
            </div>
            <h2 className={styles.title}>{item.title}</h2>
          </button>
        </article>
      ))}
    </>
  );
}
