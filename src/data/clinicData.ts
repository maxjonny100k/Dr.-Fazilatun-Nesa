export type Lang = 'bn' | 'en';

export const CLINIC_INFO = {
  doctorName: {
    bn: 'ডাঃ ফজিলাতুন নেছা (বৃষ্টি)',
    en: 'Dr. Fazilatun Nesa (Bristy)',
  },
  shortName: {
    bn: 'ডাঃ ফজিলাতুন নেছা (বৃষ্টি)',
    en: 'Dr. Fazilatun Nesa (Bristy)',
  },
  title: {
    bn: 'চক্ষু বিশেষজ্ঞ ও ফ্যাকো সার্জন',
    en: 'Eye Specialist & Phaco Surgeon',
  },
  degrees: {
    bn: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এমসিপিএস, এফসিপিএস (চক্ষু)',
    en: 'MBBS, BCS (Health), MCPS, FCPS (Ophthalmology)',
  },
  fellowship: {
    bn: 'ফেলোশীপ ইন ফ্যাকো সার্জারি',
    en: 'Fellowship in Phaco Surgery',
  },
  bcsBadge: {
    bn: 'বিসিএস (স্বাস্থ্য) ক্যাডার · চক্ষু বিভাগ, খুলনা মেডিকেল কলেজ হাসপাতাল',
    en: 'BCS (Health) Cadre · Dept. of Ophthalmology, Khulna Medical College Hospital',
  },
  chamberLine: {
    bn: 'কনসালটেন্ট: বাংলাদেশ আই হসপিটাল খুলনা লিঃ (৯ বি, মজিদ সরণি, শিববাড়ী, খুলনা - ৯১০০)',
    en: 'Consultant: Bangladesh Eye Hospital Khulna Ltd. (9B, Majid Sarani, Shib Bari, Khulna - 9100)',
  },
  chamberShort: {
    bn: 'বাংলাদেশ আই হসপিটাল খুলনা লিঃ, ৯ বি, মজিদ সরণি, শিববাড়ী, খুলনা - ৯১০০',
    en: 'Bangladesh Eye Hospital Khulna Ltd., 9B, Majid Sarani, Shib Bari, Khulna - 9100',
  },
  scheduleSummary: {
    bn: 'শনি, সোম ও বুধবার (দুপুর ৩টা - রাত ৮টা) · অন্যান্য দিন বন্ধ',
    en: 'Sat, Mon & Wed (3:00 PM - 8:00 PM) · Closed on other days',
  },
  serialNumber: '01345-786806',
  serialDigits: '01345786806',
  whatsappUrl: 'https://wa.me/8801345786806',
  hotlines: ['02-44110765', '01799-209075', '01907-045724'],
  doctorFacebook: 'https://www.facebook.com/share/1KBRrLcWBe/',
  hospitalFacebook: 'https://fb.com/behkhulna',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Bangladesh+Eye+Hospital+Khulna+9B+Majid+Sarani+Shib+Bari+Khulna',
  poweredByName: 'Procharomedia',
  poweredByUrl: 'https://procharmedia.vercel.app/',
};

export const IMAGES = {
  eyeZoom1: '/src/assets/images/eye_zoom_1_1794987416249.jpg',
  eyeZoom2: '/src/assets/images/eye_zoom_2_1794987416555.jpg',
  eyeZoom3: '/src/assets/images/eye_zoom_3_1794987417843.jpg',
  eyeZoom4: '/src/assets/images/eye_zoom_4_1794987417925.jpg',
  doctorLogo: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_5.58.03_PM_46550012.jpeg',
  phacoOT: '/src/assets/images/phaco_surgery_ot_1794987419852.jpg',
  servicePterygium: '/src/assets/images/service_pterygium_1795086492699.jpg',
  serviceSquint: '/src/assets/images/service_squint_v3_1795251626500.jpg',
  servicePtosis: '/src/assets/images/service_ptosis_v2_1795251606079.jpg',
  serviceOcularTrauma: '/src/assets/images/service_trauma_v2_1795251606104.jpg',
  servicePediatricLacrimal: '/src/assets/images/service_pediatric_v2_1795251606118.jpg',
  serviceOculoplasty: '/src/assets/images/service_oculoplasty_v2_1795251605996.jpg',
  serviceGlaucomaRetina: '/src/assets/images/service_glaucoma_v2_1795251606909.jpg',
};

export const CLINIC_VIDEO = {
  src: '/assets/aistudio/WhatsApp_Video_2026-11-18_at_5.56.05_PM_6dbab695.mp4',
  titleBn: 'ছানি অপারেশনের পর জরুরি করণীয় ও বর্জনীয় নিয়মাবলী — ডাঃ ফজিলাতুন নেছা (বৃষ্টি)',
  titleEn: 'Post-Cataract Surgery Care Guide — Dr. Fazilatun Nesa (Bristy)',
  subtitleBn:
    'সফল ছানি অপারেশনের পরেও দৃষ্টি সুরক্ষিত রাখতে নিয়মিত চোখের ড্রপ ব্যবহার, কালো চশমা পরা এবং ৩ সপ্তাহ চোখে পানি না লাগানোর গুরুত্বপূর্ণ পরামর্শ সরাসরি ডাক্তারের মুখে শুনুন।',
  subtitleEn:
    'Listen directly to Dr. Bristy’s essential post-cataract recovery protocol: regular prescribed eye drops, protective sunglasses, and keeping water away from the eye for 3 weeks.',
};

export interface EyeZoomStage {
  id: number;
  image: string;
  code: string;
  layerBn: string;
  layerEn: string;
  depthLabel: string;
}

export const EYE_ZOOM_STAGES: EyeZoomStage[] = [
  { id: 0, image: IMAGES.eyeZoom1, code: '01', layerBn: 'কর্নিয়া', layerEn: 'Cornea', depthLabel: '1.0x' },
  { id: 1, image: IMAGES.eyeZoom2, code: '02', layerBn: 'আইরিস', layerEn: 'Iris', depthLabel: '2.5x' },
  { id: 2, image: IMAGES.eyeZoom3, code: '03', layerBn: 'লেন্স', layerEn: 'Lens', depthLabel: '5.0x' },
  { id: 3, image: IMAGES.eyeZoom4, code: '04', layerBn: 'রেটিনা', layerEn: 'Retina', depthLabel: '8.0x' },
];

