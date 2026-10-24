import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RotateCw, ArrowRight, X, CheckCircle2, Check, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

const TRACK_OPTIONS = [
  'Frontend',
  'Backend',
  'Fullstack',
  'AI / ML',
  'UI / UX',
  'CyberSecurity',
];

const ROLE_OPTIONS = [
  'Student (Undergrad)',
  'Student (Graduate)',
  'Software Engineer',
  'UI/UX Designer',
  'Researcher / Academic',
  'Other',
];

const GRAD_YEAR_OPTIONS = [
  'Class of 2026',
  'Class of 2027',
  'Class of 2028',
  'Class of 2029+',
  'Recent Graduate',
  'Working Professional',
];

const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function HeroLanyard3D() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ── Form State ─────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    github: '',
    linkedin: '',
    role: 'Student (Undergrad)',
    school: '',
    gradYear: 'Class of 2027',
    track: 'AI / ML',
    techStack: 'React, Python, PyTorch',
    hasTeam: 'no',
    teamName: '',
    tshirt: 'L',
    dietary: '',
    essay: '',
    agreedToCoC: false,
  });

  const containerRef = useRef(null);

  // Listen to custom event from Navbar or Track buttons
  useEffect(() => {
    const handleOpenApply = (e) => {
      setIsFlipped(true);
      if (e?.detail?.track && TRACK_OPTIONS.includes(e.detail.track)) {
        setFormData((prev) => ({ ...prev, track: e.detail.track }));
      }
    };
    window.addEventListener('open-apply-form', handleOpenApply);
    return () => window.removeEventListener('open-apply-form', handleOpenApply);
  }, []);

  // Spring physics tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 140, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-280, 280], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-280, 280], [-14, 14]), springConfig);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springDragX = useSpring(dragX, springConfig);
  const springDragY = useSpring(dragY, springConfig);

  // Holo shine for front badge
  const holoX = useTransform(mouseX, [-280, 280], ['0%', '100%']);
  const holoY = useTransform(mouseY, [-280, 280], ['0%', '100%']);

  const handlePointerMove = useCallback(
    (e) => {
      if (isDragging || isFlipped || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    },
    [isDragging, isFlipped, mouseX, mouseY]
  );

  const handlePointerLeave = useCallback(() => {
    if (!isDragging) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [isDragging, mouseX, mouseY]);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errorMessage) setErrorMessage('');
  };

  // Navigasi Step Form
  const handleContinue = async (e) => {
    e?.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');

    // Validasi per step
    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        setErrorMessage('Please enter your first name.');
        return;
      }
      if (!formData.lastName.trim()) {
        setErrorMessage('Please enter your last name.');
        return;
      }
      if (!formData.phone.trim()) {
        setErrorMessage('Please enter your contact phone number.');
        return;
      }
    } else if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
    } else if (currentStep === 8) {
      if (!formData.agreedToCoC) {
        setErrorMessage('Please agree to the Code of Conduct and Privacy Policy.');
        return;
      }

      // Submit Application to Supabase
      setIsSubmitting(true);
      try {
        const techStackArr = formData.techStack
          ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
          : [];

        const payload = {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          github_username: formData.github.trim() || null,
          linkedin_profile: formData.linkedin.trim() || null,
          current_role: formData.role || null,
          institution: formData.school.trim() || null,
          graduation_year: formData.gradYear || null,
          primary_track: formData.track || null,
          tech_stack: techStackArr,
          has_team: formData.hasTeam === 'yes',
          team_name: formData.hasTeam === 'yes' ? (formData.teamName.trim() || null) : null,
          tshirt_size: formData.tshirt || 'M',
          dietary_restrictions: formData.dietary.trim() || null,
          motivation_essay: formData.essay.trim() || null,
          agreed_terms: formData.agreedToCoC,
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

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FF6A2B', '#FF4B5C', '#E83E8C', '#FFD23F', '#3DDC84', '#21E6D7', '#7B4DFF'],
        });
        return;
      } catch (err) {
        setIsSubmitting(false);
        setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
        return;
      }
    }

    setCurrentStep((s) => Math.min(8, s + 1));
  };

  const handleBack = (e) => {
    e?.preventDefault();
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    } else {
      setIsFlipped(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setIsFlipped(false);
  };

  const wordCount = formData.essay.trim() ? formData.essay.trim().split(/\s+/).length : 0;

  return (
    <section
      id="home"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[820px] flex flex-col items-center justify-start pt-2 select-none overflow-visible"
      style={{ perspective: '1300px' }}
    >
      {/* ── DRAGGABLE BADGE CONTAINER ────────────────────────────────────────── */}
      <motion.div
        drag={!isFlipped}
        dragConstraints={{ left: -100, right: 100, top: -20, bottom: 40 }}
        dragElastic={0.25}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          dragX.set(info.offset.x);
          dragY.set(info.offset.y);
          mouseX.set(info.offset.x * 1.3);
          mouseY.set(info.offset.y * 1.3);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          dragX.set(0);
          dragY.set(0);
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          x: springDragX,
          y: springDragY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative z-30 max-w-[430px] w-[95vw] sm:w-[430px] flex flex-col items-center ${
          !isFlipped ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
      >
        {/* ── LANYARD STRAP & CLIP (EXTENDED TO TOP OF VIEWPORT) ───────────── */}
        <div className="flex flex-col items-center w-full select-none pointer-events-none -mb-2 z-20 relative">
          {/* Seamless long lanyard strap extending upwards past top of viewport */}
          <div className="w-10 h-[2000px] -mt-[1960px] bg-[#090a12] border-x border-white/10 flex flex-col items-center justify-end pb-3 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/75 pointer-events-none" />
            
            {/* Repeating vertical text pattern along the strap */}
            <div className="flex flex-col items-center gap-16 py-6 opacity-70">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className="text-[8px] font-mono tracking-[0.3em] text-white/80 rotate-90 whitespace-nowrap font-bold select-none"
                >
                  • HACKLANTA '26 •
                </span>
              ))}
            </div>
          </div>

          {/* Chrome metal clip holding the card */}
          <div className="w-7 h-3.5 rounded-full bg-gradient-to-r from-gray-400 via-gray-100 to-gray-500 shadow-md -mt-0.5 z-30" />
          <div className="w-3.5 h-5 rounded-t-sm bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 shadow-xl -mt-0.5 z-30 flex items-center justify-center">
            <div className="w-1 h-2.5 bg-gray-900 rounded-full" />
          </div>
        </div>

        {/* ── 3D FLIP CARD CONTAINER ──────────────────────────────────────────── */}
        <div className="relative w-full" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full h-[670px] sm:h-[690px] rounded-[26px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ══════════════════════════════════════════════════════════════════
                FRONT FACE: ID CARD / LANYARD BADGE
               ══════════════════════════════════════════════════════════════════ */}
            <div
              className={`w-full h-full bg-[#080911] rounded-[26px] p-5 sm:p-6 border border-white/12 flex flex-col justify-between items-center relative overflow-hidden transition-opacity duration-300 ${
                isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow:
                  '0 0 0 1px rgba(255,255,255,0.1), 0 0 35px rgba(255,100,50,0.14), 0 20px 50px rgba(0,0,0,0.92)',
              }}
            >
              {/* Holo shine */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-color-dodge rounded-[26px]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,46,136,0.5), rgba(33,230,215,0.5) 35%, rgba(255,216,61,0.5) 70%, rgba(154,92,255,0.5))',
                  backgroundPositionX: holoX,
                  backgroundPositionY: holoY,
                }}
              />

              {/* Punch slot */}
              <div className="w-11 h-1.5 rounded-full bg-black/90 shadow-inner mb-2 border border-white/10" />

              {/* Header row */}
              <div className="w-full flex items-center justify-between text-white px-0.5 mb-1">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-[#b4ea3b] tracking-wider uppercase mb-0.5">
                    HACKLANTA '26
                  </span>
                  <svg className="w-11 h-6" viewBox="0 0 64 36" fill="none">
                    <path
                      d="M18 32h32a12 12 0 0 0 0-24 16 16 0 0 0-31-3A12 12 0 0 0 18 32z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
                <div className="text-white/35 text-xs animate-pulse">✦</div>
                <div className="flex items-center justify-center">
                  <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
                    <g transform="translate(50,50)">
                      {[0, 72, 144, 216, 288].map((a, i) => (
                        <ellipse
                          key={i}
                          cx="0"
                          cy="-23"
                          rx="12"
                          ry="18"
                          fill="#8C5CFF"
                          transform={`rotate(${a})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="11" fill="#FFA500" />
                      <circle cx="0" cy="0" r="5.5" fill="#FF5500" />
                    </g>
                    <path d="M72 65 C85 60 88 45 80 40 C75 52 65 58 72 65Z" fill="#3DDC84" />
                  </svg>
                </div>
              </div>

              {/* Wordmark */}
              <div className="my-1 w-full text-center relative select-none flex items-center justify-center">
                <div className="relative inline-block">
                  <h1 className="font-wordmark text-[50px] sm:text-[56px] font-black lowercase tracking-[-0.04em] text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    hacklanta
                  </h1>
                  <span className="absolute -top-1 -right-5 text-accent-pink text-lg animate-bounce">
                    ♫
                  </span>
                </div>
              </div>

              {/* Color bars */}
              <div className="flex items-center justify-center gap-2 py-0.5 mb-1.5">
                <div className="w-5 h-1 rounded-full bg-[#3DDC84]" />
                <div className="w-5 h-1 rounded-full bg-[#21E6D7]" />
                <div className="w-5 h-1 rounded-full bg-[#FF7A1A]" />
                <div className="w-5 h-1 rounded-full bg-[#8C5CFF]" />
              </div>

              {/* 2×2 info tiles */}
              <div className="w-full grid grid-cols-2 gap-2 my-1">
                {[
                  { label: 'DATES', color: '#A6E82B', val: 'Oct 9–11' },
                  { label: 'CITY', color: '#8C5CFF', val: 'ATL' },
                  { label: 'DURATION', color: '#21E6D7', val: '36 hours' },
                  { label: 'BUILDERS', color: '#FF7A1A', val: '1,000+ students' },
                ].map(({ label, color, val }) => (
                  <div
                    key={label}
                    className="bg-[#0D0F1A] border border-white/10 rounded-xl p-2.5 flex flex-col justify-between shadow-sm"
                  >
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-wider"
                      style={{ color }}
                    >
                      {label}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-black text-white tracking-wide mt-0.5 leading-tight">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Illustration strip */}
              <div className="w-full bg-[#0b0c16] border border-white/5 rounded-xl p-2 my-1 relative overflow-hidden flex items-end justify-between min-h-[86px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121422] to-transparent pointer-events-none" />
                {/* VW Van */}
                <div className="relative z-10 w-24 sm:w-28 flex flex-col items-center">
                  <svg viewBox="0 0 160 120" className="w-full drop-shadow-md">
                    <path
                      d="M25 50 Q25 32 45 30 L115 30 Q135 32 135 50 Z"
                      fill="#F4F0E4"
                      stroke="#000"
                      strokeWidth="3"
                    />
                    <path
                      d="M30 48 L76 48 L76 34 L45 34 Z"
                      fill="#C2EBF7"
                      stroke="#000"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M84 48 L130 48 L115 34 L84 34 Z"
                      fill="#C2EBF7"
                      stroke="#000"
                      strokeWidth="2.5"
                    />
                    <rect
                      x="23"
                      y="48"
                      width="114"
                      height="42"
                      rx="6"
                      fill="#8CE0B0"
                      stroke="#000"
                      strokeWidth="3"
                    />
                    <circle cx="36" cy="62" r="7" fill="#FFF8D6" stroke="#000" strokeWidth="2.5" />
                    <circle cx="124" cy="62" r="7" fill="#FFF8D6" stroke="#000" strokeWidth="2.5" />
                    <circle cx="80" cy="64" r="9" fill="#F4F0E4" stroke="#000" strokeWidth="2.5" />
                    <line x1="80" y1="55" x2="80" y2="73" stroke="#000" strokeWidth="2" />
                    <line x1="80" y1="64" x2="73" y2="71" stroke="#000" strokeWidth="2" />
                    <line x1="80" y1="64" x2="87" y2="71" stroke="#000" strokeWidth="2" />
                    <rect
                      x="18"
                      y="86"
                      width="124"
                      height="8"
                      rx="4"
                      fill="#F4F0E4"
                      stroke="#000"
                      strokeWidth="2.5"
                    />
                    <rect x="30" y="88" width="16" height="18" rx="4" fill="#222" />
                    <rect x="114" y="88" width="16" height="18" rx="4" fill="#222" />
                    <circle cx="38" cy="98" r="4" fill="#F4F0E4" />
                    <circle cx="122" cy="98" r="4" fill="#F4F0E4" />
                  </svg>
                </div>
                {/* Shrubs */}
                <div className="relative z-10 flex items-center -mx-1 -mb-1">
                  <svg viewBox="0 0 60 40" className="w-11 h-8">
                    <circle cx="15" cy="25" r="13" fill="#3DDC84" />
                    <circle cx="34" cy="22" r="15" fill="#2ECC71" />
                    <circle cx="47" cy="28" r="9" fill="#27AE60" />
                  </svg>
                </div>
                {/* Dome + Flower */}
                <div className="relative z-10 flex items-end">
                  <svg viewBox="0 0 100 70" className="w-16 h-12 -mr-3">
                    <ellipse
                      cx="50"
                      cy="55"
                      rx="44"
                      ry="11"
                      fill="none"
                      stroke="#8C5CFF"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M6 55 C6 21 94 21 94 55"
                      fill="none"
                      stroke="#8C5CFF"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M50 22 L21 42 L50 55 L79 42 Z"
                      fill="none"
                      stroke="#8C5CFF"
                      strokeWidth="1.5"
                    />
                    <path d="M50 22 L50 55" fill="none" stroke="#8C5CFF" strokeWidth="1.5" />
                    <path
                      d="M21 42 L6 55 M79 42 L94 55"
                      fill="none"
                      stroke="#8C5CFF"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <svg viewBox="0 0 80 80" className="w-11 h-11 relative z-20">
                    <g transform="translate(40,40)">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                        <ellipse
                          key={i}
                          cx="0"
                          cy="-19"
                          rx="7"
                          ry="14"
                          fill="#FFD23F"
                          transform={`rotate(${a})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="11" fill="#4B3A1C" />
                      <circle cx="0" cy="0" r="7" fill="#F39C12" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Launch application button (Triggers Flip) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="w-full bg-[#FFD83D] hover:bg-[#FFE36A] active:scale-[0.98] text-[#0A0B16] rounded-full py-2.5 sm:py-3 px-5 flex items-center justify-between font-display text-base uppercase tracking-wider font-black shadow-[0_0_28px_rgba(255,216,61,0.5)] hover:shadow-[0_0_40px_rgba(255,216,61,0.7)] transition-all group mt-1"
              >
                <span className="mx-auto pl-5 font-black">Launch application</span>
                <div className="w-7 h-7 rounded-full bg-[#0A0B16] flex items-center justify-center text-[#FFD83D] group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>

              {/* Flip hint */}
              <div className="mt-1 w-full text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="text-[11px] text-[#FFD83D] hover:text-white underline font-bold transition-colors tracking-wide flex items-center justify-center gap-1.5 mx-auto"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Click card to Register (Flip 3D)</span>
                </button>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                BACK FACE: 8-STEP PARTICIPANT APPLICATION FORM
               ══════════════════════════════════════════════════════════════════ */}
            <div
              className={`absolute inset-0 w-full h-full rounded-[26px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-opacity duration-300 ${
                !isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
              style={{
                background:
                  'linear-gradient(#080911, #080911) padding-box, linear-gradient(135deg, #FF6A2B, #FF4B5C, #E83E8C, #FFD23F, #3DDC84, #21E6D7, #7B4DFF) border-box',
                border: '2px solid transparent',
                borderRadius: '26px',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow:
                  '0 0 35px rgba(33,230,215,0.18), 0 0 50px rgba(123,77,255,0.2), 0 25px 60px rgba(0,0,0,0.95)',
              }}
            >
              {/* ── CARD HEADER: PIN, TITLE, PROGRESS (Fixed at Top) ── */}
              <div className="flex-shrink-0 w-full flex flex-col">
                {/* Punch slot */}
                <div className="w-11 h-1.5 rounded-full bg-black/90 shadow-inner mb-2 border border-white/10 self-center" />

                {/* Header Row: HACKLANTA '26 + Close X Button */}
                <div className="w-full flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#b4ea3b] tracking-widest uppercase">
                    HACKLANTA '26
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/80 hover:text-white transition-all"
                    title="Flip back to ID Card"
                    aria-label="Close form"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {!isSubmitted && (
                  <div className="w-full text-left">
                    {/* Title */}
                    <h2 className="font-wordmark text-2xl sm:text-[26px] font-black text-[#FFD83D] tracking-tight leading-tight">
                      Participant application
                    </h2>

                    {/* STEP PROGRESS TEXT */}
                    <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-gray-300 mt-1 mb-1">
                      STEP {currentStep} OF 8
                    </div>

                    {/* 8-SEGMENT PROGRESS PILLS */}
                    <div className="flex items-center gap-1 w-full mb-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i + 1 <= currentStep
                              ? 'bg-gradient-to-r from-[#7B4DFF] via-[#FF316F] to-[#21E6D7]'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step Subtitle */}
                    <h3 className="font-sans text-lg sm:text-xl font-black text-white tracking-tight mb-1">
                      {currentStep === 1 && 'Your identity'}
                      {currentStep === 2 && 'Contact & Online Profiles'}
                      {currentStep === 3 && 'Education & Role'}
                      {currentStep === 4 && 'Skills & Specialization'}
                      {currentStep === 5 && 'Team Status'}
                      {currentStep === 6 && 'Logistics & Swag'}
                      {currentStep === 7 && "Why Hacklanta '26?"}
                      {currentStep === 8 && 'Review & Terms'}
                    </h3>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-white/10 mb-2" />
                  </div>
                )}
              </div>

              {/* ── MIDDLE CONTENT: SCROLLABLE FORM BODY OR SUCCESS SCREEN ── */}
              {isSubmitted ? (
                <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center py-4 px-2 overflow-y-auto custom-scrollbar">
                  <div className="w-14 h-14 rounded-full bg-[#3DDC84]/20 border border-[#3DDC84]/40 flex items-center justify-center text-[#3DDC84] mb-2.5 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent-teal mb-0.5">
                    Application Received
                  </div>
                  <h2 className="font-wordmark text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    You're on the list!
                  </h2>
                  <div className="bg-[#121320] border border-white/10 rounded-2xl p-3.5 my-2 w-full max-w-[320px]">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                      Applicant Ticket ID
                    </div>
                    <div className="font-mono text-xl font-black text-[#FFD83D] tracking-wider">
                      {ticketId}
                    </div>
                    <div className="text-[11px] text-gray-300 mt-1.5 font-medium">
                      {formData.firstName} {formData.lastName} · {formData.track}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 max-w-xs mb-4">
                    Confirmation email sent to <span className="text-white font-semibold">{formData.email}</span> with Discord team formation links.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full max-w-[280px] py-2.5 px-4 rounded-full font-bold text-xs text-[#0c0d16] bg-[#FFD83D] hover:bg-[#FFE36A] transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_0_#7C4DFF]"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Back to ID Card</span>
                  </button>
                </div>
              ) : (
                /* Form Steps Container (flex-1 min-h-0 makes it strictly scrollable) */
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 py-1 space-y-2.5">
                  {/* STEP 1: Your Identity */}
                  {currentStep === 1 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex"
                          value={formData.firstName}
                          onChange={(e) => updateField('firstName', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Use the name you want organizers to use.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Mercer"
                          value={formData.lastName}
                          onChange={(e) => updateField('lastName', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Use the name you want organizers to use.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (404) 555-0199"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Include a country code if outside the United States.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Contact & Profiles */}
                  {currentStep === 2 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex.mercer@gatech.edu"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          We will send updates and match details here.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          GitHub Username
                        </label>
                        <input
                          type="text"
                          placeholder="alexmercer-dev"
                          value={formData.github}
                          onChange={(e) => updateField('github', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Your code repository profile.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/alexmercer"
                          value={formData.linkedin}
                          onChange={(e) => updateField('linkedin', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Link to your professional profile.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Background & Education */}
                  {currentStep === 3 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Current Role / Status
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        >
                          {ROLE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          School / Institution / Company
                        </label>
                        <input
                          type="text"
                          placeholder="Georgia Institute of Technology"
                          value={formData.school}
                          onChange={(e) => updateField('school', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Graduation Year / Experience Level
                        </label>
                        <select
                          value={formData.gradYear}
                          onChange={(e) => updateField('gradYear', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        >
                          {GRAD_YEAR_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Technical Skills */}
                  {currentStep === 4 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Primary Track
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {TRACK_OPTIONS.map((tr) => (
                            <button
                              key={tr}
                              type="button"
                              onClick={() => updateField('track', tr)}
                              className={`py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                                formData.track === tr
                                  ? 'bg-[#FFD83D] text-[#0A0B16] border-[#FFD83D] shadow-[0_0_12px_rgba(255,216,61,0.4)]'
                                  : 'bg-[#121320] text-gray-300 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <span className="truncate">{tr}</span>
                              {formData.track === tr && <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Tech Stack &amp; Tools
                        </label>
                        <input
                          type="text"
                          placeholder="React, Next.js, Python, Docker"
                          value={formData.techStack}
                          onChange={(e) => updateField('techStack', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Separate tools with commas (e.g. React, PyTorch, Go).
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Team Preference */}
                  {currentStep === 5 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5">
                          Are you applying with a team?
                        </label>
                        <div className="space-y-1.5">
                          {[
                            { id: 'yes', label: 'Yes, I have a team' },
                            { id: 'no', label: 'No, I need a team (Team Matchmaking)' },
                          ].map((opt) => (
                            <label
                              key={opt.id}
                              className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                                formData.hasTeam === opt.id
                                  ? 'bg-[#151728] border-accent-teal text-white shadow-[0_0_12px_rgba(34,227,200,0.2)]'
                                  : 'bg-[#0E101D] border-white/10 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="radio"
                                name="hasTeam"
                                checked={formData.hasTeam === opt.id}
                                onChange={() => updateField('hasTeam', opt.id)}
                                className="accent-accent-teal w-4 h-4"
                              />
                              <span className="text-xs font-bold">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {formData.hasTeam === 'yes' && (
                        <div className="pt-0.5">
                          <label className="block text-xs font-bold text-white mb-1">
                            Team Name / Team Code
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. PeachState Hackers"
                            value={formData.teamName}
                            onChange={(e) => updateField('teamName', e.target.value)}
                            className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                          />
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Your teammates can enter the same name to be grouped together.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 6: Logistics & T-Shirt */}
                  {currentStep === 6 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          T-Shirt Size
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {TSHIRT_SIZES.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => updateField('tshirt', size)}
                              className={`py-1.5 rounded-xl text-xs font-black transition-all border ${
                                formData.tshirt === size
                                  ? 'bg-[#FFD83D] text-[#0A0B16] border-[#FFD83D] shadow-[0_0_10px_rgba(255,216,61,0.4)]'
                                  : 'bg-[#121320] text-gray-300 border-white/10 hover:border-white/20'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1">
                          Dietary Restrictions / Special Needs (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Halal, Vegetarian, Vegan, Peanut Allergy, None"
                          value={formData.dietary}
                          onChange={(e) => updateField('dietary', e.target.value)}
                          className="w-full bg-[#EDEBF5] text-[#11121C] font-semibold text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all"
                        />
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          All meals, snacks, and midnight pizzas are covered for 36 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Short Essay / Motivation */}
                  {currentStep === 7 && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-white leading-snug">
                        What project idea or goal do you want to achieve during the event?
                      </label>
                      <textarea
                        rows={3}
                        value={formData.essay}
                        onChange={(e) => {
                          const val = e.target.value;
                          const count = val.trim() ? val.trim().split(/\s+/).length : 0;
                          if (count <= 200 || val.length < formData.essay.length) {
                            updateField('essay', val);
                          }
                        }}
                        placeholder="Tell us what excites you to build at Hacklanta '26 (e.g. autonomous drone CV, local AI models, creative dev tools)..."
                        className="w-full bg-[#EDEBF5] text-[#11121C] font-medium text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#7B4DFF] transition-all resize-none"
                      />
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <span>Max 200 words</span>
                        <span className={wordCount > 180 ? 'text-accent-pink font-bold' : ''}>
                          {wordCount} / 200 words
                        </span>
                      </div>
                    </div>
                  )}

                  {/* STEP 8: Review & Submit */}
                  {currentStep === 8 && (
                    <div className="space-y-2.5">
                      <div className="bg-[#101222] border border-white/10 rounded-xl p-3 space-y-1.5 text-xs">
                        <div className="text-[10px] uppercase font-bold text-accent-teal tracking-wider mb-1">
                          Application Summary
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-gray-400">Name:</span>
                          <span className="font-bold text-white truncate max-w-[170px]">
                            {formData.firstName || '—'} {formData.lastName || '—'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-gray-400">Email:</span>
                          <span className="font-bold text-white truncate max-w-[170px]">
                            {formData.email || '—'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-gray-400">Track:</span>
                          <span className="font-bold text-[#FFD83D]">{formData.track}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team:</span>
                          <span className="font-bold text-white truncate max-w-[170px]">
                            {formData.hasTeam === 'yes'
                              ? formData.teamName || 'Yes (Has Team)'
                              : 'Seeking Team'}
                          </span>
                        </div>
                      </div>

                      <label className="flex items-start gap-2 p-2 rounded-xl bg-[#0F101C] border border-white/10 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreedToCoC}
                          onChange={(e) => updateField('agreedToCoC', e.target.checked)}
                          className="mt-0.5 w-4 h-4 accent-[#FFD83D] rounded cursor-pointer shrink-0"
                        />
                        <span className="text-[11px] text-gray-300 leading-snug">
                          I agree to the Hacklanta '26{' '}
                          <a
                            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#FFD83D] underline hover:text-white transition-colors"
                          >
                            Code of Conduct
                          </a>{' '}
                          and{' '}
                          <a
                            href="https://mlh.io/privacy"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#FFD83D] underline hover:text-white transition-colors"
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="text-center text-xs text-[#FF4B5C] font-bold bg-[#FF4B5C]/10 border border-[#FF4B5C]/30 rounded-xl py-1 px-2 animate-shake">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}

              {/* ── CARD FOOTER: FIXED DOCK ACTION BAR (Always visible at bottom with safe padding) ── */}
              {!isSubmitted && (
                <div className="flex-shrink-0 w-full pt-2 pb-2 sm:pb-3">
                  <div className="bg-[#0e0f18]/95 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-2xl flex items-center gap-2.5 w-full shadow-xl">
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm text-[#0c0d16] bg-[#FFD83D] hover:bg-[#FFE36A] active:translate-y-0.5 shadow-[0_4px_0_#6A42E6] hover:shadow-[0_2px_0_#6A42E6] transition-all text-center flex items-center justify-center cursor-pointer"
                    >
                      Back
                    </button>

                    {/* Continue or Submit Button */}
                    {currentStep < 8 ? (
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="flex-1 py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm text-[#0c0d16] bg-[#FFD83D] hover:bg-[#FFE36A] active:translate-y-0.5 shadow-[0_4px_0_#6A42E6] hover:shadow-[0_2px_0_#6A42E6] transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleContinue}
                        className={`flex-1 py-2.5 px-4 rounded-full font-black text-xs sm:text-sm text-[#0A0B16] bg-gradient-to-r from-[#A6E82B] via-[#FFD83D] to-[#3DDC84] hover:brightness-110 active:translate-y-0.5 shadow-[0_4px_0_#289E5B] hover:shadow-[0_2px_0_#289E5B] transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'animate-pulse'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── CARD BOTTOM HINT ──────────────────────────────────────────────── */}
        <div className="mt-3 flex items-center justify-center gap-3 text-text-muted text-[11px]">
          <button
            type="button"
            onClick={() => setIsFlipped((f) => !f)}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5 text-accent-teal" />
            <span>{isFlipped ? 'Flip to front ID badge' : 'Flip to 8-step application'}</span>
          </button>
        </div>
      </motion.div>

      {/* ── HERO BOTTOM BADGES / TAGS ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-3 mt-6 z-20"
      >
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {['MLH Official Event', 'Oct 9–11 2026', 'ATL Tech Square', '$45K+ Prizes'].map(
            (tag, i) => (
              <span
                key={i}
                className="px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/12 text-text-muted bg-white/3 backdrop-blur-sm shadow-sm"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
