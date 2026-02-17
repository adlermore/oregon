'use client';
import { useEffect, useRef } from 'react';

interface UseScrollSectionOptions {
  linkClass: string;
  visibleClass: string;
  hash?: string;
}

export function useScrollSection({
  linkClass,
  visibleClass,
  hash,
}: UseScrollSectionOptions) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  };

  useEffect(() => {
    const clickableElement = document.querySelector(`.${linkClass}`);
    if (clickableElement) {
      clickableElement.addEventListener('click', scrollToSection);
    }

    return () => {
      if (clickableElement) {
        clickableElement.removeEventListener('click', scrollToSection);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add(visibleClass);
        } else {
          document.body.classList.remove(visibleClass);
          if (hash && window.location.hash === hash) {
            history.replaceState(null, '', window.location.pathname);
          }
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      document.body.classList.remove(visibleClass);
      if (hash && window.location.hash === hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    };
  }, [hash, visibleClass]);

  return sectionRef;
}