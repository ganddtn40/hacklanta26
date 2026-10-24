import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, QrCode, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RegistrationModal({ isOpen, onClose, initialTrack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    track: initialTrack || 'AI / Machine Learning',
    experience: 'Intermediate',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketId, setTicketId] = useState('');

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

  useEffect(() => {
    if (initialTrack) {
      setFormData(prev => ({ ...prev, track: initialTrack }));
    }
  }, [initialTrack]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');

    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Attendee';
    const lastName = nameParts.slice(1).join(' ') || 'Hacker';

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email.trim().toLowerCase(),
        institution: formData.university.trim() || null,
        primary_track: formData.track,
        current_role: formData.experience,
        agreed_terms: true,
        status: 'pending',
      };

      const { error } = await supabase.from('participants').insert([payload]);

      if (error) {
        setIsSubmitting(false);
        if (
          error.code === '23505' ||
          error.message?.includes('duplicate key') ||
          error.message?.includes('participants_email_key')
        ) {
          setErrorMessage('This email is already registered for Hacklanta 2026!');
        } else {
          setErrorMessage(error.message || 'Failed to submit application. Please try again.');
        }
        return;
      }

      const id = `HKL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(id);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Dynamically load confetti only when submission succeeds (saves initial bundle)
      try {
        const confettiModule = await import('canvas-confetti');
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6A2B', '#FF4B5C', '#E83E8C', '#FFD23F', '#3DDC84', '#19C5C0', '#2F6BFF', '#7B4DFF']
        });
      } catch (confettiErr) {
        console.warn('Confetti animation failed:', confettiErr);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0B16] border border-accent-teal/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(34,227,200,0.3)] z-10 max-h-[92dvh] overflow-y-auto my-auto"
          >
            {/* Header Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close dialog"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-accent-teal text-xs font-bold uppercase tracking-widest mb-1 pt-1 sm:pt-0">
                  <Sparkles className="w-4 h-4" />
                  <span>Limited Capacity Pass</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide text-stroke-pink mb-2">
                  Apply for Hacklanta '26
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mb-5">
                  Oct 9–11, Atlanta Tech Square. Free food, hardware access, and $45K+ in bounties.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent-teal transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Student / Academic Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@gatech.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent-teal transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                        University
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Georgia Tech / Emory / etc."
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-accent-teal transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                        Primary Track
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-accent-teal transition-colors"
                      >
                        <option value="Social Good">Social Good (Civic Impact)</option>
                        <option value="Creative & Media">Creative & Media (Arts)</option>
                        <option value="AI / Machine Learning">AI / Machine Learning</option>
                        <option value="Fintech & Commerce">Fintech & Commerce</option>
                      </select>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-center text-xs text-[#FF4B5C] font-bold bg-[#FF4B5C]/10 border border-[#FF4B5C]/30 rounded-xl py-2 px-3">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full min-h-[48px] bg-primary-container hover:bg-[#ffe177] active:scale-[0.98] text-[#0A0B16] font-display text-base uppercase py-3.5 rounded-full font-black tracking-wider transition-all shadow-[0_0_25px_rgba(255,216,61,0.4)] mt-2 flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Free Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* CONFIRMATION TICKET GENERATION */
              <div className="flex flex-col items-center text-center py-2">
                <div className="w-14 h-14 rounded-full bg-[#3DDC84]/20 border border-[#3DDC84]/50 flex items-center justify-center text-[#3DDC84] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-xs uppercase font-bold text-accent-teal tracking-widest mb-1">
                  Application Confirmed!
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                  Welcome, {formData.name}!
                </h4>
                <p className="text-text-secondary text-xs sm:text-sm max-w-sm mb-6">
                  Your ticket pass has been reserved. Check <strong>{formData.email}</strong> for Discord verification & hardware reservation access.
                </p>

                {/* Generated Badge Pass Preview */}
                <div className="w-full bg-[#11131c] border border-accent-pink/30 rounded-2xl p-4 flex items-center justify-between mb-6 shadow-inner">
                  <div className="text-left pr-2">
                    <div className="text-[10px] text-accent-pink uppercase font-bold tracking-widest">
                      Hacklanta '26 Attendee Pass
                    </div>
                    <div className="font-display text-lg sm:text-xl uppercase font-bold text-white mt-0.5 truncate max-w-[180px] sm:max-w-none">
                      {formData.name}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      Track: <strong className="text-white">{formData.track}</strong>
                    </div>
                    <div className="text-[10px] font-mono text-accent-teal mt-1">
                      PASS: {ticketId}
                    </div>
                  </div>

                  <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
                    <QrCode className="w-12 h-12 sm:w-14 sm:h-14 text-black" />
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  type="button"
                  className="min-h-[44px] bg-surface-muted hover:bg-white/10 active:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-white/20 transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  Close & Return to Festival Site
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
