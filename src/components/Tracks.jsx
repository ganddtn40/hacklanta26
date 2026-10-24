import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Palette, 
  BrainCircuit, 
  Coins, 
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';

export default function Tracks({ onSelectTrack }) {
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const tracks = [
    {
      id: 'social-good',
      number: '01',
      category: 'Civic Impact',
      title: 'Social Good',
      description: 'Empower local communities, address environmental crises, public health divides, and municipal transparency. Build tech that repairs real-world fracture points.',
      color: '#2F5BFF',
      borderColorClass: 'neon-border-blue',
      badgeBg: 'bg-[#2F5BFF]/10 text-[#2F6BFF]',
      icon: Globe,
      sponsorLabel: 'Presented By',
      sponsorName: 'COX AUTOMOTIVE',
      sponsorLogo: '/brand/sponsors/mono/cox-automotive.png',
      sponsorSub: 'Mobility & Community',
    },
    {
      id: 'creative',
      number: '02',
      category: 'Arts & Sound',
      title: 'Creative & Media',
      description: 'Novel audio-visual synthesis, generative stage production tools, interactive game installations, and mixed-reality experiences that blur code with art.',
      color: '#FF3366',
      borderColorClass: 'neon-border-pink',
      badgeBg: 'bg-accent-pink/10 text-accent-pink',
      icon: Palette,
      sponsorLabel: 'Presented By',
      sponsorName: 'ADOBE',
      sponsorLogo: '/brand/sponsors/mono/adobe.png',
      sponsorSub: 'Creative Cloud APIs',
    },
    {
      id: 'ai-ml',
      number: '03',
      category: 'Autonomous Systems',
      title: 'AI / Machine Learning',
      description: 'Autonomous multi-agent swarms, on-device edge neural models, synthetic voice coordination, and real-time inference pipelines tackling hard compute questions.',
      color: '#7C4DFF',
      borderColorClass: 'neon-border-purple',
      badgeBg: 'bg-[#7C4DFF]/10 text-[#7C4DFF]',
      icon: BrainCircuit,
      sponsorLabel: 'Open Frontier',
      sponsorName: 'GENERAL ML ARENA',
      sponsorSub: 'Dedicated GPU Clusters',
      isArena: true,
    },
    {
      id: 'fintech',
      number: '04',
      category: 'Global Capital',
      title: 'Fintech & Commerce',
      description: 'Next-gen open payment rails, automated algorithmic asset managers, programmable commerce, and decentralized settlement mechanisms built for high speed.',
      color: '#2ECC71',
      borderColorClass: 'neon-border-green',
      badgeBg: 'bg-[#2ECC71]/10 text-[#2ECC71]',
      icon: Coins,
      sponsorLabel: 'Decentralized',
      sponsorName: 'NEXT-GEN RAILS',
      sponsorSub: 'High-Throughput Settlement',
      isArena: true,
    },
  ];

  const challenges = [
    {
      id: 'replit',
      name: 'Small Business',
      description: 'Build the best small business app with Replit. Judges favor working, creative apps over technical complexity.',
      prize: 'A talk and dinner with Replit',
      sponsor: 'Replit',
      logo: '/brand/sponsors/mono/replit.png',
      color: '#d8ff3e',
      borderColorClass: 'neon-border-gold',
      perks: [
        '$2,500 Cash Grand Bounty',
        'Replit Core Pro Lifetime Subscriptions'
      ]
    },
    {
      id: 'photon',
      name: 'Agents in iMessage',
      description: 'Build an agent that lives in iMessage using Photon. Projects must integrate Spectrum, Photon\'s open-source SDK.',
      prize: '$400 cash, $300 credits, and a fast track to the final interview round',
      sponsor: 'Photon',
      logo: '/brand/sponsors/mono/photon.png',
      color: '#25e5ff',
      borderColorClass: 'neon-border-blue',
      perks: [
        '$2,000 API Credits + Compute Pass',
        'Direct Incubator Fast-Track Interview'
      ]
    },
    {
      id: 'shock',
      name: 'Zero Data',
      description: 'Prove useful software does not need user data. Build a simple tool with no accounts, tracking, profiles, or stored personal info.',
      prize: 'Shock Tracker challenge prize kit',
      sponsor: 'Shock Tracker',
      logo: '/brand/sponsors/mono/shock-tracker.png',
      color: '#ff7a1a',
      borderColorClass: 'neon-border-orange',
      perks: [
        '$1,750 Team Gear Grant',
        'Custom Shock Sensor Developer Kits'
      ]
    },
  ];

  return (
    <section id="tracks" className="w-full flex flex-col gap-10 scroll-mt-28 relative z-20">
      {/* 2-ZONE SECTION HEADER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="text-[12px] text-accent-teal uppercase tracking-widest font-extrabold mb-3">
            Pick Your Stage
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase font-black text-white leading-none text-stroke-pink-lg">
            Tracks
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-secondary text-[15px] sm:text-[16px] leading-relaxed pt-1"
        >
          Four competitive tracks and three marquee sponsor challenges, packed into one single weekend. Choose where your project competes or crossover for grand stage supremacy.
        </motion.div>
      </div>

      {/* 4 TRACK PAIRS */}
      <div className="flex flex-col gap-4">
        {tracks.map((track, idx) => {
          const IconComp = track.icon;
          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
              className="grid grid-cols-1 lg:grid-cols-4 gap-4"
            >
              {/* Main Track Card (3 Cols) */}
              <div 
                className={`lg:col-span-3 bg-[#0A0B16] rounded-2xl p-5 sm:p-7 relative overflow-hidden transition-all duration-300 ${track.borderColorClass} flex flex-col justify-between group hover:bg-[#0E1020]`}
              >
                <div 
                  className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-15 pointer-events-none blur-3xl transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: track.color }}
                />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className={`text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${track.badgeBg}`}>
                    Track {track.number} • {track.category}
                  </span>
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${track.color}20`, color: track.color }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                    {track.title}
                  </h3>
                  <p className="text-text-secondary text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
                    {track.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">
                    Eligible for Track Grand Prize + Swag
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectTrack?.(track.title)}
                    className="min-h-[44px] px-2 py-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer"
                    style={{ color: track.color }}
                  >
                    <span>View Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sponsor Tile (1 Col) */}
              <div className="lg:col-span-1 bg-[#0A0B16] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden hover:border-white/20 transition-all">
                <span className="text-[10px] uppercase tracking-widest text-text-muted mb-2 font-bold">
                  {track.sponsorLabel}
                </span>

                {track.sponsorLogo ? (
                  <div className="my-2 flex items-center justify-center h-12">
                    <img 
                      src={track.sponsorLogo} 
                      alt={track.sponsorName} 
                      className="max-h-10 max-w-[85%] object-contain"
                    />
                  </div>
                ) : track.isArena ? (
                  <div className="flex flex-col items-center my-1">
                    <Sparkles className="w-7 h-7 mb-1 animate-pulse" style={{ color: track.color }} />
                    <div className="font-display text-lg uppercase text-white font-bold tracking-wider">
                      {track.sponsorName}
                    </div>
                  </div>
                ) : (
                  <div className="font-display text-xl uppercase text-white tracking-wider font-extrabold my-1">
                    {track.sponsorName}
                  </div>
                )}

                <span 
                  className="text-[11px] font-bold mt-1 tracking-wide"
                  style={{ color: track.color }}
                >
                  {track.sponsorSub}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SPONSOR CHALLENGES SUBSECTION */}
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl text-white uppercase font-black tracking-wide">
            sponsor challenges
          </h3>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* 3 Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {challenges.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`bg-[#0A0B16] rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-300 ${c.borderColorClass} hover:bg-[#0E1020]`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-[11px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${c.color}20`, color: c.color }}
                  >
                    Challenge • 0{idx + 1}
                  </span>
                  <div className="h-6 flex items-center">
                    <img 
                      src={c.logo} 
                      alt={c.sponsor} 
                      className="max-h-5 object-contain"
                    />
                  </div>
                </div>

                <h4 className="font-display text-xl uppercase text-white font-bold mb-2">
                  {c.name}
                </h4>
                <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
                  {c.description}
                </p>

                <div className="flex flex-col gap-2 text-[12px] text-white">
                  {c.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-primary-container shrink-0 fill-primary-container" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 bg-[#11131c] -mx-6 -mb-6 px-6 py-3.5 flex items-center justify-between border-t border-white/5">
                <span className="text-[10px] uppercase text-text-muted font-bold tracking-wider">
                  Presented By
                </span>
                <span 
                  className="font-display text-sm uppercase font-black tracking-widest"
                  style={{ color: c.color }}
                >
                  {c.sponsor}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
