import type { MouseEventHandler } from 'react';

import styles from './DotMenu.module.scss';

export default function DotMenu({
  onUserAction,
}: {
  onUserAction?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div onClick={onUserAction} className={styles.dotContainer}>
      <span className={styles.dotMenu}></span>
    </div>
  );
}
