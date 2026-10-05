import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMultiverse } from '../context/MultiverseContext';
import { fadeInVariants } from '../animations/motion';

export const Intro: React.FC = () => {
  const { isIntroComplete, completeIntro } = useMultiverse();
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('> INITIALIZING DEVELOPER MULTIVERSE...');

  useEffect(() => {
    if (isIntroComplete) return;

    const steps = [
      { text: '> DETECTING MULTIVERSE SINGULARITY POINT...', pct: 35, time: 400 },
      { text: '> EXPANDING CONNECTED TIMELINES & BRANCHES...', pct: 65, time: 900 },
      { text: '> SYNCHRONIZING ARSENAL & MISSION REPOSITORIES...', pct: 85, time: 1400 },
      { text: '> MULTIVERSE READY // WELCOME, MOHANESHWARAN', pct: 100, time: 1900 },
    ];

    const timeouts = steps.map((step) =>
      setTimeout(() => {
        setStatusText(step.text);
        setProgress(step.pct);
      }, step.time)
    );

    const finishTimeout = setTimeout(() => {
      completeIntro();
    }, 2400);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [isIntroComplete, completeIntro]);

  if (isIntroComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="intro-overlay"
        variants={fadeInVariants}
        initial="visible"
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
      >
        <div className="intro-core-box">
          <div className="singularity-dot" />
          <h1 className="intro-title">
            MOHANESHWARAN <span className="gradient-accent">MULTIVERSE</span>
          </h1>
          <p className="intro-stream">{statusText}</p>

          <div className="intro-bar-track">
            <div className="intro-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <button
            type="button"
            className="intro-skip-button"
            onClick={completeIntro}
            aria-label="Skip Intro Sequence"
          >
            [ SKIP TO MULTIVERSE ]
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
