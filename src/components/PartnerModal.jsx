import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Building2, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SPONSORSHIP_TIERS = [
  'Title Partner ($20,000+)',
  'Supporting Partner ($10,000)',
  'Community Partner ($5,000)',
  'In-Kind / Hardware / Mentorship',
  'Custom Partnership Package',
];

export default function PartnerModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    tier: SPONSORSHIP_TIERS[0],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    if (!formData.companyName.trim()) {
      setErrorMessage('Please enter your company or organization name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        company_name: formData.companyName.trim(),
        contact_person: formData.contactPerson.trim() || null,
        email: formData.email.trim().toLowerCase(),
        sponsorship_tier: formData.tier,
        message: formData.message.trim() || null,
      };

      const { error } = await supabase.from('sponsors_leads').insert([payload]);

      if (error) {
        setIsSubmitting(false);
        setErrorMessage(error.message || 'Failed to submit partnership request. Please try again.');
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Dynamically load confetti on demand
      try {
        const confettiModule = await import('canvas-confetti');
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#21E6D7', '#7B4DFF', '#FFD83D', '#3DDC84', '#FF4B5C'],
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
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      tier: SPONSORSHIP_TIERS[0],
      message: '',
    });
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
            className="relative w-full max-w-lg bg-[#0A0B16] border border-primary-container/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(255,216,61,0.25)] z-10 max-h-[92dvh] overflow-y-auto my-auto"
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
                <div className="flex items-center gap-2 text-primary-container text-xs font-bold uppercase tracking-widest mb-1 pt-1 sm:pt-0">
                  <Building2 className="w-4 h-4" />
                  <span>Corporate & Community Alliance</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-2">
                  Partner with Hacklanta '26
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mb-5">
                  Engage 1,000+ top engineering & design students. Host custom API challenges, tap top talent, and build brand loyalty.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Company / Organization Name <span className="text-primary-container">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stripe, OpenAI, Tech Labs"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        placeholder="Jordan Miller"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                        Business Email <span className="text-primary-container">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="partner@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Partnership Tier / Interest
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors"
                    >
                      {SPONSORSHIP_TIERS.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Message / Goals (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about challenges you want to host, recruitment goals, or custom hardware you want to demo..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-text-muted/50 text-base sm:text-sm focus:outline-none focus:border-primary-container transition-colors resize-none"
                    />
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
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Partnership Deck</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* CONFIRMATION SCREEN */
              <div className="flex flex-col items-center text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#3DDC84]/20 border border-[#3DDC84]/50 flex items-center justify-center text-[#3DDC84] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-xs uppercase font-bold text-accent-teal tracking-widest mb-1">
                  Partnership Request Sent
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                  Thank you, {formData.companyName}!
                </h4>
                <p className="text-text-secondary text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                  Our sponsorship director will review your inquiry and follow up at <strong>{formData.email}</strong> with the 2026 Prospectus & schedule within 24 hours.
                </p>

                <button
                  onClick={handleReset}
                  type="button"
                  className="min-h-[44px] bg-surface-muted hover:bg-white/10 active:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-white/20 transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
