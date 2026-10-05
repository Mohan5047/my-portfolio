import React from 'react';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { useMultiverse } from '../context/MultiverseContext';
import { Shield, Download, Send, Check } from 'lucide-react';

export const Resume: React.FC = () => {
  const sectionRef = useSectionObserver('resume');
  const { scrollToSection } = useMultiverse();

  return (
    <section ref={sectionRef} id="resume" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <Shield size={16} />
            <span>NODE 07 // INTEL DOSSIER</span>
          </span>
          <h2 className="station-headline">
            Classified <span className="gradient-accent">Intelligence</span>
          </h2>
          <p className="station-subline">
            Comprehensive summary of professional capabilities, engineering qualifications, and resume dossier.
          </p>
        </div>

        <div className="multiverse-glass-card intel-dossier-card">
          <div className="dossier-narrative-side">
            <h3 className="dossier-title">Dossier Summary // Mohaneshwaran M</h3>
            <p className="dossier-overview">
              Quantitative analytics developer and software engineer skilled in predictive modeling, SQL database optimization, data storytelling, and real-time AI solutions. Dedicated to building reliable, high-performance systems for real-world impact.
            </p>

            <div className="dossier-spec-matrix">
              <div className="spec-item">
                <span className="spec-label">EDUCATION</span>
                <strong className="spec-val">B.Tech / B.E. (Computer Science)</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">SPECIALIZATION</span>
                <strong className="spec-val">Data Analytics & AI Engineering</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">AVAILABILITY</span>
                <strong className="spec-val">Placements, Internships & Roles</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">SECURITY CLEARANCE</span>
                <strong className="spec-val">
                  <span className="verified-badge"><Check size={12} /> Verified</span>
                </strong>
              </div>
            </div>
          </div>

          <div className="dossier-actions-side">
            <a
              href="mailto:mohaneshv32007@gmail.com?subject=Resume%20Request%20-%20Mohaneshwaran%20M"
              className="btn-multiverse btn-primary btn-full-width"
            >
              <Download size={18} />
              <span>[ REQUEST / DOWNLOAD RESUME ]</span>
            </a>

            <button
              type="button"
              className="btn-multiverse btn-secondary btn-full-width"
              onClick={() => scrollToSection('contact')}
            >
              <Send size={18} />
              <span>[ OPEN COMMS FREQUENCY ]</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
