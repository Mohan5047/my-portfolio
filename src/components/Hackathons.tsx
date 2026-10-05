import React from 'react';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { HackathonRecord } from '../types/multiverse';
import { Trophy, Code2, ShieldCheck, Clock } from 'lucide-react';

const verifiedRecords: HackathonRecord[] = [
  {
    metric: '15',
    value: 15,
    suffix: '+',
    label: 'Missions Completed',
    detail: 'Analytics models, full-stack applications, and research prototypes deployed.',
  },
  {
    metric: '500',
    value: 500,
    suffix: '+',
    label: 'GitHub Commits & Contribs',
    detail: 'Continuous operational version control contributions across repositories.',
  },
  {
    metric: '100',
    value: 100,
    suffix: '%',
    label: 'Data Precision & Quality',
    detail: 'Rigorous validation standards across data transformation & ETL pipelines.',
  },
  {
    metric: '3',
    value: 3,
    suffix: '+',
    label: 'Years Operational Dev',
    detail: 'Hands-on programming, data science modeling, and web engineering.',
  },
];

export const Hackathons: React.FC = () => {
  const sectionRef = useSectionObserver('hackathons');

  const getRecordIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Trophy size={22} />;
      case 1:
        return <Code2 size={22} />;
      case 2:
        return <ShieldCheck size={22} />;
      case 3:
      default:
        return <Clock size={22} />;
    }
  };

  return (
    <section ref={sectionRef} id="hackathons" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <Trophy size={16} />
            <span>NODE 06 // HACKATHONS & RECORDS</span>
          </span>
          <h2 className="station-headline">
            Verified <span className="gradient-accent">Records</span>
          </h2>
          <p className="station-subline">
            Quantified engineering milestones, competition outputs, and operational delivery metrics.
          </p>
        </div>

        <div className="records-metric-grid">
          {verifiedRecords.map((rec, idx) => (
            <div key={rec.label} className="multiverse-glass-card record-card">
              <div className="record-icon-orbit">{getRecordIcon(idx)}</div>

              <div className="record-numeric-display">
                <span className="record-value-digits">{rec.metric}</span>
                {rec.suffix && <span className="record-value-suffix">{rec.suffix}</span>}
              </div>

              <h3 className="record-label-title">{rec.label}</h3>
              <p className="record-detail-text">{rec.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
