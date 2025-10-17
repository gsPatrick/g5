// /src/components/TransitionQuote/TransitionQuote.js
'use client';

import { motion } from 'framer-motion';
import styles from './TransitionQuote.module.css';

export default function TransitionQuote() {
  // Dividimos a frase em duas linhas para controle total
  const line1 = "A ESTRUTURA CRIA O PALCO.";
  const line2 = "O TALENTO ASSUME OS HOLOFOTES.";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className={styles.quoteContainer}>
      <motion.h2 
        className={styles.quoteText}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        {/* Renderiza a primeira linha */}
        {line1.split(" ").map((word, index) => (
          <span key={`line1-${index}`} className={styles.wordWrapper}>
            <motion.span className={styles.word} variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
        
        {/* Força a quebra de linha */}
        <br />

        {/* Renderiza a segunda linha */}
        {line2.split(" ").map((word, index) => (
          <span key={`line2-${index}`} className={styles.wordWrapper}>
            <motion.span className={styles.word} variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </section>
  );
}