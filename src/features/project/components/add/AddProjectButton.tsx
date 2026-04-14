import { useProjectStore } from '@/store/projectStore';

import styles from './AddProjectButton.module.scss';

export default function AddProjectButton() {
  const { openProject } = useProjectStore();

  return (
    <div className={styles.addProjectButton}>
      <button onClick={() => openProject('add', '')}>
        <div className={styles.addProjectButtonTrigger}>
          <span className={styles.addProjectButtonIcon} />
        </div>
      </button>
    </div>
  );
}
