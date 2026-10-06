/**
 * ─────────────────────────────────────────────────────────────
 *  Proposal defense website content
 *  Source: Hamidreza Farhadipour's proposal + professor's sample file structure
 * ─────────────────────────────────────────────────────────────
 */

export const faDigits = (input: string | number): string =>
  String(input).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const meta = {
  besm: "بسم الله الرحمن الرحیم",
  university: "دانشگاه علامه طباطبائی",
  faculty: "دانشکده آمار، ریاضی و رایانه",
  defenseKind: "جلسه دفاع از پروپوزال پایان‌نامه کارشناسی ارشد",
  field: "علم داده‌ها",
  degree: "کارشناسی ارشد",
  researchType: "نظری – کاربردی",
  titleFa: "ارزیابی و بهبود قابلیت اطمینان در پیش‌بینی ترافیک با استفاده از تلفیق شبکه‌های عصبی گرافی فضایی-زمانی با رویکرد بیزی",
  titleEn:
    "Enhancing Reliability in Traffic Forecasting by Integrating Spatio-Temporal Graph Neural Networks with Bayesian Approaches",
  keywordsFa: [
    "پیش‌بینی جریان ترافیک",
    "رویکرد بیزی",
    "شبکه‌های عصبی گرافی",
    "مدل‌سازی فضایی-زمانی",
    "کمّی‌سازی عدم قطعیت",
  ],
  keywordsEn: [
    "Bayesian Approach",
    "Graph Neural Networks (GNNs)",
    "Spatio-Temporal Modeling",
    "Traffic Forecasting",
    "Uncertainty Quantification",
  ],
  student: {
    name: "حمیدرضا فرهادی‌پور",
    id: "۴۰۳۱۳۱۴۲۰۱۱",
    entryYear: "۱۴۰۳",
    role: "نگارنده",
  },
  people: [
    {
      role: "استاد راهنما",
      name: "جناب آقای دکتر وحید رضایی تبار",
      rank: "دانشیار، گروه آمار",
      detail: "یادگیری ماشین، مدل‌های گرافیکی، بیوانفورماتیک",
    },
    {
      role: "استاد مشاور",
      name: "جناب آقای دکتر رضا پورطاهری",
      rank: "استاد تمام، گروه آمار",
      detail: "احتمال، فرایندهای تصادفی، فرایندهای نقطه‌ای",
    },
    {
      role: "استاد داور",
      name: "جناب آقای دکتر محمدرضا صالحی‌راد",
      rank: "دانشیار، گروه آمار",
      detail: "فرایندهای تصادفی، مدل‌های صف‌بندی، احتمال، سری‌های زمانی",
    },
    {
      role: "نگارنده",
      name: "حمیدرضا فرهادی‌پور",
      rank: "کارشناسی ارشد علم داده‌ها",
      detail: "سال ورود ۱۴۰۳ — شماره دانشجویی ۴۰۳۱۳۱۴۲۰۱۱",
    },
  ],
  defense: {
    jalali: "۳۰ بهمن ۱۴۰۵",
    gregorian: "۱۹ فوریه ۲۰۲۷",
    hour: "ساعت ۹ صبح",
    location: "دانشکده آمار، ریاضی و رایانه — دانشگاه علامه طباطبائی",
  },
};

/* ───────────────────────────── Introduction ───────────────────────────── */

export const intro = {
  id: "intro",
  no: "۰۱",
  title: "مقدمه",
  en: "Introduction",
  icon: "BookOpen",
  lead: "پیش‌بینی دقیق و قابل‌اتکای جریان ترافیک، به‌ویژه در بازه‌های زمانی کوتاه‌مدت و میان‌مدت، یکی از الزامات اساسی در توسعه سیستم‌های حمل‌ونقل هوشمند و مدیریت فعالانه شبکه راه‌هاست.",
  importance: {
    title: "چرا پیش‌بینی ترافیک اهمیت حیاتی دارد؟",
    text: "مدیریت ترافیک چالشی پایدار کلان‌شهرهاست؛ گره‌های ناخواسته کیفیت زندگی را کاهش، هزینه‌های شهری را افزایش و خدمات اضطراری را مختل می‌کنند.",
    impacts: [
      { label: "اتلاف زمان و افزایش مصرف سوخت", icon: "Fuel" },
      { label: "تشدید آلودگی‌های زیست‌محیطی", icon: "Wind" },
      { label: "کاهش بهره‌وری اقتصادی", icon: "TrendingDown" },
      { label: "اختلال در خدمات اضطراری", icon: "Siren" },
    ],
  },
  nature: {
    title: "ماهیت داده‌های ترافیک",
    text: "ترافیک در هر نقطه، حاصل برهم‌کنش غیرخطی وابستگی‌های مکانی، زمانی و عوامل تصادفی خارجی است — تحلیل آن با مدل‌های خطی کلاسیک امکان‌پذیر نیست.",
    factors: [
      {
        title: "وابستگی مکانی",
        text: "ساختار شبکه راه‌ها — ترافیک یک بزرگراه بر بزرگراه‌های مجاور اثر می‌گذارد",
        icon: "Network",
      },
      {
        title: "وابستگی زمانی",
        text: "الگوهای روزانه و هفتگی جریان ترافیک",
        icon: "Clock",
      },
      {
        title: "عوامل تصادفی خارجی",
        text: "آب‌وهوا، تصادفات و رخدادهای پیش‌بینی‌نشده",
        icon: "CloudRainWind",
      },
    ],
  },
  concepts: {
    title: "مفاهیم کلیدی پژوهش",
    items: [
      {
        term: "پیش‌بینی جریان ترافیک",
        en: "Traffic Flow Forecasting",
        def: "برآورد وضعیت آینده ترافیک (سرعت/حجم/چگالی) بر اساس داده‌های تاریخی؛ در این پژوهش: رگرسیون فضایی-زمانی روی گراف با ارائه بازه اطمینانی معتبر.",
      },
      {
        term: "یادگیری عمیق",
        en: "Deep Learning",
        def: "شبکه‌های عصبی چندلایه که بازنمایی‌های سطح بالا را مستقیماً از داده خام سنسورها می‌آموزند؛ معمار اصلی استخراج الگوهای غیرخطی پیچیده.",
      },
      {
        term: "شبکه‌های عصبی گرافی فضایی-زمانی",
        en: "STGNN",
        def: "مدل‌های عمیقِ داده‌های گرافی-زمانی: پیچش گرافی برای بُعد مکانی + TCN/GRU برای بُعد زمانی — استخراج انتها-به-انتهای دینامیک شبکه راه‌ها.",
      },
      {
        term: "رویکرد بیزی / استنباط بیزی",
        en: "Bayesian Inference",
        def: "پارامترهای مدل (وزن‌های شبکه) به‌جای مقدار قطعی، متغیر تصادفی با توزیع احتمال‌اند؛ استراتژی اصلی مدل‌سازی عدم قطعیت و احتمالاتی‌کردن خروجی‌ها.",
      },
      {
        term: "کمّی‌سازی عدم قطعیت",
        en: "Uncertainty Quantification",
        def: "اندازه‌گیری کمّی «اطمینان» مدل نسبت به پیش‌بینی‌ها؛ دو بخش: عدم قطعیت ذاتی داده (نویز سنسور) و شناختی مدل (کمبود دانش)."
      },
      {
        term: "توابع زیان احتمالاتی",
        en: "Probabilistic Loss Functions",
        def: "توابعی که مدل را به درک توزیع احتمال داده‌ها تشویق می‌کنند (نه صرفاً کاهش خطای میانگین)؛ ضروری برای آموزش مدل‌های بیزی و بازه‌های کالیبره‌شده.",
      },
    ],
  },
};

