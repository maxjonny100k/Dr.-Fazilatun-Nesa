import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { CLINIC_INFO, EYE_ZOOM_STAGES, IMAGES, Lang } from '../data/clinicData';
import { LangSlide } from './LangMotion';

interface OpticalEyeHeroProps {
  lang: Lang;
  onBookClick: (serviceName?: string) => void;
  onScrollTo: (sectionId: string) => void;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(v: number): number {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
}

export const OpticalEyeHero: React.FC<OpticalEyeHeroProps> = ({
  lang,
  onBookClick,
  onScrollTo,
}) => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [manualOffset, setManualOffset] = useState<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const totalTravel = Math.max(1, rect.height - window.innerHeight);
      const scrolled = Math.min(Math.max(-rect.top, 0), totalTravel);
      const ratio = scrolled / totalTravel;
      if (manualOffset === null) {
        targetProgressRef.current = ratio * 3;
      }
      if (scrolled > 36 && manualOffset !== null) {
        setManualOffset(null);
        targetProgressRef.current = ratio * 3;
      }
    };

    let rafId = 0;
    const tick = () => {
      const target = manualOffset !== null ? manualOffset : targetProgressRef.current;
      if (prefersReduced) {
        currentProgressRef.current = target;
        setZoomProgress(target);
      } else {
        const diff = target - currentProgressRef.current;
        if (Math.abs(diff) > 0.001) {
          currentProgressRef.current += diff * 0.16;
          setZoomProgress(currentProgressRef.current);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [manualOffset]);

  const activeStageIndex = Math.min(3, Math.max(0, Math.round(zoomProgress)));
  const activeStage = EYE_ZOOM_STAGES[activeStageIndex];

  const handleSelectStage = (idx: number) => {
    setManualOffset(idx);
    targetProgressRef.current = idx;
  };

  // 35–40% radial edge feather masks so rectangular corners NEVER appear during scroll/zoom morphs
  const baseFeatherMask =
    'radial-gradient(ellipse 84% 82% at 50% 48%, rgba(0,0,0,1) 56%, rgba(0,0,0,0.68) 76%, rgba(0,0,0,0) 100%)';
  const zoomLayerFeatherMask =
    'radial-gradient(circle at 50% 48%, rgba(0,0,0,1) 36%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.34) 66%, rgba(0,0,0,0) 84%)';

  return (
    <>
      {/* TOP PURE OPTICAL EYE-ZOOM SCENE
          Consistent across both Mobile & Desktop: centered full-bleed eye zoom with sleek translucent glass overlays at bottom */}
      <section
        id="hero"
        ref={runwayRef}
        className="relative bg-[#061830] text-white h-[185vh] lg:h-[225vh]"
      >
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-4 sm:pb-8">
          {/* Crystal-Clear 4-Stage Feathered Optical Eye-Zoom Stack */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
            {EYE_ZOOM_STAGES.map((stage, i) => {
              const d = zoomProgress - i;

              // Base layer stays full until next layer establishes; upper layers smoothstep in/out cleanly
              let opacity = 0;
              if (i === 0) {
                opacity = d <= 0.35 ? 1 : 1 - smoothstep((d - 0.35) / 0.72);
              } else {
                const fadeIn = smoothstep((d + 0.92) / 0.85);
                const fadeOut = d <= 0.35 ? 1 : 1 - smoothstep((d - 0.35) / 0.72);
                opacity = Math.min(fadeIn, fadeOut);
              }

              // Keep scales tightly centered; radial feather mask erases 35-40% of edges so zero borders/corners ever show
              const scale =
                i === 0
                  ? 1 + Math.max(0, d) * 0.55
                  : d <= 0
                    ? 0.9 + clamp01(1 + d) * 0.1
                    : 1 + d * 0.62;

              const maskStyle = i === 0 ? baseFeatherMask : zoomLayerFeatherMask;

              return (
                <div
                  key={stage.id}
                  style={{
                    opacity,
                    transform: `scale(${scale.toFixed(4)}) translateZ(0)`,
                    willChange: 'transform, opacity',
                    maskImage: maskStyle,
                    WebkitMaskImage: maskStyle,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={stage.image}
                    alt={lang === 'bn' ? stage.layerBn : stage.layerEn}
                    loading="eager"
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              );
            })}

            {/* Ultra-subtle bottom edge gradient only for crisp text legibility (center of eye 100% clear) */}
            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-28 bg-gradient-to-t from-[#061830]/75 via-[#061830]/25 to-transparent" />
          </div>

          {/* Sleek Translucent Corner-Aligned Overlays OVER the Bottom of the Hero Image (Desktop & Mobile) */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-2.5 lg:gap-4">
            {/* Compact Doctor Badge */}
            <div className="optical-glass-dark rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 w-full lg:w-auto lg:max-w-sm">
              <LangSlide lang={lang}>
                <div className="flex items-center gap-3">
                  <img
                    src={IMAGES.doctorLogo}
                    alt={CLINIC_INFO.doctorName[lang]}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-white/30 shrink-0"
                  />
                  <div className="min-w-0">
                    <h1 className="font-display text-sm sm:text-base font-bold text-white leading-tight truncate">
                      {CLINIC_INFO.doctorName[lang]}
                    </h1>
                    <p className="text-[11px] sm:text-xs text-sky-200 font-medium truncate mt-0.5">
                      {CLINIC_INFO.title[lang]}
                    </p>
                  </div>
                </div>
              </LangSlide>
            </div>

            {/* Compact Optical Depth Glass Selector */}
            <div className="optical-glass-dark rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col gap-2 w-full lg:w-auto">
              <div className="flex items-center justify-between gap-3 text-[11px] text-sky-100/90">
                <span className="font-semibold truncate">
                  {activeStage.code}. {lang === 'bn' ? activeStage.layerBn : activeStage.layerEn}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono-num text-teal-300">{activeStage.depthLabel}</span>
                  <button
                    type="button"
                    onClick={() => onScrollTo('overview')}
                    aria-label="Scroll down"
                    className="lg:hidden p-1 rounded-md bg-white/10 border border-white/25 text-sky-100 cursor-pointer"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Clean Single-Row 4-Stage Grid on Mobile, Compact Row on Desktop */}
              <div className="grid grid-cols-4 sm:flex sm:items-center gap-1.5">
                {EYE_ZOOM_STAGES.map((s, idx) => {
                  const isActive = activeStageIndex === idx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectStage(idx)}
                      className={`px-1.5 sm:px-2.5 py-1.5 rounded-lg text-[10.5px] sm:text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap text-center truncate ${
                        isActive
                          ? 'bg-white text-[#061830] border-2 border-sky-300 shadow-sm'
                          : 'bg-white/10 text-sky-100 border border-white/25 hover:bg-white/20 hover:border-white/45'
                      }`}
                    >
                      {s.code} · {lang === 'bn' ? s.layerBn.split(' ')[0] : s.layerEn.split(' ')[0]}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => onScrollTo('overview')}
                  aria-label="Scroll down"
                  className="hidden lg:inline-flex p-1.5 rounded-lg bg-white/10 border border-white/25 hover:bg-white/25 text-sky-100 transition-colors cursor-pointer shrink-0"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BELOW THE HERO SCENE: Clean Dedicated Doctor Credentials, Actions & 4 Quick-Info Glass Cards */}
      <section
        id="overview"
        className="relative z-20 py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-[#E5F1F8] via-[#ECF5F6] to-[#F1F7FA] border-b border-sky-900/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          {/* Main Translucent Glass Summary Panel */}
          <div className="optical-glass-light rounded-3xl p-5 sm:p-8 lg:p-9">
            <LangSlide lang={lang}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-semibold text-teal-800">
                    {CLINIC_INFO.bcsBadge[lang]}
                  </p>
                  <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight leading-snug">
                    {CLINIC_INFO.doctorName[lang]} — {CLINIC_INFO.title[lang]}
                  </h2>
                  <p className="text-xs sm:text-base font-medium text-[#0B3B70]">
                    {CLINIC_INFO.degrees[lang]} · {CLINIC_INFO.fellowship[lang]}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {CLINIC_INFO.chamberLine[lang]}
                  </p>

                  {/* Prominent Cataract Notice */}
                  <div className="rounded-2xl bg-[#E1F3F2]/85 border border-teal-700/25 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-[#08333B] leading-relaxed">
                    <strong className="font-bold text-teal-900">
                      {lang === 'bn' ? 'নিয়মিত ক্যাটারাক্ট (ছানি) সার্জারি: ' : 'Routine Cataract Surgery: '}
                    </strong>
                    {lang === 'bn'
                      ? 'আমাদের এখানে নিয়মিত আধুনিক সেলাইবিহীন ফ্যাকো সার্জারি ও ব্যথাহীন ফ্যাকো সার্জারি পদ্ধতিতে ক্যাটারাক্ট (ছানি) অপারেশন করা হয়। লেন্স ও সার্জারি সম্পর্কে জানতে সরাসরি যোগাযোগ করুন।'
                      : 'Modern stitchless, painless cataract surgery is performed regularly here. Contact directly for lens options and scheduling.'}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onBookClick()}
                    className="glossy-blue-btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    {lang === 'bn' ? 'অনলাইন সিরিয়াল বুকিং' : 'Online Serial Booking'}
                  </button>

                  <a
                    href={CLINIC_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glossy-teal-btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-transform active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল' : 'WhatsApp Serial'}
                  </a>

                  <a
                    href={`tel:${CLINIC_INFO.serialDigits}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-white/90 hover:bg-white border border-sky-900/25 text-[#071D38] font-bold text-xs sm:text-sm font-mono-num transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-sky-700" />
                    {CLINIC_INFO.serialNumber}
                  </a>
                </div>
              </div>
            </LangSlide>
          </div>

          {/* 4-Column Quick Info Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => onScrollTo('location')}
              className="text-left optical-glass-light border border-sky-900/20 hover:border-[#0B5ED7]/45 rounded-2xl p-4 sm:p-5 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex flex-col justify-between"
            >
              <LangSlide lang={lang}>
                <div>
                  <div className="flex items-center gap-2 text-[#0B3B70] font-bold text-sm mb-1.5">
                    <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{lang === 'bn' ? 'চেম্বার ও ঠিকানা' : 'Chamber & Address'}</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    {CLINIC_INFO.chamberShort[lang]}
                  </p>
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  {lang === 'bn' ? 'ঠিকানা দেখুন' : 'View Location'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </LangSlide>
            </button>

            <button
              type="button"
              onClick={() => onScrollTo('location')}
              className="text-left optical-glass-light border border-sky-900/20 hover:border-[#0B5ED7]/45 rounded-2xl p-4 sm:p-5 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex flex-col justify-between"
            >
              <LangSlide lang={lang}>
                <div>
                  <div className="flex items-center gap-2 text-[#0B3B70] font-bold text-sm mb-1.5">
                    <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{lang === 'bn' ? 'রোগী দেখার সময়সূচি' : 'Consultation Schedule'}</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    {CLINIC_INFO.scheduleSummary[lang]}
                  </p>
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  {lang === 'bn' ? 'সময়সূচি দেখুন' : 'View Schedule'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </LangSlide>
            </button>

            <button
              type="button"
              onClick={() => onBookClick()}
              className="text-left optical-glass-light border border-sky-900/20 hover:border-[#0B5ED7]/45 rounded-2xl p-4 sm:p-5 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex flex-col justify-between"
            >
              <LangSlide lang={lang}>
                <div>
                  <div className="flex items-center gap-2 text-[#0B3B70] font-bold text-sm mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ সিরিয়াল' : 'WhatsApp Serial'}</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    {lang === 'bn'
                      ? 'সহজ অনলাইন ফর্ম পূরণ করে সরাসরি হোয়াটসঅ্যাপে তাৎক্ষণিক সিরিয়াল নিন।'
                      : 'Fill the instant booking form to send your serial request directly via WhatsApp.'}
                  </p>
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Serial'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </LangSlide>
            </button>

            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left optical-glass-light border border-sky-900/20 hover:border-teal-600/45 rounded-2xl p-4 sm:p-5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
            >
              <LangSlide lang={lang}>
                <div>
                  <div className="flex items-center gap-2 text-[#0B3B70] font-bold text-sm mb-1.5">
                    <Phone className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{lang === 'bn' ? 'সরাসরি হেল্পলাইন' : 'Direct Helpline'}</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    {lang === 'bn'
                      ? 'হোয়াটসঅ্যাপ বা ফোনে সরাসরি সিরিয়াল: ০১৩৪৫-৭৮৬৮০৬'
                      : 'Direct WhatsApp or Phone Serial: 01345-786806'}
                  </p>
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল নিন' : 'Get Serial on WhatsApp'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </LangSlide>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
