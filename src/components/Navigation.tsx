import React from 'react';
import { useMultiverse } from '../context/MultiverseContext';
import { SectionId, MultiverseNode } from '../types/multiverse';
import {
  Compass,
  User,
  FolderGit2,
  Cpu,
  History,
  Trophy,
  FileText,
  Radio,
  Volume2,
  VolumeX,
  Sun,
  Moon,
} from 'lucide-react';

const multiverseNodes: MultiverseNode[] = [
  { id: 'home', label: 'Origin', tag: 'HOME', iconName: 'Compass', pathOrder: 1 },
  { id: 'about', label: 'Identity', tag: 'ABOUT', iconName: 'User', pathOrder: 2 },
  { id: 'projects', label: 'Missions', tag: 'PROJECTS', iconName: 'FolderGit2', pathOrder: 3 },
  { id: 'tech', label: 'Arsenal', tag: 'TECH', iconName: 'Cpu', pathOrder: 4 },
  { id: 'experience', label: 'Timeline', tag: 'EXPERIENCE', iconName: 'History', pathOrder: 5 },
  { id: 'hackathons', label: 'Records', tag: 'HACKATHONS', iconName: 'Trophy', pathOrder: 6 },
  { id: 'resume', label: 'Intel', tag: 'RESUME', iconName: 'FileText', pathOrder: 7 },
  { id: 'contact', label: 'Comms', tag: 'CONTACT', iconName: 'Radio', pathOrder: 8 },
];

export const Navigation: React.FC = () => {
  const {
    activeSection,
    scrollToSection,
    isAudioEnabled,
    toggleAudio,
    theme,
    toggleTheme,
  } = useMultiverse();

  const renderIcon = (name: string, size = 15) => {
    switch (name) {
      case 'Compass':
        return <Compass size={size} />;
      case 'User':
        return <User size={size} />;
      case 'FolderGit2':
        return <FolderGit2 size={size} />;
      case 'Cpu':
        return <Cpu size={size} />;
      case 'History':
        return <History size={size} />;
      case 'Trophy':
        return <Trophy size={size} />;
      case 'FileText':
        return <FileText size={size} />;
      case 'Radio':
        return <Radio size={size} />;
      default:
        return <Compass size={size} />;
    }
  };

  const handleNavClick = (id: SectionId, e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <>
      {/* Top Floating Telemetry Header */}
      <header className="multiverse-top-telemetry">
        <div className="telemetry-badge">
          <span className="live-dot" />
          <span>MOHANESHWARAN // MULTIVERSE</span>
        </div>

        <div className="telemetry-node-tag">
          NODE // <span className="active-tag">{activeSection.toUpperCase()}</span>
        </div>
      </header>

      {/* Floating Bottom Navigation Dock */}
      <nav className="multiverse-nav-dock" aria-label="Multiverse Node Navigation">
        {multiverseNodes.map((node) => {
          const isActive = activeSection === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`dock-node-link ${isActive ? 'active' : ''}`}
              onClick={(e) => handleNavClick(node.id, e)}
              aria-label={`Travel to ${node.label} node`}
              title={`${node.tag} (${node.label})`}
            >
              <span className="node-icon-wrapper">{renderIcon(node.iconName)}</span>
              <span className="node-text-label">{node.label}</span>
              <span className="node-orbital-dot" />
            </button>
          );
        })}

        <div className="dock-separator" aria-hidden="true" />

        {/* Audio Toggle */}
        <button
          type="button"
          className="dock-tool-btn"
          onClick={toggleAudio}
          title={isAudioEnabled ? 'Audio Feedback: Active' : 'Audio Feedback: Muted'}
          aria-label="Toggle UI Audio Feedback"
        >
          {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          className="dock-tool-btn"
          onClick={toggleTheme}
          title="Toggle Workstation Theme"
          aria-label="Toggle Theme Mode"
        >
          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </nav>
    </>
  );
};