/* ─────────────────────────── Problem Statement ─────────────────────────── */

export const problem = {
  id: "problem",
  no: "۰۲",
  title: "بیان مسئله",
  en: "Problem Statement",
  icon: "CircleAlert",
  lead: "با وجود پیشرفت‌های قابل‌توجه در روش‌های داده‌کاوی و یادگیری ماشین، پیش‌بینی جریان ترافیک همچنان با محدودیت‌ها و چالش‌های جدی مواجه است. ریشه اصلی این چالش‌ها را می‌توان در ماهیت پیچیده، پرنویز و غیرخطی داده‌های ترافیکی جست‌وجو کرد.",
  challenges: [
    {
      title: "پیچیدگی فضایی-زمانی",
      text: "وضعیت ترافیک حاصل تعاملات همزمان وابستگی‌های مکانی و زمانی است که به‌صورت غیرخطی عمل می‌کنند.",
      icon: "Waypoints",
    },
    {
      title: "نویز ذاتی داده‌ها",
      text: "داده‌های جمع‌آوری‌شده از سنسورها با نویزهای ذاتی، خطاهای اندازه‌گیری و داده‌های پرت همراهند.",
      icon: "AudioWaveform",
    },
    {
      title: "غیرخطی بودن پدیده",
      text: "تحلیل برهم‌کنش‌های ترافیکی با روش‌های آماری کلاسیک یا مدل‌های خطی ساده امکان‌پذیر نیست.",
      icon: "Spline",
    },
  ],
  evolutionTitle: "سیر تکامل مدل‌های پیش‌بینی ترافیک",
  evolutionLead:
    "مسیر تکاملی از آمار خطی تک‌متغیره تا مدل‌های عمیق مبتنی بر گراف — و آنچه هنوز حل‌نشده مانده است:",
  generations: [
    {
      gen: "نسل اول",
      title: "مدل‌های آماری و یادگیری ماشین کلاسیک",
      models: [
        {
          name: "مدل‌های آماری سری زمانی",
          text: "ARIMA و فیلتر کالمن الگوهای تاریخی را مدل‌سازی کردند؛ مبانی مستحکم اما عملکرد ضعیف در روابط غیرخطی و تغییرات ناگهانی.",
          cite: "(ویلیامز و همکاران، ۲۰۰۳)",
        },
        {
          name: "مدل‌های یادگیری ماشین سنتی",
          text: "SVR و Random Forest روابط غیرخطی را بهبود بخشیدند؛ اما هر سنسور مستقل فرض شد و توپولوژی شبکه راه‌ها نادیده گرفته شد.",
          cite: "(وو و همکاران، ۲۰۰۴)",
        },
      ],
    },
    {
      gen: "نسل دوم",
      title: "یادگیری عمیق فضایی-زمانی",
      models: [
        {
          name: "ترکیب CNN و RNN",
          text: "شبکه معابر به‌صورت تصویر با CNN پردازش شد — پیشرفت بزرگ، اما ناسازگار با ساختار غیراقلیدسی و نامنظم جاده‌های واقعی.",
          cite: "(ژانگ و همکاران، ۲۰۱۷)",
        },
      ],
    },
    {
      gen: "نسل سوم",
      title: "شبکه‌های عصبی گرافی فضایی-زمانی (STGNN)",
      models: [
        {
          name: "STGCN و DCRNN",
          text: "مدل‌سازی شبکه راه‌ها به‌صورت گراف؛ استخراج وابستگی‌های مکانی پیچیده با دقت بسیار بالا — دقیق‌ترین ابزار پیش‌بینی نقطه‌ای فعلی.",
          cite: "(وی و همکاران، ۲۰۱۸؛ لی و همکاران، ۲۰۱۸)",
        },
      ],
    },
    {
      gen: "نسل چهارم",
      title: "رویکرد بیزی در یادگیری عمیق",
      models: [
        {
          name: "MC Dropout و Variational Inference",
          text: "MC Dropout و استنباط تغییراتی، خروجی احتمالاتی برای شبکه‌های عمیق ممکن کردند؛ مقاوم‌تر در برابر داده‌های نوین و شرایط پویا.",
          cite: "(ژائو و همکاران، ۲۰۱۹؛ گال و قهرمانی، ۲۰۱۶)",
        },
      ],
    },
  ],
  coreProblem: {
    title: "کاستی بنیادین مدل‌های موجود",
    text: "جدی‌ترین نقص مدل‌های فعلی، ماهیت «قطعی» خروجی و ناتوانی در سنجش مخاطره است؛ STGNNها با دقت بالا، تنها یک عدد نقطه‌ای ارائه می‌دهند و داده ورودی را کامل و بدون نویز فرض می‌کنند.",
    items: [
      {
        title: "اطمینان کاذب",
        text: "حتی با داده‌های مخدوش یا الگوهای غیرعادی، مدل با اطمینان کاذب پیش‌بینی اشتباه می‌دهد — چالشی جدی در کاربردهای حساس به ایمنی.",
        cite: "(ژو و همکاران، ۲۰۱۷)",
      },
      {
        title: "نویز و داده‌های پرت",
        text: "داده‌های سنسوری (مانند PeMS) با نویز ذاتی و داده پرت همراهند؛ عدم قطعیت‌هایی که مدل‌های قطعی آن‌ها را مدل نمی‌کنند.",
      },
      {
        title: "پیامد عملی",
        text: "تصمیم‌گیری نادرست در کنترل چراغ‌های راهنمایی و مسیریابی هوشمند.",
      },
    ],
  },
  gap: {
    title: "خلأ پژوهشی",
    text: "تلفیق روش‌های بیزی با شبکه‌های عمیق فضایی-زمانیِ از پیش پیچیده، همچنان محدود است؛ خلأ اصلی: ایجاد تعادل میان «دقت پیش‌بینی» و «قابلیت اطمینان مدل».",
    left: {
      title: "مدل‌های ترافیک فعلی",
      points: ["دقت نقطه‌ای بسیار بالا", "ماهیت قطعی", "نادیده گرفتن عدم قطعیت"],
    },
    right: {
      title: "مدل‌های بیزی موجود",
      points: ["برآورد عدم قطعیت", "BNNهای ساده", "ناتوان در مدل‌سازی پیچیدگی فضایی-زمانی گراف‌های بزرگ"],
    },
    middle: "چارچوب یکپارچه STGNN + بیزی",
  },
  focus: {
    title: "مسئله محوری این پژوهش",
    text: "طراحی یک چارچوب یادگیری عمیق یکپارچه که قدرت STGNN را با رویکرد احتمالاتی بیزی ترکیب کند؛ چارچوبی که ضمن حفظ دقت، عدم قطعیت داده و مدل را کمّی‌سازی کرده و از محدودیت‌های خروجی «قطعی» عبور کند.",
  },
};

