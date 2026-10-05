import { useEffect, useRef } from 'react';
import { SectionId, SectionState } from '../types/multiverse';
import { useMultiverse } from '../context/MultiverseContext';

export const useSectionObserver = (sectionId: SectionId) => {
  const ref = useRef<HTMLElement | null>(null);
  const { setSectionState } = useMultiverse();

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    let lastRatio = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;

          let state: SectionState = 'idle';

          if (ratio >= 0.45) {
            state = 'active';
          } else if (isIntersecting && ratio > lastRatio) {
            state = 'entering';
          } else if (isIntersecting && ratio <= lastRatio) {
            state = 'leaving';
          } else {
            state = 'idle';
          }

          lastRatio = ratio;
          setSectionState(sectionId, state);
        });
      },
      {
        threshold: [0, 0.2, 0.45, 0.7, 1.0],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, setSectionState]);

  return ref;
};
