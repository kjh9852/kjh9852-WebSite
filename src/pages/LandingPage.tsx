import About from '@/components/sections/about/About';
import Hero from '@/components/sections/hero/Hero';

import styles from './LandingPage.module.scss';

export default function LandingPage() {
  return (
    <main className={styles.background}>
      <Hero />
      <About />
    </main>
  );
}
