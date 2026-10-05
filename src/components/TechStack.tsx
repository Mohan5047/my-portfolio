import React, { useState } from 'react';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { Cpu, Terminal, LineChart, Network, Sparkles } from 'lucide-react';

interface TechNode {
  name: string;
  category: 'core' | 'analytics' | 'bi' | 'engineering';
  desc: string;
}

const techNodesList: TechNode[] = [
  // Analytics & Core
  { name: 'Python (Pandas, NumPy)', category: 'analytics', desc: 'Data cleaning, tabular transformations, numerical vectors' },
  { name: 'SQL & Relational DBs', category: 'analytics', desc: 'Complex joins, window functions, schema architecture' },
  { name: 'Machine Learning (Scikit-Learn)', category: 'analytics', desc: 'Supervised regression, classification, clustering' },
  { name: 'Statistical Hypothesis Testing', category: 'analytics', desc: 'A/B testing, variance analysis, confidence intervals' },

  // BI & Visualization
  { name: 'Power BI & Tableau', category: 'bi', desc: 'Enterprise data storytelling, DAX, KPI telemetry' },
  { name: 'Interactive Dashboards', category: 'bi', desc: 'Real-time monitoring, multi-dimensional filtering' },
  { name: 'Chart.js & D3.js', category: 'bi', desc: 'Custom web graphics, radar charts, trend curves' },

  // Data Engineering & AI
  { name: 'ETL Preprocessing Pipelines', category: 'engineering', desc: 'Automated batching, validation, error mitigation' },
  { name: 'Generative AI & LLM Rubrics', category: 'engineering', desc: 'Prompt engineering, structured outputs, sentiment scoring' },
  { name: 'Git & Version Control', category: 'engineering', desc: 'Branching strategy, collaborative repositories, CI/CD' },
  { name: 'React & TypeScript', category: 'core', desc: 'Modern responsive SPAs, typed components, state architecture' },
  { name: 'REST APIs & Ingestion', category: 'engineering', desc: 'Asynchronous fetch, microservice integration' },
];

export const TechStack: React.FC = () => {
  const sectionRef = useSectionObserver('tech');
  const [activeTech, setActiveTech] = useState<TechNode | null>(techNodesList[0]);

  return (
    <section ref={sectionRef} id="tech" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <Cpu size={16} />
            <span>NODE 04 // ARSENAL</span>
          </span>
          <h2 className="station-headline">
            Technology <span className="gradient-accent">Constellation</span>
          </h2>
          <p className="station-subline">
            Interactive technological nodes spanning statistical analytics, machine learning algorithms, business intelligence dashboards, and full-stack engineering.
          </p>
        </div>

        <div className="tech-constellation-container">
          {/* Central Developer Core Station */}
          <div className="constellation-core-card multiverse-glass-card">
            <div className="core-badge">
              <Sparkles size={16} />
              <span>DEVELOPER CORE</span>
            </div>
            <h3 className="core-title">{activeTech ? activeTech.name : 'Select a Node'}</h3>
            <p className="core-desc">{activeTech ? activeTech.desc : 'Hover over any technology node in the constellation to inspect its operational role.'}</p>
          </div>

          {/* Categorized Constellation Grid */}
          <div className="constellation-sectors-grid">
            {/* Sector 1: Analytics & Modeling */}
            <div className="multiverse-glass-card sector-card">
              <div className="sector-header-line">
                <Terminal size={18} className="sector-icon" />
                <h4>Analytics & Modeling</h4>
              </div>
              <div className="sector-nodes-flow">
                {techNodesList
                  .filter((t) => t.category === 'analytics')
                  .map((tech) => (
                    <button
                      key={tech.name}
                      type="button"
                      className={`constellation-interactive-node ${activeTech?.name === tech.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveTech(tech)}
                      onClick={() => setActiveTech(tech)}
                    >
                      <span className="node-marker" />
                      <span className="node-title-label">{tech.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Sector 2: BI & Visualization */}
            <div className="multiverse-glass-card sector-card">
              <div className="sector-header-line">
                <LineChart size={18} className="sector-icon" />
                <h4>BI & Visualization</h4>
              </div>
              <div className="sector-nodes-flow">
                {techNodesList
                  .filter((t) => t.category === 'bi')
                  .map((tech) => (
                    <button
                      key={tech.name}
                      type="button"
                      className={`constellation-interactive-node ${activeTech?.name === tech.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveTech(tech)}
                      onClick={() => setActiveTech(tech)}
                    >
                      <span className="node-marker" />
                      <span className="node-title-label">{tech.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Sector 3: Data Pipelines & Full-Stack */}
            <div className="multiverse-glass-card sector-card">
              <div className="sector-header-line">
                <Network size={18} className="sector-icon" />
                <h4>Pipelines & Web Core</h4>
              </div>
              <div className="sector-nodes-flow">
                {techNodesList
                  .filter((t) => t.category === 'engineering' || t.category === 'core')
                  .map((tech) => (
                    <button
                      key={tech.name}
                      type="button"
                      className={`constellation-interactive-node ${activeTech?.name === tech.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveTech(tech)}
                      onClick={() => setActiveTech(tech)}
                    >
                      <span className="node-marker" />
                      <span className="node-title-label">{tech.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
