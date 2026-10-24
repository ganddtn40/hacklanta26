import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactModal({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg('');
    setLoading(true);

    try {
      const payload = {
        company_name: name.trim() ? `Individual: ${name.trim()}` : 'General Contact',
        contact_person: name.trim() || null,
        email: email.trim().toLowerCase(),
        message: message.trim(),
        sponsorship_tier: 'General Inquiry',
      };

      const { error } = await supabase.from('sponsors_leads').insert([payload]);
      if (error) {
        setLoading(false);
        setErrorMsg(error.message || 'Failed to send message. Please try again.');
        return;
      }
      setLoading(false);
      setSent(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleClose = () => {
    setSent(false);
    setLoading(false);
    setErrorMsg('');
    setName('');
    setEmail('');
    setMessage('');
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
            className="relative w-full max-w-md bg-[#0A0B16] border border-accent-pink/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(255,46,136,0.25)] z-10 max-h-[92dvh] overflow-y-auto my-auto"
          >
            <button
              onClick={handleClose}
              type="button"
              aria-label="Close dialog"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1 sm:pt-0">
                <div className="flex items-center gap-2 text-accent-pink text-xs font-bold uppercase tracking-widest">
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Transmission</span>
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                  Contact Hacklanta Team
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm">
                  Sponsorship inquiries, mentor applications, or questions? Drop us a line.
                </p>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-accent-pink transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Your Email <span className="text-accent-pink">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-accent-pink transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Message <span className="text-accent-pink">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#11131c] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-accent-pink transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-center text-xs text-[#FF4B5C] font-bold bg-[#FF4B5C]/10 border border-[#FF4B5C]/30 rounded-xl py-2 px-3">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full min-h-[48px] bg-accent-pink hover:bg-[#ff4b98] active:scale-[0.98] text-white font-display text-base uppercase py-3 rounded-full font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(255,46,136,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#3DDC84]/20 border border-[#3DDC84]/50 flex items-center justify-center text-[#3DDC84] mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-2xl font-black uppercase text-white mb-1">
                  Message Sent!
                </h4>
                <p className="text-text-secondary text-xs sm:text-sm mb-5">
                  Our organizing team will get back to you within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  type="button"
                  className="min-h-[44px] bg-surface-muted hover:bg-white/10 active:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border border-white/20 transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
