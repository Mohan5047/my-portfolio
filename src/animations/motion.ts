import { Variants, Transition } from 'framer-motion';

// Standard physics-inspired transition curves
export const spatialTransition: Transition = {
  duration: 0.65,
  ease: [0.16, 1, 0.3, 1],
};

export const snappyTransition: Transition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
};

// Reusable Motion Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: spatialTransition,
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spatialTransition,
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spatialTransition,
  },
};

export const revealStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const nodeActivationVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 0.6,
    filter: 'drop-shadow(0 0 0px rgba(99, 102, 241, 0))',
  },
  active: {
    scale: 1.15,
    opacity: 1,
    filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.6))',
    transition: snappyTransition,
  },
};

export const glowPulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
