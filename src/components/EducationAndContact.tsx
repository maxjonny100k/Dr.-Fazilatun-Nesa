import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { BLOG_POSTS, CLINIC_INFO, FAQS, Lang } from '../data/clinicData';
import { LangSlide } from './LangMotion';

interface EducationAndContactProps {
  lang: Lang;
}

export const EducationAndContact: React.FC<EducationAndContactProps> = ({ lang }) => {
  const [selectedPost, setSelectedPost] = useState<(typeof BLOG_POSTS)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact form state (100% WhatsApp routing)
  const [senderName, setSenderName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [sentInquiry, setSentInquiry] = useState<{
    text: string;
    whatsappHref: string;
  } | null>(null);
  const [copiedInquiry, setCopiedInquiry] = useState(false);

  const instructions =
    lang === 'bn'
      ? [
          'বর্তমান ব্যবহৃত চশমা সাথে নিয়ে আসুন',
          'পুরাতন প্রেসক্রিপশন ও চলমান চোখের ড্রপ',
          'ডায়াবেটিস ও রক্তচাপ (প্রেসার)-এর সর্বশেষ তথ্য',
          'নির্ধারিত সিরিয়ালের অন্তত ১৫ মিনিট পূর্বে চেম্বারে উপস্থিতি',
        ]
      : [
          'Your currently used eyeglasses',
          'Previous ophthalmic prescriptions and eye drops',
          'Recent blood sugar (diabetes) and blood pressure records',
          'Arrive at least 15 minutes prior to your scheduled serial slot',
        ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    setSentInquiry(null);

    const cleanName = senderName.trim();
    const bnToEn = phone.replace(/[০-৯]/g, (ch) => String('০১২৩৪৫৬৭৮৯'.indexOf(ch)));
    const strippedPhone = bnToEn.replace(/[\s\-()]/g, '').trim();
    const cleanPhone = strippedPhone.startsWith('+880')
      ? strippedPhone.slice(3)
      : strippedPhone.startsWith('880')
        ? strippedPhone.slice(2)
        : strippedPhone;
    const cleanMsg = message.trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      setContactError(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার পূর্ণ নাম (২–১০০ অক্ষর) লিখুন।'
          : 'Please enter your full name (2–100 characters).'
      );
      return;
    }
    if (!/^01[3-9][0-9]{8}$/.test(cleanPhone)) {
      setContactError(
        lang === 'bn'
          ? 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।'
          : 'Please enter a valid 11-digit mobile number.'
      );
      return;
    }
    if (cleanMsg.length < 5 || cleanMsg.length > 1000) {
      setContactError(
        lang === 'bn'
          ? 'আপনার বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে।'
          : 'Message must be between 5 and 1000 characters.'
      );
      return;
    }

    const formattedText =
      lang === 'bn'
        ? `আসসালামু আলাইকুম, ওয়েবসাইট থেকে জরুরি জিজ্ঞাসা:\n\nনাম: ${cleanName}\nমোবাইল: ${cleanPhone}\nবার্তা: ${cleanMsg}`
        : `Hello, inquiry from website:\n\nName: ${cleanName}\nMobile: ${cleanPhone}\nMessage: ${cleanMsg}`;

    const whatsappHref = `${CLINIC_INFO.whatsappUrl}?text=${encodeURIComponent(formattedText)}`;

    setSentInquiry({ text: formattedText, whatsappHref });

    const a = document.createElement('a');
    a.href = whatsappHref;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {/* SECTION 8: EYE CARE & AWARENESS BLOG */}
      <section id="awareness" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#E6F1F6] to-[#EFF7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <LangSlide lang={lang}>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
                {lang === 'bn' ? 'স্বাস্থ্য সচেতনতা ও পরামর্শ' : 'Eye Health & Preventive Guidance'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
                {lang === 'bn'
                  ? 'ডাঃ বৃষ্টির নিয়মিত চোখের যত্ন ও সচেতনতামূলক পরামর্শ'
                  : 'Dr. Bristy’s Eye Care & Awareness Articles'}
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'bn'
                  ? 'মোবাইল স্ক্রিন ব্যবহার, চোখ দিয়ে পানি পড়া এবং সঠিক সময়ে চক্ষু পরীক্ষার প্রয়োজনীয়তা সম্পর্কে ডাক্তারের সরাসরি তথ্য।'
                  : 'Practical clinical guidance on screen time, persistent watering eyes, and timely screening for silent eye conditions.'}
              </p>
            </div>
          </LangSlide>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, idx) => (
              <div
                key={post.id}
                className="optical-glass-light rounded-2xl border border-sky-900/20 p-6 flex flex-col justify-between"
              >
                <LangSlide lang={lang}>
                  <div className="space-y-3">
                    <span className="text-xs font-mono-num font-semibold text-teal-700">
                      {lang === 'bn' ? `পরামর্শ ০${idx + 1}` : `Guide 0${idx + 1}`}
                    </span>
                    <h3 className="text-lg font-bold text-[#071D38] leading-snug">
                      {lang === 'bn' ? post.titleBn : post.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lang === 'bn' ? post.excerptBn : post.excerptEn}
                    </p>
                  </div>
                </LangSlide>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="mt-6 self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-sky-900/25 hover:border-[#0B5ED7] text-xs sm:text-sm font-bold text-[#0B4F8A] hover:text-[#072F54] transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'সম্পূর্ণ পোস্টটি পড়ুন' : 'Read Full Article'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: INSTRUCTIONS & FAQS */}
      <section id="instructions" className="py-12 sm:py-16 lg:py-24 bg-[#EAF3F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
                {lang === 'bn' ? 'রোগীদের জন্য নির্দেশনা' : 'Pre-Visit Checklist'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071D38] tracking-tight">
                {lang === 'bn'
                  ? 'ডাক্তার দেখানোর পূর্বে প্রয়োজনীয় নির্দেশনা'
                  : 'Before Your Consultation'}
              </h2>
            </div>

            <div className="rounded-2xl bg-white border border-sky-900/15 p-6 space-y-3.5">
              <h3 className="text-sm font-bold text-[#071D38]">
                {lang === 'bn' ? 'চেম্বারে আসার সময় সাথে রাখুন:' : 'Please bring with you:'}
              </h3>
              <ul className="space-y-3">
                {instructions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#FFFBEB] border border-amber-300/60 p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                <strong className="block font-bold mb-1">
                  {lang === 'bn'
                    ? 'রেটিনা পরীক্ষার ক্ষেত্রে সতর্কতা:'
                    : 'Dilated Eye Exam Notice:'}
                </strong>
                {lang === 'bn'
                  ? 'রেটিনা বা ফান্ডাস পরীক্ষার জন্য চোখে ড্রপ দেওয়া হলে ১-২ ঘণ্টা দৃষ্টি কিছুটা ঝাপসা থাকতে পারে। সম্ভব হলে সাথে কাউকে নিয়ে আসা ভালো এবং ড্রাইভিং থেকে বিরত থাকুন।'
                  : 'If dilating drops are applied during fundus evaluation, vision may remain slightly blurry for 1–2 hours. Bringing an attendant and avoiding driving is advised.'}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
                {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071D38] tracking-tight">
                {lang === 'bn' ? 'বহুল জিজ্ঞাসিত প্রশ্নোত্তর (FAQs)' : 'Common Patient Questions'}
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl bg-white overflow-hidden transition-colors ${
                      isOpen ? 'border-2 border-[#0B5ED7]' : 'border border-sky-900/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#071D38] hover:bg-[#F5FAFC] transition-colors cursor-pointer"
                    >
                      <span>{lang === 'bn' ? faq.qBn : faq.qEn}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-sky-700 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {lang === 'bn' ? faq.aBn : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: CONTACT CARDS & WHATSAPP MESSAGE FORM */}
      <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-[#F2F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-teal-700 mb-2">
              {lang === 'bn' ? 'সরাসরি যোগাযোগ ও হেল্পলাইন' : 'Direct Helpline & Inquiries'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
              {lang === 'bn' ? 'আমাদের সাথে সরাসরি যোগাযোগ করুন' : 'Get in Touch Directly'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 3 Contact Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl bg-white border border-sky-900/15 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-[#071D38]">
                  <Phone className="w-4 h-4 text-sky-700" />
                  <span>
                    {lang === 'bn' ? 'সিরিয়াল ও হটলাইন নম্বর' : 'Serial & Hospital Hotlines'}
                  </span>
                </div>
                <p className="font-mono-num text-lg font-bold text-[#0B4F8A]">
                  {lang === 'bn' ? 'সিরিয়াল: 01345-786806' : 'Serial: 01345-786806'}
                </p>
                <p className="text-xs text-slate-600 font-mono-num">
                  {lang === 'bn' ? 'হটলাইন: ' : 'Hotlines: '}
                  {CLINIC_INFO.hotlines.join(' · ')}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-sky-900/15 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-[#071D38]">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ হেল্পডেস্ক' : 'WhatsApp Helpdesk'}</span>
                </div>
                <p className="font-mono-num text-lg font-bold text-[#071D38]">
                  {CLINIC_INFO.serialNumber}
                </p>
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-700/25 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপে মেসেজ পাঠান →' : 'Send WhatsApp Message →'}
                </a>
              </div>

              <div className="rounded-2xl bg-white border border-sky-900/15 p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-[#071D38]">
                  <MapPin className="w-4 h-4 text-teal-700" />
                  <span>{lang === 'bn' ? 'চেম্বার ঠিকানা' : 'Chamber Address'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {CLINIC_INFO.chamberLine[lang]}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Inquiry Form */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-sky-900/20 p-6 sm:p-8 shadow-[0_12px_34px_-18px_rgba(7,24,46,0.16)] space-y-5">
              <div>
                <h3 className="text-xl font-bold text-[#071D38]">
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপে জরুরি বার্তা বা প্রশ্ন পাঠান' : 'Send an Inquiry via WhatsApp'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {lang === 'bn'
                    ? 'আপনার নাম, মোবাইল ও প্রশ্ন লিখে সাবমিট করলে সরাসরি ডাক্তারের হোয়াটসঅ্যাপে মেসেজ পৌঁছে যাবে।'
                    : 'Submit your details below to send your message directly to our official WhatsApp helpdesk.'}
                </p>
              </div>

              {sentInquiry ? (
                <div className="rounded-2xl bg-[#071E3B] text-white p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {lang === 'bn'
                        ? 'আপনার হোয়াটসঅ্যাপ বার্তা প্রস্তুত!'
                        : 'Your WhatsApp message is ready!'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-sky-100/90 whitespace-pre-wrap leading-relaxed bg-[#041226] p-4 rounded-xl border border-white/15">
                    {sentInquiry.text}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={sentInquiry.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glossy-teal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {lang === 'bn' ? 'হোয়াটসঅ্যাপে পাঠান' : 'Send on WhatsApp'}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(sentInquiry.text);
                        setCopiedInquiry(true);
                        setTimeout(() => setCopiedInquiry(false), 2000);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-semibold text-white cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedInquiry
                        ? lang === 'bn'
                          ? 'কপি হয়েছে'
                          : 'Copied'
                        : lang === 'bn'
                          ? 'কপি করুন'
                          : 'Copy'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSentInquiry(null)}
                      className="px-4 py-2.5 rounded-xl border border-sky-300/30 text-xs font-semibold text-sky-100 hover:bg-white/10 cursor-pointer"
                    >
                      {lang === 'bn' ? 'নতুন বার্তা' : 'New Message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                        {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder={lang === 'bn' ? 'নাম লিখুন' : 'Enter your name'}
                        className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                        {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm font-mono-num text-[#071D38] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                      {lang === 'bn' ? 'আপনার বার্তা বা প্রশ্ন *' : 'Your Message or Question *'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      maxLength={1000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        lang === 'bn'
                          ? 'আপনার চোখের সমস্যা বা জিজ্ঞাসা এখানে লিখুন...'
                          : 'Describe your eye concern or question here...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  {contactError && (
                    <p className="text-xs sm:text-sm text-rose-600 font-medium">
                      {contactError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="glossy-teal-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপে বার্তা পাঠান' : 'Send via WhatsApp'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="max-w-lg w-full rounded-2xl bg-white text-[#071D38] p-6 sm:p-7 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-teal-700">
                  {lang === 'bn' ? 'চক্ষু স্বাস্থ্য পরামর্শ' : 'Ophthalmology Guidance'}
                </p>
                <h3 className="text-xl font-bold mt-1">
                  {lang === 'bn' ? selectedPost.titleBn : selectedPost.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {lang === 'bn' ? selectedPost.excerptBn : selectedPost.excerptEn}
            </p>

            <div className="rounded-xl bg-[#EAF3F6] p-4 space-y-2.5">
              <p className="text-xs font-bold text-[#071D38]">
                {lang === 'bn' ? 'করণীয়:' : 'Key Recommendations:'}
              </p>
              <ul className="space-y-2">
                {(lang === 'bn' ? selectedPost.tipsBn : selectedPost.tipsEn).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-[#09274D] text-white text-sm font-bold cursor-pointer"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
