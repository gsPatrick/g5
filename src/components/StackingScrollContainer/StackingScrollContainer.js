// /src/components/StackingScrollContainer/StackingScrollContainer.js
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './StackingScrollContainer.module.css';

export default function StackingScrollContainer({ children }) {
  const containerRef = useRef(null);
  const childCount = React.Children.count(children);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    // A altura total é o número de seções * 100vh.
    // Isso cria o "trilho" de rolagem necessário para a animação.
    <div ref={containerRef} style={{ height: `${childCount * 100}vh` }} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        {React.Children.map(children, (child, index) => {

          // --- Lógica de Animação ---

          // Define o início e o fim da *entrada* da seção ATUAL.
          // A animação de entrada acontece enquanto o scroll progride na seção ANTERIOR.
          // Ex: A seção 2 (index 1) entra enquanto o scroll está na seção 1 (index 0).
          const inputStart = index / childCount;
          const inputEnd = (index + 1) / childCount;

          // Define o início e o fim da *saída* da seção ATUAL.
          // A animação de saída acontece enquanto o scroll progride na seção ATUAL.
          // Ex: A seção 2 (index 1) sai enquanto o scroll está na seção 2.
          const outputStart = (index + 1) / childCount;
          const outputEnd = (index + 2) / childCount;
          
          // Animação de ENTRADA para a seção atual (movimento de baixo para cima)
          const y = useTransform(scrollYProgress, [inputStart, inputEnd], ['100vh', '0vh']);
          const opacityIn = useTransform(scrollYProgress, [inputStart, (inputStart + 0.1)], [0, 1]);

          // Animação de SAÍDA para a seção atual (escala para trás e some)
          const scaleOut = useTransform(scrollYProgress, [outputStart, outputEnd], [1, 0.9]);
          const opacityOut = useTransform(scrollYProgress, [outputStart, (outputStart + 0.05)], [1, 0]);

          // --- Lógica de Renderização ---
          
          // A primeira seção (index 0) não precisa da animação 'y' de entrada,
          // ela apenas precisa da animação de saída.
          if (index === 0) {
            return (
              <motion.div 
                style={{ 
                  scale: scaleOut, 
                  opacity: opacityOut,
                  zIndex: 1 
                }} 
                className={styles.stackingPanel}
              >
                {child}
              </motion.div>
            );
          }

          // A última seção (index === childCount - 1) não precisa da animação de saída.
          // Ela apenas entra e depois a página continua a rolar normalmente.
          if (index === childCount - 1) {
            return (
                <motion.div 
                  style={{ 
                    y, 
                    opacity: opacityIn, 
                    zIndex: index + 1 
                  }} 
                  className={styles.stackingPanel}
                >
                  {child}
                </motion.div>
              );
          }

          // As seções do meio precisam de TODAS as animações.
          return (
            <motion.div 
              style={{ 
                y, 
                scale: scaleOut, 
                opacity: opacityOut,
                zIndex: index + 1 
              }} 
              className={styles.stackingPanel}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}