export interface ServiceItem {
  id: string;
  image: string;
  featured?: boolean;
  titleBn: string;
  titleEn: string;
  summaryBn: string;
  summaryEn: string;
  pointsBn: [string, string];
  pointsEn: [string, string];
  detailsBn: string;
  detailsEn: string;
  recoveryBn: string;
  recoveryEn: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'phaco-cataract',
    image: IMAGES.phacoOT,
    featured: true,
    titleBn: 'সেলাইবিহীন ফ্যাকো সার্জারি — ব্যথাহীন ফ্যাকো সার্জারি ও ক্যাটারাক্ট অপারেশন',
    titleEn: 'Stitchless Phaco Cataract — Painless Cataract Micro-Surgery',
    summaryBn:
      'উন্নত প্রযুক্তির সেলাইবিহীন ও ইনজেকশনবিহীন ব্যথাহীন ফ্যাকো সার্জারি পদ্ধতিতে চোখের ক্যাটারাক্ট (ছানি) অপারেশন এবং প্রিমিয়াম ফোল্ডেবল লেন্স সংযোজন।',
    summaryEn:
      'Advanced sutureless, injection-free painless phacoemulsification cataract surgery with premium foldable intraocular lens (IOL) implantation.',
    pointsBn: [
      'সম্পূর্ণ ইনজেকশনবিহীন ও দ্রুত আরোগ্যলাভের আধুনিক পদ্ধতি',
      'কোনো সেলাই বা বড় ব্যান্ডেজের প্রয়োজন হয় না',
    ],
    pointsEn: [
      'Topical anesthesia — zero needle injection & rapid visual recovery',
      'Micro-incision sutureless technique with no large bandage',
    ],
    detailsBn:
      'আমাদের চেম্বারে নিয়মিত আধুনিক সেলাইবিহীন ফ্যাকো সার্জারি ও ব্যথাহীন ফ্যাকো সার্জারি পদ্ধতিতে ক্যাটারাক্ট (ছানি) অপারেশন সম্পন্ন করা হয়। মাত্র ২.২ মিমি সূক্ষ্ম ছিদ্রের মাধ্যমে আল্ট্রাসাউন্ড প্রযুক্তিতে ঘোলাটে লেন্স অপসারণ করে উন্নতমানের কৃত্রিম ফোল্ডেবল লেন্স স্থাপন করা হয়। লেন্স ও প্যাকেজ সম্পর্কে জানতে সরাসরি যোগাযোগ করুন।',
    detailsEn:
      'Routine cataract micro-surgery is performed regularly using advanced 2.2mm micro-incision phacoemulsification technology with foldable Monofocal, Multifocal, and Toric IOL options. Contact us directly for personalized lens guidance and package consultation.',
    recoveryBn: 'অপারেশনের সময়: ১০–১৫ মিনিট · পরদিন থেকেই স্বাভাবিক দৃষ্টি',
    recoveryEn: 'Procedure time: 10–15 mins · Functional vision next day',
  },
  {
    id: 'pterygium',
    image: IMAGES.servicePterygium,
    titleBn: 'আধুনিক গ্রাফটিং পদ্ধতিতে টেরিজিয়াম অপারেশন',
    titleEn: 'Pterygium Excision with Conjunctival Autograft & MMC',
    summaryBn:
      'চোখের কর্নিয়ার উপর বাড়তে থাকা অপ্রয়োজনীয় পাতলা মাংস বৃদ্ধি (Pterygium) নিখুঁতভাবে অপসারণ এবং নিজস্ব কনজাংটিভা থেকে গ্রাফট নিয়ে জোড়া লাগানো।',
    summaryEn:
      'Precision removal of corneal fleshy growth (Pterygium) combined with conjunctival autografting and MMC to prevent recurrence.',
    pointsBn: [
      'পুনরায় মাংস বাড়ার ঝুঁকি প্রায় শূন্যে নামিয়ে আনা',
      'চোখের লালচে ভাব ও খচখচে অস্বস্তি দূর হয়',
    ],
    pointsEn: [
      'Minimizes recurrence risk close to zero using autograft + MMC',
      'Relieves chronic redness, foreign-body sensation & astigmatism',
    ],
    detailsBn:
      'কর্নিয়ার স্বচ্ছতা ও দৃষ্টিশক্তি রক্ষা করতে মাইক্রোস্কোপের নিচে টেরিজিয়াম অপসারণ করে রোগীর নিজস্ব চোখের পর্দা (কনজাংটিভা) দিয়ে অটোগ্রাফট করা হয়।',
    detailsEn:
      'Performed under high-magnification surgical microscope with conjunctival autografting for smooth cosmetic and optical healing.',
    recoveryBn: 'স্বাভাবিক কাজকর্ম: ৩–৫ দিনের মধ্যে',
    recoveryEn: 'Return to routine activity: 3–5 days',
  },
  {
    id: 'squint',
    image: IMAGES.serviceSquint,
    titleBn: 'বাঁকা চোখ (Squint) সোজা করার অপারেশন',
    titleEn: 'Squint (Strabismus) Alignment Surgery',
    summaryBn:
      'চোখের অতিরিক্ত-সক্রিয় বা দুর্বল মাংসপেশি সুষমভাবে সমন্বয় করে বাঁকা বা ট্যারা চোখকে নিখুঁতভাবে সোজা করা হয়।',
    summaryEn:
      'Precision extraocular muscle balancing to realign inward, outward, or vertical eye misalignment in children and adults.',
    pointsBn: [
      'শিশু এবং প্রাপ্তবয়স্ক সবার জন্যই কার্যকর চিকিৎসা',
      'উভয় চোখের একসাথে দেখার ক্ষমতা (Binocular vision) ফিরিয়ে আনে',
    ],
    pointsEn: [
      'Effective corrective surgery for both children and adults',
      'Helps prevent Amblyopia (lazy eye) & restores binocular vision',
    ],
    detailsBn:
      'শিশুদের অলস চোখ (Amblyopia) প্রতিরোধ এবং প্রাপ্তবয়স্কদের আত্মবিশ্বাস ও চোখের সঠিক অ্যালাইনমেন্ট ফিরিয়ে আনতে স্কুইন্ট সার্জারি অত্যন্ত সফল পদ্ধতি।',
    detailsEn:
      'Restores eye alignment, depth perception, and prevents permanent vision loss in pediatric strabismus cases.',
    recoveryBn: 'সেলাইবিহীন বা সূক্ষ্ম অ্যাবজর্বেবল সুতা · ১ সপ্তাহে সুস্থতা',
    recoveryEn: 'Fine absorbable sutures · Recovery within ~1 week',
  },
  {
    id: 'ptosis',
    image: IMAGES.servicePtosis,
    titleBn: 'চোখের পাতা (Ptosis) সার্জারি',
    titleEn: 'Eyelid Ptosis & LPS Resection Surgery',
    summaryBn:
      'চোখের উপরের পাতা নিচে নেমে গিয়ে দৃষ্টি পথ আটকে রাখলে (Ptosis) সূক্ষ্ম অস্ত্রোপচারের মাধ্যমে পাতার পেশি শক্ত করে স্বাভাবিক অবস্থানে উন্নীত করা হয়।',
    summaryEn:
      'Micro-surgical elevation of drooping upper eyelids (LPS Resection / Fascia Lata sling) to clear the visual axis and restore symmetry.',
    pointsBn: [
      'দৃষ্টির বাধা দূর করে সম্পূর্ণ প্রাকৃতিক সৌন্দর্য ফিরিয়ে আনা',
      'জন্মগত ও বয়সজনিত উভয় ধরনের সমস্যার স্থায়ী সমাধান',
    ],
    pointsEn: [
      'Clears visual obstruction while preserving natural eyelid contour',
      'Permanent solution for both congenital and age-related ptosis',
    ],
    detailsBn:
      'LPS Resection, LPS Resection with Lid Construction অথবা গুরুতর জন্মগত ক্ষেত্রে Ptosis with Fascia Lata পদ্ধতির মাধ্যমে চোখের পাতার সঠিক উচ্চতা ও সিমেট্রি নিশ্চিত করা হয়।',
    detailsEn:
      'Tailored surgical plan (LPS Resection or Fascia Lata suspension) based on levator muscle function.',
    recoveryBn: 'সার্জিক্যাল সেলাই খুলে নেওয়া: ৭ দিন পর',
    recoveryEn: 'Suture evaluation: Day 7 post-op',
  },
  {
    id: 'ocular-trauma',
    image: IMAGES.serviceOcularTrauma,
    titleBn: 'চোখের আঘাতজনিত পাতা ও মনি ছিঁড়ে যাওয়ার সার্জারি',
    titleEn: 'Ocular Trauma, Corneal & Eyelid Repair Surgery',
    summaryBn:
      'ধারাল বস্তু, কাঁচ বা অন্য কোনো আঘাতে চোখের কর্নিয়া (কালো মনি) বা চোখের পাতা ফেটে বা ছিঁড়ে গেলে অতিসূক্ষ্ম মাইক্রোস্কোপিক সুতা দিয়ে নিখুঁত জোড়া লাগানো।',
    summaryEn:
      'Emergency and reconstructive micro-surgical repair of lacerated corneas and torn eyelids using ultra-fine micro-sutures.',
    pointsBn: [
      'মাইক্রোস্কোপের সাহায্যে অতি নিখুঁত জোড়া লাগানো',
      'পাতার সঠিক গঠন ও চোখের দৃষ্টিশক্তির পুনরুদ্ধার',
    ],
    pointsEn: [
      'Ultra-fine 10-0/8-0 microscopic anatomical tissue alignment',
      'Preserves eyelid margin function and corneal clarity',
    ],
    detailsBn:
      'চোখে যেকোনো আঘাত বা কেটে যাওয়ার ক্ষেত্রে দ্রুততম সময়ে মাইক্রোসার্জারি জরুরি। আধুনিক ওটি সুবিধায় জীবাণুমুক্ত পরিবেশে পূর্ণাঙ্গ রিপেয়ার ও রিকনস্ট্রাকশন করা হয়।',
    detailsEn:
      'Timely layered anatomical repair minimizes scarring, corneal astigmatism, and tear-drainage disruption.',
    recoveryBn: 'জরুরি সেবা ও নিয়মিত ফলোআপ পর্যবেক্ষণ',
    recoveryEn: 'Immediate trauma management & close follow-up',
  },
  {
    id: 'pediatric-lacrimal',
    image: IMAGES.servicePediatricLacrimal,
    titleBn: 'শিশুদের জন্মগত পানি পড়ার সার্জারি (Probing / DCR)',
    titleEn: 'Pediatric Watering Eye & Lacrimal Surgery (Probing / DCR)',
    summaryBn:
      'নবজাতক বা ছোট শিশুদের চোখের কোণ দিয়ে সবসময় পানি পড়া, পিচুটি বা পুঁজ জমার চিকিৎসার প্রোবিং ও আধুনিক ড্যাক্রিওসিস্টোরাইনোস্টমি (DCR) সার্জারি।',
    summaryEn:
      'Gentle Nasolacrimal Duct Probing for infants and modern DCR with intubation / DCT for chronic blocked tear ducts.',
    pointsBn: [
      'শিশুর জন্য নিরাপদ ও ব্যথাহীন প্রোবিং পদ্ধতি',
      'বারবার চোখ দিয়ে পানি ও পিচুটি পড়া স্থায়ীভাবে বন্ধ হয়',
    ],
    pointsEn: [
      'Safe, gentle probing procedure tailored for infants and toddlers',
      'Permanent relief from chronic watering, discharge & dacryocystitis',
    ],
    detailsBn:
      'জন্মগত নেত্রনালীর ব্লকের জন্য শিশুদের নিরাপদ প্রোবিং এবং বড়দের দীর্ঘদিনের পানি পড়ার সমস্যার জন্য DCR with Intubation, Re-DCR ও DCT সম্পন্ন করা হয়।',
    detailsEn:
      'High success rate across primary probing, intubation DCR, and revision Re-DCR cases.',
    recoveryBn: 'প্রোবিংয়ের পরদিন থেকেই শিশু স্বাভাবিক থাকতে পারে',
    recoveryEn: 'Quick comfort recovery within 24 hours for probing',
  },
  {
    id: 'oculoplasty-tumor',
    image: IMAGES.serviceOculoplasty,
    titleBn: 'অকুলোপ্লাস্টিক ও চোখের টিউমার অপারেশন',
    titleEn: 'Oculoplastic, Lid Reconstruction & Eyelid Tumor Surgery',
    summaryBn:
      'চোখের পাতা, কোণ বা আশপাশের টিউমার, ক্যালাজিয়ন, সিস্ট ও আঁচিল নিরাপদে অপসারণ এবং চোখের স্বাভাবিক আকৃতি বজায় রাখতে পুনর্গঠনমূলক সার্জারি।',
    summaryEn:
      'Safe excision of chalazion, lid growths, limbal dermoid, xanthelasma, and complex eyelid reconstruction with biopsy.',
    pointsBn: [
      'প্রয়োজনে বায়োপসি ও হিস্টোপ্যাথলজি নিশ্চিতকরণ',
      'দাগহীন ও সুন্দর কসমেটিক ক্ষতের আরোগ্য',
    ],
    pointsEn: [
      'Histopathology & biopsy confirmation when clinically indicated',
      'Cosmetically mindful incision lines for minimal scarring',
    ],
    detailsBn:
      'Entropion, Ectropion, Xanthelasma, Lid Growth, Limbal Dermoid এবং জটিল Lid Reconstruction সহ সকল অকুলোপ্লাস্টিক অপারেশন নিখুঁতভাবে করা হয়।',
    detailsEn:
      'Covers Entropion/Ectropion correction, Tarsorrhaphy, Xanthelasma excision, and major eyelid reconstruction.',
    recoveryBn: 'সেলাইবিহীন বা সূক্ষ্ম কসমেটিক ক্লোজার',
    recoveryEn: 'Fine cosmetic closure with minimal downtime',
  },
  {
    id: 'glaucoma-diabetic',
    image: IMAGES.serviceGlaucomaRetina,
    titleBn: 'চোখের প্রেসার (গ্লুকোমা) ও ডায়াবেটিক রেটিনা পরীক্ষা',
    titleEn: 'Glaucoma (IOP) & Diabetic Eye Screening',
    summaryBn:
      'ডায়াবেটিস রোগীদের চোখের সূক্ষ্ম রক্তনালী পরীক্ষা এবং চোখের অভ্যন্তরীণ প্রেসার (IOP) মেপে নীরব ঘাতক রোগ গ্লুকোমা প্রাথমিক অবস্থাতেই শনাক্ত করা।',
    summaryEn:
      'Precision applanation tonometry to detect silent Glaucoma early and dilated fundus evaluation for diabetic patients.',
    pointsBn: [
      'উচ্চ নির্ভুল অ্যাপ্লানেশন টোনোমেট্রি প্রেসার পরিমাপ',
      'চোখের মনি প্রসারিত করে রেটিনার নিখুঁত পর্যবেক্ষণ',
    ],
    pointsEn: [
      'Gold-standard Goldmann applanation tonometry measurement',
      'Dilated retinal vessel screening for diabetic & hypertensive care',
    ],
    detailsBn:
      '৪০ বছর ঊর্ধ্ব সকল ব্যক্তি ও ডায়াবেটিস রোগীদের বছরে অন্তত একবার চোখের প্রেসার ও পূর্ণাঙ্গ চক্ষু পরীক্ষা করানো উচিত যাতে স্থায়ী দৃষ্টিহানি প্রতিরোধ করা যায়।',
    detailsEn:
      'Recommended annually for everyone over 40 and all diabetic patients to prevent silent irreversible vision loss.',
    recoveryBn: 'চেম্বারেই তাৎক্ষণিক ডায়াগনস্টিক পরামর্শ',
    recoveryEn: 'Same-visit diagnostic assessment & management plan',
  },
];

