import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Optimized background: CSS gradients for stars + lightweight SVG ribbons.
 * On mobile (<768px) or prefers-reduced-motion, the SVG filter (feGaussianBlur)
 * is removed and ribbon count is halved to prevent GPU strain and dropped frames.
 */
export default function BackgroundRibbons() {
  const svgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsMobile(mql.matches);
    setPrefersReducedMotion(motionMql.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handleChange);
    motionMql.addEventListener('change', handleMotionChange);

    return () => {
      mql.removeEventListener('change', handleChange);
      motionMql.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion) return;

    // Single lightweight animation — strokeDashoffset scroll for all ribbons
    const anim = gsap.to('.ribbon', {
      strokeDashoffset: -600,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });
    return () => anim.kill();
  }, [prefersReducedMotion]);

  const shouldSimplify = isMobile || prefersReducedMotion;
  const filterAttr = shouldSimplify ? undefined : 'url(#glow)';

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden w-full h-full">
      {/* Starfield — CSS background pattern (GPU-accelerated, zero JS) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 15% 8%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 28% 14%, rgba(34,227,200,0.7), transparent),
            radial-gradient(1.5px 1.5px at 42% 5%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 57% 19%, rgba(255,212,61,0.7), transparent),
            radial-gradient(1px 1px at 71% 9%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 85% 15%, rgba(255,49,111,0.6), transparent),
            radial-gradient(1px 1px at 8% 35%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 94% 42%, rgba(5,140,255,0.6), transparent),
            radial-gradient(1px 1px at 33% 55%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 63% 68%, rgba(34,227,200,0.5), transparent),
            radial-gradient(1px 1px at 19% 78%, rgba(255,122,26,0.5), transparent),
            radial-gradient(1px 1px at 78% 84%, rgba(255,255,255,0.4), transparent)
          `,
          backgroundSize: '400px 400px',
          opacity: 0.65,
        }}
      />

      {/* Ambient radial glows — replaces heavy feGaussianBlur filters */}
      <div className="absolute top-[-10%] left-[30%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,227,200,0.07) 0%, transparent 70%)' }} />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,49,111,0.07) 0%, transparent 70%)' }} />
      {/* Skip some glows on mobile to reduce layer count */}
      {!shouldSimplify && (
        <>
          <div className="absolute top-[55%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(255,122,26,0.07) 0%, transparent 70%)' }} />
          <div className="absolute top-[80%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(5,140,255,0.07) 0%, transparent 70%)' }} />
        </>
      )}

      {/* SVG Aurora Ribbons — filter removed on mobile for GPU savings */}
      <svg
        ref={svgRef}
        className="w-full h-full mix-blend-screen"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1600 5000"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: shouldSimplify ? 0.5 : 0.75 }}
      >
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#058cff" stopOpacity="0.9" />
            <stop offset="22%" stopColor="#21e6d7" stopOpacity="0.9" />
            <stop offset="44%" stopColor="#f6ce28" stopOpacity="0.9" />
            <stop offset="66%" stopColor="#ff7a1a" stopOpacity="0.9" />
            <stop offset="88%" stopColor="#ff316f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0878ff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#058cff" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#ff316f" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f6ce28" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#21e6d7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0878ff" stopOpacity="0.9" />
          </linearGradient>
          {/* Only include the costly blur filter on desktop */}
          {!shouldSimplify && (
            <filter id="glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="18" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          )}
        </defs>

        {/* Ribbon 1 — Hero */}
        <path
          className="ribbon"
          d="M -150 150 C 130 -50 350 320 630 150 S 1080 30 1340 200 S 1600 300 1780 100"
          filter={filterAttr}
          stroke="url(#g1)"
          strokeWidth={shouldSimplify ? '36' : '52'}
          strokeLinecap="round"
          strokeDasharray="4000"
          strokeDashoffset="0"
        />

        {/* Ribbon 2 — What Is Hacklanta */}
        <path
          className="ribbon"
          d="M -150 600 C 90 390 360 830 680 580 S 1120 390 1390 650 S 1630 790 1780 560"
          filter={filterAttr}
          stroke="url(#g2)"
          strokeWidth={shouldSimplify ? '32' : '48'}
          strokeLinecap="round"
          strokeDasharray="4000"
          strokeDashoffset="0"
        />

        {/* Ribbon 3 — Tracks (skipped on mobile) */}
        {!shouldSimplify && (
          <path
            className="ribbon"
            d="M -180 1180 C 125 920 420 1300 750 1040 S 1220 910 1480 1120 S 1670 1260 1790 1030"
            filter={filterAttr}
            stroke="url(#g1)"
            strokeWidth="44"
            strokeLinecap="round"
            strokeDasharray="4000"
            strokeDashoffset="0"
          />
        )}

        {/* Ribbon 4 — Prizes area */}
        <path
          className="ribbon"
          d="M 1800 2000 C 1300 2180 650 1900 320 2300 C -80 2720 450 2980 950 2820 C 1450 2660 1700 3060 1250 3360"
          filter={filterAttr}
          stroke="url(#g2)"
          strokeWidth={shouldSimplify ? '30' : '46'}
          strokeLinecap="round"
          strokeDasharray="5000"
          strokeDashoffset="0"
        />

        {/* Ribbon 5 — Sponsors (skipped on mobile) */}
        {!shouldSimplify && (
          <path
            className="ribbon"
            d="M -150 3480 C 420 3320 950 3770 1420 3570 C 1700 3440 1550 4070 1000 4220 C 450 4370 120 4070 -100 4470"
            filter={filterAttr}
            stroke="url(#g1)"
            strokeWidth="42"
            strokeLinecap="round"
            strokeDasharray="5000"
            strokeDashoffset="0"
          />
        )}

        {/* Ribbon 6 — FAQ/Footer (skipped on mobile) */}
        {!shouldSimplify && (
          <path
            className="ribbon"
            d="M 1750 4500 C 1220 4670 650 4440 250 4820 C -120 5170 750 5370 1350 5200"
            filter={filterAttr}
            stroke="url(#g2)"
            strokeWidth="44"
            strokeLinecap="round"
            strokeDasharray="4000"
            strokeDashoffset="0"
          />
        )}
      </svg>
    </div>
  );
}
