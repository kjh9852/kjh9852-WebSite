import styles from './Wrapper.module.scss';

export default function Wrapper({
  children,
  full = false,
}: {
  children: React.ReactNode;
  full?: boolean;
}) {
  const containerClass = `${styles.wrap} ${full ? styles.fullWrap : ''}`;
  return <div className={containerClass}>{children}</div>;
}