/* ─────────────────────────── Research Objectives ─────────────────────────── */

export const goals = {
  id: "goals",
  no: "۰۳",
  title: "هدف پژوهش",
  en: "Research Objectives",
  icon: "Target",
  main: {
    label: "هدف اصلی",
    text: "طراحی، تبیین و پیاده‌سازی یک چارچوب یکپارچه یادگیری عمیق مبتنی بر تلفیق شبکه‌های عصبی گرافی فضایی-زمانی و رویکرد استنباط بیزی، به‌منظور پیش‌بینی جریان ترافیک با کمّی‌سازی عدم قطعیت و ارتقای قابلیت اطمینان سیستم‌های تصمیم‌گیری.",
  },
  sub: [
    {
      title: "مدل‌سازی وابستگی‌های پیچیده",
      text: "استخراج بازنمایی‌های سطح بالا با GNN برای بُعد مکانی و TCN/GRU برای بُعد زمانی.",
    },
    {
      title: "پیاده‌سازی کمّی‌سازی عدم قطعیت",
      text: "استنباط بیزی تقریبی و توابع زیان احتمالاتی برای برآورد عدم قطعیت داده و مدل.",
    },
    {
      title: "سنجش اعتبار و مقایسه",
      text: "ارزیابی عملکرد در مقایسه با روش‌های پیشرفته بر اساس معیارهای دقت و قابلیت اطمینان.",
    },
    {
      title: "بررسی پایداری مدل",
      text: "تحلیل مقاومت مدل در مواجهه با داده‌های نوین، ناقص و شرایط غیرمنتظره.",
    },
    {
      title: "تحلیل اثرات مؤلفه‌ها",
      text: "بررسی سهم هر ماژول (گرافی، زمانی، بیزی) در بهبود عملکرد نهایی.",
    },
  ],
  questions: {
    main: "آیا تلفیق شبکه‌های عصبی گرافی فضایی-زمانی با رویکرد استنباط بیزی در یک معماری یکپارچه، به بهبود معنادار قابلیت اطمینان و دقت پیش‌بینی جریان ترافیک نسبت به مدل‌های قطعی موجود می‌انجامد؟",
    sub: [
      "آیا معماری پیشنهادی قادر است ضمن حفظ دقت پیش‌بینی (کاهش خطا)، برآورد معتبری از میزان عدم قطعیت پیش‌بینی‌ها در قالب بازه‌های اطمینانی ارائه دهد؟",
      "استفاده از توابع زیان احتمالاتی چه تأثیری بر فرایند آموزش مدل و همگرایی آن در مقایسه با توابع زیان کلاسیک دارد؟",
      "آیا رویکرد بیزی اتخاذشده، توانایی مدل را در مدیریت داده‌های پرت و نویزهای ذاتی سنسورهای ترافیک بهبود می‌بخشد؟",
      "کدام‌یک از مؤلفه‌های مدل (ساختار گراف یادگیری‌شده یا ماژول عدم قطعیت) بیشترین تأثیر را در ارتقای کارایی سیستم در سناریوهای ترافیک پیچیده ایفا می‌کند؟",
    ],
  },
  architecture: {
    title: "معماری پیشنهادی پژوهش",
    lead: "معماری عصبی عمیق یکپارچه با پردازش همزمان ویژگی‌های مکانی-زمانی و رویکرد احتمالاتی بیزی — چهار مرحله انتها-به-انتها:",
    wipNote: "فرمول‌بندی پایه معماری در بخش «فرمول‌بندی ریاضی» ارائه شده است؛ جزئیات تکمیلی طی نگارش فصل سوم تکمیل می‌شود.",
    steps: [
      {
        title: "داده و پیش‌پردازش",
        en: "PeMS Dataset",
        text: "مجموعه‌داده استاندارد PeMS: سری زمانی سرعت/حجم سنسورها + ماتریس مجاورت گراف شبکه راه‌ها؛ ترمیم داده مفقود و نرمال‌سازی Z-Score.",
        detail: "برآورد وضعیت ترافیک در T گام آینده بر اساس T′ گام گذشته — رگرسیون فضایی-زمانی روی گراف.",
        icon: "Database",
      },
      {
        title: "ماژول فضایی-زمانی",
        en: "Spatio-Temporal Module",
        text: "بُعد مکانی: گراف (گره=سنسور، یال=ارتباط جاده‌ای) با GNN برای وابستگی‌های غیراقلیدسی؛ بُعد زمانی: TCN/GRU برای الگوهای کوتاه/بلندمدت.",
        detail: "ویژگی‌های گراف و سری زمانی در هم آمیخته می‌شوند تا بازنمایی جامع وضعیت ترافیک ایجاد شود.",
        icon: "Waypoints",
      },
      {
        title: "لایه استنباطی بیزی",
        en: "Bayesian Inference Layer",
        text: "استنباط بیزی تقریبی (MC Dropout و Variational Inference) در لایه‌های مدل؛ وزن‌ها به‌صورت توزیع احتمالی مدل می‌شوند.",
        detail: "ماهیت تنظیم‌کنندگی ذاتی روش‌های بیزی از بیش‌برازش جلوگیری می‌کند.",
        icon: "Sigma",
      },
      {
        title: "خروجی احتمالاتی",
        en: "Probabilistic Output",
        text: "خروجی، پارامترهای یک توزیع احتمالی است؛ به‌جای عدد قطعی، میانگین + بازه اطمینانی محاسبه می‌شود.",
        detail: "بهینه‌سازی با زیان احتمالاتی NLL — هم‌زمان کاهش خطا و برآورد درستی واریانس.",
        icon: "ChartSpline",
      },
    ],
  },
  metrics: {
    title: "معیارهای ارزیابی",
    lead: "معیارهای ارزیابی در این پژوهش دو جنبه مکمل را پوشش خواهند داد: دقت نقطه‌ای پیش‌بینی و اعتبار بازه‌های اطمینانی:",
    accuracy: {
      title: "معیارهای دقت پیش‌بینی",
      items: [
        {
          name: "MAE",
          desc: "میانگین قدر مطلق خطا",
          tex: "\\mathrm{MAE}=\\dfrac{1}{N}\\sum_{i=1}^{N}\\left|y_{i}-\\hat{y}_{i}\\right|",
        },
        {
          name: "RMSE",
          desc: "ریشه میانگین مربعات خطا",
          tex: "\\mathrm{RMSE}=\\sqrt{\\dfrac{1}{N}\\sum_{i=1}^{N}\\left(y_{i}-\\hat{y}_{i}\\right)^{2}}",
        },
        {
          name: "MAPE",
          desc: "میانگین درصدی قدر مطلق خطا",
          tex: "\\mathrm{MAPE}=\\dfrac{100}{N}\\sum_{i=1}^{N}\\left|\\dfrac{y_{i}-\\hat{y}_{i}}{y_{i}}\\right|",
        },
      ],
    },
    reliability: {
      title: "معیارهای قابلیت اطمینان",
      items: [
        {
          name: "PICP",
          desc: "احتمال پوشش بازه پیش‌بینی",
          tex: "\\mathrm{PICP}=\\dfrac{1}{N}\\sum_{i=1}^{N}\\mathbf{1}\\!\\left[\\hat{L}_{i}\\le y_{i}\\le\\hat{U}_{i}\\right]\\;\\ge\\;1-\\alpha",
        },
        {
          name: "MPIW",
          desc: "میانگین عرض بازه پیش‌بینی",
          tex: "\\mathrm{MPIW}=\\dfrac{1}{N}\\sum_{i=1}^{N}\\left(\\hat{U}_{i}-\\hat{L}_{i}\\right)\\;\\rightarrow\\;\\min",
        },
      ],
    },
    validation: {
      title: "رویکرد اعتبارسنجی",
      items: [
        "تقسیم‌بندی زمانی استاندارد داده‌ها (آموزش، اعتبارسنجی، آزمون)",
        "مطالعه حذفی دقیق برای سنجش تأثیر افزودن ماژول بیزی بر عملکرد نهایی مدل",
        "مقایسه عملکرد مدل پیشنهادی با نسخه قطعی آن",
        "معیارسنجی جامع با الگوریتم‌های یادگیری عمیق پیشرفته",
      ],
    },
  },
};

