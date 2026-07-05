export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];
export type LocalizedString = Record<Locale, string>;

export const defaultLocale: Locale = "en";

export const site = {
  name: "Pavel Kostin",
  shortName: "PAVEL",
  productionUrl: "https://pavel-portfolio-six.vercel.app/",
  repositoryUrl: "https://github.com/same3e/pavel-portfolio",
  title: {
    en: "Pavel Kostin - Web Designer & Developer in Tbilisi",
    ru: "Павел Костин - веб-дизайнер и разработчик в Тбилиси"
  },
  description: {
    en: "Independent web designer and developer creating clear websites, booking flows and lightweight digital tools for service businesses in Tbilisi and worldwide",
    ru: "Независимый веб-дизайнер и разработчик, создающий понятные сайты, формы записи и легкие цифровые инструменты для сервисного бизнеса в Тбилиси и по всему миру"
  },
  availability: {
    en: "Available for new projects",
    ru: "Доступен для новых проектов"
  },
  location: {
    en: "Tbilisi / Worldwide",
    ru: "Тбилиси / по всему миру"
  },
  role: {
    en: "Independent Web Designer & Developer",
    ru: "Независимый веб-дизайнер и разработчик"
  },
  ogRole: {
    en: "Web Designer & Developer",
    ru: "Веб-дизайнер и разработчик"
  }
} satisfies {
  name: string;
  shortName: string;
  productionUrl: string;
  repositoryUrl: string;
  title: LocalizedString;
  description: LocalizedString;
  availability: LocalizedString;
  location: LocalizedString;
  role: LocalizedString;
  ogRole: LocalizedString;
};

export const contact = {
  email: "kostinpavel447@gmail.com",
  instagram: "https://www.instagram.com/pavel.websites/",
  // TODO: replace with a professional Telegram username.
  telegram: "https://t.me/cndjchsjw",
  whatsapp:
    "https://wa.me/995599174299?text=Hello%20Pavel%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business."
} as const;

