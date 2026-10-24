import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Users, Ticket, Clock } from 'lucide-react';

export default function WhatIsHacklanta() {
  // Countdown to October 9, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 348,
    hours: 14,
    minutes: 22,
    seconds: 45
  });

  useEffect(() => {
    const target = new Date('2026-10-09T09:00:00-04:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="what-is-hacklanta" className="w-full flex flex-col gap-8 scroll-mt-28 relative z-20">
      {/* 2-ZONE SECTION HEADER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Eyebrow + Condensed Heading */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="text-[12px] text-accent-teal uppercase tracking-widest font-extrabold mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-teal animate-pulse" />
            A Weekend Built at Full Volume
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase font-black tracking-tight text-white leading-[0.92] text-stroke-pink-lg">
            What is<br />Hacklanta?
          </h2>
        </motion.div>

        {/* Right: Top-aligned descriptive paragraphs */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-4 text-text-secondary text-[15px] sm:text-[16px] leading-relaxed pt-1"
        >
          <p>
            Hacklanta's back, and this one's bigger than the first. 36 hours straight, festival energy the whole way through: no breaks, no sleep, just building whatever makes you tick with 1,000+ collegiate creators from across North America.
          </p>
          <p>
            This time, sponsors are on the floor running a live sponsor fair with custom challenges, dedicated dev mentors, and fast-track hiring funnels. Hardware labs, zero-latency cloud credits, midnight food truck drops, and electric DJ sets. Seats are strictly limited, so apply now.
          </p>
        </motion.div>
      </div>

      {/* FEATURE CHIP BAR (4-pill highlight strip) */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="w-full bg-[#0E1020]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-center sm:text-left shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        <div className="flex items-center gap-2 text-white font-display text-sm uppercase tracking-wider font-bold">
          <span className="text-primary-container text-lg font-black">•</span>
          OCT 9–11
        </div>
        <div className="flex items-center gap-2 text-white font-display text-sm uppercase tracking-wider font-bold">
          <span className="text-accent-teal text-lg font-black">•</span>
          ATL TECH SQUARE
        </div>
        <div className="flex items-center gap-2 text-white font-display text-sm uppercase tracking-wider font-bold">
          <span className="text-accent-pink text-lg font-black">•</span>
          1,000+ STUDENTS ACROSS THE US
        </div>
        <div className="flex items-center gap-2 text-[#3DDC84] font-display text-sm uppercase tracking-wider font-bold">
          <span className="text-[#3DDC84] text-lg font-black">•</span>
          FREE FOR ACCEPTED PARTICIPANTS
        </div>
      </motion.div>

      {/* LIVE EVENT COUNTDOWN MODULE */}
      <div className="w-full bg-gradient-to-r from-[#0E1020] via-[#151728] to-[#0E1020] border border-accent-teal/20 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(34,227,200,0.12)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center text-accent-teal">
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '30s' }} />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-accent-teal">Opening Ceremony Countdown</div>
            <div className="text-sm font-bold text-white">Atlanta Tech Square Arena Stage</div>
          </div>
        </div>

        {/* Digit Tiles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#07070C] border border-white/10 rounded-xl px-3 py-2 text-center min-w-[58px]">
              <div className="font-display text-2xl sm:text-3xl font-black text-white leading-none">
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-text-muted mt-1 font-bold">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
