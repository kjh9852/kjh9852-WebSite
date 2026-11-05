import { useState } from 'react';

import defaultProfile from '@/assets/icons/profile_icon.png';
import { Dropdown } from '@/components/ui';
import { useAuth, useSignOut } from '@/features/auth';
import useToggle from '@/hooks/useToggle';
import { useModalStore } from '@/store/modalStore';

import styles from './Header.module.scss';
import MobileNav from './MobileNav';
import Navigation from './Navigation';

const USER_DROP_DOWN = [
  {
    label: '프로필 설정',
    value: 'profile',
  },
  {
    label: '로그아웃',
    value: 'logout',
  },
] as const;

export default function Header() {
  const { data: user, isPending } = useAuth();
  const openModal = useModalStore((state) => state.openModal);
  const { mutate: handleSignOut } = useSignOut();
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  const displayProfileImage =
    user?.photoURL && loadedImageUrl === user.photoURL
      ? user.photoURL
      : defaultProfile;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <a href="/">
            <span>로고</span>
          </a>
        </div>
        <div className={styles.desktopNav}>
          <Navigation />
          {user && !isPending ? (
            <div className={styles.userProfile}>
              <Dropdown
                dropdownList={USER_DROP_DOWN}
                isOpen={menuOpen}
                setOpen={setMenuOpen}
                onSelect={(value) => {
                  if (value === 'profile') openModal('profileSetting');
                  if (value === 'logout') handleSignOut();
                }}
              >
                <div className={styles.profile} onClick={toggleMenu}>
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
                  <span className={styles.profileName}>
                    {user?.displayName}
                  </span>
                </div>
              </Dropdown>
            </div>
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => openModal('signIn')}
            >
              <span className={styles.buttonText}>로그인</span>
            </button>
          )}
        </div>
        <div className={styles.mobileNav}>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