export const dictionary = {
  en: {
    htmlLang: "en",
    skipLink: "Skip to content",
    brandAria: "Pavel portfolio home",
    desktopBrand: "PAVEL · DEVELOP",
    mobileBrand: "PAVEL.DEV",
    navAria: "Primary navigation",
    mobileNavAria: "Mobile navigation",
    languageAria: "Language",
    menu: "Menu",
    close: "Close",
    open: "Open",
    backHome: "Back home",
    heroName: "PAVEL KOSTIN",
    heroRole: "INDEPENDENT WEB DESIGNER & DEVELOPER",
    heroCta: "START A PROJECT",
    contactCta: "LET'S BUILD YOUR WEBSITE",
    contactLead: "Have a project or business that needs a stronger digital presence?",
    contactHeadingAria: "Let's make something memorable",
    contactHeadingLines: ["Let's make", "something", "memorable"],
    serviceStatementAria:
      "Every project starts as a business problem, not a template - website, booking flow or a small automation that saves you hours each week.",
    serviceStatementLines: [
      "Every project starts as a business problem, not a template,",
      "website, booking flow or a small automation that saves you hours each week"
    ],
    serviceBlockLabel: "SERVICES / 04",
    aboutMeta: ["Based in Tbilisi", "Working worldwide", "RU / EN"],
    selectedWorkTitle: "Selected work",
    selectedProjectsAria: "Selected projects",
    preview: "preview",
    exploreTheCase: "Explore the case",
    exploreCase: "Explore case",
    year: "Year",
    overview: "Overview",
    role: "Role",
    type: "Type",
    visualSystem: "Visual system",
    typography: "Typography",
    motion: "Motion",
    context: "Context",
    direction: "Direction",
    liveWebsite: "Live website",
    liveWebsiteAria: "Live website opens in a new tab",
    visitLiveProject: "Visit live project",
    mobileInterface: "Mobile interface",
    nextProject: "Next project",
    email: "Email",
    footerRole: "Pavel Kostin - Independent Web Designer & Developer",
    footerCredit: "Portfolio design and development by Pavel",
    notFoundCode: "404",
    notFoundTitle: "Page not found",
    marqueeText: "WEB DESIGN - AUTOMATION - CRM INTEGRATIONS - BOOKING FLOWS - ",
    marqueeAria: "Services and integrations",
    portraitAria: "Voxel portrait render preview",
    portraitLabel: "PORTRAIT_01",
    portraitObject: "OBJ / 001",
    portraitTracking: "SUBJECT TRACKING",
    portraitActive: "RENDER ACTIVE",
    galleryItem: "item",
    galleryItems: "items",
    galleryWith: "gallery with",
    of: "of",
    mobileScreenshotPlaceholder: "mobile screenshot placeholder"
  },
  ru: {
    htmlLang: "ru",
    skipLink: "Перейти к содержимому",
    brandAria: "Главная страница портфолио Павла",
    desktopBrand: "PAVEL · DEVELOP",
    mobileBrand: "PAVEL.DEV",
    navAria: "Основная навигация",
    mobileNavAria: "Мобильная навигация",
    languageAria: "Язык",
    menu: "Меню",
    close: "Закрыть",
    open: "Открыть",
    backHome: "На главную",
    heroName: "ПАВЕЛ КОСТИН",
    heroRole: "НЕЗАВИСИМЫЙ ВЕБ-ДИЗАЙНЕР И РАЗРАБОТЧИК",
    heroCta: "НАЧАТЬ ПРОЕКТ",
    contactCta: "ОБСУДИТЬ САЙТ",
    contactLead: "Есть проект или бизнес, которому нужен более сильный цифровой образ?",
    contactHeadingAria: "Давайте сделаем что-то запоминающееся",
    contactHeadingLines: ["Давайте сделаем", "что-то", "запоминающееся"],
    serviceStatementAria:
      "Каждый проект начинается с бизнес-задачи, а не с шаблона - сайт, запись или небольшая автоматизация, которая экономит часы каждую неделю.",
    serviceStatementLines: [
      "Каждый проект начинается с бизнес-задачи, а не с шаблона,",
      "сайт, запись или небольшая автоматизация, которая экономит часы каждую неделю"
    ],
    serviceBlockLabel: "УСЛУГИ / 04",
    aboutMeta: ["В Тбилиси", "Работаю по всему миру", "RU / EN"],
    selectedWorkTitle: "Избранные проекты",
    selectedProjectsAria: "Избранные проекты",
    preview: "превью",
    exploreTheCase: "Смотреть кейс",
    exploreCase: "Смотреть кейс",
    year: "Год",
    overview: "Обзор",
    role: "Роль",
    type: "Тип",
    visualSystem: "Визуальная система",
    typography: "Типографика",
    motion: "Анимация",
    context: "Контекст",
    direction: "Направление",
    liveWebsite: "Открыть сайт",
    liveWebsiteAria: "Открыть сайт в новой вкладке",
    visitLiveProject: "Перейти на сайт проекта",
    mobileInterface: "Мобильный интерфейс",
    nextProject: "Следующий проект",
    email: "Почта",
    footerRole: "Павел Костин - независимый веб-дизайнер и разработчик",
    footerCredit: "Дизайн и разработка портфолио - Павел",
    notFoundCode: "404",
    notFoundTitle: "Страница не найдена",
    marqueeText: "ВЕБ-ДИЗАЙН - АВТОМАТИЗАЦИЯ - ИНТЕГРАЦИИ CRM - ФОРМЫ ЗАПИСИ - ",
    marqueeAria: "Услуги и интеграции",
    portraitAria: "Превью воксельного портрета",
    portraitLabel: "PORTRAIT_01",
    portraitObject: "OBJ / 001",
    portraitTracking: "ОТСЛЕЖИВАНИЕ ОБЪЕКТА",
    portraitActive: "РЕНДЕР АКТИВЕН",
    galleryItem: "элемент",
    galleryItems: "элементов",
    galleryWith: "галерея,",
    of: "из",
    mobileScreenshotPlaceholder: "заглушка мобильного скриншота"
  }
} satisfies Record<Locale, {
  htmlLang: string;
  skipLink: string;
  brandAria: string;
  desktopBrand: string;
  mobileBrand: string;
  navAria: string;
  mobileNavAria: string;
  languageAria: string;
  menu: string;
  close: string;
  open: string;
  backHome: string;
  heroName: string;
  heroRole: string;
  heroCta: string;
  contactCta: string;
  contactLead: string;
  contactHeadingAria: string;
  contactHeadingLines: readonly [string, string, string];
  serviceStatementAria: string;
  serviceStatementLines: readonly [string, string];
  serviceBlockLabel: string;
  aboutMeta: readonly [string, string, string];
  selectedWorkTitle: string;
  selectedProjectsAria: string;
  preview: string;
  exploreTheCase: string;
  exploreCase: string;
  year: string;
  overview: string;
  role: string;
  type: string;
  visualSystem: string;
  typography: string;
  motion: string;
  context: string;
  direction: string;
  liveWebsite: string;
  liveWebsiteAria: string;
  visitLiveProject: string;
  mobileInterface: string;
  nextProject: string;
  email: string;
  footerRole: string;
  footerCredit: string;
  notFoundCode: string;
  notFoundTitle: string;
  marqueeText: string;
  marqueeAria: string;
  portraitAria: string;
  portraitLabel: string;
  portraitObject: string;
  portraitTracking: string;
  portraitActive: string;
  galleryItem: string;
  galleryItems: string;
  galleryWith: string;
  of: string;
  mobileScreenshotPlaceholder: string;
}>;