/* ─────────────────────────── Research Background ─────────────────────────── */

export const background = {
  id: "background",
  no: "۰۴",
  title: "پیشینه پژوهش",
  en: "Research Background",
  icon: "History",
  lead: "مسیری تکاملی از روش‌های آماری خطی به مدل‌های عمیق احتمالاتی — توجیه‌کننده رویکرد «یادگیری عمیق احتمالاتی» این پژوهش:",
  timeline: [
    {
      year: "۲۰۰۳",
      title: "مدل‌های آماری کلاسیک",
      text: "ARIMA و فیلتر کالمن؛ مبانی مستحکم اما عملکرد ضعیف در غیرخطی‌ها و تغییرات ناگهانی.",
      cite: "ویلیامز و همکاران",
      kind: "stat",
    },
    {
      year: "۲۰۰۴",
      title: "یادگیری ماشین کلاسیک",
      text: "SVR و Random Forest؛ بهبود غیرخطی‌ها اما سنسورها مستقل فرض شدند.",
      cite: "وو و همکاران",
      kind: "stat",
    },
    {
      year: "۲۰۱۶",
      title: "بنیان‌های یادگیری عمیق احتمالاتی",
      text: "MC Dropout: شبکه‌های عصبی با خروجی احتمالاتی — نقطه شروع پیوند آمار بیزی و یادگیری عمیق.",
      cite: "گال و قهرمانی",
      kind: "bayes",
    },
    {
      year: "۲۰۱۷",
      title: "ترکیب CNN و RNN",
      text: "استخراج ویژگی مکانی از تصویر شبکه معابر؛ ناسازگار با ساختار غیراقلیدسی جاده‌های واقعی.",
      cite: "ژانگ و همکاران",
      kind: "dl",
    },
    {
      year: "۲۰۱۷",
      title: "هشدار «اطمینان کاذب»",
      text: "مدل‌های عمیق بدون سنجش عدم قطعیت، در سیستم‌های حساس به ایمنی خطرسازند.",
      cite: "ژو و همکاران",
      kind: "bayes",
    },
    {
      year: "۲۰۱۸",
      title: "ظهور STGNNها",
      text: "STGCN و DCRNN با مدل‌سازی گراف شبکه راه‌ها — دقیق‌ترین ابزار پیش‌بینی نقطه‌ای.",
      cite: "وی و همکاران؛ لی و همکاران",
      kind: "dl",
    },
    {
      year: "۲۰۱۹",
      title: "بیزی در یادگیری عمیق",
      text: "Variational Inference و MC Dropout در شبکه‌های عمیق؛ مقاوم‌تر در شرایط پویا.",
      cite: "ژائو و همکاران",
      kind: "bayes",
    },
    {
      year: "۲۰۲۱",
      title: "گام آغازین تلفیق",
      text: "قدرت STGNN و ضرورت بیزی جداگانه تأیید شد؛ خلأ یکپارچه‌سازی این دو باقی بود.",
      cite: "لی و ژو",
      kind: "fusion",
    },
    {
      year: "۲۰۲۴ – ۲۰۲۵",
      title: "موج جدید پژوهش‌ها",
      text: "FD-TGCN، AGCN-T و Transformer-TCN؛ پیشرفت نقطه‌ای ادامه دارد اما «عدم قطعیت» حل‌نشده است.",
      cite: "لی و همکاران ۲۰۲۵؛ وانگ و چن ۲۰۲۵؛ سان و همکاران ۲۰۲۴ و…",
      kind: "dl",
    },
  ],
  conclusion: {
    title: "سهم نوآورانه پژوهش حاضر",
    text: "پژوهش حاضر دقیقاً همین خلأ روش‌شناختی را هدف می‌گیرد: تلفیق قدرت تفکیک STGNN با چارچوب ریاضی استنباط بیزی — با تمرکز بر تعادل «دقت» و «قابلیت اطمینان»، نه صرفاً کاهش RMSE؛ ابزاری کارآمد برای تصمیم‌گیری در شرایط عدم قطعیت.",
  },
};

