import defaultProfile from '@/assets/icons/profile_icon.png';
import Navigation from '@/components/layout/header/Navigation';
import { DropDown } from '@/components/ui';
import { useAuth, useSignOut } from '@/features/auth';
import useToggle from '@/hooks/useToggle';
import { useModalStore } from '@/store/modalStore';

import styles from './Header.module.scss';

export default function Header() {
  const { data: user, isPending } = useAuth();
  const { openModal } = useModalStore();
  const { mutate: handleSignOut } = useSignOut();
  const [modalOpen, toggleModal, setModalOpen] = useToggle(false);

  const USER_DROP_DOWN = [
    {
      btnLabel: '프로필 설정',
      onClick: () => openModal('profileSetting'),
    },
    {
      btnLabel: '로그아웃',
      onClick: () => handleSignOut(),
    },
  ];

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
        {user && !isPending ? (
          <div className={styles.userProfile} onClick={toggleModal}>
            <DropDown
              dropdownList={USER_DROP_DOWN}
              isOpen={modalOpen}
              setOpen={setModalOpen}
            >
              <div className={styles.profile}>
                <img
                  className={styles.profileIcon}
                  loading="lazy"
                  src={user?.photoURL ?? defaultProfile}
                  alt="프로필 이미지"
                />
                <span className={styles.profileName}>{user?.displayName}</span>
              </div>
            </DropDown>
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
    </header>
  );
}