export type SurgeryCategory = 'all' | 'lid' | 'lacrimal' | 'oculoplasty' | 'anterior';

export interface SurgeryPackage {
  id: string;
  name: string;
  nameBn: string;
  price: string;
  category: Exclude<SurgeryCategory, 'all'>;
  image: string;
  detailBn: string;
  detailEn: string;
}

export const SURGERY_PACKAGES: SurgeryPackage[] = [
  {
    id: 'chalazion',
    name: 'Chalazion',
    nameBn: 'ক্যালাজিয়ন (চোখের পাতার গোটা)',
    price: '10,000 to 15,000',
    category: 'lid',
    image: IMAGES.servicePtosis,
    detailBn: 'চোখের পাতার তৈলগ্রন্থি বন্ধ হয়ে হওয়া স্থায়ী গোটা বা ক্যালাজিয়ন নিরাপদে ও দাগহীনভাবে অপসারণ করা হয়।',
    detailEn: 'Safe micro-incision and curettage of persistent eyelid chalazion cyst with clean cosmetic healing.',
  },
  {
    id: 'lid-reconstruction',
    name: 'Lid Reconstruction',
    nameBn: 'চোখের পাতা পুনর্গঠন সার্জারি',
    price: '40,000 to 80,000',
    category: 'lid',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'আঘাত, টিউমার অপসারণ বা জন্মগত ত্রুটির পর চোখের পাতার স্বাভাবিক গঠন ও সুরক্ষা পুনর্গঠনমূলক মাইক্রোসার্জারি।',
    detailEn: 'Layered reconstructive eyelid surgery restoring anatomical margin contour and corneal protection.',
  },
  {
    id: 'lid-repair',
    name: 'Lid Repair',
    nameBn: 'চোখের পাতা রিপেয়ার সার্জারি',
    price: '40,000 to 70,000',
    category: 'lid',
    image: IMAGES.serviceOcularTrauma,
    detailBn: 'আঘাতজনিত কারণে চোখের পাতা কেটে বা ছিঁড়ে গেলে সূক্ষ্ম মাইক্রোস্কোপিক সেলাইয়ের মাধ্যমে স্বাভাবিক আকৃতিতে জোড়া লাগানো।',
    detailEn: 'Precision microscopic repair of lacerated upper or lower eyelid margins.',
  },
  {
    id: 'entropion',
    name: 'Entropion (Per Lid)',
    nameBn: 'এনট্রোপিয়ন (পাতা ভেতরে ঢুকে যাওয়া - প্রতি পাতা)',
    price: '50,000',
    category: 'lid',
    image: IMAGES.servicePtosis,
    detailBn: 'চোখের পাতা ও পাপড়ি ভেতরের দিকে ঘুরে গিয়ে কর্নিয়ায় ঘষা লাগা প্রতিরোধে স্থায়ী পাতার অ্যালাইনমেন্ট সার্জারি।',
    detailEn: 'Corrective eyelid rotation surgery preventing eyelashes from rubbing against the cornea.',
  },
  {
    id: 'ectropion',
    name: 'Ectropion (Per Lid)',
    nameBn: 'একট্রোপিয়ন (পাতা বাইরে উল্টে যাওয়া - প্রতি পাতা)',
    price: '50,000',
    category: 'lid',
    image: IMAGES.servicePtosis,
    detailBn: 'চোখের নিচের পাতা বাইরের দিকে ঝুলে পড়া ও চোখ শুষ্ক হয়ে যাওয়া প্রতিরোধে টাইটেনিং ও রিপজিশনিং সার্জারি।',
    detailEn: 'Eyelid tightening and repositioning surgery to correct outward turning lid margin.',
  },
  {
    id: 'lps-resection',
    name: 'LPS Resection',
    nameBn: 'এলপিএস রিসেকশন (চোখের পাতা তোলা)',
    price: '70,000',
    category: 'lid',
    image: IMAGES.servicePtosis,
    detailBn: 'চোখের উপরের পাতা ঝুলে পড়লে (Ptosis) লিভেটর পেশি শক্তিশালী করে পাতা স্বাভাবিক উচ্চতায় তোলার আধুনিক সার্জারি।',
    detailEn: 'Levator Palpebrae Superioris muscle tightening to elevate drooping upper eyelid.',
  },
  {
    id: 'lps-resection-nf',
    name: 'LPS Resection With Lid Construction (N.F)',
    nameBn: 'এলপিএস রিসেকশন ও লিড কনস্ট্রাকশন (N.F)',
    price: '1,00,000',
    category: 'lid',
    image: IMAGES.servicePtosis,
    detailBn: 'জটিল টোসিস ও পাতার ভাঁজ (Lid Crease) পুনর্গঠনসহ সমন্বিত কসমেটিক ও ফাংশনাল আইলিড সার্জারি।',
    detailEn: 'Combined levator resection with anatomical eyelid crease construction.',
  },
  {
    id: 'ptosis-fasalata',
    name: 'Ptosis With Fasalata',
    nameBn: 'টোসিস সার্জারি (ফাসালাটা পদ্ধতি)',
    price: '1,50,000',
    category: 'lid',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'গুরুতর জন্মগত টোসিস যেখানে পাতার পেশি অতি দুর্বল—সেখানে ফাসালাটা স্লিং পদ্ধতির মাধ্যমে স্থায়ী সমাধান।',
    detailEn: 'Frontalis sling suspension using fascia lata for severe congenital ptosis with poor levator action.',
  },
  {
    id: 'excision-minor-lid',
    name: 'Excision Minor Lid Growth',
    nameBn: 'চোখের পাতার ছোট টিউমার/গ্রোথ অপসারণ',
    price: '20,000 to 50,000',
    category: 'oculoplasty',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'চোখের পাতার ছোট সিস্ট, আঁচিল বা অতিরিক্ত গ্রোথ পাতার স্বাভাবিক কিনারা অক্ষুণ্ণ রেখে অপসারণ।',
    detailEn: 'Micro-surgical removal of benign eyelid lesions preserving lid margin aesthetics.',
  },
  {
    id: 'excision-biopsy-lid',
    name: 'Excision & Biopsy Lid',
    nameBn: 'চোখের পাতার গ্রোথ অপসারণ ও বায়োপসি',
    price: '30,000 to 60,000',
    category: 'oculoplasty',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'চোখের পাতার সন্দেহজনক গ্রোথ নিরাপদ মার্জিনসহ অপসারণ এবং হিস্টোপ্যাথলজিক্যাল বায়োপসি পরীক্ষা।',
    detailEn: 'Complete excision with safe margins followed by diagnostic histopathology biopsy.',
  },
  {
    id: 'lacrimal-abscess',
    name: 'Lacrimal Absees Drainage',
    nameBn: 'নেত্রনালীর ফোঁড়া বা পুঁজ নিষ্কাশন',
    price: '10,000 to 20,000',
    category: 'lacrimal',
    image: IMAGES.servicePediatricLacrimal,
    detailBn: 'চোখের কোণে নেত্রনালীতে তীব্র সংক্রমণ ও পুঁজ জমলে (Acute Dacryocystitis) নিরাপদ ড্রেইনেজ ও চিকিৎসা।',
    detailEn: 'Safe sterile incision and drainage of painful lacrimal sac abscess.',
  },
  {
    id: 'tarsorrhaphy-temp',
    name: 'Tarsorrhaphy Temporary',
    nameBn: 'অস্থায়ী টারসোর‍্যাফি (চোখের পাতা সংযোজন)',
    price: '15,000',
    category: 'lid',
    image: IMAGES.serviceOcularTrauma,
    detailBn: 'কর্নিয়ার ঘা বা এক্সপোজার প্রোটেকশনের জন্য সাময়িকভাবে চোখের পাতা আংশিক বন্ধ রাখার চিকিৎসা।',
    detailEn: 'Temporary partial closure of eyelids to protect and heal exposed corneas.',
  },
  {
    id: 'tarsorrhaphy-perm',
    name: 'Tarsorrhaphy Permanent',
    nameBn: 'স্থায়ী টারসোর‍্যাফি (চোখের পাতা সংযোজন)',
    price: '30,000',
    category: 'lid',
    image: IMAGES.serviceOcularTrauma,
    detailBn: 'দীর্ঘমেয়াদী ফেসিয়াল নার্ভ পালসি বা কর্নিয়া সুরক্ষায় স্থায়ী টারসোর‍্যাফি সার্জারি।',
    detailEn: 'Durable eyelid closure procedure for chronic corneal exposure protection.',
  },
  {
    id: 'limbal-dermoid',
    name: 'Limbal Dermoid',
    nameBn: 'লিম্বাল ডার্ময়েড অপসারণ',
    price: '50,000',
    category: 'anterior',
    image: IMAGES.servicePterygium,
    detailBn: 'চোখের কালো ও সাদা অংশের সংযোগস্থলের জন্মগত টিউমার (Limbal Dermoid) মাইক্রোস্কোপের সাহায্যে নিখুঁত অপসারণ।',
    detailEn: 'Microsurgical excision of congenital limbal dermoid preserving corneal integrity.',
  },
  {
    id: 'dcr-intubation',
    name: 'DCR With Intubation',
    nameBn: 'ডিসিআর (ইন্টিউবেশনসহ নেত্রনালী অপারেশন)',
    price: '30,000 to 50,000',
    category: 'lacrimal',
    image: IMAGES.servicePediatricLacrimal,
    detailBn: 'বন্ধ নেত্রনালীর জন্য সিলিকন টিউব ইন্টিউবেশনসহ আধুনিক DCR অপারেশন—পানি পড়া স্থায়ীভাবে বন্ধ করে।',
    detailEn: 'Dacryocystorhinostomy with silicone tube intubation for permanent relief from blocked tear ducts.',
  },
  {
    id: 'dct',
    name: 'DCT',
    nameBn: 'ডিসিটি (Dacryocystectomy)',
    price: '15,000 to 35,000',
    category: 'lacrimal',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'দীর্ঘদিনের সংক্রমিত নেত্রনালীর থলি সম্পূর্ণ অপসারণের মাধ্যমে পুঁজ ও সংক্রমণ স্থায়ীভাবে দূর করা।',
    detailEn: 'Complete excision of chronically infected lacrimal sac in selected patients.',
  },
  {
    id: 're-dcr',
    name: 'Re-DCR',
    nameBn: 'রি-ডিসিআর (পুনরায় নেত্রনালী অপারেশন)',
    price: '30,000 to 60,000',
    category: 'lacrimal',
    image: IMAGES.servicePediatricLacrimal,
    detailBn: 'পূর্বের অপারেশনের পর পুনরায় নেত্রনালী বন্ধ হয়ে গেলে বিশেষ রিভিশন DCR সার্জারি।',
    detailEn: 'Revision dacryocystorhinostomy for previously failed or scarred nasolacrimal passages.',
  },
  {
    id: 'probing',
    name: 'Probing',
    nameBn: 'প্রোবিং (শিশুদের নেত্রনালী পরিষ্কার)',
    price: '15,000',
    category: 'lacrimal',
    image: IMAGES.servicePediatricLacrimal,
    detailBn: 'নবজাতক ও ছোট শিশুদের জন্মগত নেত্রনালীর পর্দা খুলে দেওয়ার নিরাপদ ও দ্রুত প্রোবিং পদ্ধতি।',
    detailEn: 'Gentle probing to clear congenital nasolacrimal duct obstruction in infants and toddlers.',
  },
  {
    id: 'punctoplasty',
    name: 'Punctoplastly - One Eye',
    nameBn: 'পাংটোপ্লাস্টি (এক চোখ)',
    price: '20,000 to 40,000',
    category: 'lacrimal',
    image: IMAGES.servicePediatricLacrimal,
    detailBn: 'চোখের কোণের পানি নির্গমনের মুখ (Punctum) সরু হয়ে গেলে সূক্ষ্মভাবে প্রশস্ত করার সার্জারি।',
    detailEn: 'Microsurgical widening of stenosed lacrimal punctum to restore tear drainage.',
  },
  {
    id: 'evisceration',
    name: 'Evisceration',
    nameBn: 'ইভিসেরেশন সার্জারি',
    price: '30,000 to 60,000',
    category: 'oculoplasty',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'অন্ধ ও তীব্র ব্যথাযুক্ত অকার্যকর চোখের আধুনিক ইমপ্লান্টসহ কসমেটিক পুনর্বাসন সার্জারি।',
    detailEn: 'Surgical removal of intraocular contents with orbital implant placement for painful blind eyes.',
  },
  {
    id: 'enucleation',
    name: 'Enucleation',
    nameBn: 'এনুক্লিয়েশন সার্জারি',
    price: '30,000 to 60,000',
    category: 'oculoplasty',
    image: IMAGES.serviceOculoplasty,
    detailBn: 'চিকিৎসাগত প্রয়োজনে সম্পূর্ণ আইবল অপসারণ এবং প্রস্থেটিক চোখের জন্য অর্বিটাল ইমপ্লান্ট স্থাপন।',
    detailEn: 'Complete globe removal with orbital implant preparation for custom ocular prosthesis.',
  },
  {
    id: 'pterygium-mmc',
    name: 'Pterygium with mmc',
    nameBn: 'টেরিজিয়াম অপারেশন (MMC ও গ্রাফটিংসহ)',
    price: '30,000 to 50,000',
    category: 'anterior',
    image: IMAGES.servicePterygium,
    detailBn: 'চোখের কর্নিয়ার মাংস বৃদ্ধি (Pterygium) অপসারণ করে কনজাংটিভাল গ্রাফটিং ও MMC ব্যবহারের মাধ্যমে পুনঃসংক্রমণ রোধ।',
    detailEn: 'Pterygium excision with Mitomycin-C and conjunctival autograft to minimize recurrence.',
  },
  {
    id: 'squint-surgery',
    name: 'Squint Surgery',
    nameBn: 'বাঁকা চোখ (Squint) সোজা করার অপারেশন',
    price: '50,000 to 80,000',
    category: 'anterior',
    image: IMAGES.serviceSquint,
    detailBn: 'শিশু ও বড়দের বাঁকা বা ট্যারা চোখ সোজা করার আধুনিক এক্সট্রাঅকুলার মাসল অ্যালাইনমেন্ট সার্জারি।',
    detailEn: 'Strabismus muscle balancing surgery aligning inward or outward eye deviation.',
  },
  {
    id: 'xenthelasma',
    name: 'Xenthelasma (O/E)',
    nameBn: 'জ্যানথেলাসমা অপসারণ (এক চোখ)',
    price: '30,000 to 50,000',
    category: 'oculoplasty',
    image: IMAGES.servicePtosis,
    detailBn: 'চোখের পাতার কোণে জমে থাকা হলুদাভ চর্বির দাগ (Xanthelasma) কসমেটিক পদ্ধতিতে নিখুঁত অপসারণ।',
    detailEn: 'Cosmetic surgical excision of yellowish cholesterol deposits on the eyelids.',
  },
  {
    id: 'spt-be',
    name: 'SPT (B/E)',
    nameBn: 'এসপিটি (উভয় চোখ)',
    price: '2,000',
    category: 'lacrimal',
    image: IMAGES.serviceGlaucomaRetina,
    detailBn: 'উভয় চোখের নেত্রনালী খোলা আছে কিনা তা নির্ণয়ের জন্য Sac Patency Test (SPT) পরীক্ষা।',
    detailEn: 'Bilateral Sac Patency Test (syringing) evaluating tear-duct blockage.',
  },
];

