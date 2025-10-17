// /src/components/ProfessionalStructure/ProfessionalStructure.js
'use client';

import { motion } from 'framer-motion';
import styles from './ProfessionalStructure.module.css';

// Variantes para animar a entrada do texto de forma escalonada
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3, // Um pequeno atraso após o container principal aparecer
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function ProfessionalStructure() {
  return (
    <section className={styles.sectionContainer}>
      <motion.div 
        className={styles.contentWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Curva de easing suave
      >
        {/* Camada 1: O Vídeo */}
        <video 
          className={styles.videoElement}
          src="/videos/testeA2.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        />

        {/* Camada 2: O Overlay para legibilidade */}
        <div className={styles.overlay}></div>

        {/* Camada 3: O Texto Impactante */}
        <motion.div 
          className={styles.textWrapper}
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={textItemVariants}>
            NOSSA ESTRUTURA
          </motion.h2>
          <motion.p variants={textItemVariants}>
            Onde o potencial encontra a infraestrutura de elite para florescer.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}