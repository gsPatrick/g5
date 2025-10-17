// /src/components/QuoteSection/QuoteSection.js
'use client';

import { motion } from 'framer-motion';
import styles from './QuoteSection.module.css';

export default function QuoteSection() {
  const quote = "Disciplina é a ponte entre metas e realizações.";
  
  // Variantes para o container da frase, que orquestra a animação dos filhos (letras)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // Tempo entre a animação de cada letra
      },
    },
  };

  // Variantes para cada letra individual
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
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
        viewport={{ once: true, amount: 0.8 }} // A animação começa quando 80% estiver visível
      >
        {quote.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char} {/* Preserva os espaços */}
          </motion.span>
        ))}
      </motion.h2>
    </section>
  );
}