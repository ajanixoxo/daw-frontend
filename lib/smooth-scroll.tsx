"use client";

import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
  cancelAnimationFrame(rafId);
  (lenis as unknown as { destroy?: () => void }).destroy?.();
    };
  }, []);

  return <>{children}</>;
}