import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, Lock, CheckCircle2 } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [ticketNumber, setTicketNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // Lock body scroll on mobile when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  const handleClose = () => {
    setLoggedIn(false);
    setTicketNumber('');
    setPin('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A0B16] border border-primary-container/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(255,216,61,0.25)] z-10 max-h-[92dvh] overflow-y-auto my-auto"
          >
            <button
              onClick={handleClose}
              type="button"
              aria-label="Close dialog"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!loggedIn ? (
              <form onSubmit={handleLogin} className="space-y-4 pt-1 sm:pt-0">
                <div className="flex items-center gap-2 text-primary-container text-xs font-bold uppercase tracking-widest">
                  <Lock className="w-4 h-4" />
                  <span>Participant Portal</span>
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                  Log In to Team Finder
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm">
                  Access your Discord team formation lobby, hardware request queue, and mentor calendar.
                </p>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Ticket / Pass ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="HKL-2026-XXXX"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Security PIN
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] bg-primary-container hover:bg-[#ffe177] active:scale-[0.98] text-black font-display text-base uppercase py-3 rounded-full font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(255,216,61,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Authenticate Portal</span>
                  <LogIn className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#3DDC84]/20 border border-[#3DDC84]/50 flex items-center justify-center text-[#3DDC84] mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-2xl font-black uppercase text-white mb-1">
                  Authenticated!
                </h4>
                <p className="text-text-secondary text-xs sm:text-sm mb-5">
                  Welcome to Hacklanta '26 Team Matcher & Hardware Portal.
                </p>
                <button
                  onClick={handleClose}
                  type="button"
                  className="min-h-[44px] bg-surface-muted hover:bg-white/10 active:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-white/20 transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
