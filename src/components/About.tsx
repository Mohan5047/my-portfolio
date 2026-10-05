import React from 'react';
import { motion } from 'framer-motion';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { slideUpVariants, fadeInVariants } from '../animations/motion';
import { Fingerprint, LineChart, Boxes, Database, Brain } from 'lucide-react';

export const About: React.FC = () => {
  const sectionRef = useSectionObserver('about');

  return (
    <section ref={sectionRef} id="about" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <Fingerprint size={16} />
            <span>NODE 02 // IDENTITY</span>
          </span>
          <h2 className="station-headline">
            Developer <span className="gradient-accent">Identity</span>
          </h2>
          <p className="station-subline">
            Engineering analytical platforms, quantitative data models, and scalable software systems with statistical rigor and clean architecture.
          </p>
        </div>

        <motion.div
          className="identity-layout-grid"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Narrative Story */}
          <div className="multiverse-glass-card narrative-card">
            <h3>Multiverse Engineer</h3>
            <p>
              I am <strong>Mohaneshwaran M</strong>, a data analytics specialist and software engineer based in Tamil Nadu, India. I specialize in turning complex multi-dimensional datasets into high-value business intelligence, automated workflows, and applied machine learning models.
            </p>
            <p>
              My engineering approach bridges robust backend data ingestion pipelines, optimized SQL queries, and interactive KPI visualizations. I have architected systems ranging from collaborative workspace telemetry (<strong>CollabSphere</strong>) and environmental sustainability intelligence (<strong>Ecova</strong>) to intelligent speech analytics (<strong>AI Interview Agent</strong>).
            </p>
            <p>
              Whether building predictive models in Python or deploying interactive dashboards, my focus is always on data integrity, statistical rigor, and scalable code.
            </p>
          </div>

          {/* Telemetry Specs */}
          <div className="multiverse-glass-card telemetry-specs-card">
            <div className="spec-item">
              <span className="spec-label">PRIMARY ROLE</span>
              <strong className="spec-val">Data Analytics Specialist & Software Engineer</strong>
            </div>
            <div className="spec-item">
              <span className="spec-label">CORE FOCUS</span>
              <strong className="spec-val">Predictive Analytics • Business Intelligence • AI Solutions</strong>
            </div>
            <div className="spec-item">
              <span className="spec-label">CURRENT MODE</span>
              <strong className="spec-val">Building, Analyzing & Deploying</strong>
            </div>
            <div className="spec-item">
              <span className="spec-label">GEOGRAPHIC TELEMETRY</span>
              <strong className="spec-val">Tamil Nadu, India • GMT +5:30</strong>
            </div>
            <div className="spec-item">
              <span className="spec-label">ARSENAL SUMMARY</span>
              <strong className="spec-val">Python • SQL • Machine Learning • Power BI • React</strong>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <motion.div className="pillar-tile multiverse-glass-card" variants={slideUpVariants}>
            <div className="pillar-icon-box"><LineChart size={22} /></div>
            <h4>Predictive Analytics</h4>
            <p>Designing time-series models, regression pipelines, and anomaly detection algorithms.</p>
          </motion.div>

          <motion.div className="pillar-tile multiverse-glass-card" variants={slideUpVariants}>
            <div className="pillar-icon-box"><Boxes size={22} /></div>
            <h4>Business Intelligence</h4>
            <p>Transforming complex dimensional tables into real-time KPI telemetry dashboards.</p>
          </motion.div>

          <motion.div className="pillar-tile multiverse-glass-card" variants={slideUpVariants}>
            <div className="pillar-icon-box"><Database size={22} /></div>
            <h4>SQL & ETL Pipelines</h4>
            <p>Automating data extraction, transformations, schema design, and high-speed query execution.</p>
          </motion.div>

          <motion.div className="pillar-tile multiverse-glass-card" variants={slideUpVariants}>
            <div className="pillar-icon-box"><Brain size={22} /></div>
            <h4>Applied AI & NLP</h4>
            <p>Integrating speech analysis, sentiment evaluation, and LLM-driven intelligence rubrics.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
