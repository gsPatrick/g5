// /src/components/FounderSection/FounderSection.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './FounderSection.module.css';

// Reutilizamos o padrão de variantes para animações de entrada
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function FounderSection() {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.founderGrid}>
        <div className={styles.imageWrapper}>
          <motion.div 
            className={styles.imageInner}
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/images/founderg5.png"
              alt="Fundador da G5 Futebol"
              layout="fill"
              objectFit="cover"
              quality={90}
            />
          </motion.div>
        </div>

        <motion.div 
          className={styles.textWrapper}
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className={styles.headline} variants={textItemVariants}>
            A Mente por Trás da Metodologia
          </motion.h2>

          <motion.div variants={textItemVariants}>
            <h3 className={styles.founderName}>Gabriel - GAB</h3>
            <p className={styles.founderTitle}>Fundador & Head Coach</p>
          </motion.div>
          
          <motion.p className={styles.bio} variants={textItemVariants}>
            Com mais de 15 anos de experiência no desenvolvimento de atletas, Gabriel Ferreira fundou a G5 com uma visão clara: unir a paixão pelo futebol à disciplina de uma metodologia de ponta.
          </motion.p>
          
          <motion.p className={styles.bio} variants={textItemVariants}>
            Nossa filosofia transcende o campo. Focamos na evolução integral do atleta — técnica, mental e comportamental — para forjar não apenas jogadores de elite, mas indivíduos preparados para a vitória, dentro e fora das quatro linhas.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}