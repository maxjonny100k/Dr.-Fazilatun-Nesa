import React, { useState } from 'react';
import { Award, Building2, CalendarCheck, CheckCircle2, GraduationCap, HeartHandshake } from 'lucide-react';
import { CLINIC_INFO, IMAGES, Lang } from '../data/clinicData';
import { LangSlide } from './LangMotion';

interface DoctorBioSectionProps {
  lang: Lang;
  onBookClick: () => void;
}

type BioTab = 'career' | 'education' | 'membership';

export const DoctorBioSection: React.FC<DoctorBioSectionProps> = ({ lang, onBookClick }) => {
  const [activeTab, setActiveTab] = useState<BioTab>('career');

  const stats = [
    {
      value: lang === 'bn' ? '১০০০+' : '1,000+',
      label: lang === 'bn' ? 'ফ্যাকো ও ছানি সার্জারি' : 'Phaco & Cataract Surgeries',
      sub: lang === 'bn' ? 'সফলভাবে সম্পন্ন' : 'Successfully Completed',
    },
    {
      value: lang === 'bn' ? '৯+ বছর' : '9+ Years',
      label: lang === 'bn' ? 'চিকিৎসা পেশায় অভিজ্ঞতা' : 'Clinical Experience',
      sub: lang === 'bn' ? '২০১৫ থেকে নিয়োজিত' : 'Practicing Since 2015',
    },
    {
      value: 'FCPS',
      label: lang === 'bn' ? 'এফসিপিএস ও এমসিপিএস' : 'FCPS & MCPS (Eye)',
      sub: lang === 'bn' ? 'বিসিপিএস (BCPS) স্বীকৃত' : 'BCPS Certified Specialist',
    },
    {
      value: 'BCS',
      label: lang === 'bn' ? 'সরকারি স্বাস্থ্য ক্যাডার' : 'BCS Health Cadre',
      sub: lang === 'bn' ? 'খুলনা মেডিকেল কলেজ হাসপাতাল' : 'Khulna Medical College Hospital',
    },
  ];

  const competencies =
    lang === 'bn'
      ? [
          '১০০০+ সফল ফ্যাকো ও ছানি সার্জারি (SICS)',
          'অকুলোপ্লাস্টিক ও চোখের পাতার সার্জারি',
          'শিশুদের চক্ষু চিকিৎসা ও পানি পড়ার সার্জারি',
          'টেরিজিয়াম গ্রাফটিং ও বাঁকা চোখ সোজা করা',
        ]
      : [
          '1,000+ Successful Phaco & SICS Cataract Surgeries',
          'Oculoplastic & Eyelid Reconstructive Surgery',
          'Pediatric Ophthalmology & Tear-Duct (Probing/DCR) Surgery',
          'Pterygium Conjunctival Autograft & Squint Correction',
        ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#F1F7FA] to-[#E6F1F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((st, idx) => (
            <div key={idx} className="optical-glass-light rounded-2xl p-4 sm:p-6">
              <LangSlide lang={lang}>
                <p className="font-display text-xl sm:text-3xl font-extrabold text-[#0B3B70] tabular-nums">
                  {st.value}
                </p>
                <p className="mt-1 sm:mt-1.5 text-xs sm:text-base font-bold text-[#0B1E36] leading-snug">
                  {st.label}
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-slate-600 leading-snug">
                  {st.sub}
                </p>
              </LangSlide>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <LangSlide lang={lang}>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-teal-800 mb-1.5 sm:mb-2">
              {lang === 'bn' ? 'চিকিৎসক পরিচিতি ও ব্যাকগ্রাউন্ড' : 'Physician Profile & Credentials'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
              {CLINIC_INFO.doctorName[lang]}
            </h2>
            <p className="mt-2 sm:mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {lang === 'bn'
                ? 'চক্ষু রোগ নিরাময় ও দৃষ্টি সুরক্ষায় দীর্ঘদিনের নিবিড় ক্লিনিক্যাল ও মাইক্রো-সার্জিক্যাল অভিজ্ঞতা।'
                : 'Dedicated clinical excellence and micro-surgical expertise in cataract, phacoemulsification, oculoplastic, and pediatric eye care.'}
            </p>
          </div>
        </LangSlide>

        {/* 2-Column Profile Logo Card + Tabbed Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: Official Doctor Branded Portrait Emblem */}
          <div className="lg:col-span-5 optical-glass-dark rounded-3xl bg-gradient-to-b from-[#0A2548] to-[#061830] text-white p-5 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-2xl overflow-hidden bg-white border border-white/30 shadow-inner">
                <img
                  src={IMAGES.doctorLogo}
                  alt={CLINIC_INFO.doctorName[lang]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain"
                />
              </div>

              <LangSlide lang={lang}>
                <div className="space-y-2 sm:space-y-2.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{CLINIC_INFO.doctorName[lang]}</h3>
                  <p className="text-xs sm:text-sm font-medium text-teal-300">{CLINIC_INFO.title[lang]}</p>

                  <div className="pt-2 space-y-2 text-xs sm:text-[13px] text-sky-100/90 border-t border-white/15">
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                      <span>
                        {CLINIC_INFO.degrees[lang]} · {CLINIC_INFO.fellowship[lang]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                      <span>
                        {lang === 'bn'
                          ? 'খুলনা মেডিকেল কলেজ হাসপাতাল (চক্ষু বিভাগ), বিসিএস (স্বাস্থ্য) ক্যাডার'
                          : 'Khulna Medical College Hospital (Dept. of Ophthalmology), BCS Health Cadre'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                      <span>{CLINIC_INFO.chamberLine[lang]}</span>
                    </div>
                  </div>
                </div>
              </LangSlide>
            </div>

            <button
              type="button"
              onClick={onBookClick}
              className="mt-5 sm:mt-6 glossy-blue-btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-transform active:scale-[0.99] cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              {lang === 'bn' ? 'সিরিয়ালের জন্য বুকিং করুন' : 'Book Consultation Serial'}
            </button>
          </div>

          {/* Right: Interactive 3-Tab Bio & Clinical Competencies */}
          <div className="lg:col-span-7 optical-glass-light rounded-3xl p-4 sm:p-7 lg:p-8 flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              {/* Tab Buttons: Neat full-width stack on extra-small mobile or even pill row on sm+ */}
              <div className="grid grid-cols-1 sm:inline-flex sm:flex-wrap gap-1.5 p-1.5 rounded-2xl bg-sky-900/5 border border-sky-900/15 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('career')}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                    activeTab === 'career'
                      ? 'glossy-blue-btn text-white border-2 border-[#0B5ED7] shadow-sm'
                      : 'bg-white text-slate-700 border border-sky-900/25 hover:border-[#0B5ED7]/60 hover:text-[#09274D]'
                  }`}
                >
                  {lang === 'bn' ? 'জীবনবৃত্তান্ত ও কর্মজীবন' : 'Career & Practice'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('education')}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                    activeTab === 'education'
                      ? 'glossy-blue-btn text-white border-2 border-[#0B5ED7] shadow-sm'
                      : 'bg-white text-slate-700 border border-sky-900/25 hover:border-[#0B5ED7]/60 hover:text-[#09274D]'
                  }`}
                >
                  {lang === 'bn' ? 'শিক্ষা ও প্রশিক্ষণ' : 'Education & Training'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('membership')}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                    activeTab === 'membership'
                      ? 'glossy-blue-btn text-white border-2 border-[#0B5ED7] shadow-sm'
                      : 'bg-white text-slate-700 border border-sky-900/25 hover:border-[#0B5ED7]/60 hover:text-[#09274D]'
                  }`}
                >
                  {lang === 'bn' ? 'পেশাদার সদস্যপদ' : 'Memberships'}
                </button>
              </div>

              <LangSlide lang={lang}>
                {activeTab === 'career' && (
                  <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-[15px] text-slate-700 leading-relaxed">
                    <p>
                      {lang === 'bn'
                        ? 'ডাঃ ফজিলাতুন নেছা (বৃষ্টি) বর্তমানে বাংলাদেশ আই হসপিটাল খুলনা লিঃ-এ কনসালটেন্ট এবং খুলনা মেডিকেল কলেজ হাসপাতালের চক্ষু বিভাগে সরকারি কর্মকর্তা (বিসিএস স্বাস্থ্য) হিসেবে কর্মরত রয়েছেন।'
                        : 'Dr. Fazilatun Nesa (Bristy) currently serves as a Consultant Ophthalmologist & Phaco Surgeon at Bangladesh Eye Hospital Khulna Ltd. and as a BCS (Health) Cadre Medical Officer in the Department of Ophthalmology at Khulna Medical College Hospital.'}
                    </p>
                    <p>
                      {lang === 'bn'
                        ? 'তিনি এক হাজারেরও বেশি সফল ফ্যাকো ছানি অপারেশন এবং ক্ষুদ্র ক্ষতের ছানি অপারেশন (SICS) সম্পন্ন করেছেন। এছাড়াও অকুলোপ্লাস্টিক সার্জারি, নেত্রনালীর অপারেশন, বাঁকা চোখ ও শিশুদের চক্ষু চিকিৎসায় তিনি বিশেষ পারদর্শী।'
                        : 'She has successfully performed over 1,000 phacoemulsification and SICS cataract surgeries, alongside specialized expertise in oculoplastic lid reconstruction, lacrimal surgery (DCR/Probing), squint alignment, and pediatric eye care.'}
                    </p>
                  </div>
                )}

                {activeTab === 'education' && (
                  <div className="space-y-3 text-xs sm:text-[15px] text-slate-700 leading-relaxed">
                    <div className="rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4">
                      <p className="font-bold text-[#071D38]">
                        {lang === 'bn'
                          ? 'এফসিপিএস (FCPS) ও এমসিপিএস (MCPS) — চক্ষু বিভাগ (২০২৩)'
                          : 'FCPS & MCPS in Ophthalmology (2023)'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {lang === 'bn'
                          ? 'বাংলাদেশ কলেজ অব ফিজিশিয়ান্স অ্যান্ড সার্জনস (BCPS), ঢাকা।'
                          : 'Bangladesh College of Physicians and Surgeons (BCPS), Dhaka.'}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4">
                      <p className="font-bold text-[#071D38]">
                        {lang === 'bn'
                          ? 'ফেলোশীপ ইন ফ্যাকো সার্জারি ও মাইক্রো-সার্জিক্যাল প্রশিক্ষণ'
                          : 'Fellowship in Phaco Surgery & Micro-Surgical Training'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {lang === 'bn'
                          ? 'সেলাইবিহীন ফ্যাকো ছানি অপারেশন ও আধুনিক ফোল্ডেবল আইওএল ইমপ্লান্টেশন।'
                          : 'Advanced training in stitchless phacoemulsification & premium IOL implantation.'}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4">
                      <p className="font-bold text-[#071D38]">
                        {lang === 'bn'
                          ? 'এমবিবিএস (MBBS) — রাজশাহী মেডিকেল কলেজ (২০১৫)'
                          : 'MBBS — Rajshahi Medical College (2015)'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {lang === 'bn'
                          ? 'রাজশাহী মেডিকেল কলেজ হাসপাতাল থেকে এমবিবিএস ও ইন্টার্নশিপ সম্পন্ন এবং ২০১৯ সালে বিসিএস (স্বাস্থ্য) ক্যাডারে যোগদান।'
                          : 'Completed MBBS & internship at Rajshahi Medical College Hospital; joined BCS (Health) Cadre in 2019.'}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'membership' && (
                  <ul className="space-y-3 text-xs sm:text-[15px] text-slate-700">
                    <li className="rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4">
                      <strong className="text-[#071D38] block">
                        {lang === 'bn'
                          ? 'ফেলো, বাংলাদেশ কলেজ অব ফিজিশিয়ান্স অ্যান্ড সার্জনস (BCPS)'
                          : 'Fellow, Bangladesh College of Physicians & Surgeons (BCPS)'}
                      </strong>
                      <span className="text-xs text-slate-600">
                        {lang === 'bn' ? 'স্বীকৃত এফসিপিএস ও এমসিপিএস চক্ষু বিশেষজ্ঞ' : 'Certified FCPS & MCPS Specialist'}
                      </span>
                    </li>
                    <li className="rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4">
                      <strong className="text-[#071D38] block">
                        {lang === 'bn'
                          ? 'আজীবন সদস্য, অফথালমোলজিক্যাল সোসাইটি অব বাংলাদেশ (OSB)'
                          : 'Life Member, Ophthalmological Society of Bangladesh (OSB)'}
                      </strong>
                      <span className="text-xs text-slate-600">
                        {lang === 'bn' ? 'সক্রিয় ক্লিনিক্যাল ও সার্জিক্যাল সদস্য' : 'Active Clinical & Surgical Member'}
                      </span>
                    </li>
                    <li className="rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4">
                      <strong className="text-[#071D38] block">
                        {lang === 'bn'
                          ? 'বিসিএস (স্বাস্থ্য) ক্যাডার ও বাংলাদেশ মেডিকেল অ্যাসোসিয়েশন (BMA)'
                          : 'BCS (Health) Cadre & Bangladesh Medical Association (BMA)'}
                      </strong>
                      <span className="text-xs text-slate-600">
                        {lang === 'bn' ? 'খুলনা মেডিকেল কলেজ হাসপাতাল, চক্ষু বিভাগ' : 'Dept. of Ophthalmology, Khulna Medical College Hospital'}
                      </span>
                    </li>
                  </ul>
                )}

                <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-sky-900/10 space-y-3">
                  <h4 className="text-sm font-bold text-[#071D38]">
                    {lang === 'bn' ? 'বিশেষ দক্ষতা ও সার্জিক্যাল অভিজ্ঞতা' : 'Core Surgical Competencies'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {competencies.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl bg-[#E1F2F1]/85 border border-teal-800/15 px-3 py-2.5 text-xs sm:text-[13px] font-medium text-[#0B3238]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </LangSlide>
            </div>

            <div className="mt-5 sm:mt-6 rounded-xl bg-white/80 border border-sky-900/15 p-3.5 sm:p-4 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-[#0B4F8A] shrink-0 mt-0.5" />
              <LangSlide lang={lang}>
                <div>
                  <p className="text-xs font-bold text-[#0B3B70]">
                    {lang === 'bn' ? 'রোগী কেন্দ্রিক দৃষ্টিভঙ্গি' : 'Patient-First Care Philosophy'}
                  </p>
                  <p className="text-xs sm:text-[13px] text-slate-700 mt-1 leading-relaxed">
                    {lang === 'bn'
                      ? 'অপ্রয়োজনীয় টেস্ট বা চিকিৎসা পরিহার করে, রোগীর সঠিক রোগ নির্ণয় এবং আন্তরিক যোগাযোগের মাধ্যমে সর্বোচ্চ আধুনিক চিকিৎসা নিশ্চিত করাই প্রধান লক্ষ্য।'
                      : 'Avoiding unnecessary investigations while prioritizing accurate diagnosis, transparent communication, and ethical modern micro-surgical care.'}
                  </p>
                </div>
              </LangSlide>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
