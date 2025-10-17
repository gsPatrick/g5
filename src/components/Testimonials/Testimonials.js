// /src/components/Testimonials/Testimonials.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Testimonials.module.css';

// Swiper e módulos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const testimonialsData = [
  // ... (os dados permanecem os mesmos)
  { image: '/images/testemunho.jpg', quote: "A disciplina e o foco que meu filho desenvolveu na G5 vão muito além do futebol. É uma transformação para a vida.", name: "Roberto Almeida", relation: "Pai do Atleta Gabriel, Sub-17" },
  { image: '/images/testemunho.jpg', quote: "A estrutura é de nível profissional. Sinto que estou no ambiente certo para evoluir e alcançar meus sonhos.", name: "Lucas Martins", relation: "Atleta G5, Sub-15" },
  { image: '/images/testemunho.jpg', quote: "Ver a confiança da minha filha crescer a cada treino não tem preço. A metodologia G5 realmente funciona.", name: "Carla Ferreira", relation: "Mãe da Atleta Sofia, Sub-14" },
];

// Variantes de animação
const containerVariants = {
  active: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  inactive: { opacity: 0 },
};

const itemVariants = {
  active: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  inactive: { opacity: 0, x: -30 },
};

const imageVariants = {
  active: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  inactive: { opacity: 0, scale: 1.05 },
};

export default function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{ delay: 7000, disableOnInteraction: true }}
        speed={1000}
        className={styles.swiperContainer}
      >
        {testimonialsData.map((testimonial, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            {({ isActive }) => (
              <div className={styles.slideContent}>
                
                {/* Coluna da Esquerda: Texto */}
                <motion.div 
                  className={styles.textContainer}
                  variants={containerVariants}
                  animate={isActive ? 'active' : 'inactive'}
                  initial="inactive"
                >
                  <motion.blockquote variants={itemVariants} className={styles.quote}>
                    “{testimonial.quote}”
                  </motion.blockquote>
                  <motion.div variants={itemVariants} className={styles.author}>
                    <p className={styles.name}>{testimonial.name}</p>
                    <p className={styles.relation}>{testimonial.relation}</p>
                  </motion.div>
                </motion.div>

                {/* Coluna da Direita: Imagem */}
                <motion.div 
                  className={styles.imageContainer}
                  variants={imageVariants}
                  animate={isActive ? 'active' : 'inactive'}
                  initial="inactive"
                >
                  <Image 
                    src={testimonial.image || '/images/placeholder.jpg'}
                    alt={`Depoimento de ${testimonial.name}`}
                    layout="fill" 
                    objectFit="cover" 
                  />
                </motion.div>
                
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}