import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lang } from '../data/clinicData';

interface LangSlideProps {
  lang: Lang;
  children: React.ReactNode;
  className?: string;
}

export const LangSlide: React.FC<LangSlideProps> = ({ lang, children, className = '' }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={lang}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
