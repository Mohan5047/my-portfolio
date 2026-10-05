import React, { useState } from 'react';
import { useSectionObserver } from '../hooks/useSectionObserver';
import { Radio, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const sectionRef = useSectionObserver('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', topic: '', message: '' });
    }, 6000);
  };

  return (
    <section ref={sectionRef} id="contact" className="multiverse-station">
      <div className="station-content-wrapper">
        <div className="station-header-block">
          <span className="station-tag">
            <Radio size={16} />
            <span>NODE 08 // CONVERGENCE</span>
          </span>
          <h2 className="station-headline">
            Open <span className="gradient-accent">Frequencies</span>
          </h2>
          <p className="station-subline">
            Ready to collaborate, engineer meaningful data platforms, or discuss software opportunities? Transmit a direct frequency payload.
          </p>
        </div>

        <div className="convergence-layout-grid">
          {/* Direct Frequency Nodes */}
          <div className="frequencies-stack">
            <a
              href="mailto:mohaneshv32007@gmail.com"
              className="multiverse-glass-card frequency-card"
            >
              <div className="freq-icon-wrapper"><Mail size={20} /></div>
              <div className="freq-details">
                <span className="freq-type">DIRECT FREQUENCY</span>
                <strong className="freq-val">mohaneshv32007@gmail.com</strong>
              </div>
            </a>

            <a
              href="tel:+918807050831"
              className="multiverse-glass-card frequency-card"
            >
              <div className="freq-icon-wrapper"><Phone size={20} /></div>
              <div className="freq-details">
                <span className="freq-type">DIRECT LINE</span>
                <strong className="freq-val">+91 8807050831</strong>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/mohaneshwaran-m-936184327"
              target="_blank"
              rel="noopener noreferrer"
              className="multiverse-glass-card frequency-card"
            >
              <div className="freq-icon-wrapper"><LinkedinIcon size={20} /></div>
              <div className="freq-details">
                <span className="freq-type">LINKEDIN FREQUENCY</span>
                <strong className="freq-val">Mohaneshwaran M</strong>
              </div>
            </a>

            <a
              href="https://github.com/Mohan5047/"
              target="_blank"
              rel="noopener noreferrer"
              className="multiverse-glass-card frequency-card"
            >
              <div className="freq-icon-wrapper"><GithubIcon size={20} /></div>
              <div className="freq-details">
                <span className="freq-type">GITHUB REPOSITORIES</span>
                <strong className="freq-val">Mohan5047</strong>
              </div>
            </a>

            <div className="multiverse-glass-card frequency-card" style={{ cursor: 'default' }}>
              <div className="freq-icon-wrapper"><MapPin size={20} /></div>
              <div className="freq-details">
                <span className="freq-type">BASE LOCATION</span>
                <strong className="freq-val">Tamil Nadu, India</strong>
              </div>
            </div>
          </div>

          {/* Transmission Console Form */}
          <div className="multiverse-glass-card transmission-console-card">
            <form onSubmit={handleSubmit} className="console-form">
              <div className="form-field-group">
                <label htmlFor="name-input">SENDER IDENTIFICATION *</label>
                <input
                  id="name-input"
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson // Recruiter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="multiverse-text-input"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="email-input">RETURN FREQUENCY (EMAIL) *</label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="e.g. alex@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="multiverse-text-input"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="topic-input">TRANSMISSION TOPIC</label>
                <input
                  id="topic-input"
                  type="text"
                  placeholder="Data Analytics Role / Project Opportunity"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="multiverse-text-input"
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="message-input">TRANSMISSION PAYLOAD *</label>
                <textarea
                  id="message-input"
                  required
                  placeholder="Enter your message transmission payload here..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="multiverse-text-input"
                />
              </div>

              <button type="submit" className="btn-multiverse btn-primary btn-full-width">
                <Send size={18} />
                <span>[ TRANSMIT FREQUENCY ]</span>
              </button>

              {isSubmitted && (
                <div className="transmission-feedback-alert">
                  <CheckCircle2 size={18} />
                  <span>TRANSMISSION DELIVERED: Message received by Mohaneshwaran M. I will respond promptly!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Multiverse Minimal Footer */}
        <footer className="multiverse-footer">
          <p className="footer-copyright">
            &copy; 2026 Mohaneshwaran M. Engineered as a Connected React/TypeScript Multiverse.
          </p>
        </footer>
      </div>
    </section>
  );
};
