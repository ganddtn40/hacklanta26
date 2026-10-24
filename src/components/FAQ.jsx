import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Ticket, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const INITIAL_FAQS = [
  {
    q: 'Who can apply?',
    a: 'Any currently enrolled undergraduate, graduate, or high school student (18+) from any accredited institution can apply. All majors are warmly welcomed—developers, hardware hackers, UI/UX designers, and domain enthusiasts alike.',
  },
  {
    q: 'How much does it cost?',
    a: 'Hacklanta is 100% free for all accepted participants! We supply all your meals, snacks, caffeinated beverages, hardware lab equipment, and legendary festival swag over the entire 36-hour sprint.',
  },
  {
    q: 'How large can teams be?',
    a: 'Teams can have between 1 and 4 members. While you can compete solo, building in teams of 3–4 is highly encouraged to maximize what you can ship over 36 hours.',
  },
  {
    q: 'Do I need a team beforehand?',
    a: 'Not at all! We host structured team-formation workshops on Discord before the hackathon and live speed-matching mixers at opening ceremonies on Friday night.',
  },
  {
    q: 'Where is it located?',
    a: "Hacklanta '26 takes place in the heart of Atlanta’s Tech Square district. Detailed venue access passes, parking validation, and transit directions will be sent directly with your acceptance packet.",
  },
  {
    q: 'Can I participate remotely?',
    a: "Hacklanta '26 is exclusively an in-person festival experience. All judging, ceremonies, stage showcases, and sponsor workshops require on-site participation to maintain our high-voltage festival atmosphere.",
  },
  {
    q: 'What happens after I apply?',
    a: 'Applications are reviewed on a rolling basis. Once accepted, you will receive an invitation to RSVP and gain instant access to our Discord community, Team Finder portal, and hardware reservation queues.',
  },
];

export default function FAQ({ onOpenApply }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) {
          console.warn('Could not load dynamic FAQs from Supabase, using fallback:', error.message);
          return;
        }

        if (data && data.length > 0) {
          setFaqs(
            data.map((item) => ({
              q: item.question,
              a: item.answer,
              category: item.category,
            }))
          );
        }
      } catch (err) {
        console.warn('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full flex flex-col gap-10 scroll-mt-28 relative z-20">
      {/* 2-ZONE SECTION HEADER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="text-[12px] text-accent-teal uppercase tracking-widest font-extrabold mb-3">
            Transmission Received
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase font-black text-white leading-none text-stroke-pink-lg">
            FAQ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-secondary text-[15px] sm:text-[16px] leading-relaxed pt-1"
        >
          Got questions before dropping into Atlanta? Here is everything you need to know about eligibility, travel grants, teaming up, and what to pack.
        </motion.div>
      </div>

      {/* ACCORDION CONTAINER */}
      <div className="w-full bg-[#0A0B16] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 shadow-2xl">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="group transition-colors">
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 min-h-[56px] flex items-center justify-between text-left hover:bg-[#11131c] transition-colors focus:outline-none focus:ring-2 focus:ring-accent-teal/50 cursor-pointer"
              >
                <span className="font-display text-base sm:text-xl uppercase text-white font-bold tracking-wide pr-3">
                  {faq.q}
                </span>
                <div
                  className={`w-9 h-9 sm:w-8 sm:h-8 shrink-0 rounded-full border border-accent-teal/30 flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-accent-teal text-black rotate-45' : 'bg-transparent text-accent-teal'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-text-secondary text-[14px] sm:text-[15px] leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* FINAL PRE-FOOTER CALLOUT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-r from-[#0E1020] via-[#16182B] to-[#0E1020] border border-accent-teal/30 rounded-3xl p-6 sm:p-14 text-center flex flex-col items-center justify-center gap-5 sm:gap-6 shadow-[0_0_50px_rgba(34,227,200,0.2)] relative overflow-hidden mt-6"
      >
        {/* Ambient background glow orb */}
        <div className="absolute w-96 h-96 rounded-full bg-accent-pink/15 blur-3xl pointer-events-none -top-20 -left-20" />
        <div className="absolute w-96 h-96 rounded-full bg-accent-teal/15 blur-3xl pointer-events-none -bottom-20 -right-20" />

        <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.35em] text-accent-pink font-extrabold relative z-10">
          ATLANTA • OCTOBER 9–11, 2026
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase font-black text-white max-w-2xl leading-[0.95] text-stroke-pink relative z-10">
          Ready to build at full volume?
        </h2>

        <p className="text-text-secondary text-xs sm:text-[16px] max-w-lg leading-relaxed relative z-10">
          Join 1,000+ collegiate makers, artists, and engineers for 36 hours of pure creation. Registration closes once capacity is met.
        </p>

        <button
          onClick={onOpenApply}
          type="button"
          className="relative z-10 min-h-[48px] bg-primary-container hover:bg-[#ffe177] active:scale-95 text-[#0A0B16] font-display text-base sm:text-lg uppercase px-6 sm:px-9 py-3.5 sm:py-4 rounded-full font-black tracking-wider transition-all shadow-[0_0_35px_rgba(255,216,61,0.5)] hover:shadow-[0_0_45px_rgba(255,216,61,0.7)] flex items-center gap-2 group cursor-pointer"
        >
          <span>Claim Your Ticket Pass</span>
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