export const hero = {
  lines: {
    en: ["I build websites", "that turn interest", "into enquiries"],
    ru: ["Создаю сайты,", "которые превращают", "интерес в заявки"]
  },
  aria: {
    en: "I build websites that turn interest into enquiries.",
    ru: "Создаю сайты, которые превращают интерес в заявки."
  },
  subtitle: {
    en: "Conversion-focused websites, booking flows and lightweight integrations for service businesses.",
    ru: "Сайты, формы записи и легкие интеграции для сервисного бизнеса с фокусом на заявки."
  }
} satisfies {
  lines: Record<Locale, readonly [string, string, string]>;
  aria: LocalizedString;
  subtitle: LocalizedString;
};

export const navigation = [
  { label: { en: "Work", ru: "Проекты" }, href: "#work" },
  { label: { en: "Services", ru: "Услуги" }, href: "#services" },
  { label: { en: "About", ru: "Обо мне" }, href: "#about" },
  { label: { en: "Contact", ru: "Контакты" }, href: "#contact" }
] satisfies readonly { label: LocalizedString; href: `#${string}` }[];

export const homepageServices = [
  {
    title: { en: "Web Design", ru: "Веб-дизайн" },
    copy: {
      en: "Clear visual systems and interfaces shaped around the business and its audience.",
      ru: "Понятные визуальные системы и интерфейсы, собранные вокруг бизнеса и его аудитории."
    }
  },
  {
    title: { en: "Development", ru: "Разработка" },
    copy: {
      en: "Responsive, accessible and production-ready website development.",
      ru: "Адаптивная, доступная и готовая к запуску разработка сайтов."
    }
  },
  {
    title: { en: "Launch & Integrations", ru: "Запуск и интеграции" },
    copy: {
      en: "Forms, domains, deployment, analytics and lightweight business integrations.",
      ru: "Формы, домены, деплой, аналитика и легкие бизнес-интеграции."
    }
  },
  {
    title: { en: "Lightweight Automations", ru: "Легкие автоматизации" },
    copy: {
      en: "Booking flows, notifications, API integrations and simple tools that reduce repetitive tasks.",
      ru: "Запись, уведомления, API-интеграции и простые инструменты, которые сокращают рутину."
    }
  }
] satisfies readonly { title: LocalizedString; copy: LocalizedString }[];