export const WRITTEN_TESTIMONIALS = [
  {
    id: 't1',
    nameBn: 'হাজী রফিকুল ইসলাম (৬২ বছর)',
    nameEn: 'Haji Rafiqul Islam (62 yrs)',
    locationBn: 'খুলনা সদর',
    locationEn: 'Khulna Sadar',
    procedureBn: 'সেলাইবিহীন ফ্যাকো ছানি অপারেশন',
    procedureEn: 'Stitchless Phaco Cataract Surgery',
    quoteBn:
      'ডাঃ বৃষ্টির আন্তরিকতায় আমার ডান চোখের ফ্যাকো অপারেশন সম্পন্ন হয়। কোনো প্রকার ইনজেকশন বা ব্যথা ছাড়াই মাত্র ১০ মিনিটে অপারেশন শেষ হয় এবং পরদিনই ঝকঝকে দৃষ্টি ফিরে পেয়েছি।',
    quoteEn:
      'With Dr. Bristy’s gentle care, my right eye phaco surgery was completed in 10 minutes without any injection or pain, and I regained crystal-clear vision the very next morning.',
  },
  {
    id: 't2',
    nameBn: 'তাসনিয়া বেগমের মা (রোগী: ০৭ বছর)',
    nameEn: 'Mother of Tasnia Begum (Patient: 07 yrs)',
    locationBn: 'শিববাড়ী, খুলনা',
    locationEn: 'Shib Bari, Khulna',
    procedureBn: 'শিশুর জন্মগত পানি পড়ার প্রোবিং চিকিৎসা',
    procedureEn: 'Pediatric Probing for Congenital Watering',
    quoteBn:
      'আমার ৭ বছরের সন্তানের চোখ দিয়ে জন্মগত পানি ও পিচুটি পড়ত। ম্যাডাম অত্যন্ত স্নেহের সাথে প্রোবিং ও চিকিৎসা করেছেন। এখন আমার বাচ্চা সম্পূর্ণ সুস্থ।',
    quoteEn:
      'My 7-year-old suffered from constant tearing since birth. Madam performed probing with immense warmth and care. My child is now completely cured.',
  },
  {
    id: 't3',
    nameBn: 'মোঃ আকরাম হোসেন (৪৫ বছর)',
    nameEn: 'Md. Akram Hossain (45 yrs)',
    locationBn: 'সাতক্ষীরা',
    locationEn: 'Satkhira',
    procedureBn: 'আধুনিক গ্রাফটিং ও MMC টেরিজিয়াম অপারেশন',
    procedureEn: 'Pterygium Autograft with MMC',
    quoteBn:
      'চোখের মনি ঢেকে যাচ্ছিল মাংস বেড়ে। আধুনিক গ্রাফটিং পদ্ধতিতে অপারেশন করার পর চোখের লালচে ভাব বা অস্বস্তি আর নেই। চেম্বারের সেবায় আমি অত্যন্ত সন্তুষ্ট।',
    quoteEn:
      'The fleshy growth was covering my cornea. After the modern grafting surgery, all redness and irritation are gone. I am deeply satisfied with the chamber care.',
  },
];

