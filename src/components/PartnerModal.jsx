import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Building2, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
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

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#21E6D7', '#7B4DFF', '#FFD83D', '#3DDC84', '#FF4B5C'],
      });
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-lg bg-[#090A15] border border-accent-teal/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(33,230,215,0.25)] z-10 overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-accent-teal text-xs font-bold uppercase tracking-widest mb-1.5">
                  <Building2 className="w-4 h-4 text-accent-teal" />
                  <span>Sponsorship &amp; Partnerships</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-1.5 text-stroke-pink">
                  Become a Partner
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mb-5 leading-relaxed">
                  Join industry leaders in empowering 1,000+ collegiate builders, hardware innovators, and engineers at Atlanta's largest hackathon.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                        Company Name <span className="text-accent-pink">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Corp / Tech Inc."
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#121422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-text-muted/40 text-sm focus:outline-none focus:border-accent-teal transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        placeholder="Jordan Smith"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-[#121422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-text-muted/40 text-sm focus:outline-none focus:border-accent-teal transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Work Email <span className="text-accent-pink">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sponsor@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-text-muted/40 text-sm focus:outline-none focus:border-accent-teal transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Sponsorship Tier Interest
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full bg-[#121422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-accent-teal transition-colors"
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
                      Message &amp; Goals (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your recruiting goals, prize bounties, or workshop ideas..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#121422] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-text-muted/40 text-sm focus:outline-none focus:border-accent-teal transition-colors resize-none"
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
                    className={`w-full bg-gradient-to-r from-accent-teal via-[#3DDC84] to-[#FFD83D] text-[#0A0B16] font-display text-base uppercase py-3.5 rounded-full font-black tracking-wider transition-all shadow-[0_0_30px_rgba(33,230,215,0.4)] mt-2 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110 active:scale-95'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Partnership Lead...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Partnership Inquiry</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#3DDC84]/20 border border-[#3DDC84]/50 flex items-center justify-center text-[#3DDC84] mb-4 animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="text-xs uppercase font-bold text-accent-teal tracking-widest mb-1.5">
                  Inquiry Received
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                  Thank You, {formData.companyName}!
                </h4>
                <p className="text-text-secondary text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                  Our sponsorship directors will reach out to <strong className="text-white">{formData.email}</strong> within 24 hours with the full Hacklanta '26 prospectus and booth opportunities.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-white/20 transition-colors"
                >
                  Close &amp; Back to Festival
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
