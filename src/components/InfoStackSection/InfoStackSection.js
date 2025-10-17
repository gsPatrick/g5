// /src/components/InfoStackSection/InfoStackSection.js
'use client';

import { motion } from 'framer-motion';
import styles from './InfoStackSection.module.css';

// --- Sub-componente para Tela de Título Grande ---
const HeadlineScreen = ({ text }) => {
    // Orquestra a animação das palavras
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Atraso entre a animação de cada palavra
            },
        },
    };

    // Animação para cada palavra individual
    const wordVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', damping: 15, stiffness: 100 },
        },
    };

    return (
        <div className={styles.contentWrapper}>
            <motion.h2
                className={styles.headline}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                {/* Mapeamos cada linha definida nos dados */}
                {text.map((line, lineIndex) => (
                    // O `span` da linha garante a quebra de linha correta
                    <span key={lineIndex} className={styles.line}>
                        {/* Dividimos a linha em palavras e animamos cada uma */}
                        {line.split(' ').map((word, wordIndex) => (
                            <motion.span
                                key={wordIndex}
                                className={styles.word}
                                variants={wordVariants}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.h2>
        </div>
    );
};

// --- Sub-componente para Tela de Card de Informação ---
const CardScreen = ({ paragraphs }) => {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <div className={styles.contentWrapper}>
            <motion.div
                className={styles.infoCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.7 }}
                variants={cardVariants}
            >
                <div className={styles.cardGlow}></div>
                <div className={styles.cardShine}></div>
                <div className={styles.cardContent}>
                    <div className={styles.cardBody}>
                        {paragraphs.map((text, index) => (
                            <p key={index} className={styles.paragraph}>{text}</p>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Componente Principal ---
export default function InfoStackSection({ type, text, paragraphs }) {
    return (
        <div className={styles.sectionContainer}>
            {type === 'headline' && <HeadlineScreen text={text} />}
            {type === 'card' && <CardScreen paragraphs={paragraphs} />}
        </div>
    );
}   