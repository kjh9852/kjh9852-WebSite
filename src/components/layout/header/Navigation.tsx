import { nav } from '@/components/layout/header/nav';

import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <ul className={styles.navContainer}>
      {nav.map((nav) => (
        <li className={styles.navList} key={nav.name}>
          <a href={`#${nav.name}`}>{nav.name}</a>
        </li>
      ))}
    </ul>
  );
}
