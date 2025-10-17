// /src/components/Preloader/Preloader.js
'use client';

import { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

// --- Sub-componente SVG (COM A ANIMAÇÃO DE SAÍDA CORRIGIDA) ---
function SoccerFieldSVG() {
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" }
    },
    // A CORREÇÃO MÁGICA ESTÁ AQUI:
    // Definimos explicitamente que a animação de saída
    // deve reverter o pathLength para 0, "desdesenhando" as linhas.
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 1.2, ease: "easeInOut" }
    },
  };
  return (
    <motion.svg
      className={styles.svgField}
      viewBox="0 0 600 400"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      exit="exit" // Importante: informa ao motion.svg para usar a variante 'exit'
    >
      <motion.rect variants={pathVariants} x="20" y="20" width="560" height="360" className={styles.fieldLine} />
      <motion.line variants={pathVariants} x1="300" y1="20" x2="300" y2="380" className={styles.fieldLine} />
      <motion.circle variants={pathVariants} cx="300" cy="200" r="60" className={styles.fieldLine} />
      <motion.rect variants={pathVariants} x="20" y="80" width="100" height="240" className={styles.fieldLine} />
      <motion.rect variants={pathVariants} x="480" y="80" width="100" height="240" className={styles.fieldLine} />
      <motion.rect variants={pathVariants} x="20" y="140" width="40" height="120" className={styles.fieldLine} />
      <motion.rect variants={pathVariants} x="540" y="140" width="40" height="120" className={styles.fieldLine} />
    </motion.svg>
  );
}

// --- Sub-componente Bola 3D (Inalterado) ---
function FootballSphere() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh><sphereGeometry args={[2, 32, 32]} /><meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.2} /></mesh>
      <mesh><icosahedronGeometry args={[2.5, 2]} /><meshStandardMaterial color="#FFFFFF" wireframe wireframeLinewidth={1.5} /></mesh>
    </group>
  );
}

// --- Componente Principal do Preloader (Inalterado) ---
export default function Preloader() {
  const [showField, setShowField] = useState(true);
  const tagline = "G5 FUTEBOL"; 


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowField(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const textContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.5 } } };
  const logoVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, duration: 1 } } };
  const taglineVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const letterVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <motion.div className={styles.preloaderContainer} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}>
      <AnimatePresence>
        {showField && (
          // A única mudança aqui é garantir que o motion.div não tenha uma variante de saída própria,
          // para que a animação de saída do SVG interno possa ser vista.
          <motion.div
            key="soccer-field"
            className={styles.contentWrapper}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }} // Um fade out mais rápido para o container
          >
            <SoccerFieldSVG />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showField && (
          <motion.div
            key="ball-and-logo"
            className={styles.contentWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 0.8 } }}
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
              <spotLight position={[-15, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
              <FootballSphere />
            </Canvas>
            <motion.div className={styles.textOverlay} variants={textContainerVariants} initial="hidden" animate="visible">
              <motion.h1 variants={logoVariants} className={styles.logo}>G5</motion.h1>
              <motion.p variants={taglineVariants} className={styles.tagline}>
                {tagline.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>{char}</motion.span>
                ))}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}