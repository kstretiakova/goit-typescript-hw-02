import React, { ReactNode } from 'react';
import styles from './Section.module.css';


interface SectionProps {
  children: ReactNode; 
  title?: string; 
}

const Section: React.FC<SectionProps> = ({ children, title }) => {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