export const aboutCopy = {
  en: "Independent web designer and developer based in Tbilisi, creating clear websites, booking flows and lightweight digital tools for service businesses.",
  ru: "Независимый веб-дизайнер и разработчик из Тбилиси. Создаю понятные сайты, формы записи и легкие цифровые инструменты для сервисного бизнеса."
} satisfies LocalizedString;

export const advantages = [
  {
    before: { en: "No agency, no middlemen ", ru: "Без агентства и посредников " },
    tag: "[DIRECT]",
    after: { en: " - you talk straight to me, always", ru: " - вы всегда общаетесь напрямую со мной" }
  },
  {
    before: { en: "Fast turnaround ", ru: "Быстрый запуск " },
    tag: "[SPEED]",
    after: {
      en: ", small scope, zero unnecessary bureaucracy along the way",
      ru: ", небольшой объем и без лишней бюрократии"
    }
  },
  {
    before: { en: "Every project built around one clear goal ", ru: "Каждый проект строится вокруг одной понятной цели " },
    tag: "[FOCUS]",
    after: { en: " - turning visitors into clients", ru: " - превращать посетителей в клиентов" }
  },
  {
    before: { en: "Fixes and updates available anytime after launch ", ru: "Правки и обновления доступны после запуска " },
    tag: "[SUPPORT]",
    after: { en: ", without extra hassle or delays", ru: ", без лишних сложностей и задержек" }
  }
] satisfies readonly { before: LocalizedString; tag: string; after: LocalizedString }[];

export type ProjectId = "thai-nari" | "pavel-portfolio";

type LocalizedProjectScreen = {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
  width: number;
  height: number;
};

type LocalizedProjectShowcase = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  description?: LocalizedString;
  screens: readonly LocalizedProjectScreen[];
  placeholderCount?: number;
};

export type ProjectContent = {
  id: ProjectId;
  title: LocalizedString;
  year: string;
  category: LocalizedString;
  type: LocalizedString;
  role: LocalizedString;
  overview: LocalizedString;
  description: LocalizedString;
  visualSystem: LocalizedString;
  typography: LocalizedString;
  motion: LocalizedString;
  context: LocalizedString;
  direction: LocalizedString;
  liveUrl: string;
  previewImage: string;
  desktopImage?: string;
  mobileImage?: string;
  ogImage?: string;
  desktopShowcase?: LocalizedProjectShowcase;
  mobileShowcase?: LocalizedProjectShowcase;
  alt: LocalizedString;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
};

export type ProjectScreen = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ProjectShowcase = {
  eyebrow: string;
  title: string;
  description?: string;
  screens: ProjectScreen[];
  placeholderCount?: number;
};

export type Project = {
  id: ProjectId;
  title: string;
  year: string;
  category: string;
  type: string;
  role: string;
  overview: string;
  description: string;
  visualSystem: string;
  typography: string;
  motion: string;
  context: string;
  direction: string;
  route: string;
  liveUrl: string;
  previewImage: string;
  desktopImage?: string;
  mobileImage?: string;
  ogImage?: string;
  desktopShowcase?: ProjectShowcase;
  mobileShowcase?: ProjectShowcase;
  alt: string;
  seoTitle: string;
  seoDescription: string;
};

