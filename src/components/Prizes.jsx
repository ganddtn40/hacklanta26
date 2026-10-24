import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  DollarSign, 
  Tablet, 
  Gamepad2, 
  Headphones, 
  Stars, 
  ExternalLink 
} from 'lucide-react';

export default function Prizes() {
  const trackPrizes = [
    {
      id: 'cash',
      category: 'Grand Bounty',
      reward: 'Cash prize',
      track: 'Social Good',
      sponsor: 'Cox Automotive',
      logo: '/brand/sponsors/mono/cox-automotive.png',
      color: '#25e5ff',
      icon: DollarSign,
      glowColor: 'rgba(37, 229, 255, 0.35)',
    },
    {
      id: 'ipad',
      category: 'Hardware',
      reward: 'iPad mini',
      track: 'Creative',
      sponsor: 'Adobe',
      logo: '/brand/sponsors/mono/adobe.png',
      color: '#ff2e88',
      icon: Tablet,
      glowColor: 'rgba(255, 46, 136, 0.35)',
    },
    {
      id: 'switch',
      category: 'Console',
      reward: 'Nintendo Switch 2',
      track: 'AI/ML',
      sponsor: 'Track Prize',
      color: '#8b5cff',
      icon: Gamepad2,
      glowColor: 'rgba(139, 92, 255, 0.35)',
    },
    {
      id: 'airpods',
      category: 'Audio Gear',
      reward: 'AirPods Max 2',
      track: 'Fintech',
      sponsor: 'Track Prize',
      color: '#d8ff3e',
      icon: Headphones,
      glowColor: 'rgba(216, 255, 62, 0.35)',
    },
  ];

  const sideQuests = [
    {
      sponsor: 'Mercedes-Benz',
      reward: '$100 Visa gift card',
      logo: '/brand/sponsors/mono/mbrdna.png',
      tag: 'VISA REWARD',
    },
    {
      sponsor: 'Replit',
      reward: 'Dinner with Replit',
      logo: '/brand/sponsors/mono/replit.png',
      tag: 'EXCLUSIVE',
    },
    {
      sponsor: 'Solana',
      reward: 'Assorted prizes',
      logo: '/brand/sponsors/mono/solana.png',
      tag: 'DEFI HARDWARE',
    },
    {
      sponsor: 'ElevenLabs',
      reward: 'Wireless earbuds',
      logo: '/brand/sponsors/mono/elevenlabs.png',
      tag: 'AUDIO AI',
    },
    {
      sponsor: 'Google Gemini',
      reward: 'MLH swag kits',
      logo: '/brand/sponsors/mono/google-gemini.png',
      tag: 'COMMUNITY',
    },
    {
      sponsor: 'Auth0',
      reward: 'Wireless headphones',
      logo: '/brand/sponsors/mono/auth0.png',
      tag: 'SECURITY',
    },
    {
      sponsor: 'Tiger Data',
      reward: 'Stream Deck Mini',
      logo: '/brand/sponsors/mono/tiger-data.png',
      tag: 'STREAM RIG',
    },
    {
      sponsor: 'Vultr',
      reward: 'M5Stack Official Tab5',
      logo: '/brand/sponsors/mono/vultr.png',
      tag: 'HARDWARE',
    },
    {
      sponsor: 'GoDaddy',
      reward: 'Digital gift card',
      logo: '/brand/sponsors/mono/godaddy.png',
      tag: 'DOMAINS',
    },
  ];

  return (
    <section id="prizes" className="w-full flex flex-col gap-10 scroll-mt-28 relative z-20">
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
            Take Something Home
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase font-black text-white leading-none text-stroke-pink-lg">
            Prizes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-text-secondary text-[15px] sm:text-[16px] leading-relaxed pt-1"
        >
          Every track has a headline trophy prize, and sponsors run side quests through MLH alongside them. Over $45,000 in total hardware, grants, and venture support.
        </motion.div>
      </div>

      {/* TRACK PRIZES SUBHEADER */}
      <div className="flex items-center gap-2.5 -mb-4">
        <Stars className="w-5 h-5 text-primary-container animate-spin" style={{ animationDuration: '10s' }} />
        <h3 className="font-display text-2xl text-white uppercase font-black tracking-wide">
          track prizes
        </h3>
      </div>

      {/* 4 TRACK PRIZE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trackPrizes.map((p, idx) => {
          const PrizeIcon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#0A0B16] border border-[#F2B01E]/40 rounded-2xl p-5 flex flex-col items-center text-center justify-between shadow-[0_0_20px_rgba(242,176,30,0.18)] hover:shadow-[0_0_30px_rgba(242,176,30,0.35)] transition-all group"
            >
              <div className="w-full flex justify-between items-center text-primary-container">
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {p.category}
                </span>
                <Award className="w-4 h-4" />
              </div>

              {/* Icon Circle */}
              <div className="my-5 flex flex-col items-center">
                <div 
                  className="w-20 h-20 rounded-full bg-[#151728] border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ 
                    boxShadow: `0 0 25px ${p.glowColor}`,
                    color: p.color 
                  }}
                >
                  <PrizeIcon className="w-9 h-9" />
                </div>
                <h4 className="font-display text-xl uppercase text-white font-bold tracking-wide mt-4">
                  {p.reward}
                </h4>
                <span 
                  className="text-[11px] font-bold mt-1 tracking-wide"
                  style={{ color: p.color }}
                >
                  ★ {p.track} Champion
                </span>
              </div>

              {/* Footer Tile with Logo or Label */}
              <div className="w-full pt-3 bg-[#11131c] -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl border-t border-white/5 flex items-center justify-center min-h-[46px]">
                {p.logo ? (
                  <img src={p.logo} alt={p.sponsor} className="max-h-6 object-contain" />
                ) : (
                  <span className="text-[10px] uppercase text-text-muted font-bold tracking-wider">
                    Official Track Prize
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SIDE QUESTS SUBSECTION */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-white uppercase font-black tracking-wide">
            side quests
          </h3>
          <span className="text-[11px] uppercase font-bold text-accent-teal tracking-wider bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/20">
            9 Sponsored Quests
          </span>
        </div>

        {/* 3x3 Grid with hairline dividers and official logos */}
        <div className="w-full bg-[#0A0B16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-white/10 sm:divide-y-0 sm:divide-x">
            {sideQuests.map((sq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`p-5 flex flex-col justify-between hover:bg-[#11131c] transition-colors ${
                  idx >= 3 ? 'border-t border-white/10' : ''
                }`}
              >
                <div className="flex items-center justify-between text-text-muted text-[11px] mb-2">
                  <div className="h-6 flex items-center">
                    <img src={sq.logo} alt={sq.sponsor} className="max-h-5 object-contain" />
                  </div>
                  <span className="text-[9px] font-bold bg-white/5 px-2 py-0.5 rounded text-text-muted">
                    {sq.tag}
                  </span>
                </div>
                <div className="font-display text-base uppercase text-white font-bold mt-2 tracking-wide">
                  {sq.reward}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Right MLH Details Link */}
          <div className="w-full bg-[#11131c] p-3.5 px-6 flex items-center justify-between border-t border-white/10">
            <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider hidden sm:inline">
              Judged independently via Devpost on Sunday
            </span>
            <a
              href="https://mlh.io"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-widest text-accent-teal hover:underline font-bold flex items-center gap-1.5 transition-all ml-auto"
            >
              <span>Full Prize Details & Judging Matrix on MLH</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
