import Navigation from '@/components/layout/header/Navigation';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <a href="/">
            <span>로고</span>
          </a>
        </div>
        <nav className={styles.nav}>
          <Navigation />
        </nav>
        <span>로그인</span>
      </div>
    </header>
  );
}
