import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  CLINIC_INFO,
  Lang,
  SERVICES,
  SURGERY_PACKAGES,
} from '../data/clinicData';
import { LangSlide } from './LangMotion';

interface BookingAndLocationProps {
  lang: Lang;
  preselectedService: string;
}

type BookingTab = 'online' | 'direct';

interface WhatsAppSlip {
  patientName: string;
  phone: string;
  appointmentDate: string;
  timeSlot: string;
  serviceName: string;
  formattedMessage: string;
  whatsappHref: string;
}

function toLocalDateInput(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeBdPhone(raw: string): string {
  const bnToEn = raw.replace(/[০-৯]/g, (ch) => String('০১২৩৪৫৬৭৮৯'.indexOf(ch)));
  const stripped = bnToEn.replace(/[\s\-()]/g, '').trim();
  if (stripped.startsWith('+880')) return stripped.slice(3);
  if (stripped.startsWith('880')) return stripped.slice(2);
  return stripped;
}

export const BookingAndLocation: React.FC<BookingAndLocationProps> = ({
  lang,
  preselectedService,
}) => {
  const [activeTab, setActiveTab] = useState<BookingTab>('online');

  // WhatsApp Booking Form State
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 5) d.setDate(d.getDate() + 1);
    return toLocalDateInput(d);
  });
  const [timeSlot, setTimeSlot] = useState(() =>
    lang === 'en' ? '3:00 PM - 5:30 PM' : 'দুপুর ০৩:০০ - বিকাল ০৫:৩০ টা'
  );
  const [serviceName, setServiceName] = useState(
    'সেলাইবিহীন ফ্যাকো সার্জারি — ব্যথাহীন ফ্যাকো সার্জারি ও ক্যাটারাক্ট অপারেশন'
  );
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedSlip, setConfirmedSlip] = useState<WhatsAppSlip | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setServiceName(preselectedService);
      setActiveTab('online');
      setConfirmedSlip(null);
    }
  }, [preselectedService]);

  const serviceOptions = [
    ...SERVICES.map((s) => (lang === 'bn' ? s.titleBn : s.titleEn)),
    ...SURGERY_PACKAGES.map((p) => `${p.name} — ${p.nameBn}`),
  ];

  const selectedDayOfWeek = (() => {
    if (!appointmentDate) return -1;
    const parts = appointmentDate.split('-').map(Number);
    const dt = new Date(parts[0], parts[1] - 1, parts[2]);
    return dt.getDay();
  })();

  // Closed on Friday (5); Sun (0) & Thu (4) are 3–5 PM; Sat (6), Mon (1), Tue (2), Wed (3) are 3–8 PM
  const isFridaySelected = selectedDayOfWeek === 5;
  const isSunOrThuSelected = selectedDayOfWeek === 0 || selectedDayOfWeek === 4;
  const isNonChamberDay = !appointmentDate || isFridaySelected;

  const availableSlots = isSunOrThuSelected
    ? lang === 'en'
      ? ['3:00 PM - 5:00 PM']
      : ['দুপুর ০৩:০০ - বিকাল ০৫:০০ টা']
    : lang === 'en'
      ? ['3:00 PM - 5:30 PM', '5:30 PM - 8:00 PM']
      : ['দুপুর ০৩:০০ - বিকাল ০৫:৩০ টা', 'বিকাল ০৫:৩০ - রাত ০৮:০০ টা'];

  useEffect(() => {
    if (!availableSlots.includes(timeSlot)) {
      setTimeSlot(availableSlots[0]);
    }
  }, [appointmentDate, lang]);

  const triggerAnchorNavigation = (href: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanName = patientName.trim();
    const cleanPhone = normalizeBdPhone(phone);

    if (cleanName.length < 2 || cleanName.length > 100) {
      setFormError(
        lang === 'bn'
          ? 'রোগীর পূর্ণ নাম (সঠিক ২–১০০ অক্ষর) লিখুন।'
          : 'Please enter patient full name (2–100 characters).'
      );
      return;
    }
    if (!/^01[3-9][0-9]{8}$/.test(cleanPhone)) {
      setFormError(
        lang === 'bn'
          ? 'সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।'
          : 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX).'
      );
      return;
    }
    if (isNonChamberDay) {
      setFormError(
        lang === 'bn'
          ? 'শুক্রবার চেম্বার বন্ধ থাকে। অনুগ্রহ করে শনি, সোম, মঙ্গল, বুধ (দুপুর ৩টা–রাত ৮টা) অথবা রবি ও বৃহস্পতি (দুপুর ৩টা–বিকাল ৫টা) নির্বাচন করুন।'
          : 'Chamber is closed on Friday. Please choose Sat, Mon, Tue, Wed (3–8 PM) or Sun & Thu (3–5 PM).'
      );
      return;
    }

    const trimmedNotes = notes.trim().slice(0, 600);
    const trimmedService = serviceName.trim().slice(0, 140);

    const lines =
      lang === 'bn'
        ? [
            'আসসালামু আলাইকুম, আমি ডাঃ ফজিলাতুন নেছা (বৃষ্টি)-এর চেম্বারে সিরিয়াল নিতে চাই।',
            '',
            `রোগীর নাম: ${cleanName}`,
            `মোবাইল নম্বর: ${cleanPhone}`,
            `তারিখ: ${appointmentDate}`,
            `সময়সূচি (স্লট): ${timeSlot}`,
            `চিকিৎসা / সেবা: ${trimmedService}`,
            ...(trimmedNotes ? [`রোগের বিবরণ: ${trimmedNotes}`] : []),
            '',
            'চেম্বার: বাংলাদেশ আই হসপিটাল খুলনা লিঃ, ৯ বি, মজিদ সরণি, শিববাড়ী, খুলনা।',
          ]
        : [
            'Hello, I would like to book an appointment with Dr. Fazilatun Nesa (Bristy).',
            '',
            `Patient Name: ${cleanName}`,
            `Mobile: ${cleanPhone}`,
            `Date: ${appointmentDate}`,
            `Preferred Slot: ${timeSlot}`,
            `Service: ${trimmedService}`,
            ...(trimmedNotes ? [`Symptoms / Notes: ${trimmedNotes}`] : []),
            '',
            'Chamber: Bangladesh Eye Hospital Khulna Ltd., 9B Majid Sarani, Shib Bari, Khulna.',
          ];

    const formattedMessage = lines.join('\n');
    const whatsappHref = `${CLINIC_INFO.whatsappUrl}?text=${encodeURIComponent(formattedMessage)}`;

    setConfirmedSlip({
      patientName: cleanName,
      phone: cleanPhone,
      appointmentDate,
      timeSlot,
      serviceName: trimmedService,
      formattedMessage,
      whatsappHref,
    });

    // Direct 100% WhatsApp submission inside click/submit gesture
    triggerAnchorNavigation(whatsappHref);
  };

  return (
    <>
      {/* SECTION 6: 100% WHATSAPP-DRIVEN APPOINTMENT SERIAL BOOKING */}
      <section id="booking" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#EEF6F8] to-[#E6F1F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <LangSlide lang={lang}>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <p className="text-xs font-semibold tracking-wide text-teal-800">
                {lang === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ অ্যাপয়েন্টমেন্ট' : 'Direct WhatsApp Appointment Desk'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
                {lang === 'bn' ? 'সহজে নিন আপনার কাঙ্ক্ষিত সিরিয়াল' : 'Book Your Appointment via WhatsApp'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {lang === 'bn'
                  ? 'নিচের ফর্মটি পূরণ করে সাবমিট করলেই আপনার সকল তথ্যসহ সরাসরি ডাক্তারের অফিসিয়াল হোয়াটসঅ্যাপে সিরিয়াল মেসেজ পৌঁছে যাবে।'
                  : 'Complete the form below to send your formatted appointment request directly to our official WhatsApp serial desk.'}
              </p>
            </div>
          </LangSlide>

          {/* 2 Clean Tabs with Visible Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-2xl optical-glass-light max-w-lg mx-auto border border-sky-900/20">
            <button
              type="button"
              onClick={() => setActiveTab('online')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'online'
                  ? 'glossy-blue-btn text-white border-2 border-[#0B5ED7] shadow-sm'
                  : 'bg-white text-slate-700 border border-sky-900/25 hover:border-[#0B5ED7]/60 hover:text-[#09274D]'
              }`}
            >
              {lang === 'bn' ? '১. অনলাইন সিরিয়াল (WhatsApp)' : '1. WhatsApp Booking'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap text-center ${
                activeTab === 'direct'
                  ? 'glossy-blue-btn text-white border-2 border-[#0B5ED7] shadow-sm'
                  : 'bg-white text-slate-700 border border-sky-900/25 hover:border-[#0B5ED7]/60 hover:text-[#09274D]'
              }`}
            >
              {lang === 'bn' ? '২. সরাসরি কল ও হটলাইন' : '2. Direct Call & Hotlines'}
            </button>
          </div>

          {/* TAB 1: 100% WHATSAPP BOOKING FORM */}
          {activeTab === 'online' && (
            <div className="optical-glass-light rounded-3xl p-6 sm:p-9 space-y-6 border border-sky-900/20">
              <div className="rounded-xl bg-[#EAF4F6] border border-teal-700/20 px-4 py-3.5 text-xs sm:text-[13px] text-[#0B3238]">
                <strong className="font-bold text-[#071D38]">
                  {lang === 'bn' ? 'বাংলাদেশ আই হসপিটাল খুলনা লিঃ চেম্বার: ' : 'Chamber Info: '}
                </strong>
                {lang === 'bn'
                  ? '৯ বি, মজিদ সরণি, শিববাড়ী, খুলনা। রোগী দেখেন: শনি, সোম, মঙ্গল ও বুধবার (দুপুর ৩:০০টা – রাত ৮:০০টা) এবং রবি ও বৃহস্পতিবার (দুপুর ৩:০০টা – বিকাল ৫:০০টা)। শুক্রবার বন্ধ।'
                  : '9B, Majid Sarani, Shib Bari, Khulna. Hours: Sat, Mon, Tue & Wed (3:00 PM – 8:00 PM) and Sun & Thu (3:00 PM – 5:00 PM). Closed Friday.'}
              </div>

              {confirmedSlip ? (
                <div className="rounded-2xl bg-[#071E3B] text-white p-6 sm:p-8 space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {lang === 'bn'
                          ? 'হোয়াটসঅ্যাপ সিরিয়াল মেসেজ প্রস্তুত!'
                          : 'Your WhatsApp Serial Message is Ready!'}
                      </h3>
                      <p className="text-xs sm:text-sm text-sky-100/80 mt-1">
                        {lang === 'bn'
                          ? 'হোয়াটসঅ্যাপ স্বয়ংক্রিয়ভাবে না খুললে নিচের সবুজ বাটনে ক্লিক করে এক ক্লিকেই আপনার সিরিয়াল পাঠিয়ে দিন।'
                          : 'If WhatsApp did not open automatically, click the green button below to send your serial request.'}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#041226] border border-sky-300/20 p-4 sm:p-5 text-xs sm:text-sm text-sky-100 whitespace-pre-wrap leading-relaxed font-sans">
                    {confirmedSlip.formattedMessage}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={confirmedSlip.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glossy-teal-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {lang === 'bn' ? 'হোয়াটসঅ্যাপে পাঠান' : 'Open in WhatsApp'}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(confirmedSlip.formattedMessage);
                        setCopiedMsg(true);
                        setTimeout(() => setCopiedMsg(false), 2000);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-xs sm:text-sm font-semibold text-white cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      {copiedMsg
                        ? lang === 'bn'
                          ? 'কপি হয়েছে'
                          : 'Copied'
                        : lang === 'bn'
                          ? 'তথ্য কপি করুন'
                          : 'Copy Message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmedSlip(null)}
                      className="px-4 py-3 rounded-xl border border-sky-300/30 text-xs sm:text-sm font-semibold text-sky-100 hover:bg-white/10 cursor-pointer"
                    >
                      {lang === 'bn' ? 'তথ্য পরিবর্তন করুন' : 'Edit Booking Info'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                        {lang === 'bn' ? 'রোগীর পূর্ণ নাম *' : 'Patient Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder={lang === 'bn' ? 'উদাঃ মোছাঃ সালমা আক্তার' : 'e.g. Salma Akter'}
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
                        className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] font-mono-num focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                        {lang === 'bn' ? 'অ্যাপয়েন্টমেন্টের তারিখ *' : 'Appointment Date *'}
                      </label>
                      <input
                        type="date"
                        required
                        min={toLocalDateInput(new Date())}
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] font-mono-num focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {isFridaySelected && (
                        <p className="text-xs text-rose-600 mt-1 font-medium">
                          {lang === 'bn'
                            ? 'শুক্রবার চেম্বার বন্ধ থাকে। অনুগ্রহ করে শনি, সোম, মঙ্গল, বুধ (দুপুর ৩টা–রাত ৮টা) অথবা রবি ও বৃহস্পতিবার (দুপুর ৩টা–বিকাল ৫টা) নির্বাচন করুন।'
                            : 'Closed on Friday. Please choose Sat, Mon, Tue, Wed (3–8 PM) or Sun & Thu (3–5 PM).'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                        {lang === 'bn' ? 'রোগী দেখার সময়সূচি (স্লট) *' : 'Preferred Time Slot *'}
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {availableSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                      {lang === 'bn' ? 'চিকিৎসা বা চোখের সমস্যা *' : 'Service or Eye Condition *'}
                    </label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {!serviceOptions.includes(serviceName) && serviceName && (
                        <option value={serviceName}>{serviceName}</option>
                      )}
                      {serviceOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#071D38] mb-1.5">
                      {lang === 'bn' ? 'রোগের লক্ষণ বা মন্তব্য (ঐচ্ছিক)' : 'Symptoms or Remarks (Optional)'}
                    </label>
                    <textarea
                      rows={3}
                      maxLength={600}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        lang === 'bn'
                          ? 'যেমন: চোখে ঝাপসা দেখা, পানি পড়া বা পূর্বে কোনো অপারেশন হয়ে থাকলে লিখুন...'
                          : 'Briefly mention blurred vision, tearing, or previous eye surgeries...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F6FAFC] border border-sky-900/20 text-sm text-[#071D38] focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  {formError && (
                    <div className="flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs sm:text-sm text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={isNonChamberDay}
                      className="glossy-teal-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl disabled:opacity-50 text-white font-bold text-sm transition-transform active:scale-[0.99] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {lang === 'bn'
                        ? 'হোয়াটসঅ্যাপে সিরিয়াল নিশ্চিত করুন'
                        : 'Confirm & Send via WhatsApp'}
                    </button>
                    <a
                      href={`tel:${CLINIC_INFO.serialDigits}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-sky-900/25 hover:border-[#0B5ED7] text-[#071D38] font-bold text-sm font-mono-num transition-colors"
                    >
                      <Phone className="w-4 h-4 text-sky-700" />
                      {CLINIC_INFO.serialNumber}
                    </a>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: DIRECT CALL & HOSPITAL HOTLINES */}
          {activeTab === 'direct' && (
            <div className="rounded-3xl bg-white border border-sky-900/20 p-6 sm:p-9 shadow-[0_14px_38px_-20px_rgba(7,24,46,0.18)] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-[#EAF4F6] border border-teal-700/20 p-6 space-y-4">
                  <p className="text-xs font-semibold text-teal-800">
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপ ও সরাসরি সিরিয়াল' : 'Direct WhatsApp & Serial Desk'}
                  </p>
                  <p className="font-mono-num text-2xl font-bold text-[#071D38]">
                    {CLINIC_INFO.serialNumber}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {lang === 'bn'
                      ? 'রোগীর নাম, বয়স ও পছন্দের দিন লিখে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিলে দ্রুত সিরিয়াল কনফার্ম করে দেওয়া হয়।'
                      : 'Send patient name, age, and preferred visit day on WhatsApp for quick manual confirmation.'}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glossy-teal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {lang === 'bn' ? 'হোয়াটসঅ্যাপে সিরিয়াল' : 'WhatsApp Serial'}
                    </a>
                    <a
                      href={`tel:${CLINIC_INFO.serialDigits}`}
                      className="glossy-blue-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {lang === 'bn' ? 'সরাসরি কল করুন' : 'Call Now'}
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F4F8FB] border border-sky-900/15 p-6 space-y-4">
                  <p className="text-xs font-semibold text-sky-800">
                    {lang === 'bn'
                      ? 'হাসপাতাল ও অফিসিয়াল হটলাইন নম্বরসমূহ'
                      : 'Hospital & Official Hotline Numbers'}
                  </p>
                  <div className="space-y-2.5">
                    {CLINIC_INFO.hotlines.map((num, idx) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\-/g, '')}`}
                        className="flex items-center justify-between rounded-xl bg-white border border-sky-900/20 px-4 py-2.5 hover:border-[#0B5ED7] transition-colors"
                      >
                        <span className="text-xs text-slate-600">
                          {lang === 'bn' ? `হটলাইন ০${idx + 1}` : `Hotline 0${idx + 1}`}
                        </span>
                        <span className="font-mono-num font-bold text-sm text-[#071D38]">
                          {num}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7: CHAMBER & LOCATION GUIDE */}
      <section id="location" className="py-12 sm:py-16 lg:py-24 bg-[#EAF3F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-teal-800 mb-2">
              {lang === 'bn' ? 'চেম্বার লোকেশন ও সময়সূচি' : 'Chamber Location & Visiting Hours'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071D38] tracking-tight">
              {lang === 'bn'
                ? 'বাংলাদেশ আই হসপিটাল খুলনা লিঃ চেম্বার'
                : 'Bangladesh Eye Hospital Khulna Ltd. Chamber'}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {lang === 'bn'
                ? 'খুলনার প্রাণকেন্দ্র শিববাড়ী মোড়ে অবস্থিত আধুনিক সুযোগ-সুবিধা সম্বলিত চেম্বারে নিয়মিত রোগী দেখছেন।'
                : 'Regular specialist consultations in a modern diagnostic and surgical ophthalmic facility at Shib Bari, Khulna.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Chamber Schedule & Contact Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#071E3B] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-teal-300">
                    {lang === 'bn' ? 'প্রাইভেট চেম্বার' : 'Private Chamber'}
                  </p>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {lang === 'bn'
                      ? 'বাংলাদেশ আই হসপিটাল খুলনা লিঃ'
                      : 'Bangladesh Eye Hospital Khulna Ltd.'}
                  </h3>
                  <p className="text-sm text-sky-100/85 mt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'bn'
                        ? '৯ বি, মজিদ সরণি, শিববাড়ী, খুলনা - ৯১০০'
                        : '9B, Majid Sarani, Shib Bari, Khulna - 9100'}
                    </span>
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-sky-300/15 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sky-200">
                      {lang === 'bn' ? 'শনি, সোম, মঙ্গল ও বুধবার' : 'Sat, Mon, Tue & Wed'}
                    </span>
                    <span className="font-semibold text-white font-mono-num">
                      {lang === 'bn' ? 'দুপুর ৩:০০ - রাত ৮:০০' : '3:00 PM - 8:00 PM'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sky-200">
                      {lang === 'bn' ? 'রবিবার ও বৃহস্পতিবার' : 'Sun & Thu'}
                    </span>
                    <span className="font-semibold text-white font-mono-num">
                      {lang === 'bn' ? 'দুপুর ৩:০০ - বিকাল ৫:০০' : '3:00 PM - 5:00 PM'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sky-200">
                      {lang === 'bn' ? 'শুক্রবার' : 'Friday'}
                    </span>
                    <span className="text-teal-300 font-medium">
                      {lang === 'bn' ? 'বন্ধ (জরুরি প্রয়োজনে যোগাযোগ)' : 'Closed (Emergency Contact)'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-sky-300/15 text-xs sm:text-sm">
                  <p className="text-sky-200">
                    {lang === 'bn' ? 'সিরিয়াল ও হোয়াটসঅ্যাপ:' : 'Serial & WhatsApp:'}{' '}
                    <a
                      href={`tel:${CLINIC_INFO.serialDigits}`}
                      className="font-mono-num font-bold text-teal-300 hover:underline"
                    >
                      {CLINIC_INFO.serialNumber}
                    </a>
                  </p>
                  <p className="text-sky-200">
                    {lang === 'bn' ? 'হটলাইন:' : 'Hotlines:'}{' '}
                    <span className="font-mono-num text-white">
                      {CLINIC_INFO.hotlines.join(' · ')}
                    </span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#041225] border border-sky-300/15 p-4 text-xs text-sky-100/85 leading-relaxed">
                <strong className="text-teal-300 block mb-1">
                  {lang === 'bn' ? 'সরকারি কর্মস্থল:' : 'Government Posting:'}
                </strong>
                {lang === 'bn'
                  ? 'ডাঃ ফজিলাতুন নেছা (বৃষ্টি) খুলনা মেডিকেল কলেজ হাসপাতালের চক্ষু বিভাগে সরকারি কর্মকর্তা (বিসিএস স্বাস্থ্য) হিসেবে নিয়োজিত রয়েছেন।'
                  : 'Dr. Fazilatun Nesa (Bristy) serves as a BCS (Health) Cadre officer in the Department of Ophthalmology, Khulna Medical College Hospital.'}
              </div>
            </div>

            {/* Right: Directions & Embedded Map */}
            <div className="lg:col-span-7 rounded-2xl bg-white border border-sky-900/15 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-[0_8px_28px_-16px_rgba(7,24,46,0.12)]">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#071D38]">
                  {lang === 'bn' ? 'সহজে চেম্বারে পৌঁছানোর উপায়' : 'Directions to the Chamber'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'খুলনা শিববাড়ী মোড় থেকে মজিদ সরণিতে প্রবেশ করলেই হাতের কাছে ৯বি ভবনে বাংলাদেশ আই হসপিটাল খুলনা লিঃ।'
                    : 'Enter Majid Sarani from Shib Bari More, Khulna; Bangladesh Eye Hospital Khulna Ltd. is conveniently situated at Building 9B.'}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-sky-900/15 h-64 sm:h-72 bg-[#E6EFF4]">
                <iframe
                  title="Bangladesh Eye Hospital Khulna Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=89.5465%2C22.8150%2C89.5615%2C22.8260&layer=mapnik&marker=22.8205%2C89.5540"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-sky-900/25 text-[#071D38] hover:border-[#0B5ED7] hover:bg-sky-50 font-bold text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-sky-700" />
                  {lang === 'bn' ? 'গুগল ম্যাপে ডিরেকশন' : 'Open in Google Maps'}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('online');
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="glossy-blue-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {lang === 'bn' ? 'এই চেম্বারে সিরিয়াল নিন' : 'Book at This Chamber'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
