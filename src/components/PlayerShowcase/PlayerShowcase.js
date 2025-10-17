// /src/components/PlayerShowcase/PlayerShowcase.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './PlayerShowcase.module.css';

// Dados dos jogadores para facilitar a manutenção
const playersData = [
  {
    imageSrc: '/images/player-02.jpg',
    headline: 'VISÃO DE JOGO. PAIXÃO PURA', 
  },
  {
    imageSrc: '/images/player-03.jpg',
    headline: 'MOVIMENTO EXPLOSIVO. DOMÍNIO TOTAL.',
  },
  {
    imageSrc: '/images/player-01.jpg',
    headline: 'FOCO ABSOLUTO. TÉCNICA REFINADA',
  },
];

// Sub-componente para cada card de jogador
function PlayerCard({ player }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  return (
    <motion.div
      className={styles.playerCard}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <Image
        src={player.imageSrc}
        alt="Jogador G5 Futebol"
        layout="fill"
        objectFit="cover"
        quality={90}
        className={styles.cardImage}
      />
      {/* O EFEITO DE LUZ */}
      <div 
        className={styles.lightEffect}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 40%)`,
        }}
      />
      <div className={styles.textOverlay} />
      <h3 className={styles.cardHeadline}>{player.headline}</h3>
    </motion.div>
  );
}

// Componente Principal
export default function PlayerShowcase() {
  return (
    <section className={styles.showcaseSection}>
      <div className={styles.playersGrid}>
        {playersData.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    </section>
  );
}