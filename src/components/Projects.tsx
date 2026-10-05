import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { ProjectItem } from '../types/multiverse';
import { Atom, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

const realProjects: ProjectItem[] = [
  {
    id: 'collabsphere',
    title: 'CollabSphere',
    subtitle: 'Collaborative Workspace & Team Velocity Telemetry',
    category: 'analytics',
    description:
      'CollabSphere is an enterprise-grade collaborative workspace and operational telemetry platform. It unifies project task flows with automated productivity analytics, tracking developer velocity, task dependencies, and workload distribution in real time.',
    image: './assets/project1.png',
    tags: ['Python', 'SQL', 'Data Analytics', 'Chart.js', 'WebSockets'],
    features: [
      'Real-time multi-user task synchronization and collaborative kanban boards',
      'Sprint velocity telemetry with automated burn-down and burn-up trajectory charts',
      'SQL-driven analytics query engine for historical team performance metrics',
      'Interactive workload balance heatmaps to detect and prevent team bottlenecks',
      'Customizable KPI summary reports for engineering and project leadership',
    ],
    githubUrl: 'https://github.com/Mohan5047/',
    liveUrl: '#',
    status: 'OPERATIONAL',
  },
  {
    id: 'ecova',
    title: 'Ecova',
    subtitle: 'Smart Sustainability & Carbon Footprint Data Platform',
    category: 'ai',
    description:
      'Ecova is an environmental data intelligence platform engineered to quantify, forecast, and optimize facility carbon emissions and power consumption. It ingests multi-source sensor and utility datasets to deliver actionable decarbonization insights.',
    image: './assets/project2.png',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Time Series', 'ESG Compliance'],
    features: [
      'Time-series predictive modeling forecasting facility energy demand and peak loads',
      'Automated carbon emission metric conversions across Scope 1, 2, and 3 activities',
      'Anomaly detection algorithms identifying irregular power consumption spikes',
      'Dynamic ESG compliance dashboards with interactive data visualization',
      'High-performance data cleaning and statistical modeling pipelines in Python',
    ],
    githubUrl: 'https://github.com/Mohan5047/',
    liveUrl: '#',
    status: 'DEPLOYED',
  },
  {
    id: 'ai-interview',
    title: 'AI Interview Agent',
    subtitle: 'Automated Candidate Evaluation & Speech Analytics Engine',
    category: 'ai',
    description:
      'An AI-powered candidate interview assessment system. The agent conducts dynamic, context-aware technical interviews, evaluates candidate response depth, analyzes speech cadence and sentiment, and compiles structured analytical scorecards.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tags: ['Generative AI', 'NLP & LLMs', 'Speech Analytics', 'Sentiment Scoring', 'Python'],
    features: [
      'Dynamic question generation tailored to role requirements and candidate answers',
      'Audio speech-to-text processing with sentiment, tone, and confidence analytics',
      'Automated answer benchmarking against comprehensive technical rubrics',
      'Instant candidate hiring scorecard generation with radar charts and competency breakdowns',
      'Objective, bias-mitigated evaluation algorithms ensuring data-backed talent acquisition',
    ],
    githubUrl: 'https://github.com/Mohan5047/',
    liveUrl: '#',
    status: 'OPERATIONAL',
  },
];

export const Projects: React.FC = () => {
  const sectionRef = useSectionObserver('projects');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = realProjects.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section ref={sectionRef} id="projects" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <Atom size={16} />
            <span>NODE 03 // MISSIONS</span>
          </span>
          <h2 className="station-headline">
            Flagship <span className="gradient-accent">Missions</span>
          </h2>
          <p className="station-subline">
            Explore dedicated sub-universes spanning team workspace telemetry, smart environmental analytics, and AI candidate evaluation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="projects-filter-bar">
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            [ ALL MISSIONS ]
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveFilter('analytics')}
          >
            [ ANALYTICS & BI ]
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ai')}
          >
            [ AI & ML ]
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-cards-grid">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="multiverse-glass-card project-universe-card">
              <div className="card-media-viewport">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="media-hover-overlay">
                  <button
                    type="button"
                    className="btn-multiverse btn-primary btn-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    [ VIEW MISSION INTEL ]
                  </button>
                </div>
              </div>

              <div className="card-content-body">
                <div className="card-meta-line">
                  <span className="mission-index-badge">MISSION // 0{idx + 1}</span>
                  <span className="status-badge">{project.status}</span>
                </div>

                <h3 className="card-project-title">{project.title}</h3>
                <p className="card-project-desc">{project.description}</p>

                <div className="project-tags-cluster">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="card-footer-action-bar">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-text-link"
                  >
                    <GithubIcon size={16} />
                    <span>REPOSITORY</span>
                  </a>

                  <button
                    type="button"
                    className="card-text-link highlight"
                    onClick={() => setSelectedProject(project)}
                  >
                    <ExternalLink size={16} />
                    <span>INTEL</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="multiverse-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="multiverse-modal-dialog"
                initial={{ scale: 0.94, opacity: 0, y: 25 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close Project Intel"
                >
                  <X size={20} />
                </button>

                <div className="modal-banner-img">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>

                <div className="modal-inner-content">
                  <h3 className="modal-project-heading">{selectedProject.title}</h3>
                  <div className="project-tags-cluster modal-tags">
                    {selectedProject.tags.map((t) => (
                      <span key={t} className="tech-tag-chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="modal-narrative">{selectedProject.description}</p>

                  <h4 className="modal-subheading">Key Architecture & Operational Features:</h4>
                  <ul className="modal-feature-list">
                    {selectedProject.features.map((feat) => (
                      <li key={feat}>
                        <CheckCircle2 size={16} className="feature-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="modal-action-row">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-multiverse btn-primary"
                    >
                      <GithubIcon size={18} />
                      <span>GITHUB REPOSITORY</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
