import React from 'react';
import { motion } from 'framer-motion';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { useMultiverse } from '../context/MultiverseContext';
import { slideUpVariants, fadeInVariants } from '../animations/motion';
import { Crosshair, Shield, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  const sectionRef = useSectionObserver('home');
  const { scrollToSection } = useMultiverse();

  return (
    <section ref={sectionRef} id="home" className="multiverse-station hero-station">
      <div className="station-content-wrapper">
        <motion.div
          className="hero-central-card"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="hero-status-pill">
            <span className="live-dot" />
            <span>ORIGIN CORE // FULL-STACK & DATA ANALYTICS</span>
          </div>

          <motion.h1 className="hero-display-name" variants={slideUpVariants}>
            MOHANESHWARAN <span className="gradient-accent">M.</span>
          </motion.h1>

          <div className="hero-role-terminal">
            <Terminal size={20} className="terminal-icon" />
            <span className="role-text">Data Analytics & Full-Stack Developer</span>
          </div>

          <p className="hero-mission-statement">
            Architecting data-driven business intelligence platforms, predictive machine learning models, and real-world digital solutions using Python, SQL, statistical modeling, and modern web architectures.
          </p>

          <div className="hero-action-row">
            <button
              type="button"
              className="btn-multiverse btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              <Crosshair size={18} />
              <span>[ EXPLORE MISSIONS ]</span>
            </button>

            <button
              type="button"
              className="btn-multiverse btn-secondary"
              onClick={() => scrollToSection('resume')}
            >
              <Shield size={18} />
              <span>[ INTEL DOSSIER ]</span>
            </button>

            <a
              href="https://github.com/Mohan5047/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-multiverse btn-outline"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
              <span>GITHUB</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mohaneshwaran-m-936184327"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-multiverse btn-outline"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
              <span>LINKEDIN</span>
            </a>
          </div>

          <div className="hero-tech-orbit">
            <span className="orbit-chip">Python & Pandas</span>
            <span className="orbit-chip">SQL Relational Engine</span>
            <span className="orbit-chip">Power BI / Tableau</span>
            <span className="orbit-chip">Machine Learning</span>
            <span className="orbit-chip">React & TypeScript</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
