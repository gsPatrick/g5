// /src/components/MethodologySection/MethodologySection.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './MethodologySection.module.css';

// Ícones
import { IoIosFootball, IoIosBody } from 'react-icons/io';
import { GiBrain } from 'react-icons/gi';
import { BsDiagram3Fill, BsShieldCheck } from 'react-icons/bs';

const methodologyPillars = [
    // ... (os dados dos pilares permanecem os mesmos)
    { icon: <IoIosFootball size={40} />, title: 'Técnica', description: 'Domínio de bola, passe, finalização e controle. A base fundamental.' },
    { icon: <GiBrain size={40} />, title: 'Cognitiva', description: 'Tomada de decisão, leitura de jogo e inteligência espacial. Criamos jogadores que pensam.' },
    { icon: <IoIosBody size={40} />, title: 'Física', description: 'Força, velocidade, agilidade e resistência, desenvolvidas com alta performance.' },
    { icon: <BsDiagram3Fill size={40} />, title: 'Tática', description: 'Entendimento de sistemas, posicionamento e movimentos coletivos.' },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

export default function MethodologySection() {
  return (
    // O container principal agora engloba as duas partes
    <section className={styles.sectionContainer}>
      
      {/* Parte 1: Imagem em Tela Cheia */}
      <div className={styles.posterContainer}>
        <div className={styles.backgroundImage}>
          <Image 
            src="/images/mentorship.jpg" 
            alt="Metodologia G5" 
            layout="fill" 
            objectFit="cover" 
            quality={90} 
          />
        </div>
        <div className={styles.overlay}></div>
        <motion.h2 
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          MAIS QUE ATLETAS. LÍDERES.
        </motion.h2>
      </div>

      {/* Parte 2: Seção dos Cards */}
      <div className={styles.cardsContainer}>
        <motion.div 
          className={styles.cardsGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {methodologyPillars.map((pillar) => (
            <motion.div key={pillar.title} className={styles.card} variants={cardVariants}>
              <div className={styles.cardIcon}>{pillar.icon}</div>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardDescription}>{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}