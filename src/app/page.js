// /src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// NOSSOS NOVOS COMPONENTES PARA A ANIMAÇÃO DE SOBREPOSIÇÃO
import StackingScrollContainer from '@/components/StackingScrollContainer/StackingScrollContainer';
import InfoStackSection from '@/components/InfoStackSection/InfoStackSection';

// ESTRUTURA DE DADOS FINAL, SEM ÍCONES E COM TEXTO AJUSTADO
const stackedInfoData = [
    {
        type: 'headline',
        text: ['O FUTURO DO SEU FILHO NO FUTEBOL', 'COMEÇA COM A DECISÃO DE HOJE'],
    },
    {
        type: 'card',
        paragraphs: [
            'No futebol moderno, o sucesso está ligado à qualidade da formação inicial, onde se constrói a base técnica, cognitiva e comportamental que sustenta toda uma carreira.',
        ],
    },
    {
        type: 'headline',
        text: ['METODOLOGIA PRÓPRIA E EXCLUSIVA', 'PARA TRANSFORMAR POTENCIAL EM RESULTADO'],
    },
    {
        type: 'headline',
        text: ['A JANELA DOS 7 AOS 14 ANOS', 'É FUNDAMENTAL E IRREVERSÍVEL.'],
    },
    {
        type: 'card',
        paragraphs: [
            'É nesta janela de tempo que se definem os alicerces do futuro. Adiar a preparação significa comprometer o potencial do atleta para sempre.',
        ],
    },
    {
        type: 'headline',
        text: ['O COMPROMISSO DO G5:', 'FORMAR ATLETAS COMPLETOS.'],
    },
];

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula um tempo de carregamento para a animação de introdução
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Libera o cursor e a rolagem após o preloader
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 6000); // Duração de 6 segundos

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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Seção Hero, que permanece como a primeira da página */}
                    <Hero />

                    {/* AQUI ENTRA NOSSA NOVA SEÇÃO ANIMADA DE SOBREPOSIÇÃO */}
                    <StackingScrollContainer>
                        {stackedInfoData.map((data, index) => (
                            <InfoStackSection
                                key={index}
                                type={data.type}
                                text={data.text}
                                paragraphs={data.paragraphs}
                            />
                        ))}
                    </StackingScrollContainer>

                    {/* A sequência original de componentes continua normalmente após a nova seção */}
                  
                    <MethodologySection />
                    <QuoteSection />
                    <ProfessionalStructure />
                    <TransitionQuote />
                    <PlayerShowcase />
                     <FounderSection />
                    <Testimonials />
                    <FinalCTA />
                    <Footer />
                </motion.div>
            )}
        </div>
    );
}