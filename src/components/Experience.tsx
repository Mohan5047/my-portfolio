import React from 'react';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { ExperienceItem } from '../types/multiverse';
import { History, Calendar, GraduationCap, Award, Briefcase } from 'lucide-react';

const timelineMilestones: ExperienceItem[] = [
  {
    epoch: '2023 - PRESENT',
    title: 'Applied Data Analytics & AI Engineering',
    organization: 'Independent Deployments & Research',
    description:
      'Engineering analytics platforms including CollabSphere, Ecova, and AI Interview Agent. Mastering Python data pipelines, SQL optimization, statistical analysis, and applied AI modeling.',
    type: 'operation',
  },
  {
    epoch: '2021 - 2025',
    title: 'Bachelor of Technology / Engineering in Computer Science',
    organization: 'University Higher Education',
    description:
      'Rigorous foundation in Database Management Systems (DBMS), Data Structures & Algorithms, Probability & Statistics, Computer Networks, and Software Engineering Methodologies.',
    type: 'education',
  },
  {
    epoch: '2024',
    title: 'Data Analytics & Version Control Training',
    organization: 'Technical Certifications & Applied Training',
    description:
      'Hands-on practical training covering automated ETL pipelines, Git collaboration workflows, relational SQL querying, and data visualization architectures.',
    type: 'certification',
  },
];

export const Experience: React.FC = () => {
  const sectionRef = useSectionObserver('experience');

  const getMilestoneIcon = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={18} />;
      case 'certification':
        return <Award size={18} />;
      case 'operation':
      default:
        return <Briefcase size={18} />;
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <History size={16} />
            <span>NODE 05 // TIMELINE</span>
          </span>
          <h2 className="station-headline">
            Operational <span className="gradient-accent">Timeline</span>
          </h2>
          <p className="station-subline">
            Chronological progression of technical deployments, research initiatives, and academic foundations.
          </p>
        </div>

        <div className="multiverse-flowing-timeline">
          <div className="timeline-connecting-spine" aria-hidden="true" />

          {timelineMilestones.map((item, idx) => (
            <div key={item.epoch + idx} className="timeline-node-station">
              <div className="timeline-node-bead">
                <span className="bead-inner-glow" />
              </div>

              <div className="multiverse-glass-card timeline-details-card">
                <div className="timeline-epoch-badge">
                  <Calendar size={14} />
                  <span>{item.epoch}</span>
                </div>

                <div className="timeline-title-row">
                  <div className="type-icon-wrapper">{getMilestoneIcon(item.type)}</div>
                  <div>
                    <h3 className="timeline-item-title">{item.title}</h3>
                    <h4 className="timeline-item-org">{item.organization}</h4>
                  </div>
                </div>

                <p className="timeline-item-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
