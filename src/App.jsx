import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';

// Lazy-load heavy / below-fold components to shrink the initial bundle
const BackgroundRibbons = lazy(() => import('./components/BackgroundRibbons'));
const FloatingStickers = lazy(() => import('./components/FloatingStickers'));
const HeroLanyard3D = lazy(() => import('./components/HeroLanyard3D'));
const WhatIsHacklanta = lazy(() => import('./components/WhatIsHacklanta'));
const Tracks = lazy(() => import('./components/Tracks'));
const Prizes = lazy(() => import('./components/Prizes'));
const Sponsors = lazy(() => import('./components/Sponsors'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const ContactModal = lazy(() => import('./components/ContactModal'));
const LoginModal = lazy(() => import('./components/LoginModal'));
const PartnerModal = lazy(() => import('./components/PartnerModal'));

// Minimal spinner for Suspense boundaries
function SectionFallback() {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-white/20 border-t-accent-teal rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Scroll to hero section and trigger the lanyard flip to 8-step application form
  const handleOpenApply = (trackTitle) => {
    const hero = document.getElementById('home');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Dispatch custom event that HeroLanyard3D listens to
    window.dispatchEvent(
      new CustomEvent('open-apply-form', {
        detail: {
          track: typeof trackTitle === 'string' ? trackTitle : undefined,
        },
      })
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#04050D] text-white overflow-x-hidden selection:bg-accent-pink selection:text-white">
      {/* FIXED TOP NAVBAR — loaded eagerly (critical for LCP) */}
      <Navbar
        onOpenApply={() => handleOpenApply()}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* AMBIENT PSYCHEDELIC BACKGROUND RIBBONS */}
      <Suspense fallback={null}>
        <BackgroundRibbons />
      </Suspense>

      {/* FLOATING RETRO STICKERS (xl-only, lazy is fine) */}
      <Suspense fallback={null}>
        <FloatingStickers />
      </Suspense>

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 relative z-10">
        <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-8 py-6 sm:py-12 flex flex-col gap-20 sm:gap-36">
          {/* SECTION 1: HERO LANYARD 3D + 8-STEP FLIP REGISTRATION FORM */}
          <Suspense fallback={<SectionFallback />}>
            <HeroLanyard3D />
          </Suspense>

          {/* SECTION 2: WHAT IS HACKLANTA? */}
          <Suspense fallback={<SectionFallback />}>
            <WhatIsHacklanta />
          </Suspense>

          {/* SECTION 3: TRACKS & SPONSOR CHALLENGES */}
          <Suspense fallback={<SectionFallback />}>
            <Tracks onSelectTrack={handleOpenApply} />
          </Suspense>

          {/* SECTION 4: PRIZES & SIDE QUESTS */}
          <Suspense fallback={<SectionFallback />}>
            <Prizes />
          </Suspense>

          {/* SECTION 5: SPONSORS & PARTNERS */}
          <Suspense fallback={<SectionFallback />}>
            <Sponsors
              onOpenContact={() => setContactModalOpen(true)}
              onOpenPartner={() => setPartnerModalOpen(true)}
            />
          </Suspense>

          {/* SECTION 6: FAQ */}
          <Suspense fallback={<SectionFallback />}>
            <FAQ onOpenApply={() => handleOpenApply()} />
          </Suspense>
        </div>
      </main>

      {/* FOOTER */}
      <Suspense fallback={null}>
        <Footer
          onOpenContact={() => setContactModalOpen(true)}
          onOpenCodeOfConduct={() => {
            window.open('https://static.mlh.io/docs/mlh-code-of-conduct.pdf', '_blank', 'noreferrer');
          }}
        />
      </Suspense>

      {/* MODALS — lazy loaded, only rendered when open */}
      {contactModalOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={contactModalOpen}
            onClose={() => setContactModalOpen(false)}
          />
        </Suspense>
      )}

      {partnerModalOpen && (
        <Suspense fallback={null}>
          <PartnerModal
            isOpen={partnerModalOpen}
            onClose={() => setPartnerModalOpen(false)}
          />
        </Suspense>
      )}

      {loginModalOpen && (
        <Suspense fallback={null}>
          <LoginModal
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