export const BLOG_POSTS = [
  {
    id: 'screen-strain',
    titleBn: 'মোবাইল বেশি দেখলে চোখে কী সমস্যা হয়?',
    titleEn: 'How Excessive Mobile Screen Time Affects Your Eyes',
    excerptBn:
      'একটানা স্মার্টফোন বা কম্পিউটার স্ক্রিনের দিকে তাকিয়ে থাকলে চোখের পলক পড়া কমে যায়, ফলে ড্রাই আই (Dry Eye), মাথাব্যথা ও ঝাপসা দৃষ্টির সমস্যা দেখা দেয়।',
    excerptEn:
      'Prolonged screen exposure reduces blink rate, causing Digital Eye Strain, dry eye syndrome, headaches, and transient focusing fatigue.',
    tipsBn: [
      '২০-২০-২০ রুল মেনে চলুন: প্রতি ২০ মিনিট পর ২০ ফুট দূরের কোনো বস্তুর দিকে অন্তত ২০ সেকেন্ড তাকিয়ে থাকুন।',
      'স্ক্রিনের ব্রাইটনেস ঘরের আলোর সাথে সামঞ্জস্য রেখে কমিয়ে ব্যবহার করুন এবং অন্ধকারে ফোন দেখা পরিহার করুন।',
      'চোখে অতিরিক্ত শুষ্কতা বা জ্বালাপোড়া অনুভব করলে চিকিৎসকের পরামর্শে প্রিজারভেটিভ-মুক্ত লুব্রিকেটিং ড্রপ ব্যবহার করুন।',
    ],
    tipsEn: [
      'Follow the 20-20-20 rule: every 20 minutes, look at an object 20 feet away for 20 seconds.',
      'Match screen brightness to ambient room lighting and avoid prolonged phone use in complete darkness.',
      'Consult an ophthalmologist for preservative-free lubricating drops if burning or dryness persists.',
    ],
  },
  {
    id: 'watering-eye',
    titleBn: 'চোখ দিয়ে শুধু পানি পড়ছে, ব্যথা বা লালচে ভাব নেই—এটা কি সমস্যা?',
    titleEn: 'Watering Eyes Without Pain or Redness — Should You Worry?',
    excerptBn:
      'ব্যথা বা লালচে ভাব না থাকলেও অনবরত চোখ দিয়ে পানি পড়া নেত্রনালী (Lacrimal Duct) সরু হয়ে যাওয়া, অ্যালার্জি বা ড্রাই আইয়ের প্রাথমিক লক্ষণ হতে পারে।',
    excerptEn:
      'Persistent tearing without pain or redness can signal nasolacrimal duct narrowing, chronic ocular allergy, or reflex tearing from dry eye.',
    tipsBn: [
      'চোখে বারবার হাত দেওয়া ও ঘষাঘষি সম্পূর্ণ বন্ধ করুন—এতে কর্নিয়ার ক্ষতি ও ইনফেকশনের ঝুঁকি বাড়ে।',
      'বাইরে ধুলাবালি ও রোদে গেলে UV-সুরক্ষিত সানগ্লাস ব্যবহার করুন।',
      'শিশুদের ক্ষেত্রে জন্মগত পানি পড়লে দ্রুত প্রোবিং পরীক্ষা এবং বয়স্কদের ক্ষেত্রে নেত্রনালী (SPT / DCR) পরীক্ষা করিয়ে নিন।',
    ],
    tipsEn: [
      'Stop rubbing your eyes frequently, as mechanical friction harms the cornea and invites infection.',
      'Wear UV-protective sunglasses outdoors to shield eyes from wind, dust, and glare.',
      'Have infants checked early for congenital duct block and adults evaluated via SPT/syringing.',
    ],
  },
  {
    id: 'annual-checkup',
    titleBn: 'শেষ কবে আপনার চোখ পরীক্ষা করিয়েছেন?',
    titleEn: 'When Was Your Last Comprehensive Eye Examination?',
    excerptBn:
      'গ্লুকোমা ও ডায়াবেটিক রেটিনোপ্যাথির মতো নীরব রোগগুলো প্রাথমিক অবস্থায় কোনো ব্যথা বা লক্ষণ ছাড়াই দৃষ্টিশক্তির স্থায়ী ক্ষতি করতে পারে।',
    excerptEn:
      'Silent conditions like Glaucoma and Diabetic Retinopathy often progress without early pain or obvious symptoms until vision is threatened.',
    tipsBn: [
      'ডায়াবেটিস রোগীদের দৃষ্টি স্বাভাবিক থাকলেও বছরে অন্তত একবার চোখের রেটিনা পরীক্ষা করানো বাধ্যতামূলক।',
      '৪০ বছর ঊর্ধ্ব প্রত্যেকের বছরে একবার চোখের প্রেসার (IOP) ও ছানি চেকআপ করানো উচিত।',
      'হঠাৎ আলো ঝলকানি, কালো বিন্দু ভাসা বা দৃষ্টি কমে গেলে এক মুহূর্ত দেরি না করে চক্ষু বিশেষজ্ঞ দেখান।',
    ],
    tipsEn: [
      'Diabetic patients must undergo a dilated fundus examination at least once every year, even with 20/20 vision.',
      'Everyone aged 40+ should have an annual eye pressure (IOP) and cataract screening.',
      'Seek prompt specialist care if you notice sudden floaters, flashes of light, or sudden visual blurring.',
    ],
  },
];

