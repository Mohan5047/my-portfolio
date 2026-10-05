import React from 'react';
import { MultiverseProvider } from './context/MultiverseContext';
import { Intro } from './components/Intro';
import { MultiverseExperience } from './components/MultiverseExperience';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Experience } from './components/Experience';
import { Hackathons } from './components/Hackathons';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';

export const App: React.FC = () => {
  return (
    <MultiverseProvider>
      <Intro />
      <Navigation />
      <MultiverseExperience>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <Hackathons />
        <Resume />
        <Contact />
      </MultiverseExperience>
    </MultiverseProvider>
  );
};

export default App;