/* ─────────────────────────── Chapter Outline ─────────────────────────── */

export const chapters = {
  id: "chapters",
  no: "۰۵",
  title: "فصل‌بندی",
  en: "Thesis Structure",
  icon: "LibraryBig",
  lead: "ساختار پایان‌نامه در چهار فصل سازمان‌دهی می‌شود — از کلیات تا پیاده‌سازی و ارزیابی؛ هر فصل، سهمی مشخص در زنجیرهٔ شواهد تا خروجی احتمالاتی دارد.",
  items: [
    {
      no: "فصل اول",
      title: "کلیات پژوهش",
      points: [
        "بیان مسئله و ضرورت تحقیق",
        "اهداف و سؤالات پژوهش",
        "فرضیه‌ها و پیشینه",
        "کلمات کلیدی و تعاریف",
      ],
      status: "ready",
      statusText: "محتوای موجود از پروپوزال",
    },
    {
      no: "فصل دوم",
      title: "مروری بر مباحث نظری",
      points: [
        "شبکه‌های عصبی گرافی فضایی-زمانی (STGNN)",
        "رویکرد بیزی و استنباط تقریبی",
        "کمّی‌سازی عدم قطعیت",
        "توابع زیان احتمالاتی",
        "مرور نظام‌مند موج جدید",
      ],
      status: "ready",
      statusText: "محتوای موجود — در حال توسعه",
    },
    {
      no: "فصل سوم",
      title: "ساختار و معماری مدل پیشنهادی",
      points: [
        "معماری یکپارچه STGNN + بیزی",
        "فرمول‌بندی ریاضی کامل (مجاورت، GCN، ELBO، NLL)",
        "طراحی آزمایش‌ها و سناریوهای ارزیابی",
        "پیاده‌سازی اولیه ماژول‌ها",
      ],
      status: "wip",
      statusText: "در حال تکمیل",
    },
    {
      no: "فصل چهارم",
      title: "پیاده‌سازی، آزمایش‌ها و ارزیابی",
      points: [
        "آموزش مدل روی مجموعه‌داده PeMS",
        "مطالعه حذفی ماژول‌ها (گرافی/زمانی/بیزی)",
        "مقایسه با الگوریتم‌های پیشرفته",
        "تحلیل نتایج و بازه‌های اطمینان",
      ],
      status: "wip",
      statusText: "در حال تکمیل",
    },
  ],
  roadmap: {
    title: "نقشه راه اجرای پایان‌نامه",
    note: "مطابق زمان‌بندی مصوب فرم طرح پژوهش؛ جلسه دفاع نهایی: ۳۰ بهمن ۱۴۰۵",
    milestones: [
      { date: "۰۱ / ۰۷ / ۱۴۰۴", label: "آغاز رسمی تحقیق", done: true },
      { date: "۰۱ / ۱۲ / ۱۴۰۴", label: "تنظیم و نگارش", done: true },
      { date: "۰۱ / ۰۲ / ۱۴۰۵", label: "تایپ و تکثیر", done: true },
      { date: "۰۱ / ۰۳ / ۱۴۰۵", label: "تحویل به استادان راهنما و مشاور", done: true },
      { date: "۳۱ / ۰۶ / ۱۴۰۵", label: "تکمیل فصول و آمادگی برای دفاع", done: true },
      { date: "۳۰ / ۱۱ / ۱۴۰۵", label: "جلسه دفاع از پایان‌نامه", done: false, highlight: true },
    ],
  },
};

/* ─────────────────────────── References ─────────────────────────── */