export const FAQS = [
  {
    qBn: 'ডাঃ ফজিলাতুন নেছা (বৃষ্টি)-এর সিরিয়াল বা অ্যাপয়েন্টমেন্ট কীভাবে নেওয়া যায়?',
    qEn: 'How can I book a serial or appointment with Dr. Fazilatun Nesa (Bristy)?',
    aBn: 'এই ওয়েবসাইটের "হোয়াটসঅ্যাপ সিরিয়াল বুকিং" ফর্ম পূরণ করে সাবমিট করলে সকল তথ্যসহ সরাসরি হোয়াটসঅ্যাপে সিরিয়াল চলে যাবে। এছাড়া সরাসরি 01345-786806 নম্বরে কল করেও সিরিয়াল নিশ্চিত করা যায়।',
    aEn: 'Fill out the WhatsApp Serial Booking form on this website and all your details will open directly in WhatsApp for instant confirmation, or call 01345-786806.',
  },
  {
    qBn: 'ডাক্তারের চেম্বার কোথায় এবং রোগী দেখার সময়সূচি কী?',
    qEn: 'Where is the chamber located and what are the consultation hours?',
    aBn: 'চেম্বার: বাংলাদেশ আই হসপিটাল খুলনা লিঃ, ৯ বি, মজিদ সরণি, শিববাড়ী, খুলনা - ৯১০০। রোগী দেখার সময়: প্রতি শনিবার, সোমবার ও বুধবার দুপুর ৩:০০টা থেকে রাত ৮:০০টা পর্যন্ত (অন্যান্য দিন বন্ধ)।',
    aEn: 'Chamber: Bangladesh Eye Hospital Khulna Ltd., 9B, Majid Sarani, Shib Bari, Khulna - 9100. Visiting Hours: Every Saturday, Monday & Wednesday from 3:00 PM to 8:00 PM.',
  },
  {
    qBn: 'ফ্যাকো ছানি অপারেশন কি ব্যথাদায়ক এবং এখানে কি নিয়মিত ক্যাটারাক্ট সার্জারি হয়?',
    qEn: 'Is Phaco cataract surgery painful, and is cataract surgery performed regularly here?',
    aBn: 'না, আধুনিক সেলাইবিহীন ও ব্যথাহীন ফ্যাকো সার্জারি সম্পূর্ণ ইনজেকশনবিহীন ও আরামদায়ক পদ্ধতি। আমাদের এখানে নিয়মিত ক্যাটারাক্ট (ছানি) সার্জারি করা হয়—উপযুক্ত লেন্স ও প্যাকেজ নির্ধারণের জন্য সরাসরি 01345-786806 নম্বরে যোগাযোগ করুন।',
    aEn: 'No — modern phacoemulsification is topical-drop based, injection-free, and sutureless. Routine cataract surgery is performed regularly here; contact 01345-786806 directly for lens options and scheduling.',
  },
  {
    qBn: 'ডাক্তার দেখানোর দিন রোগীকে সাথে কী কী আনতে হবে?',
    qEn: 'What should a patient bring on the day of the appointment?',
    aBn: 'বর্তমানে ব্যবহৃত চশমা, পূর্বের সকল প্রেসক্রিপশন ও চলমান চোখের ড্রপ, ডায়াবেটিস বা উচ্চ রক্তচাপের সর্বশেষ রিপোর্ট এবং নির্ধারিত সিরিয়ালের অন্তত ১৫ মিনিট পূর্বে উপস্থিতি নিশ্চিত করুন।',
    aEn: 'Please bring your current glasses, previous prescriptions and eye drops, recent blood sugar/blood pressure records, and arrive 15 minutes before your slot.',
  },
  {
    qBn: 'বড়দের চোখের ট্যারা বা বাঁকা ভাব (Squint) কি অপারেশনের মাধ্যমে ঠিক করা সম্ভব?',
    qEn: 'Can adult strabismus (squint / crossed eyes) be corrected with surgery?',
    aBn: 'হ্যাঁ, অবশ্যই। শিশুদের পাশাপাশি প্রাপ্তবয়স্কদের যেকোনো বয়সে চোখের মাংসপেশির নিখুঁত অ্যালাইনমেন্ট সার্জারির মাধ্যমে বাঁকা চোখ সম্পূর্ণ সোজা করা সম্ভব।',
    aEn: 'Yes, absolutely. Adult strabismus surgery safely realigns eye muscles at any age, restoring symmetry and comfort.',
  },
];
