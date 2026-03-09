import type React from 'react';

import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  sectionId: string;
  className?: string | undefined;
}

export default function Section({
  children,
  sectionId,
  className,
}: SectionProps) {
  const sectionClasses = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={sectionId} className={sectionClasses}>
      {children}
    </section>
  );
}
