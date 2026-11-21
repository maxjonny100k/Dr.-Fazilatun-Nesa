import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Maximize2,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Quote,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  CLINIC_INFO,
  CLINIC_VIDEO,
  Lang,
  WRITTEN_TESTIMONIALS,
} from '../data/clinicData';
import { LangSlide } from './LangMotion';

interface TestimonialsAndDemoProps {
  lang: Lang;
  onBookClick: () => void;
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const TestimonialsAndDemo: React.FC<TestimonialsAndDemoProps> = ({
  lang,
  onBookClick,
}) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Automatically pause video when user scrolls out of the video section
  useEffect(() => {
    const el = videoContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const next = parseFloat(e.target.value);
    v.currentTime = next;
    setCurrentTime(next);
  };

  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      void el.requestFullscreen();
    }
  };

  return (
    <>
      {/* SECTION 4: WRITTEN TESTIMONIALS & DIRECT CONTACT CTA (No fake videos) */}
      <section
        id="testimonials"
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#E6F1F6] to-[#EEF6F8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <LangSlide lang={lang}>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
                {lang === 'bn' ? 'রোগীদের অভিজ্ঞতা ও সন্তুষ্টি' : 'Patient Stories & Outcomes'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
                {lang === 'bn'
                  ? 'রোগীদের মুখে চিকিৎসার অভিজ্ঞতা ও মতামত'
                  : 'Verified Patient Recovery Testimonials'}
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'bn'
                  ? 'বাংলাদেশ আই হসপিটাল খুলনা ও খুলনা মেডিকেল কলেজ হাসপাতালে ডাঃ ফজিলাতুন নেছা (বৃষ্টি)-এর চিকিৎসায় সুস্থ হওয়া রোগীদের বাস্তব মতামত। বিস্তারিত জানতে কল, হোয়াটসঅ্যাপ বা ফেসবুকে যোগাযোগ করুন।'
                  : 'Real feedback from patients treated by Dr. Fazilatun Nesa (Bristy). Reach out directly via Call, WhatsApp, or Facebook for any inquiries.'}
              </p>
            </div>
          </LangSlide>

          {/* 3 Written Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WRITTEN_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="optical-glass-light rounded-2xl p-6 flex flex-col justify-between"
              >
                <LangSlide lang={lang}>
                  <div className="space-y-4">
                    <Quote className="w-6 h-6 text-sky-700/45" />
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{lang === 'bn' ? item.quoteBn : item.quoteEn}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-sky-900/10">
                    <p className="text-sm font-bold text-[#071D38]">
                      {lang === 'bn' ? item.nameBn : item.nameEn}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'bn' ? item.locationBn : item.locationEn} ·{' '}
                      <span className="text-teal-700 font-semibold">
                        {lang === 'bn' ? item.procedureBn : item.procedureEn}
                      </span>
                    </p>
                  </div>
                </LangSlide>
              </div>
            ))}
          </div>

          {/* Direct Contact Info Banner (Call Now, WhatsApp, Facebook) */}
          <div className="optical-glass-light rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <LangSlide lang={lang}>
              <div className="space-y-1.5 max-w-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-[#071D38]">
                  {lang === 'bn'
                    ? 'চোখের চিকিৎসা ও সিরিয়াল সংক্রান্ত তথ্যের জন্য সরাসরি যোগাযোগ করুন'
                    : 'Contact Directly for Treatment Details & Serial Booking'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {lang === 'bn'
                    ? 'আপনার যেকোনো প্রশ্ন বা অপারেশন সংক্রান্ত পরামর্শের জন্য কল, হোয়াটসঅ্যাপ অথবা ফেসবুক পেজে মেসেজ দিন।'
                    : 'Reach out anytime via Phone Call, WhatsApp, or our official Facebook page.'}
                </p>
              </div>
            </LangSlide>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${CLINIC_INFO.serialDigits}`}
                className="glossy-blue-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm font-mono-num whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                {lang === 'bn' ? `কল করুন: ${CLINIC_INFO.serialNumber}` : `Call Now: ${CLINIC_INFO.serialNumber}`}
              </a>
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-teal-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={CLINIC_INFO.doctorFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/85 hover:bg-white border border-sky-900/15 text-[#071D38] font-bold text-sm transition-colors whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4 text-sky-700" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SINGLE REAL DOCTOR VIDEO SECTION WITH CUSTOM PLAYER & AUTO-PAUSE ON SCROLL */}
      <section
        id="video-guidance"
        ref={videoContainerRef}
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#071C37] via-[#092344] to-[#061830] text-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <LangSlide lang={lang}>
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold tracking-wide text-teal-300">
                {lang === 'bn'
                  ? 'ডাক্তারের সরাসরি পরামর্শ ভিডিও'
                  : 'Direct Specialist Video Guidance'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {lang === 'bn' ? CLINIC_VIDEO.titleBn : CLINIC_VIDEO.titleEn}
              </h2>
              <p className="text-sky-100/85 text-sm sm:text-base leading-relaxed">
                {lang === 'bn' ? CLINIC_VIDEO.subtitleBn : CLINIC_VIDEO.subtitleEn}
              </p>
            </div>
          </LangSlide>

          {/* Custom Optical-Glass Video Player */}
          <div className="optical-glass-dark rounded-3xl p-3 sm:p-4 shadow-2xl space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
              <video
                ref={videoRef}
                src={CLINIC_VIDEO.src}
                playsInline
                preload="none"
                onClick={togglePlay}
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center bg-slate-950/25 hover:bg-slate-950/15 transition-colors cursor-pointer"
                >
                  <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full optical-glass-dark flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                  </span>
                </button>
              )}
            </div>

            {/* Custom Glass Control Bar */}
            <div className="flex flex-wrap items-center gap-3 px-2 py-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? (lang === 'bn' ? 'বিরতি' : 'Pause') : lang === 'bn' ? 'চালান' : 'Play'}</span>
              </button>

              <span className="font-mono-num text-xs text-sky-200 whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek video"
                className="flex-1 min-w-[120px] accent-sky-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
              />

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-sky-100 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleFullscreen}
                aria-label="Fullscreen"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-sky-100 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs sm:text-sm text-sky-200/85">
              {lang === 'bn'
                ? 'ছানি অপারেশন ও পরবর্তী ফলোআপ পরামর্শের জন্য যোগাযোগ করুন:'
                : 'Contact directly for cataract surgery & post-op follow-up:'}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBookClick}
                className="glossy-blue-btn px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm cursor-pointer"
              >
                {lang === 'bn' ? 'অনলাইন সিরিয়াল নিন' : 'Book Serial'}
              </button>
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-teal-btn inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp ({CLINIC_INFO.serialNumber})
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