export const projectContent = [
  {
    id: "thai-nari",
    title: { en: "Thai Nari", ru: "Thai Nari" },
    year: "2026",
    category: { en: "Thai SPA & Wellness", ru: "Тайский SPA и wellness" },
    type: { en: "Concept Project", ru: "Концепт-проект" },
    role: {
      en: "Art Direction, UI Design, Development, Motion",
      ru: "Арт-дирекшн, UI-дизайн, разработка, анимация"
    },
    overview: {
      en: "A digital experience for a Thai wellness studio, created to translate its calm atmosphere into a refined and easy-to-explore website.",
      ru: "Цифровой опыт для тайской wellness-студии, который переносит спокойную атмосферу пространства в аккуратный и понятный сайт."
    },
    description: {
      en: "Thai Nari is a website concept for a Thai wellness studio, designed to translate the calm atmosphere of the physical space into a refined and easy-to-explore digital experience.",
      ru: "Thai Nari - концепт сайта для тайской wellness-студии, созданный, чтобы перенести спокойную атмосферу физического пространства в продуманный цифровой опыт."
    },
    visualSystem: {
      en: "A warm, tactile palette - cream and beige floating on near-black - so the calm of a physical treatment room survives the jump into a screen instead of flattening into another spa template.",
      ru: "Теплая тактильная палитра - кремовые и бежевые оттенки на почти черной основе - помогает сохранить ощущение спокойного кабинета, а не превратить сайт в очередной spa-шаблон."
    },
    typography: {
      en: "A soft display headline sits above quiet, unhurried body text - the same contrast between ritual and practicality you feel walking from the reception desk into a treatment room.",
      ru: "Мягкий крупный заголовок сочетается со спокойным основным текстом - тот же контраст ритуала и практичности, который ощущается между ресепшеном и процедурной комнатой."
    },
    motion: {
      en: "Panels unfold like doors opening onto a private room - slow, deliberate reveals instead of quick fades, paced like an actual visit rather than a scroll session.",
      ru: "Блоки раскрываются как двери в отдельную комнату - медленно и намеренно, без быстрых фейдов, с темпом реального визита, а не бесконечного скролла."
    },
    context: {
      en: "Wellness studios often end up with generic spa templates that photograph well but explain nothing about the actual experience of walking in.",
      ru: "Wellness-студии часто получают типовые spa-шаблоны, которые хорошо выглядят на картинке, но почти не объясняют реальный опыт посещения."
    },
    direction: {
      en: "Slowed the whole flow down on purpose - fewer sections, more breathing room - so browsing the site takes roughly as long as deciding whether to book.",
      ru: "Весь сценарий намеренно замедлен: меньше секций, больше воздуха, чтобы просмотр сайта ощущался ближе к спокойному решению о записи."
    },
    liveUrl: "https://thai-sooty.vercel.app/",
    // TODO: add real screenshots when available: /projects/thai-nari/desktop.webp and /projects/thai-nari/mobile.webp.
    previewImage: "/projects/thai-nari/preview.webp",
    desktopShowcase: {
      eyebrow: { en: "Desktop experience", ru: "Десктопный опыт" },
      title: {
        en: "A calm digital journey through rituals, space and booking.",
        ru: "Спокойный цифровой путь через ритуалы, пространство и запись."
      },
      description: {
        en: "Editorial compositions, immersive imagery and clear booking actions guide visitors through the complete Thai Nari experience.",
        ru: "Редакционные композиции, атмосферные изображения и понятные действия записи проводят посетителя через весь опыт Thai Nari."
      },
      screens: [
        {
          src: "/projects/thai-nari/dekstop1.jpg",
          alt: {
            en: "Thai Nari desktop website interface",
            ru: "Десктопный интерфейс сайта Thai Nari"
          },
          caption: { en: "Services & Rituals", ru: "Услуги и ритуалы" },
          width: 1891,
          height: 941
        },
        {
          src: "/projects/thai-nari/dekstop2.jpg",
          alt: {
            en: "Thai Nari desktop wellness programs interface",
            ru: "Десктопный интерфейс wellness-программ Thai Nari"
          },
          caption: { en: "Program Discovery", ru: "Знакомство с программами" },
          width: 1889,
          height: 951
        },
        {
          src: "/projects/thai-nari/dekstop3.jpg",
          alt: {
            en: "Thai Nari desktop atmosphere and editorial content",
            ru: "Атмосфера и редакционный контент Thai Nari на десктопе"
          },
          caption: { en: "Atmosphere & Story", ru: "Атмосфера и история" },
          width: 1887,
          height: 943
        }
      ]
    },
    mobileShowcase: {
      eyebrow: { en: "Mobile experience", ru: "Мобильный опыт" },
      title: {
        en: "The same atmosphere, rebuilt for a smaller screen.",
        ru: "Та же атмосфера, адаптированная под маленький экран."
      },
      description: {
        en: "The responsive experience preserves the visual identity while keeping content, services and booking actions easy to reach.",
        ru: "Адаптивный опыт сохраняет визуальную идентичность и оставляет контент, услуги и запись под рукой."
      },
      screens: [
        {
          src: "/projects/thai-nari/mobile1.png",
          alt: {
            en: "Thai Nari mobile homepage presented inside an iPhone",
            ru: "Мобильная главная страница Thai Nari в рамке iPhone"
          },
          caption: { en: "Mobile Hero", ru: "Мобильный hero-блок" },
          width: 1122,
          height: 1402
        },
        {
          src: "/projects/thai-nari/mobile2.png",
          alt: {
            en: "Thai Nari mobile editorial and story section presented inside an iPhone",
            ru: "Мобильный редакционный блок и история Thai Nari в рамке iPhone"
          },
          caption: { en: "Story & Atmosphere", ru: "История и атмосфера" },
          width: 1122,
          height: 1402
        },
        {
          src: "/projects/thai-nari/mobile3.png",
          alt: {
            en: "Thai Nari mobile service and booking interface presented inside an iPhone",
            ru: "Мобильный интерфейс услуг и записи Thai Nari в рамке iPhone"
          },
          caption: { en: "Service & Booking", ru: "Услуги и запись" },
          width: 1122,
          height: 1402
        }
      ]
    },
    alt: { en: "Thai Nari website preview", ru: "Превью сайта Thai Nari" },
    seoTitle: {
      en: "Thai Nari - SPA Website Case Study | Pavel Kostin",
      ru: "Thai Nari - кейс сайта SPA | Павел Костин"
    },
    seoDescription: {
      en: "Design and development of a responsive website concept for a Thai wellness studio.",
      ru: "Дизайн и разработка адаптивного концепта сайта для тайской wellness-студии."
    }
  },
  {
    id: "pavel-portfolio",
    title: { en: "Pavel Portfolio", ru: "Портфолио Павла" },
    year: "2026",
    category: { en: "Personal Portfolio", ru: "Личное портфолио" },
    type: { en: "Personal Project", ru: "Личный проект" },
    role: {
      en: "Art Direction, UI Design, Development, Motion System",
      ru: "Арт-дирекшн, UI-дизайн, разработка, система анимаций"
    },
    overview: {
      en: "A personal portfolio focused on editorial typography, project storytelling and a responsive motion system.",
      ru: "Личное портфолио с фокусом на редакционную типографику, проектные истории и адаптивную систему анимаций."
    },
    description: {
      en: "A personal portfolio created as a complete identity, interface and motion system for an independent web designer and developer.",
      ru: "Личное портфолио, созданное как цельная айдентика, интерфейс и motion-система для независимого веб-дизайнера и разработчика."
    },
    visualSystem: {
      en: "Everything here doubles as a live demo - the grid, the type scale, the color system are the actual production styles a client would get, not a mockup wrapped around fake content.",
      ru: "Все здесь работает как живое демо: сетка, типографика и цветовая система - реальные production-подходы, а не макет вокруг вымышленного контента."
    },
    typography: {
      en: "A single geometric display face carries every headline; body copy stays in a plain grotesk, so the one accent left in the type system is a deliberate signature, not decoration.",
      ru: "Один геометричный display-шрифт держит крупные заголовки, а основной текст остается спокойным, чтобы акцент в типографике выглядел намеренным, а не декоративным."
    },
    motion: {
      en: "Word-by-word reveals, a magnetic cursor and letter-swap hovers exist to prove the interaction is hand-built with GSAP, not a template effect - the kind of detail a client notices without being told why the site feels different.",
      ru: "Появление текста по словам, магнитный курсор и letter-swap hover показывают, что интеракции собраны вручную на GSAP, а не взяты из шаблона."
    },
    context: {
      en: "A freelancer's site usually reads like a brochure - logo, services, contact - and proves nothing about how the person actually builds. This one had to work as the strongest case study in the whole portfolio.",
      ru: "Сайт фрилансера часто читается как буклет: логотип, услуги, контакты. Здесь портфолио должно само доказывать, как человек проектирует и разрабатывает."
    },
    direction: {
      en: "Built the site itself as the pitch: real code, a focused dark interface, real motion - so sending the link in a cold DM does more work than a sentence ever could.",
      ru: "Сам сайт построен как презентация: реальный код, сфокусированный темный интерфейс и настоящая анимация, чтобы ссылка в сообщении работала сильнее короткого описания."
    },
    liveUrl: "https://pavel-portfolio-six.vercel.app/",
    // TODO: add real screenshots when available: /projects/pavel-portfolio/desktop.webp and /projects/pavel-portfolio/mobile.webp.
    previewImage: "/projects/pavel-portfolio/preview.webp",
    desktopShowcase: {
      eyebrow: { en: "Desktop experience", ru: "Десктопный опыт" },
      title: {
        en: "An editorial portfolio system built around project clarity.",
        ru: "Редакционная система портфолио, построенная вокруг ясности проектов."
      },
      description: {
        en: "Large display typography, precise spacing and restrained motion make the portfolio feel direct without losing its visual identity.",
        ru: "Крупная display-типографика, точные отступы и сдержанная анимация делают портфолио прямым, но сохраняют визуальный характер."
      },
      screens: [
        {
          src: "/projects/pavel-portfolio/desktop1.jpg",
          alt: {
            en: "Pavel Portfolio desktop homepage interface",
            ru: "Десктопный интерфейс главной страницы портфолио Павла"
          },
          caption: { en: "Homepage System", ru: "Система главной страницы" },
          width: 1904,
          height: 936
        },
        {
          src: "/projects/pavel-portfolio/desktop2.jpg",
          alt: {
            en: "Pavel Portfolio desktop selected work section",
            ru: "Десктопная секция избранных проектов портфолио Павла"
          },
          caption: { en: "Selected Work", ru: "Избранные проекты" },
          width: 1903,
          height: 928
        },
        {
          src: "/projects/pavel-portfolio/desktop3.jpg",
          alt: {
            en: "Pavel Portfolio desktop contact and conversion section",
            ru: "Десктопная секция контактов и заявки в портфолио Павла"
          },
          caption: { en: "Contact Flow", ru: "Контактный сценарий" },
          width: 1904,
          height: 937
        }
      ]
    },
    mobileShowcase: {
      eyebrow: { en: "Mobile experience", ru: "Мобильный опыт" },
      title: {
        en: "The same editorial system, tightened for smaller screens.",
        ru: "Та же редакционная система, уплотненная для маленьких экранов."
      },
      description: {
        en: "The responsive experience keeps the portfolio's editorial rhythm readable while keeping work, services and contact actions close at hand.",
        ru: "Адаптивная версия сохраняет редакционный ритм портфолио и оставляет проекты, услуги и контактные действия рядом."
      },
      screens: [],
      // TODO: replace placeholders with real mobile screenshots: /projects/pavel-portfolio/mobile1.png, mobile2.png and mobile3.png.
      placeholderCount: 3
    },
    alt: { en: "Pavel Portfolio homepage preview", ru: "Превью главной страницы портфолио Павла" },
    seoTitle: {
      en: "Pavel Portfolio - Web Design Case Study | Pavel Kostin",
      ru: "Портфолио Павла - кейс веб-дизайна | Павел Костин"
    },
    seoDescription: {
      en: "Design and development of an editorial personal portfolio for an independent web designer.",
      ru: "Дизайн и разработка редакционного личного портфолио для независимого веб-дизайнера."
    }
  }
] satisfies readonly ProjectContent[];

