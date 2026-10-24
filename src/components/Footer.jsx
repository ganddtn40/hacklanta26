import React from 'react';
import { ArrowUp, ShieldCheck, Mail } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0A0B16] border-t border-white/10 py-8 relative z-20">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        {/* Left Branding */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          <span className="text-white">Hacklanta '26</span>
          <span className="hidden sm:inline">•</span>
          <span>Atlanta Tech Square</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-accent-teal">Oct 9–11, 2026</span>
        </div>

        {/* Center/Right Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-xs font-bold uppercase tracking-wider">
          <a
            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-accent-teal hover:underline transition-all inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[44px]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Code of Conduct</span>
          </a>
          <a
            href="https://mlh.io/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-white transition-all inline-flex items-center px-2.5 py-2 min-h-[44px]"
          >
            Privacy Policy
          </a>
          <a
            href="https://github.com/MLH/mlh-policies/blob/main/member-event-guidelines.md"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-white transition-all inline-flex items-center px-2.5 py-2 min-h-[44px]"
          >
            Terms
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="text-accent-teal hover:underline transition-all inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[44px] cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-surface-muted hover:bg-white/10 active:bg-white/20 border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-colors cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
