import React, { useEffect, useState } from 'react';
import {
  CalendarCheck,
  ExternalLink,
  Globe,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react';
import { BookingAndLocation } from './components/BookingAndLocation';
import { DoctorBioSection } from './components/DoctorBioSection';
import { EducationAndContact } from './components/EducationAndContact';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LangSlide } from './components/LangMotion';
import { OpticalEyeHero } from './components/OpticalEyeHero';
import { ServicesAndPricing } from './components/ServicesAndPricing';
import { TestimonialsAndDemo } from './components/TestimonialsAndDemo';
import { CLINIC_INFO, IMAGES, Lang, SERVICES } from './data/clinicData';

export default function App() {
  const [lang, setLang] = useState<Lang>('bn');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [showHeader, setShowHeader] = useState(false);

  // Hide top navbar while inside the initial Eye-Zoom Hero; slide it down cleanly on scroll past the eye hero
  useEffect(() => {
    const updateHeaderVisibility = () => {
      const heroEl = document.getElementById('hero');
      if (!heroEl) {
        setShowHeader(window.scrollY > 360);
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      const pastHero = rect.bottom <= window.innerHeight * 1.05;
      setShowHeader(pastHero);
      if (!pastHero) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
    window.addEventListener('resize', updateHeaderVisibility, { passive: true });
    updateHeaderVisibility();

    return () => {
      window.removeEventListener('scroll', updateHeaderVisibility);
      window.removeEventListener('resize', updateHeaderVisibility);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookService = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    scrollToSection('booking');
  };

  const navLinks = [
    { id: 'about', labelBn: 'পরিচিতি', labelEn: 'About' },
    { id: 'services', labelBn: 'সেবাসমূহ', labelEn: 'Services' },
    { id: 'pricing', labelBn: 'সার্জারি চার্জ', labelEn: 'Packages' },
    { id: 'video-guidance', labelBn: 'পরামর্শ ভিডিও', labelEn: 'Video' },
    { id: 'booking', labelBn: 'সিরিয়াল', labelEn: 'Booking' },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col text-[#0B1E36]">
        {/* SCROLL-REVEALED FROSTED GLASS NAVIGATION BAR
            Hidden at top Hero so the Eye-Zoom starts completely unobstructed; slides down smoothly on scroll */}
        <header
          className={`fixed top-0 inset-x-0 z-40 bg-[#061830]/82 backdrop-blur-xl border-b border-white/15 text-white shadow-[0_8px_30px_-14px_rgba(2,12,27,0.55)] transition-all duration-300 ease-out will-change-transform ${
            showHeader
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-6">
            {/* Zone 1: Doctor Real Logo + Wordmark */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="flex items-center gap-2.5 min-w-0"
            >
              <img
                src={IMAGES.doctorLogo}
                alt={CLINIC_INFO.doctorName[lang]}
                className="w-9 h-9 rounded-xl object-cover border border-white/35 shadow-sm shrink-0"
              />
              <LangSlide lang={lang}>
                <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white truncate block">
                  {CLINIC_INFO.doctorName[lang]}
                </span>
              </LangSlide>
            </a>

            {/* Zone 2: Concise Single-Line Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-sky-100/90">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-teal-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {lang === 'bn' ? link.labelBn : link.labelEn}
                </button>
              ))}
            </nav>

            {/* Zone 3: Language Toggle + Glossy CTA + Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleBookService()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glossy-blue-btn text-white text-xs font-bold transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সিরিয়াল নিন' : 'Book Serial'}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle Menu"
                className="lg:hidden p-2 rounded-xl border border-white/25 text-sky-100 hover:bg-white/10 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#061830]/95 backdrop-blur-xl border-t border-white/15 px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-sky-100 hover:bg-white/10 cursor-pointer"
                >
                  {lang === 'bn' ? link.labelBn : link.labelEn}
                </button>
              ))}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleBookService()}
                  className="flex-1 px-4 py-2.5 rounded-xl glossy-blue-btn text-white font-bold text-xs text-center cursor-pointer"
                >
                  {lang === 'bn' ? 'অনলাইন সিরিয়াল' : 'Online Serial'}
                </button>
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-xl glossy-teal-btn text-white font-bold text-xs text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <OpticalEyeHero
            lang={lang}
            onBookClick={handleBookService}
            onScrollTo={scrollToSection}
          />
          <DoctorBioSection lang={lang} onBookClick={() => handleBookService()} />
          <ServicesAndPricing lang={lang} onBookService={handleBookService} />
          <TestimonialsAndDemo lang={lang} onBookClick={() => handleBookService()} />
          <BookingAndLocation lang={lang} preselectedService={preselectedService} />
          <EducationAndContact lang={lang} />
        </main>

        {/* FOOTER WITH DOCTOR LOGO, OFFICIAL FACEBOOK LINKS & POWERED BY PROCHAROMEDIA */}
        <footer className="bg-[#051428] text-sky-100 border-t border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
              {/* Left Column: Doctor Logo, Bio & Official Facebook Links */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={IMAGES.doctorLogo}
                    alt={CLINIC_INFO.doctorName[lang]}
                    className="w-12 h-12 rounded-xl object-cover border border-white/30 shrink-0"
                  />
                  <LangSlide lang={lang}>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {CLINIC_INFO.doctorName[lang]}
                      </h3>
                      <p className="text-sm font-medium text-teal-300 mt-0.5">
                        {CLINIC_INFO.title[lang]}
                      </p>
                    </div>
                  </LangSlide>
                </div>

                <LangSlide lang={lang}>
                  <p className="text-xs sm:text-sm text-sky-100/75 leading-relaxed">
                    {lang === 'bn'
                      ? 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এমসিপিএস, এফসিপিএস (চক্ষু)। খুলনা মেডিকেল কলেজ হাসপাতালের চক্ষু বিভাগে কর্মরত এবং বাংলাদেশ আই হসপিটাল খুলনা লিঃ-এ কনসালটেন্ট।'
                      : 'MBBS, BCS (Health), MCPS, FCPS (Ophthalmology). Department of Ophthalmology, Khulna Medical College Hospital & Consultant, Bangladesh Eye Hospital Khulna Ltd.'}
                  </p>
                </LangSlide>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={CLINIC_INFO.doctorFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
                    {lang === 'bn' ? 'ডাক্তারের ফেসবুক পেজ' : 'Doctor Facebook'}
                  </a>

                  <a
                    href={CLINIC_INFO.hospitalFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
                    {lang === 'bn' ? 'বাংলাদেশ আই হসপিটাল' : 'BEH Khulna Page'}
                  </a>
                </div>
              </div>

              {/* Middle Column: Core Treatments */}
              <div className="lg:col-span-4 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? 'প্রধান চিকিৎসা সেবা তালিকা' : 'Key Ophthalmic Treatments'}
                </h4>
                <ul className="space-y-2 text-xs sm:text-[13px] text-sky-100/80">
                  {SERVICES.slice(0, 5).map((srv) => (
                    <li key={srv.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection('services')}
                        className="text-left hover:text-teal-300 transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? srv.titleBn : srv.titleEn}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Chamber & Helpline */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-sm font-bold text-white">
                  {lang === 'bn' ? 'চেম্বার ও সিরিয়াল হেল্পলাইন' : 'Chamber & Serial Helpline'}
                </h4>
                <div className="space-y-2 text-xs sm:text-[13px] text-sky-100/80">
                  <p>{CLINIC_INFO.chamberLine[lang]}</p>
                  <p className="font-mono-num">
                    <strong className="text-white">
                      {lang === 'bn' ? 'সিরিয়াল: ' : 'Serial: '}
                    </strong>
                    <a
                      href={`tel:${CLINIC_INFO.serialDigits}`}
                      className="text-teal-300 hover:underline"
                    >
                      {CLINIC_INFO.serialNumber}
                    </a>
                  </p>
                  <p className="font-mono-num">
                    <strong className="text-white">
                      {lang === 'bn' ? 'হটলাইন: ' : 'Hotlines: '}
                    </strong>
                    {CLINIC_INFO.hotlines.join(' / ')}
                  </p>
                  <p className="font-mono-num">
                    <strong className="text-white">WhatsApp: </strong>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:underline"
                    >
                      {CLINIC_INFO.serialNumber}
                    </a>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleBookService()}
                  className="glossy-blue-btn w-full py-3 px-4 rounded-xl text-white font-bold text-sm cursor-pointer"
                >
                  {lang === 'bn' ? 'অনলাইন অ্যাপয়েন্টমেন্ট বুকিং' : 'Online Appointment Booking'}
                </button>
              </div>
            </div>

            <div className="optical-glass-dark rounded-xl p-4 text-[11px] sm:text-xs text-sky-100/80 leading-relaxed">
              <strong className="text-sky-200">
                {lang === 'bn' ? 'চিকিৎসা সংক্রান্ত তথ্যাবলি (ডিসক্লেইমার): ' : 'Medical Disclaimer: '}
              </strong>
              {lang === 'bn'
                ? 'এই ওয়েবসাইটের যাবতীয় তথ্য কেবলমাত্র সাধারণ চক্ষু স্বাস্থ্য সচেতনতা ও অ্যাপয়েন্টমেন্ট সহায়তার উদ্দেশ্যে তৈরি। জরুরি বা সুনির্দিষ্ট চিকিৎসার ক্ষেত্রে সরাসরি চিকিৎসকের পরামর্শ গ্রহণ বাধ্যতামূলক।'
                : 'Information on this website is provided solely for general eye-health awareness and appointment scheduling. Direct specialist consultation is essential for clinical diagnosis and treatment.'}
            </div>

            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sky-200/75 text-center sm:text-left">
              <p>
                © 2026 Dr. Fazilatun Nesa (Bristy) — Eye Specialist &amp; Phaco Surgeon. All rights reserved.{' '}
                <span className="inline-block sm:ml-2">
                  Powered by{' '}
                  <a
                    href={CLINIC_INFO.poweredByUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-teal-300 hover:text-teal-200 underline decoration-teal-400/50 underline-offset-2 transition-colors"
                  >
                    {CLINIC_INFO.poweredByName}
                  </a>
                </span>
              </p>
              <p>
                {lang === 'bn'
                  ? 'বাংলাদেশ আই হসপিটাল খুলনা লিঃ'
                  : 'Bangladesh Eye Hospital Khulna Ltd.'}
              </p>
            </div>
          </div>
        </footer>

        {/* Subtle Floating Glossy WhatsApp Button */}
        <a
          href={CLINIC_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Serial Chat"
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 glossy-teal-btn inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm shadow-xl transition-transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline font-mono-num">{CLINIC_INFO.serialNumber}</span>
        </a>
      </div>
    </ErrorBoundary>
  );
}
