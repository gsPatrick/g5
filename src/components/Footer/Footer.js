// /src/components/Footer/Footer.js
'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiYoutube, FiFacebook } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <motion.footer 
      className={styles.footerSection}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.footerWrapper}>
        <div className={styles.footerGrid}>
          {/* Coluna 1: Logo e Endereço */}
          <motion.div variants={itemVariants} className={styles.footerColumn}>
            <h3 className={styles.logoText}>G5 FUTEBOL</h3>
            <p className={styles.address}>
              Av. das Nações, 1234, Campo Belo<br />
              São Paulo, SP - Brasil
            </p>
            <a href="#" className={styles.linkWithIcon}>
              <FiMapPin /> Veja como chegar
            </a>
          </motion.div>

          {/* Coluna 2: Contato */}
          <motion.div variants={itemVariants} className={styles.footerColumn}>
            <p className={styles.infoTitle}>Contato Direto</p>
            <a href="tel:+5511999998888" className={styles.mainInfo}><FiPhone /> (11) 99999-8888</a>
            <a href="mailto:contato@g5futebol.com" className={styles.mainInfo}><FiMail /> contato@g5futebol.com</a>
          </motion.div>

          {/* Coluna 3: Redes Sociais */}
          <motion.div variants={itemVariants} className={styles.footerColumn}>
            <p className={styles.infoTitle}>Siga a Jornada</p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Youtube"><FiYoutube /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
            </div>
          </motion.div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} G5 Futebol. Todos os direitos reservados.</p>
          <a href="#">Política de Privacidade</a>
        </div>
      </div>
    </motion.footer>
  );
}