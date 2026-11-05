import { nav } from '@/components/layout/header/nav';

import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {nav.map((nav) => (
          <li className={styles.navItem} key={nav.name}>
            <a href={`#${nav.name}`}>{nav.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
