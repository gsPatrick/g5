// /src/components/FinalCTA/FinalCTA.js
'use client';

import { motion } from 'framer-motion';
import styles from './FinalCTA.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        delay: 1, // Entra por último
      },
    },
  };

export default function FinalCTA() {
  return (
    <section className={styles.ctaSection}>
      {/* Camada 1: O fundo de grade animado */}
      <div className={styles.gridBackground}></div>

      {/* Camada 2: O Vórtice de luz pulsante */}
      <div className={styles.lightVortex}></div>

      <motion.div
        className={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <motion.h2 variants={itemVariants} className={styles.headline}>
          O FUTURO É UMA DECISÃO
        </motion.h2>

        <motion.div variants={buttonVariants}>
          <motion.a 
            href="#agendamento" 
            className={styles.ctaButton}
            whileHover={{ 
                backgroundColor: '#FFFFFF',
                color: '#000000',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            Agendar Avaliação
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}