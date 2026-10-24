import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowUpRight
} from 'lucide-react';

export default function Navbar({ onOpenApply, onOpenLogin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const rafRef = useRef(null);

  // Throttled scroll handler via requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 30);

        const sections = ['home', 'what-is-hacklanta', 'tracks', 'prizes', 'sponsors', 'faq'];
        const scrollPos = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'What is Hacklanta?', href: '#what-is-hacklanta', id: 'what-is-hacklanta' },
    { name: 'Sponsors', href: '#sponsors', id: 'sponsors' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const scrollToSection = useCallback((e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  }, []);

  return (
    <>
      {/* MLH OFFICIAL TRUST BADGE HANGING FROM TOP EDGE */}
      <a
        id="mlh-trust-badge"
        href="https://mlh.io"
        target="_blank"
        rel="noreferrer"
        className="fixed top-0 left-4 sm:left-12 z-[60] w-12 sm:w-16 transition-transform hover:translate-y-1 drop-shadow-xl"
        title="Major League Hacking Official Season"
      >
        <img
          src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
          alt="Major League Hacking Official 2027 Season"
          className="w-full"
          loading="lazy"
          width="64"
          height="128"
        />
      </a>

      {/* TOP HEADER NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#04050D]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent'
      }`}>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-12 h-16 sm:h-20 flex items-center justify-between relative pl-20 sm:pl-36">
          {/* LEFT: HACKLANTA 26 LOGOMARK */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-2 group cursor-pointer min-h-[44px]"
          >
            <span className="font-wordmark text-xl sm:text-3xl font-black lowercase tracking-tight text-white group-hover:text-accent-teal transition-colors drop-shadow-[0_2px_0_#FF2E88]">
              hacklanta <span className="font-display text-xs sm:text-sm uppercase text-[#FFD83D] font-black tracking-normal">&apos;26</span>
            </span>
          </a>

          {/* CENTER: NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`text-[12px] uppercase font-bold tracking-widest transition-all relative py-1 cursor-pointer min-h-[44px] flex items-center ${
                    isActive 
                      ? 'text-accent-teal drop-shadow-[0_0_8px_rgba(34,227,200,0.6)]' 
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-teal rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT CLUSTER: DISCORD, INSTA, LOG IN, APPLY NOW */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Discord Icon */}
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex text-text-muted hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] items-center justify-center"
              title="Discord"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 126.644 96">
                <path d="M81.15,0c-1.2376,2.1973-2.3489,4.4704-3.3591,6.794-9.5975-1.4396-19.3718-1.4396-28.9945,0-.985-2.3236-2.1216-4.5967-3.3591-6.794-9.0166,1.5407-17.8059,4.2431-26.1405,8.0568C2.779,32.5304-1.6914,56.3725.5312,79.8863c9.6732,7.1476,20.5083,12.603,32.0505,16.0884,2.6014-3.4854,4.8998-7.1981,6.8698-11.0623-3.738-1.3891-7.3497-3.1318-10.8098-5.1523.9092-.6567,1.7932-1.3386,2.6519-1.9953,20.281,9.547,43.7696,9.547,64.0758,0,.8587.7072,1.7427,1.3891,2.6519,1.9953-3.4601,2.0457-7.0718,3.7632-10.835,5.1776,1.97,3.8642,4.2683,7.5769,6.8698,11.0623,11.5419-3.4854,22.3769-8.9156,32.0509-16.0631,2.626-27.2771-4.496-50.9172-18.817-71.8548C98.9811,4.2684,90.1918,1.5659,81.1752.0505l-.0252-.0505ZM42.2802,65.4144c-6.2383,0-11.4159-5.6575-11.4159-12.6535s4.9755-12.6788,11.3907-12.6788,11.5169,5.708,11.4159,12.6788c-.101,6.9708-5.026,12.6535-11.3907,12.6535ZM84.3576,65.4144c-6.2637,0-11.3907-5.6575-11.3907-12.6535s4.9755-12.6788,11.3907-12.6788,11.4917,5.708,11.3906,12.6788c-.101,6.9708-5.026,12.6535-11.3906,12.6535Z" />
              </svg>
            </a>

            {/* Instagram Icon */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex text-text-muted hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] items-center justify-center"
              title="Instagram"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>

            {/* Log in Button */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="hidden sm:flex px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-[11px] uppercase font-bold tracking-wider text-white transition-all cursor-pointer min-h-[44px] items-center justify-center"
            >
              Log in
            </button>

            {/* Apply now Glowing Button */}
            <button
              type="button"
              onClick={onOpenApply}
              className="bg-[#FFD83D] hover:bg-[#FFE36A] active:scale-95 text-[#0A0B16] text-[11px] sm:text-[12px] uppercase font-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_0_20px_rgba(255,216,61,0.5)] hover:shadow-[0_0_28px_rgba(255,216,61,0.7)] transition-all flex items-center gap-1 cursor-pointer min-h-[44px]"
            >
              Apply now
            </button>

            {/* Mobile Menu Toggle — 44x44 touch target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER — Full-screen overlay for clean UX */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop to close on tap outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-[-1]"
              />
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-[#0A0B16] border-b border-white/10 px-6 py-6 flex flex-col gap-4 overflow-hidden"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-base uppercase font-bold text-text-secondary hover:text-accent-teal py-3 border-b border-white/5 flex items-center justify-between cursor-pointer min-h-[48px]"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                ))}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenApply();
                    }}
                    className="w-full bg-[#FFD83D] text-black py-3.5 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,216,61,0.4)] cursor-pointer min-h-[48px]"
                  >
                    Apply now
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full bg-[#1A1C2E] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-sm border border-white/10 cursor-pointer min-h-[48px]"
                  >
                    Log in
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