export const projectIds = projectContent.map((project) => project.id) as ProjectId[];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localize<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}

export function stripLocaleFromPath(pathname: string) {
  if (pathname === "/ru") {
    return "/";
  }

  if (pathname.startsWith("/ru/")) {
    return pathname.slice(3) || "/";
  }

  return pathname || "/";
}

export function withLocale(locale: Locale, pathname: string) {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const unlocalizedPathname = stripLocaleFromPath(normalizedPathname);

  if (locale === defaultLocale) {
    return unlocalizedPathname;
  }

  return unlocalizedPathname === "/" ? "/ru" : `/ru${unlocalizedPathname}`;
}

export function getProjectPath(projectId: ProjectId, locale: Locale) {
  return withLocale(locale, `/projects/${projectId}`);
}

export function getAlternateLanguages(pathname: string) {
  return {
    en: withLocale("en", pathname),
    ru: withLocale("ru", pathname),
    "x-default": withLocale(defaultLocale, pathname)
  };
}

export function getSite(locale: Locale) {
  return {
    name: site.name,
    shortName: site.shortName,
    productionUrl: site.productionUrl,
    repositoryUrl: site.repositoryUrl,
    title: site.title[locale],
    description: site.description[locale],
    availability: site.availability[locale],
    location: site.location[locale],
    role: site.role[locale],
    ogRole: site.ogRole[locale]
  };
}

