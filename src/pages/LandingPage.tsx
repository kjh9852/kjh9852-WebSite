import Ocean from '@/components/layout/ocean/Ocean';
import About from '@/components/sections/about/About';
import Hero from '@/components/sections/hero/Hero';
import Post from '@/components/sections/post/Post';
import Project from '@/components/sections/project/Project';
import Skills from '@/components/sections/skills/Skills';
import { AdminGuard } from '@/features/auth';
import AddProjectButton from '@/features/project/components/add/AddProjectButton';

import styles from './LandingPage.module.scss';

export default function LandingPage() {
  return (
    <>
      <main className={styles.background}>
        <Hero />
        <About />
        <Skills />
        <Project />
        <Post />
      </main>
      <Ocean />
      <AdminGuard>
        <AddProjectButton />
      </AdminGuard>
    </>
  );
}
