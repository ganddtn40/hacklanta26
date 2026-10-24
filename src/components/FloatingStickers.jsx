import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe2, 
  Terminal, 
  Disc3, 
  Triangle, 
  Volume2, 
  Sprout, 
  Sparkles 
} from 'lucide-react';

export default function FloatingStickers() {
  return (
    <div className="hidden xl:block absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* 1. Sparkle Star (Near Hero transition) */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-12, -4, -12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 top-[780px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.15, rotate: 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-[#0E1020] border border-accent-pink/40 flex items-center justify-center shadow-[0_0_25px_rgba(255,46,136,0.4)]">
          <Sparkles className="w-8 h-8 text-accent-pink" />
        </div>
      </motion.div>

      {/* 2. Planet Orbit (Near What Is Hacklanta) */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [8, 16, 8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-8 top-[1020px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.12, rotate: 0 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#0E1020]/95 border border-accent-pink/40 p-3 shadow-[0_0_30px_rgba(255,46,136,0.35)] flex flex-col items-center justify-center backdrop-blur-sm">
          <Globe2 className="w-8 h-8 text-accent-teal" />
          <span className="text-[10px] text-accent-pink uppercase tracking-widest font-black mt-1">ORBIT</span>
        </div>
      </motion.div>

      {/* 3. Retro Terminal (Near Tracks) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-6, 2, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-8 top-[1780px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.12, rotate: 0 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#0E1020]/95 border border-accent-teal/40 p-2.5 shadow-[0_0_25px_rgba(34,227,200,0.35)] flex flex-col items-center justify-center backdrop-blur-sm">
          <Terminal className="w-8 h-8 text-primary-container" />
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mt-1">DEV 26</span>
        </div>
      </motion.div>

      {/* 4. Galaxy Swirl (Near Challenges) */}
      <motion.div
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute right-8 top-[2320px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.2 }}
      >
        <div className="w-16 h-16 rounded-full bg-[#0E1020]/95 border border-[#7B4DFF]/50 flex items-center justify-center shadow-[0_0_30px_rgba(123,77,255,0.45)]">
          <Disc3 className="w-8 h-8 text-secondary" />
        </div>
      </motion.div>

      {/* 5. Top Tier Pyramid (Near Prizes) */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [12, 6, 12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute left-8 top-[3100px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.12, rotate: 0 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#0E1020]/95 border border-primary-container/40 p-3 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(255,216,61,0.3)] backdrop-blur-sm">
          <Triangle className="w-8 h-8 text-primary-container fill-primary-container/20" />
          <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold mt-1">TOP TIER</span>
        </div>
      </motion.div>

      {/* 6. Volume Speaker (Near Sponsors) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-10, -2, -10] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-8 top-[3880px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.12, rotate: 0 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#0E1020]/95 border border-accent-pink/40 p-2.5 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(255,46,136,0.35)] backdrop-blur-sm">
          <Volume2 className="w-8 h-8 text-accent-pink" />
          <span className="text-[9px] text-accent-teal uppercase tracking-widest font-black mt-1">VOLUME</span>
        </div>
      </motion.div>

      {/* 7. Bloom Plant (Near FAQ) */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [6, -2, 6] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute right-10 top-[4500px] pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.12, rotate: 0 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-[#0E1020]/95 border border-[#3DDC84]/40 p-2.5 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(61,220,132,0.3)] backdrop-blur-sm">
          <Sprout className="w-8 h-8 text-[#3DDC84]" />
          <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold mt-1">BLOOM</span>
        </div>
      </motion.div>
    </div>
  );
}