export function getNavigation(locale: Locale) {
  return navigation.map((item) => ({
    label: item.label[locale],
    href: item.href
  }));
}

export function getHomepageServices(locale: Locale) {
  return homepageServices.map((service) => ({
    title: service.title[locale],
    copy: service.copy[locale]
  }));
}

export function getAdvantages(locale: Locale) {
  return advantages.map((advantage) => ({
    before: advantage.before[locale],
    tag: advantage.tag,
    after: advantage.after[locale]
  }));
}

function localizeShowcase(showcase: LocalizedProjectShowcase | undefined, locale: Locale): ProjectShowcase | undefined {
  if (!showcase) {
    return undefined;
  }

  return {
    eyebrow: showcase.eyebrow[locale],
    title: showcase.title[locale],
    description: showcase.description?.[locale],
    screens: showcase.screens.map((screen) => ({
      ...screen,
      alt: screen.alt[locale],
      caption: screen.caption[locale]
    })),
    placeholderCount: showcase.placeholderCount
  };
}

export function localizeProject(project: ProjectContent, locale: Locale): Project {
  return {
    id: project.id,
    title: project.title[locale],
    year: project.year,
    category: project.category[locale],
    type: project.type[locale],
    role: project.role[locale],
    overview: project.overview[locale],
    description: project.description[locale],
    visualSystem: project.visualSystem[locale],
    typography: project.typography[locale],
    motion: project.motion[locale],
    context: project.context[locale],
    direction: project.direction[locale],
    route: getProjectPath(project.id, locale),
    liveUrl: project.liveUrl,
    previewImage: project.previewImage,
    desktopImage: project.desktopImage,
    mobileImage: project.mobileImage,
    ogImage: project.ogImage,
    desktopShowcase: localizeShowcase(project.desktopShowcase, locale),
    mobileShowcase: localizeShowcase(project.mobileShowcase, locale),
    alt: project.alt[locale],
    seoTitle: project.seoTitle[locale],
    seoDescription: project.seoDescription[locale]
  };
}

export function getProjects(locale: Locale) {
  return projectContent.map((project) => localizeProject(project, locale));
}

export function getProjectById(projectId: ProjectId, locale: Locale) {
  const project = projectContent.find((item) => item.id === projectId);
  return project ? localizeProject(project, locale) : undefined;
}

export const projects = getProjects(defaultLocale);

export const projectById = projects.reduce<Record<ProjectId, Project>>((accumulator, project) => {
  accumulator[project.id] = project;
  return accumulator;
}, {} as Record<ProjectId, Project>);
