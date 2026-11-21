import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Eye,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  CLINIC_INFO,
  IMAGES,
  Lang,
  SERVICES,
  ServiceItem,
  SURGERY_PACKAGES,
  SurgeryCategory,
  SurgeryPackage,
} from '../data/clinicData';
import { LangSlide } from './LangMotion';

interface ServicesAndPricingProps {
  lang: Lang;
  onBookService: (serviceName: string) => void;
}

export const ServicesAndPricing: React.FC<ServicesAndPricingProps> = ({
  lang,
  onBookService,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<SurgeryPackage | null>(null);
  const [category, setCategory] = useState<SurgeryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SURGERY_PACKAGES.filter((pkg) => {
      const catMatch = category === 'all' || pkg.category === category;
      const textMatch =
        !q ||
        pkg.name.toLowerCase().includes(q) ||
        pkg.nameBn.toLowerCase().includes(q) ||
        pkg.price.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [category, searchQuery]);

  const featuredCataract = SERVICES[0];

  const categories: { id: SurgeryCategory; labelBn: string; labelEn: string }[] = [
    { id: 'all', labelBn: 'সব সার্জারি (২৫)', labelEn: 'All Procedures (25)' },
    { id: 'lid', labelBn: 'চোখের পাতা (Lid & Ptosis)', labelEn: 'Eyelid & Ptosis' },
    { id: 'lacrimal', labelBn: 'নেত্রনালী (DCR / Probing)', labelEn: 'Lacrimal & DCR' },
    { id: 'oculoplasty', labelBn: 'অকুলোপ্লাস্টি ও গ্রোথ', labelEn: 'Oculoplastic & Growth' },
    { id: 'anterior', labelBn: 'টেরিজিয়াম ও বাঁকা চোখ', labelEn: 'Pterygium & Squint' },
  ];

  const getWhatsAppSurgeryUrl = (pkgName: string, price: string) => {
    const msg =
      lang === 'bn'
        ? `আসসালামু আলাইকুম, আমি ডাঃ ফজিলাতুন নেছা (বৃষ্টি)-এর চেম্বারে "${pkgName}" (প্যাকেজ: ৳ ${price}) সার্জারি সম্পর্কে বিস্তারিত জানতে ও সিরিয়াল নিতে চাই।`
        : `Hello, I would like details and serial booking for "${pkgName}" (Package: BDT ${price}) with Dr. Fazilatun Nesa (Bristy).`;
    return `${CLINIC_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* SECTION 3: SERVICES & PROMINENT CATARACT SPOTLIGHT */}
      <section
        id="services"
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#E6F1F6] to-[#EFF7F8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <LangSlide lang={lang}>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
                {lang === 'bn' ? 'চিকিৎসা ও অস্ত্রোপচার সেবা' : 'Clinical & Micro-Surgical Services'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
                {lang === 'bn'
                  ? 'আধুনিক চক্ষু চিকিৎসা ও মাইক্রো-সার্জারি'
                  : 'Modern Ophthalmology & Micro-Surgery'}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'bn'
                  ? 'বাংলাদেশ আই হসপিটাল খুলনা লিঃ এবং খুলনা মেডিকেল কলেজ হাসপাতালে ডাঃ ফজিলাতুন নেছা (বৃষ্টি)-এর অভিজ্ঞ পরিচালনায় পরিচালিত প্রধান চক্ষু সেবাসমূহ।'
                  : 'Comprehensive ophthalmic care and micro-surgeries led by Dr. Fazilatun Nesa (Bristy) at Bangladesh Eye Hospital Khulna Ltd. and Khulna Medical College Hospital.'}
              </p>
            </div>
          </LangSlide>

          {/* PROMINENT CATARACT SURGERY FEATURED GLASS SHOWCASE (Clean unobstructed OT image) */}
          <div className="optical-glass-dark rounded-3xl bg-gradient-to-br from-[#082244] via-[#0B2D59] to-[#083A4B] text-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 sm:space-y-6">
                <LangSlide lang={lang}>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {lang === 'bn'
                          ? 'প্রধান বিশেষায়িত সেবা · নিয়মিত ক্যাটারাক্ট সার্জারি'
                          : 'Flagship Specialty · Routine Cataract Surgery'}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                      {lang === 'bn'
                        ? featuredCataract.titleBn
                        : featuredCataract.titleEn}
                    </h3>

                    <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
                      {lang === 'bn'
                        ? 'আমাদের এখানে নিয়মিত আধুনিক সেলাইবিহীন ফ্যাকো সার্জারি ও ব্যথাহীন ফ্যাকো সার্জারি পদ্ধতিতে ক্যাটারাক্ট (ছানি) অপারেশন করা হয়। প্রিমিয়াম ফোল্ডেবল লেন্স (Monofocal, Multifocal, Toric) এবং ছানি অপারেশনের সময়সূচি ও বিস্তারিত প্যাকেজের জন্য সরাসরি যোগাযোগ করুন।'
                        : 'Routine stitchless, injection-free phacoemulsification cataract surgery is performed regularly at our chamber. Please contact us directly for intraocular lens options, pre-op biometry, and package details.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {(lang === 'bn'
                        ? featuredCataract.pointsBn
                        : featuredCataract.pointsEn
                      ).map((pt, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 rounded-xl bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs sm:text-[13px] text-sky-50"
                        >
                          <Check className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </LangSlide>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onBookService(
                        lang === 'bn'
                          ? featuredCataract.titleBn
                          : featuredCataract.titleEn
                      )
                    }
                    className="glossy-blue-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm transition-transform active:scale-[0.99] cursor-pointer whitespace-nowrap"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    {lang === 'bn'
                      ? 'ছানি অপারেশনের পরামর্শ বুক করুন'
                      : 'Book Cataract Consultation'}
                  </button>

                  <a
                    href={CLINIC_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glossy-teal-btn inline-flex items-center gap-2 px-4 py-3 rounded-xl text-white font-bold text-sm whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {lang === 'bn'
                      ? 'সরাসরি যোগাযোগ: 01345-786806'
                      : 'Direct Contact: 01345-786806'}
                  </a>
                </div>
              </div>

              {/* Clean, unobstructed Cataract Operating Theatre photo (NO text box or inner border overlay) */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden">
                <img
                  src={IMAGES.phacoOT}
                  alt={lang === 'bn' ? 'ফ্যাকো ছানি অপারেশন থিয়েটার' : 'Phaco Cataract Operating Theatre'}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* 8 Core Service Cards Grid (Each card features its AI clinical photography subtly beneath a crisp glass scrim) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.id}
                className="relative overflow-hidden rounded-2xl border border-sky-900/20 shadow-[0_12px_32px_-18px_rgba(8,42,82,0.18)] p-5 flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-150 bg-[#EFF7FA]"
              >
                {/* Subtle Clinical Image Background */}
                <img
                  src={srv.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-22 pointer-events-none select-none"
                />
                {/* Crisp Frosted Glass Scrim for 100% Text Readability */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-white/88 via-[#F0F8FC]/84 to-[#E3F2F5]/92 backdrop-blur-[2px] pointer-events-none"
                />

                <div className="relative z-10 flex-1">
                  <LangSlide lang={lang}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-teal-800 font-semibold">
                        <span className="font-mono-num">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <Eye className="w-4 h-4 text-sky-700" />
                      </div>

                      <h3 className="text-base font-bold text-[#071D38] leading-snug">
                        {lang === 'bn' ? srv.titleBn : srv.titleEn}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                        {lang === 'bn' ? srv.summaryBn : srv.summaryEn}
                      </p>

                      <ul className="space-y-1.5 pt-1">
                        {(lang === 'bn' ? srv.pointsBn : srv.pointsEn).map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2 text-xs text-slate-800"
                          >
                            <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </LangSlide>
                </div>

                <div className="relative z-10 mt-5 pt-4 border-t border-sky-900/15 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedService(srv)}
                    className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-sky-900/25 hover:border-[#0B5ED7] text-xs font-semibold text-[#0B4F8A] hover:text-[#072F54] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onBookService(lang === 'bn' ? srv.titleBn : srv.titleEn)
                    }
                    className="glossy-blue-btn inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                  >
                    {lang === 'bn' ? 'বুকিং' : 'Book'}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3B: SURGERY PACKAGE PRICE LIST (ALL 25 PACKAGES + MOBILE CARD VIEW + AI IMAGE POPUP MODAL) */}
      <section
        id="pricing"
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#EFF7F8] to-[#E6F1F6] border-y border-sky-900/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <LangSlide lang={lang}>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
                  {lang === 'bn'
                    ? 'স্বচ্ছ অপারেশন ও সার্জারি প্যাকেজ তালিকা'
                    : 'Transparent Surgery & Procedure Tariff'}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
                  {lang === 'bn'
                    ? 'অপারেশন ও সার্জারি প্যাকেজ মূল্য তালিকা'
                    : 'Operation & Surgery Package Price List'}
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600">
                  {lang === 'bn'
                    ? 'যেকোনো সার্জারিতে ক্লিক করলে তার বিবরণ ও ছবি দেখতে পারবেন। ক্যাটারাক্ট (ছানি) সার্জারির লেন্স প্যাকেজ জানতে সরাসরি যোগাযোগ করুন।'
                    : 'Tap any procedure below to view details and visual guide. Contact us directly for routine Phaco Cataract lens packages.'}
                </p>
              </div>
            </LangSlide>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'সার্জারির নাম খুঁজুন (যেমন: DCR, Ptosis)...'
                    : 'Search procedure (e.g. DCR, Ptosis)...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 border border-sky-900/20 text-sm text-[#071D38] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="optical-glass-dark rounded-2xl bg-gradient-to-r from-[#09274D] to-[#0B4650] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <LangSlide lang={lang}>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-teal-300">
                  {lang === 'bn' ? 'নিয়মিত ক্যাটারাক্ট (ছানি) অপারেশন' : 'Routine Cataract (Phaco / SICS) Surgery'}
                </p>
                <p className="text-base sm:text-lg font-bold">
                  {lang === 'bn'
                    ? 'আমাদের এখানে নিয়মিত ফ্যাকো ও ছানি সার্জারি করা হয় — লেন্স অনুযায়ী প্যাকেজ জানতে সরাসরি যোগাযোগ করুন'
                    : 'Regular Phaco Cataract Surgery is performed here — Contact directly for IOL lens packages'}
                </p>
              </div>
            </LangSlide>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={`tel:${CLINIC_INFO.serialDigits}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-white text-[#071D38] font-bold text-xs sm:text-sm font-mono-num hover:bg-sky-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-700" />
                {CLINIC_INFO.serialNumber}
              </a>
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-teal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Category Filter Buttons (Crisp borders on inactive, distinct blue border on active) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap truncate text-center ${
                  idx === 0 ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  category === cat.id
                    ? 'glossy-blue-btn text-white border-2 border-[#0B5ED7] shadow-sm'
                    : 'bg-white text-slate-700 border border-sky-900/25 hover:border-[#0B5ED7]/60 hover:text-[#071D38]'
                }`}
              >
                {lang === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* MOBILE ZERO-HORIZONTAL-SCROLL STACKED CARD LIST */}
          <div className="md:hidden space-y-3">
            {filteredPackages.length === 0 ? (
              <div className="optical-glass-light rounded-2xl p-8 text-center text-sm text-slate-500">
                {lang === 'bn'
                  ? 'কোনো সার্জারি খুঁজে পাওয়া যায়নি।'
                  : 'No matching surgery procedure found.'}
              </div>
            ) : (
              filteredPackages.map((pkg, i) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPackage(pkg);
                    }
                  }}
                  className="optical-glass-light rounded-2xl p-4 border border-sky-900/20 active:scale-[0.99] transition-transform cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-block font-mono-num text-[11px] font-bold text-teal-800 mb-0.5">
                        #{String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-sm font-bold text-[#071D38] leading-snug break-words">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 break-words">{pkg.nameBn}</p>
                    </div>
                    <span className="shrink-0 font-mono-num text-xs font-bold text-[#0B4F8A] bg-white/90 border border-sky-900/15 px-2.5 py-1 rounded-lg">
                      ৳ {pkg.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-sky-900/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-sky-900/25 text-xs font-semibold text-[#0B4F8A] cursor-pointer"
                    >
                      {lang === 'bn' ? 'ছবি ও বিস্তারিত' : 'Details & Photo'}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookService(`${pkg.name} (${pkg.nameBn})`);
                      }}
                      className="glossy-blue-btn px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer"
                    >
                      {lang === 'bn' ? 'সিরিয়াল নিন' : 'Book Serial'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP CLEAN TABLE (Click any row, price, or name to view AI-image modal) */}
          <div className="hidden md:block optical-glass-light rounded-2xl overflow-hidden border border-sky-900/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#08203E] text-sky-100 text-xs sm:text-sm">
                  <th className="py-3.5 px-6 font-semibold w-16">
                    {lang === 'bn' ? 'ক্রম' : '#'}
                  </th>
                  <th className="py-3.5 px-6 font-semibold">
                    {lang === 'bn' ? 'অপারেশন / সার্জারির নাম' : 'Procedure / Surgery Name'}
                  </th>
                  <th className="py-3.5 px-6 font-semibold">
                    {lang === 'bn' ? 'প্যাকেজ মূল্য (টাকা)' : 'Package Rate (BDT)'}
                  </th>
                  <th className="py-3.5 px-6 font-semibold text-right">
                    {lang === 'bn' ? 'বিস্তারিত ও সিরিয়াল' : 'Details & Action'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-900/10 text-sm">
                {filteredPackages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500">
                      {lang === 'bn'
                        ? 'কোনো সার্জারি খুঁজে পাওয়া যায়নি।'
                        : 'No matching surgery procedure found.'}
                    </td>
                  </tr>
                ) : (
                  filteredPackages.map((pkg, i) => (
                    <tr
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className="hover:bg-white/75 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-6 font-mono-num text-xs text-slate-500">
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3.5 px-6">
                        <p className="font-bold text-[#071D38] group-hover:text-[#0B5ED7] transition-colors">
                          {pkg.name}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">{pkg.nameBn}</p>
                      </td>
                      <td className="py-3.5 px-6 font-mono-num font-semibold text-[#0B4F8A] whitespace-nowrap">
                        ৳ {pkg.price}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPackage(pkg);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-sky-50 text-[#0B4F8A] border border-sky-900/25 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                          >
                            {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookService(`${pkg.name} (${pkg.nameBn})`);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#09274D] hover:bg-[#0D386E] text-white border border-[#09274D] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                          >
                            {lang === 'bn' ? 'সিরিয়াল নিন' : 'Book'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? '* বিঃদ্রঃ সার্জারির চূড়ান্ত মূল্য রোগীর চোখের অবস্থা, জটিলতা ও অ্যানেস্থেসিয়ার ধরন অনুযায়ী পরীক্ষার পর নির্ধারিত হয়। বিস্তারিত জানতে চেম্বারে যোগাযোগ করুন।'
              : '* Note: Final surgical package depends on clinical examination, complexity, and anesthesia evaluation. Contact chamber desk for details.'}
          </p>
        </div>
      </section>

      {/* Core Service Detail Modal (With AI Clinical Image Header) */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="max-w-lg w-full optical-glass-light rounded-2xl text-[#071D38] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-52 w-full bg-[#061830]">
              <img
                src={selectedService.image}
                alt={lang === 'bn' ? selectedService.titleBn : selectedService.titleEn}
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/65 hover:bg-slate-950/85 text-white border border-white/25 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <div>
                <p className="text-xs font-semibold text-teal-800">
                  {lang === 'bn' ? 'চিকিৎসা বিস্তারিত' : 'Procedure Details'}
                </p>
                <h3 className="text-xl font-bold mt-1">
                  {lang === 'bn' ? selectedService.titleBn : selectedService.titleEn}
                </h3>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === 'bn' ? selectedService.detailsBn : selectedService.detailsEn}
              </p>

              <div className="rounded-xl bg-white/85 border border-sky-900/15 p-4 space-y-2">
                {(lang === 'bn'
                  ? selectedService.pointsBn
                  : selectedService.pointsEn
                ).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#071D38]">
                    <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
                <p className="text-xs font-semibold text-sky-800 pt-1">
                  {lang === 'bn' ? selectedService.recoveryBn : selectedService.recoveryEn}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-sky-900/25 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const name =
                      lang === 'bn'
                        ? selectedService.titleBn
                        : selectedService.titleEn;
                    setSelectedService(null);
                    onBookService(name);
                  }}
                  className="glossy-blue-btn px-5 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer"
                >
                  {lang === 'bn' ? 'এই সেবার সিরিয়াল নিন' : 'Book This Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 25-Item Surgery Package Detail Modal with AI Clinical Photo & Direct WhatsApp Booking */}
      {selectedPackage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPackage(null)}
        >
          <div
            className="max-w-lg w-full optical-glass-light rounded-2xl text-[#071D38] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 sm:h-56 w-full bg-[#061830]">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/65 hover:bg-slate-950/85 text-white border border-white/25 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-teal-800">
                    {lang === 'bn' ? 'অপারেশন প্যাকেজ বিবরণ' : 'Surgery Package Overview'}
                  </p>
                  <h3 className="text-xl font-bold text-[#071D38] mt-1">
                    {selectedPackage.name}
                  </h3>
                  <p className="text-sm font-medium text-[#0B4F8A] mt-0.5">
                    {selectedPackage.nameBn}
                  </p>
                </div>
                <span className="shrink-0 font-mono-num text-sm sm:text-base font-bold text-[#071D38] bg-white border border-sky-900/20 px-3 py-1.5 rounded-xl">
                  ৳ {selectedPackage.price}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {lang === 'bn' ? selectedPackage.detailBn : selectedPackage.detailEn}
              </p>

              <div className="rounded-xl bg-white/85 border border-sky-900/15 p-3.5 text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'চূড়ান্ত অপারেশন ফি রোগীর চোখের পরীক্ষা-নিরীক্ষা ও লেন্স/অ্যানেস্থেসিয়া অনুযায়ী চেম্বারে নির্ধারিত হয়।'
                  : 'Final package rate is confirmed following clinical examination and anesthesia evaluation.'}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-sky-900/25 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const label = `${selectedPackage.name} (${selectedPackage.nameBn})`;
                    setSelectedPackage(null);
                    onBookService(label);
                  }}
                  className="glossy-blue-btn px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold cursor-pointer"
                >
                  {lang === 'bn' ? 'ফর্মে সিরিয়াল নিন' : 'Book via Form'}
                </button>
                <a
                  href={getWhatsAppSurgeryUrl(selectedPackage.name, selectedPackage.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glossy-teal-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল' : 'WhatsApp Serial'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