export const references = {
  id: "references",
  no: "۰۶",
  title: "مراجع",
  en: "References",
  icon: "BookMarked",
  primary: {
    label: "مرجع اصلی",
    items: [
      {
        authors: "W. Li, G. Yang, Z. Xiong, X. Zhu, and X. Ma",
        year: "2025",
        title: "A Traffic Flow Prediction Model Based on Dynamic Graph Convolution and Adaptive Spatial Feature Extraction",
        source: "Symmetry, vol. 17, no. 7, Art. no. 1007.",
      },
    ],
  },
  secondary: {
    label: "مراجع فرعی",
    items: [
      {
        authors: "Y. Wang and P. Chen",
        year: "2025",
        title: "Network traffic prediction based on transformer and temporal convolutional network",
        source: "PLoS ONE, vol. 20, no. 4, Art. no. e0320368.",
      },
      {
        authors: "Z. Yang, J. Zhang, and Z. Li",
        year: "2025",
        title: "Multi-scale time series prediction model based on deep learning and its application",
        source: "PLoS ONE, vol. 20, no. 7, Art. no. e0325474.",
      },
      {
        authors: "H. Wan, H. Xu, and L. Xie",
        year: "2025",
        title: "Spatial-Temporal Traffic Flow Prediction Through Residual-Trend Decomposition with Transformer Architecture",
        source: "Electronics, vol. 14, no. 12, Art. no. 2400.",
      },
      {
        authors: "Y. Ding et al.",
        year: "2025",
        title: "Traffic flow prediction based on spatiotemporal encoder-decoder model",
        source: "PLoS ONE, vol. 20, no. 5, Art. no. e0321858.",
      },
      {
        authors: "Y. Tian et al.",
        year: "2025",
        title: "Transformer-Based Traffic Flow Prediction Considering Spatio-Temporal Correlations of Bridge Networks",
        source: "Appl. Sci., vol. 15, no. 16, Art. no. 8930.",
      },
      {
        authors: "J. Feng, L. Yu, and R. Ma",
        year: "",
        title: "AGCN-T: A Traffic Flow Prediction Model for Spatial-Temporal Network Dynamics",
        source: "J. Adv. Transp.",
      },
      {
        authors: "Z. Liu et al.",
        year: "2025",
        title: "Dynamic Graph Convolution and Spatio-Temporal Self-Attention Network for Traffic Flow Prediction",
        source: "Electronics, vol. 14, no. 7, Art. no. 1410.",
      },
      {
        authors: "S. S. Sakhinana et al.",
        year: "2024",
        title: "Multi-Knowledge Fusion Network for Time Series Representation Learning",
        source: "TCS Research.",
      },
      {
        authors: "L. Sun et al.",
        year: "2024",
        title: "FD-TGCN: Fast and dynamic temporal graph convolution network for traffic flow prediction",
        source: "Inform. Fusion, vol. 106, Art. no. 102291.",
      },
      {
        authors: "X. Guo",
        year: "2024",
        title: "Research on Deep Learning Models for Traffic Flow Prediction",
        source: "Appl. Comput. Eng., vol. 111, no. 1, pp. 87–96.",
      },
    ],
  },
};

/* ─────────────────────── Mathematical formulation ───────────────────────
   LaTeX sources rendered with KaTeX (client-side). Math notation is
   standard Latin LaTeX; labels/descriptions are Persian — the usual
   style of Persian statistics theses. */
export type FormulaDef = {
  id: string;
  label: string;
  tex: string;
  desc?: string;
};

