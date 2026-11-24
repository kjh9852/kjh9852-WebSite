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
        <article key={item.id} className={styles.projectList}>
          <button
            className={styles.projectButton}
            onClick={() => openProject('detail', item.id as string)}
          >
            <div className={styles.projectImage}>
              <img
                loading="lazy"
                src={item.imageURL ? item.imageURL : NoneImage}
                alt={`${item.title} 미리보기`}
              />
            </div>
            <div className={styles.projectInfo}>
              <h2 className={styles.title}>{item.title}</h2>
              {item.tags && (
                <div className={styles.projectTag}>
                  {item.tags.slice(0, 3)?.map((tag) => (
                    <span className={styles.tags} key={tag}>
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className={styles.moreTags}>
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        </article>
      ))}
    </>
  );
}
