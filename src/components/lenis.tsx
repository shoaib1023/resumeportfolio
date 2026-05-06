// In LenisScroll.tsx — export the lenis instance
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export const lenisInstance = { current: null as Lenis | null };

export default function LenisScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            anchors: true,
        });

        lenisInstance.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisInstance.current = null;
        };
    }, []);

    return null;
}