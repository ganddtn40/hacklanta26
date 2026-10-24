import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BackgroundRibbons from './components/BackgroundRibbons';
import FloatingStickers from './components/FloatingStickers';
import HeroLanyard3D from './components/HeroLanyard3D';
import WhatIsHacklanta from './components/WhatIsHacklanta';
import Tracks from './components/Tracks';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import LoginModal from './components/LoginModal';
import PartnerModal from './components/PartnerModal';

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
      {/* FIXED TOP NAVBAR */}
      <Navbar
        onOpenApply={() => handleOpenApply()}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* AMBIENT PSYCHEDELIC BACKGROUND RIBBONS */}
      <BackgroundRibbons />

      {/* FLOATING RETRO STICKERS */}
      <FloatingStickers />

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 relative z-10">
        <div className="w-full max-w-[1060px] mx-auto px-5 sm:px-8 py-6 sm:py-12 flex flex-col gap-24 sm:gap-36">
          {/* SECTION 1: HERO LANYARD 3D + 8-STEP FLIP REGISTRATION FORM */}
          <HeroLanyard3D />

          {/* SECTION 2: WHAT IS HACKLANTA? */}
          <WhatIsHacklanta />

          {/* SECTION 3: TRACKS & SPONSOR CHALLENGES */}
          <Tracks onSelectTrack={handleOpenApply} />

          {/* SECTION 4: PRIZES & SIDE QUESTS */}
          <Prizes />

          {/* SECTION 5: SPONSORS & PARTNERS */}
          <Sponsors
            onOpenContact={() => setContactModalOpen(true)}
            onOpenPartner={() => setPartnerModalOpen(true)}
          />

          {/* SECTION 6: FAQ */}
          <FAQ onOpenApply={() => handleOpenApply()} />
        </div>
      </main>

      {/* FOOTER */}
      <Footer
        onOpenContact={() => setContactModalOpen(true)}
        onOpenCodeOfConduct={() => {
          window.open('https://static.mlh.io/docs/mlh-code-of-conduct.pdf', '_blank', 'noreferrer');
        }}
      />

      {/* MODALS */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}
