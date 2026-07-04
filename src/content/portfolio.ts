export const site = {
  name: "Pavel Kostin",
  shortName: "PAVEL",
  title: "Pavel Kostin - Web Designer & Developer in Tbilisi",
  description:
    "Independent web designer and developer creating clear websites, booking flows and lightweight digital tools for service businesses in Tbilisi and worldwide",
  availability: "Available for new projects",
  location: "Tbilisi / Worldwide",
  productionUrl: "https://pavel-portfolio-six.vercel.app/",
  repositoryUrl: "https://github.com/same3e/pavel-portfolio"
};

export const hero = {
  lines: ["I build websites", "that turn interest", "into enquiries"],
  aria: "I build websites that turn interest into enquiries",
  subtitle:
    "Conversion-focused websites, booking flows and lightweight integrations for service businesses."
};

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const contact = {
  email: "kostinpavel447@gmail.com",
  instagram: "https://www.instagram.com/pavel.websites/",
  // TODO: replace with a professional Telegram username.
  telegram: "https://t.me/cndjchsjw",
  whatsapp: "https://wa.me/995599174299?text=Hello%20Pavel%2C%20I%20would%20like%20to%20discuss%20a%20website%20for%20my%20business."
};

export const homepageServices = [
  {
    title: "Web Design",
    copy: "Clear visual systems and interfaces shaped around the business and its audience."
  },
  {
    title: "Development",
    copy: "Responsive, accessible and production-ready website development."
  },
  {
    title: "Launch & Integrations",
    copy: "Forms, domains, deployment, analytics and lightweight business integrations."
  },
  {
    title: "Lightweight Automations",
    copy: "Booking flows, notifications, API integrations and simple tools that reduce repetitive tasks."
  }
];

export const aboutCopy =
  "Independent web designer and developer based in Tbilisi, creating clear websites, booking flows and lightweight digital tools for service businesses";

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
  id: "thai-nari" | "pavel-portfolio";
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
  route: `/work/${string}`;
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

