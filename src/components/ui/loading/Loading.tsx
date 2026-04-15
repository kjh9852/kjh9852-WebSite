import styles from './Loading.module.scss';

interface LoadingProps {
  size?: 'default' | 'small';
}

export default function Loading({ size = 'default' }: LoadingProps) {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}
