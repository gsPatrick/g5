// /src/components/Hero/Hero.js
'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { FiArrowDown } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // Aumentamos o atraso para um ritmo mais deliberado
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, duration: 1 },
  },
};

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline key="video-hero">
          {/* Garanta que o caminho para o seu vídeo está correto */}
          <source src="/videos/teste1.mp4" type="video/mp4" />
          Seu navegador não suporta o vídeo.
        </video>
      </div>
      <div className={styles.overlay}></div>
      
      <motion.div 
        className={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.headline} variants={itemVariants}>
         G5 FUTEBOL
        </motion.h1>
        
        <motion.p className={styles.subheadline} variants={itemVariants}>
          Metodologia de Formação de Atletas & Gestão para Escolas e Clubes de Futebol
        </motion.p>
        
        <motion.a 
          href="#contato"
          className={styles.ctaButton}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'transparent',
            color: '#FFFFFF',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          ENTRE EM CONTATO
        </motion.a>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}