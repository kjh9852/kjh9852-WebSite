import { useState } from 'react';

import defaultProfile from '@/assets/icons/profile_icon.png';
import { nav } from '@/components/layout/header/nav';
import { useAuth, useSignOut } from '@/features/auth';
import { useModalStore } from '@/store/modalStore';

import styles from './MobileNav.module.scss';

export default function MobileNav() {
  const openModal = useModalStore((state) => state.openModal);
  const { mutate: handleSignOut } = useSignOut();
  const { data: user, isPending } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  const displayProfileImage =
    user?.photoURL && loadedImageUrl === user.photoURL
      ? user.photoURL
      : defaultProfile;

  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        className={styles.menuButton}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`${styles.menuIcon} ${isOpen ? styles.open : ''}`}
          aria-hidden="true"
        ></span>
      </button>
      <nav
        id="mobile-navigation"
        className={`${styles.navContainer} ${isOpen ? styles.open : ''}`}
      >
        <ul className={styles.menuList}>
          {nav.map((nav) => (
            <li className={styles.menuItem} key={nav.name}>
              <a href={`#${nav.name}`}>{nav.name}</a>
            </li>
          ))}
        </ul>
        {user && !isPending ? (
          <div className={styles.userProfile}>
            <div className={styles.profile}>
              <img
                className={styles.profileIcon}
                loading="lazy"
                src={displayProfileImage}
                alt={`${user?.displayName} 프로필 이미지`}
              />
              {user?.photoURL && loadedImageUrl !== user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="hidden preloader"
                  style={{ display: 'none' }}
                  onLoad={() => setLoadedImageUrl(user.photoURL)}
                />
              )}
              <span className={styles.profileName}>{user?.displayName}</span>
            </div>
            <div>
              <ul className={styles.userMenu}>
                <li>
                  <button onClick={() => openModal('profileSetting')}>
                    프로필 설정
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSignOut()}>로그아웃</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => openModal('signIn')}
          >
            <span className={styles.buttonText}>로그인</span>
          </button>
        )}
      </nav>
    </div>
  );
}
