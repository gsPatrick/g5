// /src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

// Importando todos os componentes da nossa landing page
import Preloader from '@/components/Preloader/Preloader';
import Hero from '@/components/Hero/Hero';
import FounderSection from '@/components/FounderSection/FounderSection';
import MethodologySection from '@/components/MethodologySection/MethodologySection';
import QuoteSection from '@/components/QuoteSection/QuoteSection';
import ProfessionalStructure from '@/components/ProfessionalStructure/ProfessionalStructure';
import TransitionQuote from '@/components/TransitionQuote/TransitionQuote';
import PlayerShowcase from '@/components/PlayerShowcase/PlayerShowcase';
import Testimonials from '@/components/Testimonials/Testimonials';
import FinalCTA from '@/components/FinalCTA/FinalCTA';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um tempo de carregamento para a animação de introdução
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Libera o cursor e a rolagem após o preloader
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 6000); // Duração de 4 segundos

    // Bloqueia o cursor enquanto o preloader está ativo
    document.body.style.cursor = 'wait';

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.main 
            className={styles.mainContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* A sequência narrativa completa da landing page */}
          <Hero />
          <FounderSection />
          <MethodologySection />
          <QuoteSection />
          <ProfessionalStructure />
          <TransitionQuote />
          <PlayerShowcase />
          <Testimonials />
          <FinalCTA />
          <Footer />
        </motion.main>
      )}
    </div>
  );
}