export const mathFramework = {
  title: "فرمول‌بندی ریاضی چارچوب پیشنهادی",
  en: "Mathematical Formulation",
  lead: "هستهٔ نظری پژوهش در چهار بلوک: بازنمایی گرافی، عملگرهای فضایی-زمانی، استنباط پسین و اعتبارسنجی بازه‌ها — ستون‌فقرات فصل سوم.",
  transition: {
    label: "گذار از خروجی قطعی به خروجی احتمالاتی",
    tex: "\\underbrace{\\hat{y}=f_{\\theta}(\\boldsymbol{x})}_{\\text{deterministic}}\\quad\\Longrightarrow\\quad\\underbrace{p\\!\\left(y\\mid\\boldsymbol{x},\\mathcal{D}\\right)=\\mathcal{N}\\!\\left(\\hat{\\mu},\\,\\hat{\\sigma}^{2}\\right)}_{\\text{probabilistic}}",
    desc: "به‌جای یک عدد قطعی، توزیع کامل احتمال خروجی (میانگین + واریانس) ارائه می‌شود.",
  },
  groups: [
    {
      id: "problem",
      title: "۱) مسئله‌بندی روی گراف",
      items: [
        {
          id: "adj",
          label: "ماتریس مجاورت وزن‌دار (هستهٔ گاوسی)",
          tex: "\\boldsymbol{A}_{ij}=\\begin{cases}\\exp\\!\\left(-\\dfrac{d_{ij}^{2}}{\\sigma^{2}}\\right), & d_{ij}\\le\\kappa\\\\[2pt] 0, & \\text{otherwise}\\end{cases}",
          desc: "d_ij فاصلهٔ جاده‌ای سنسورهای i و j است؛ σ پهنای هسته و κ آستانهٔ همسایگی. وزن یال‌ها شدت تعامل مکانی جاده‌ها را رمزگذاری می‌کند.",
        },
        {
          id: "task",
          label: "وظیفهٔ پیش‌بینی فضایی-زمانی",
          tex: "\\hat{\\boldsymbol{Y}}_{(t+1):(t+T)}=f_{\\theta}\\!\\left(\\boldsymbol{X}_{(t-T'+1):t},\\ \\mathcal{G}\\right),\\qquad \\mathcal{G}=(\\mathcal{V},\\mathcal{E},\\boldsymbol{A})",
          desc: "بر پایهٔ T′ گام گذشتهٔ N سنسور، وضعیت T گام آینده برآورد می‌شود (رگرسیون سری زمانی فضایی-زمانی روی گراف).",
        },
      ],
    },
    {
      id: "st",
      title: "۲) ماژول فضایی-زمانی",
      items: [
        {
          id: "gcn",
          label: "لایهٔ گراف-پیچشی (GCN)",
          tex: "\\boldsymbol{H}^{(\\ell+1)}=\\sigma\\!\\left(\\tilde{\\boldsymbol{D}}^{-\\tfrac{1}{2}}\\tilde{\\boldsymbol{A}}\\tilde{\\boldsymbol{D}}^{-\\tfrac{1}{2}}\\boldsymbol{H}^{(\\ell)}\\boldsymbol{W}^{(\\ell)}\\right),\\qquad\\tilde{\\boldsymbol{A}}=\\boldsymbol{A}+\\boldsymbol{I}_N",
          desc: "هموارسازی پیام‌رسانی روی گراف: با افزودن خود-حلقه به مجاورت و نرمال‌سازی ماتریس درجه، ویژگی هر گره با همسایه‌هایش ترکیب می‌شود.",
        },
        {
          id: "dcrnn",
          label: "پیچش پخشی دوطرفه (DCRNN)",
          tex: "\\boldsymbol{X}'_{:,\\,p}=\\sum_{q}\\sum_{k=0}^{K-1}\\left[\\theta_{k,1}\\left(\\boldsymbol{D}_{O}^{-1}\\boldsymbol{A}\\right)^{k}+\\theta_{k,2}\\left(\\boldsymbol{D}_{I}^{-1}\\boldsymbol{A}^{\\top}\\right)^{k}\\right]\\boldsymbol{X}_{:,\\,q}",
          desc: "مدل‌سازی پخش ترافیک در جهت رفت (ماتریس خروجی O) و برگشت (ماتریس ورودی I) شبکهٔ معابر.",
        },
        {
          id: "glu",
          label: "واحد زمانی گیت‌دار (TCN با GLU)",
          tex: "\\boldsymbol{\\Gamma}\\star\\boldsymbol{X}=\\left(\\boldsymbol{\\Gamma}_{1}\\star\\boldsymbol{X}\\right)\\odot\\sigma\\!\\left(\\boldsymbol{\\Gamma}_{2}\\star\\boldsymbol{X}\\right)",
          desc: "گیت سیگموئیدی، عبور اطلاعات زمانیِ مرتبط را کنترل می‌کند (⊙ ضرب هادامارد).",
        },
      ],
    },
    {
      id: "bayes",
      title: "۳) استنباط بیزی و کمّی‌سازی عدم قطعیت",
      items: [
        {
          id: "bayes",
          label: "قاعدهٔ بیز — توزیع پسین وزن‌ها",
          tex: "p(\\boldsymbol{w}\\mid\\mathcal{D})=\\dfrac{p(\\mathcal{D}\\mid\\boldsymbol{w})\\,p(\\boldsymbol{w})}{p(\\mathcal{D})}\\;\\propto\\;p(\\mathcal{D}\\mid\\boldsymbol{w})\\,p(\\boldsymbol{w})",
          desc: "وزن‌های شبکه به‌جای مقدار قطعی، متغیر تصادفی‌اند؛ توزیع پیشین p(w) دانشِ پیش از داده را رمزگذاری می‌کند.",
        },
        {
          id: "pred",
          label: "پیش‌بینی پسین (Posterior Predictive)",
          tex: "p(y^{*}\\mid\\boldsymbol{x}^{*},\\mathcal{D})=\\int p(y^{*}\\mid\\boldsymbol{x}^{*},\\boldsymbol{w})\\,p(\\boldsymbol{w}\\mid\\mathcal{D})\\,d\\boldsymbol{w}",
          desc: "انتگرال روی کل فضای وزن‌ها تحلیل‌ناپذیر است؛ باید با توزیع تقریبی (استنباط تقریبی) جایگزین شود.",
        },
        {
          id: "elbo",
          label: "کران پایین شواهد (ELBO) — استنباط تغییراتی",
          tex: "\\mathcal{L}_{\\mathrm{ELBO}}(\\phi)=\\mathbb{E}_{q_{\\phi}(\\boldsymbol{w})}\\!\\left[\\log p(\\mathcal{D}\\mid\\boldsymbol{w})\\right]-\\mathrm{KL}\\!\\left(q_{\\phi}(\\boldsymbol{w})\\,\\|\\,p(\\boldsymbol{w})\\right)",
          desc: "حداکثرسازی هم‌زمانِ برازش داده و نزدیکی به توزیع پیشین — منظم‌سازی ذاتی در برابر بیش‌برازش.",
        },
        {
          id: "mc",
          label: "تقریب مونت‌کارلو با Dropout (MC Dropout)",
          tex: "p(y^{*}\\mid\\boldsymbol{x}^{*},\\mathcal{D})\\approx\\dfrac{1}{P}\\sum_{p=1}^{P}p\\!\\left(y^{*}\\mid\\boldsymbol{x}^{*},\\hat{\\boldsymbol{w}}_{p}\\right),\\qquad\\hat{\\boldsymbol{w}}_{p}\\sim q_{\\phi}(\\boldsymbol{w})",
          desc: "در زمان آزمون، dropout فعال می‌ماند و P اجرای تصادفیِ شبکه، توزیع پسین را تقریب می‌زند.",
        },
        {
          id: "var",
          label: "کمّی‌سازی عدم قطعیت پیش‌بین",
          tex: "\\hat{\\mu}=\\dfrac{1}{P}\\sum_{p=1}^{P}\\hat{y}_{p},\\qquad\\hat{\\sigma}^{2}=\\underbrace{\\dfrac{1}{P}\\sum_{p=1}^{P}\\left(\\hat{y}_{p}-\\hat{\\mu}\\right)^{2}}_{\\text{epistemic}}\\;+\\;\\hat{\\sigma}^{2}_{\\text{aleatoric}}",
          desc: "عدم قطعیت مدل (شناختی) از پراکندگی اجراها و عدم قطعیت داده (ذاتی) از نویز آموخته‌شدهٔ مدل به‌دست می‌آید.",
        },
      ],
    },
    {
      id: "output",
      title: "۴) خروجی احتمالاتی و آموزش مدل",
      items: [
        {
          id: "pi",
          label: "بازهٔ پیش‌بینی ۹۵٪",
          tex: "\\mathrm{PI}_{\\alpha}=\\Big[\\hat{\\mu}-z_{\\alpha/2}\\,\\hat{\\sigma},\\ \\ \\hat{\\mu}+z_{\\alpha/2}\\,\\hat{\\sigma}\\Big],\\qquad z_{0.025}=1.96",
          desc: "به‌جای یک عدد قطعی، دامنه‌ای معتبر با پوشش احتمالی مشخص ارائه می‌شود — ورودی مستقیم تصمیم‌گیری ریسک‌آگاه.",
        },
        {
          id: "nll",
          label: "زیان لگارتم درست‌نمایی منفی (NLL)",
          tex: "\\mathcal{L}_{\\mathrm{NLL}}=\\dfrac{1}{N}\\sum_{i=1}^{N}\\left[\\dfrac{\\left(y_{i}-\\hat{\\mu}_{i}\\right)^{2}}{2\\,\\hat{\\sigma}_{i}^{2}}+\\dfrac{1}{2}\\log\\hat{\\sigma}_{i}^{2}\\right]",
          desc: "رگرسیون هتروسداستیک: مدل هم‌زمان میانگین و واریانس را می‌آموزد و به نمونه‌های پرنویز وزن کمتری می‌دهد.",
        },
      ],
    },
  ],
};

