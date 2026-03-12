import About from '@/components/sections/about/About';
import Hero from '@/components/sections/hero/Hero';
import Skills from '@/components/sections/skills/Skills';

import styles from './LandingPage.module.scss';

export default function LandingPage() {
  return (
    <main className={styles.background}>
      <Hero />
      <About />
      <Skills />
    </main>
  );
}