export const projects = [
  {
    id: "thai-nari",
    title: "Thai Nari",
    year: "2026",
    category: "Thai SPA & Wellness",
    type: "Concept Project",
    role: "Art Direction, UI Design, Development, Motion",
    overview:
      "A digital experience for a Thai wellness studio, created to translate its calm atmosphere into a refined and easy-to-explore website.",
    description:
      "Thai Nari is a website concept for a Thai wellness studio, designed to translate the calm atmosphere of the physical space into a refined and easy-to-explore digital experience.",
    visualSystem:
      "A warm, tactile palette - cream and beige against near-black - makes the calm interior feel like it's floating inside the interface, not printed on a template.",
    typography:
      "A soft pixel headline sits above quiet, plain body text - the same contrast between ritual and practicality that defines an actual spa visit.",
    motion:
      "Panels unfold like doors opening onto a treatment room - slow, deliberate reveals instead of quick fades, matching the pace of a real visit rather than a scroll.",
    context:
      "Wellness studios often end up with generic spa templates that photograph well but explain nothing about the actual experience of walking in.",
    direction:
      "Slowed the whole flow down on purpose - fewer sections, more breathing room - so browsing the site takes roughly as long as deciding whether to book.",
    route: "/work/thai-nari",
    liveUrl: "https://thai-sooty.vercel.app/",
    // TODO: add real screenshots when available: /projects/thai-nari/desktop.webp and /projects/thai-nari/mobile.webp.
    previewImage: "/projects/thai-nari/preview.webp",
    desktopShowcase: {
      eyebrow: "Desktop experience",
      title: "A calm digital journey through rituals, space and booking.",
      description:
        "Editorial compositions, immersive imagery and clear booking actions guide visitors through the complete Thai Nari experience.",
      screens: [
        {
          src: "/projects/thai-nari/dekstop1.jpg",
          alt: "Thai Nari desktop website interface",
          caption: "Services & Rituals",
          width: 1891,
          height: 941
        },
        {
          src: "/projects/thai-nari/dekstop2.jpg",
          alt: "Thai Nari desktop wellness programs interface",
          caption: "Program Discovery",
          width: 1889,
          height: 951
        },
        {
          src: "/projects/thai-nari/dekstop3.jpg",
          alt: "Thai Nari desktop atmosphere and editorial content",
          caption: "Atmosphere & Story",
          width: 1887,
          height: 943
        }
      ]
    },
    mobileShowcase: {
      eyebrow: "Mobile experience",
      title: "The same atmosphere, rebuilt for a smaller screen.",
      description:
        "The responsive experience preserves the visual identity while keeping content, services and booking actions easy to reach.",
      screens: [
        {
          src: "/projects/thai-nari/mobile1.png",
          alt: "Thai Nari mobile homepage presented inside an iPhone",
          caption: "Mobile Hero",
          width: 1122,
          height: 1402
        },
        {
          src: "/projects/thai-nari/mobile2.png",
          alt: "Thai Nari mobile editorial and story section presented inside an iPhone",
          caption: "Story & Atmosphere",
          width: 1122,
          height: 1402
        },
        {
          src: "/projects/thai-nari/mobile3.png",
          alt: "Thai Nari mobile service and booking interface presented inside an iPhone",
          caption: "Service & Booking",
          width: 1122,
          height: 1402
        }
      ]
    },
    alt: "Thai Nari website preview",
    seoTitle: "Thai Nari - SPA Website Case Study | Pavel Kostin",
    seoDescription: "Design and development of a responsive website concept for a Thai wellness studio."
  },
  {
    id: "pavel-portfolio",
    title: "Pavel Portfolio",
    year: "2026",
    category: "Personal Portfolio",
    type: "Personal Project",
    role: "Art Direction, UI Design, Development, Motion System",
    overview:
      "A personal portfolio focused on editorial typography, project storytelling and a responsive motion system.",
    description:
      "A personal portfolio created as a complete identity, interface and motion system for an independent web designer and developer.",
    visualSystem:
      "Everything here doubles as a live demo - the grid, the type scale, the color system are the actual production styles a client would get, not a mockup wrapped around fake content.",
    typography:
      "A light pixel display face carries only headlines and labels; every paragraph stays in a plain grotesk, so the accent reads as a signature, not a readability tax.",
    motion:
      "Word-by-word reveals and letter-swap hovers exist to prove the animation is hand-built with GSAP, not a template effect - the kind of detail a client notices without being told.",
    context:
      "A freelancer's site usually reads like a brochure - logo, services, contact - and proves nothing about how the person actually builds. This one had to work as the strongest case study in the whole portfolio.",
    direction:
      "Built the site itself as the pitch: real code, a working theme switch, real motion - so sending the link in a cold DM does more work than a sentence ever could.",
    route: "/work/pavel-portfolio",
    liveUrl: "https://pavel-portfolio-six.vercel.app/",
    // TODO: add real screenshots when available: /projects/pavel-portfolio/desktop.webp and /projects/pavel-portfolio/mobile.webp.
    previewImage: "/projects/pavel-portfolio/preview.webp",
    desktopShowcase: {
      eyebrow: "Desktop experience",
      title: "An editorial portfolio system built around project clarity.",
      description:
        "Large display typography, precise spacing and restrained motion make the portfolio feel direct without losing its visual identity.",
      screens: [
        {
          src: "/projects/pavel-portfolio/desktop1.jpg",
          alt: "Pavel Portfolio desktop homepage interface",
          caption: "Homepage System",
          width: 1904,
          height: 936
        },
        {
          src: "/projects/pavel-portfolio/desktop2.jpg",
          alt: "Pavel Portfolio desktop selected work section",
          caption: "Selected Work",
          width: 1903,
          height: 928
        },
        {
          src: "/projects/pavel-portfolio/desktop3.jpg",
          alt: "Pavel Portfolio desktop contact and conversion section",
          caption: "Contact Flow",
          width: 1904,
          height: 937
        }
      ]
    },
    mobileShowcase: {
      eyebrow: "Mobile experience",
      title: "The same editorial system, tightened for smaller screens.",
      description:
        "The responsive experience keeps the portfolio's editorial rhythm readable while keeping work, services and contact actions close at hand.",
      screens: [],
      // TODO: replace placeholders with real mobile screenshots: /projects/pavel-portfolio/mobile1.png, mobile2.png and mobile3.png.
      placeholderCount: 3
    },
    alt: "Pavel Portfolio homepage preview",
    seoTitle: "Pavel Portfolio - Web Design Case Study | Pavel Kostin",
    seoDescription: "Design and development of an editorial personal portfolio for an independent web designer."
  }
] satisfies readonly Project[];

export const projectById = projects.reduce<Record<Project["id"], Project>>((accumulator, project) => {
  accumulator[project.id] = project;
  return accumulator;
}, {} as Record<Project["id"], Project>);

export const legacyServices = [
  {
    title: "Business websites",
    copy: "Official websites for businesses that need a clear, credible and professional digital presence."
  },
  {
    title: "Service catalogs",
    copy: "Structured presentations for treatments, tours, furniture, properties, specialists or other complex offers."
  },
  {
    title: "Landing pages",
    copy: "Focused pages for a specific service, campaign, location or product."
  },
  {
    title: "Forms and integrations",
    copy: "Contact forms, booking requests, Telegram notifications, API integrations and launch support."
  }
];

export const industries = [
  ["Clinics", "Clear presentations of doctors, services, expertise and appointment paths."],
  ["Beauty & Wellness", "Service catalogs, specialist profiles, results, pricing and booking."],
  ["Travel", "Tour collections, routes, programs, pricing and direct enquiries."],
  ["Furniture & Interiors", "Project portfolios, product catalogs, materials and quote requests."],
  ["Property", "Structured listings, services, locations and enquiry flows."],
  ["Local Services", "Credible websites that explain the offer and make contact simple."]
] as const;

export const process = [
  ["Understand", "I study the business, its services, customers and the main action the website should encourage."],
  ["Direction", "I create the visual concept, content hierarchy and core page structure."],
  ["Develop", "I build the responsive website, interactions, animations and required integrations."],
  ["Launch", "I test the final result, connect the domain and prepare the website for publication."]
] as const;
