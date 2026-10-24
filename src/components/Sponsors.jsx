import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const INITIAL_TITLE_PARTNERS = [
  {
    name: 'Cox Automotive',
    logo: '/brand/sponsors/mono/cox-automotive.png',
    glow: 'rgba(37,229,255,0.20)',
  },
  {
    name: 'Adobe',
    logo: '/brand/sponsors/mono/adobe.png',
    glow: 'rgba(255,46,136,0.20)',
  },
];

const INITIAL_SUPPORTING = [
  { name: 'Mercedes-Benz R&D', logo: '/brand/sponsors/mono/mbrdna.png' },
  { name: 'Google Cloud', logo: '/brand/sponsors/mono/google-cloud.png' },
  { name: 'Google Gemini', logo: '/brand/sponsors/mono/google-gemini.png' },
  { name: 'Red Bull', logo: '/brand/sponsors/mono/redbull.png' },
  { name: 'Solana', logo: '/brand/sponsors/mono/solana.png' },
  { name: 'ElevenLabs', logo: '/brand/sponsors/mono/elevenlabs.png' },
  { name: 'Auth0', logo: '/brand/sponsors/mono/auth0.png' },
  { name: 'Major League Hacking', logo: '/brand/sponsors/mono/mlh.png' },
  { name: 'GoDaddy', logo: '/brand/sponsors/mono/godaddy.png' },
];

const INITIAL_COMMUNITY = [
  { name: 'Replit', logo: '/brand/sponsors/mono/replit.png' },
  { name: 'Photon', logo: '/brand/sponsors/mono/photon.png' },
  { name: 'Shock Tracker', logo: '/brand/sponsors/mono/shock-tracker.png' },
  { name: 'Vultr', logo: '/brand/sponsors/mono/vultr.png' },
  { name: 'Tiger Data', logo: '/brand/sponsors/mono/tiger-data.png' },
  { name: 'Saxbys', logo: '/brand/sponsors/mono/saxbys.png' },
  { name: 'OLIPOP', logo: '/brand/sponsors/mono/olipop.png' },
];

function LogoCell({ name, logo, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className={`p-4 sm:p-6 flex items-center justify-center min-h-[96px] sm:min-h-[105px] rounded-2xl bg-[#090A14] hover:bg-[#101222] border border-white/[0.04] hover:border-white/15 cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(34,227,200,0.08)] ${className}`}
    >
      <img
        src={logo}
        alt={name}
        loading="lazy"
        className="max-h-8 sm:max-h-10 w-auto max-w-[80%] object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 filter brightness-95 group-hover:brightness-105"
      />
    </motion.div>
  );
}

export default function Sponsors({ onOpenContact, onOpenPartner }) {
  const [titlePartners, setTitlePartners] = useState(INITIAL_TITLE_PARTNERS);
  const [supportingPartners, setSupportingPartners] = useState(INITIAL_SUPPORTING);
  const [communityPartners, setCommunityPartners] = useState(INITIAL_COMMUNITY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const { data, error } = await supabase
          .from('sponsors_list')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) {
          console.warn('Could not load dynamic sponsors, falling back to static:', error.message);
          return;
        }

        if (data && data.length > 0) {
          const titles = data
            .filter((s) => s.tier === 'title')
            .map((s) => ({
              name: s.name,
              logo: s.logo_url,
              glow: s.glow || 'rgba(37,229,255,0.20)',
            }));

          const supporting = data
            .filter((s) => s.tier === 'supporting')
            .map((s) => ({
              name: s.name,
              logo: s.logo_url,
            }));

          const community = data
            .filter((s) => s.tier === 'community')
            .map((s) => ({
              name: s.name,
              logo: s.logo_url,
            }));

          if (titles.length > 0) setTitlePartners(titles);
          if (supporting.length > 0) setSupportingPartners(supporting);
          if (community.length > 0) setCommunityPartners(community);
        }
      } catch (err) {
        console.warn('Error fetching sponsors from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSponsors();
  }, []);

  const handlePartnerClick = () => {
    if (onOpenPartner) {
      onOpenPartner();
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <section id="sponsors" className="w-full flex flex-col gap-10 scroll-mt-28 relative z-20">
      {/* SECTION HEADER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="text-[11px] text-accent-teal uppercase tracking-widest font-extrabold mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-teal" />
            <span>Future Frequencies</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase font-black text-white leading-none text-stroke-pink-lg">
            Sponsors
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="text-text-secondary text-[15px] leading-relaxed pt-1"
        >
          Brought to you by Cox Automotive and Adobe, with sponsor challenges from Replit,
          Photon, and Shock Tracker — alongside the innovators powering this year&apos;s tracks and prizes.
        </motion.div>
      </div>

      {/* TITLE PARTNERS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-white uppercase font-black tracking-wide">Title partners</h3>
          <span className="text-xs text-text-muted font-bold tracking-wider uppercase">The loudest supporters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {titlePartners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#0A0B16] border border-white/10 rounded-2xl p-6 sm:p-12 flex flex-col items-center justify-center shadow-lg hover:border-white/25 transition-all relative overflow-hidden group cursor-pointer"
              style={{ boxShadow: `0 0 40px ${p.glow}` }}
            >
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${p.glow}, transparent 70%)` }}
              />
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="max-h-16 w-auto max-w-[80%] object-contain filter brightness-100 group-hover:scale-105 transition-transform duration-300 relative z-10"
              />
              <span className="absolute bottom-4 left-6 text-[9px] font-bold uppercase tracking-widest text-text-muted">
                Title Partner
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WITH SUPPORT FROM (Refined seamless grid, no harsh dividers) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-white uppercase font-black tracking-wide">With support from</h3>
          <span className="text-xs text-text-muted font-bold tracking-wider uppercase">Tracks, tools &amp; fuel</span>
        </div>

        <div className="w-full bg-[#060710]/70 border border-white/[0.06] rounded-3xl p-3 sm:p-4 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
            {supportingPartners.map((s) => (
              <LogoCell key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* COMMUNITY PARTNERS (Refined seamless grid) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-white uppercase font-black tracking-wide">Community partners</h3>
          <button
            type="button"
            onClick={handlePartnerClick}
            className="text-xs text-accent-teal hover:underline font-bold inline-flex items-center gap-1 uppercase tracking-wider transition-all cursor-pointer min-h-[44px] px-1"
          >
            <span>Become a partner</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-full bg-[#060710]/70 border border-white/[0.06] rounded-3xl p-3 sm:p-4 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {communityPartners.map((s) => (
              <LogoCell key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
