import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import oceanAnimation from '@/animations/oceanAnimation';

import styles from './Ocean.module.scss';

export default function Ocean() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      oceanAnimation({
        bubble: `.${styles.bubble}`,
        midBubble: `.${styles.midBubble}`,
        smallBubble: `.${styles.smallBubble}`,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={styles.ocean}>
      <div className={styles.bubble}></div>
      <div className={styles.midBubble}></div>
      <div className={styles.smallBubble}></div>
    </div>
  );
}
