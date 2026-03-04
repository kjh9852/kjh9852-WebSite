import { EyeIcon, EyeOffIcon } from '@/components/ui/icons';

import styles from './PasswordToggleIcon.module.scss';

export default function PasswordToggleIcon({
  isVisible,
  onVisible,
}: {
  isVisible: boolean;
  onVisible: () => void;
}) {
  return (
    <button type="button" className={styles.container} onClick={onVisible}>
      {isVisible ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  );
}
