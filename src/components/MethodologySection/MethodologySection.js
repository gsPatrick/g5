// /src/components/MethodologySection/MethodologySection.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './MethodologySection.module.css';

// Ícones
import { IoIosFootball, IoIosBody } from 'react-icons/io';
import { GiBrain } from 'react-icons/gi';
import { BsDiagram3Fill, BsShieldCheck } from 'react-icons/bs';
import { FaBullseye } from 'react-icons/fa';

const methodologyPillars = [
    { 
      icon: <IoIosFootball size={40} />, 
      title: 'Técnica', 
      description: 'Treinamentos minuciosos para aperfeiçoar domínio, passe, condução, finta, finalização e proteção de bola.' 
    },
    { 
      icon: <GiBrain size={40} />, 
      title: 'Cognitiva', 
      description: 'O atleta aprende a pensar e ENTENDER o jogo, antecipar situações e tomar decisões mais rápidas e assertivas — o verdadeiro diferencial do futebol moderno.' 
    },
    { 
      icon: <IoIosBody size={40} />, 
      title: 'Física', 
      description: 'Trabalhamos força, potência e velocidade de maneira adaptada à idade, garantindo segurança e progresso contínuo.' 
    },
    { 
      icon: <BsDiagram3Fill size={40} />, 
      title: 'Tática', 
      description: 'Ensina o atleta a entender sua função no jogo, as ações individuais e coletivas e a importância de jogar em equipe.' 
    },
    { 
      icon: <BsShieldCheck size={40} />, 
      title: 'Comportamental', 
      description: 'Fortalecemos a mente. Trabalhamos disciplina, controle emocional, autoconfiança e responsabilidade.' 
    },
    { 
      icon: <FaBullseye size={40} />, 
      title: 'Treinamento Específico', 
      description: 'Para atletas que desejam aperfeiçoar habilidades individuais, oferecemos programas personalizados e grupos reduzidos.' 
    },
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
          Formamos Atletas. Estruturamos E <br /> Gerimos Projetos. Entregamos Resultados.
        </motion.h2>
      </div>

      {/* Parte 2: Seção dos Cards */}
      <div className={styles.cardsContainer}>
        <div className={styles.cardsHeader}>
            <h2 className={styles.cardsTitle}>FORMAÇÃO DE ATLETAS</h2>
            <p className={styles.cardsSubtitle}>
                Desenvolvemos uma preparação completa, pautada em qualidade, ciência e propósito.
                Nada é aleatório — tudo é planejado e construído em processo.
            </p>
        </div>

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