/* ─────────────────────── Figures & thematic images ───────────────────────
   Images collected from free web sources; each caption is tailored to
   the proposal content (sample-file style: numbered figure + description). */
export type FigureDef = {
  src: string;
  no: string;
  title: string;
  alt: string;
  desc: string;
  source: string;
};

export const fig: Record<string, FigureDef> = {
  night: {
    src: "/images/traffic-night.webp",
    no: "شکل ۱",
    title: "جریان ترافیک شهری در ساعات اوج — ردپای نوری خودروها در شبکه معابر",
    alt: "نمای هوایی شبانه از بزرگراه شهری با ردپای نوری خودروها در حال حرکت",
    desc: "هر رد نور، مسیر حرکت یک خودروست — همان «جریانی» که پیش‌بینی آن موضوع این پژوهش است؛ نوسان شدت جریان‌ها، ماهیت غیرخطی و فضازمانی داده‌ها را نشان می‌دهد.",
    source: "Unsplash",
  },
  control: {
    src: "/images/control-room.webp",
    no: "شکل ۲",
    title: "مرکز پایش و کنترل ترافیک — مقصد نهایی خروجی‌های پژوهش",
    alt: "اپراتور مرکز کنترل ترافیک در حال پایش نمایشگرهای شبکه معابر شهری",
    desc: "تصمیم‌های لحظه‌ای چنین مراکزی به پیش‌بینی‌های «قابل‌اتکا» وابسته‌اند؛ بازه اطمینانی این پژوهش، تصمیم ریسک‌آگاه را ممکن می‌کند.",
    source: "Reveal News",
  },
  congestion: {
    src: "/images/traffic-congestion.webp",
    no: "شکل ۳",
    title: "تراکم سنگین معابر در ساعات اوج — هزینه پنهان پیش‌بینی ناکارآمد",
    alt: "صف طولانی خودروها روی بزرگران چندخطه شهری در ساعات اوج",
    desc: "اتلاف میلیون‌ها نفر-ساعت، سوخت و آلودگی — مستقیم‌ترین پیامد پیش‌بینی ناکارآمد؛ پیش‌بینی دقیق کوتاه‌مدت، ابزار پیشگیرانهٔ اصلی است.",
    source: "Unsplash",
  },
  graph: {
    src: "/images/graph-network.webp",
    no: "شکل ۴",
    title: "بازنمایی شبکه معابر به‌صورت گراف — گره‌ها، یال‌ها و وزن‌ها",
    alt: "نمودار گراف شبکه‌ای با گره‌ها، یال‌ها و وزن‌های متفاوت",
    desc: "هر سنسور یک «گره» و هر ارتباط جاده‌ای یک «یال» وزن‌دار؛ همین بازنمایی، یادگیری انتها-به-انتهای ساختار غیراقلیدسی شبکه راه‌ها را ممکن می‌کند.",
    source: "Domo",
  },
  stgnn: {
    src: "/images/stgnn-pipeline.webp",
    no: "شکل ۵",
    title: "فرایند گردآوری داده و مدل‌سازی گرافی فضایی-زمانی شبکه ترافیک",
    alt: "نمودار فرایند تبدیل داده خام سنسورها به گراف فضایی-زمانی مدل STGNN",
    desc: "داده خام سنسورها پس از پیش‌پردازش به سری زمانی گره‌ها و ماتریس مجاورت تبدیل می‌شود — ورودی اصلی مدل STGNN.",
    source: "Scientific Reports",
  },
  architecture: {
    src: "/images/graph-architecture.webp",
    no: "شکل ۶",
    title: "نمونه معماری پیشرفته گراف-پیچشی پویا در پژوهش‌های موج جدید",
    alt: "نمودار معماری شبکه عصبی گراف-پیچشی زمانی چندمقیاسی",
    desc: "موج جدید (FD-TGCN، AGCN-T و…) با گراف پویا مرز دقت را جابه‌جا کردند؛ اما همگی خروجی «قطعی» می‌دهند — حلقهٔ مفقوده، همان لایهٔ بیزی است.",
    source: "IOP Science",
  },
  future: {
    src: "/images/future-its.webp",
    no: "چشم‌انداز",
    title: "آینده مدیریت ترافیک — تصمیم‌گیری هوشمند زیر چتر عدم قطعیت",
    alt: "تصویر مفهومی از شهر هوشمند و سامانه حمل‌ونقل هوشمند آینده",
    desc: "چشم‌انداز: پیش‌بینی‌های احتمالاتیِ قابل‌اتکا به‌عنوان موتور تصمیم‌گیری شهرهای هوشمند؛ به‌جای یک عدد، یک «بازهٔ اطمینان» در خدمت تصمیم‌گیر.",
    source: "BLIIoT",
  },
};

/* ─────────────────────────── Table of Contents ─────────────────────────── */

export const toc = [
  { id: "intro", no: "۰۱", title: "مقدمه", desc: "اهمیت، داده‌ها و مفاهیم کلیدی" },
  { id: "problem", no: "۰۲", title: "بیان مسئله", desc: "چالش‌ها، تکامل مدل‌ها و خلأ پژوهشی" },
  { id: "goals", no: "۰۳", title: "هدف پژوهش", desc: "اهداف، معماری، فرمول‌بندی و معیارها" },
  { id: "background", no: "۰۴", title: "پیشینه پژوهش", desc: "خط زمانی ۲۰۰۳ تا امروز" },
  { id: "chapters", no: "۰۵", title: "فصل‌بندی", desc: "ساختار چهارفصلی و نقشه راه" },
  { id: "references", no: "۰۶", title: "مراجع", desc: "مرجع اصلی و مراجع فرعی" },
];
