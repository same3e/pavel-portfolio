export const site = {
  name: "Pavel Kostin",
  shortName: "PAVEL",
  title: "Pavel Kostin - Web Designer & Developer in Tbilisi",
  description:
    "Independent web designer and developer creating clear websites, booking flows and lightweight digital tools for service businesses in Tbilisi and worldwide.",
  availability: "Available for new projects",
  location: "Tbilisi / Worldwide",
  productionUrl: "https://pavel-portfolio-six.vercel.app/",
  repositoryUrl: "https://github.com/same3e/pavel-portfolio"
};

export const hero = {
  lines: ["I build websites", "that turn interest", "into enquiries."],
  aria: "I build websites that turn interest into enquiries.",
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
  "Independent web designer and developer based in Tbilisi, creating clear websites, booking flows and lightweight digital tools for service businesses.";

export type Project = {
  id: "thai-nari" | "pavel-portfolio";
  title: string;
  year: string;
  category: string;
  type: string;
  role: string;
  overview: string;
  description: string;
  route: `/work/${string}`;
  liveUrl: string;
  previewImage: string;
  desktopImage?: string;
  mobileImage?: string;
  ogImage?: string;
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
    route: "/work/thai-nari",
    liveUrl: "https://thai-sooty.vercel.app/",
    // TODO: add real screenshots when available: /projects/thai-nari/desktop.webp and /projects/thai-nari/mobile.webp.
    previewImage: "/projects/thai-nari/preview.svg",
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
    route: "/work/pavel-portfolio",
    liveUrl: "https://pavel-portfolio-six.vercel.app/",
    // TODO: add real screenshots when available: /projects/pavel-portfolio/desktop.webp and /projects/pavel-portfolio/mobile.webp.
    previewImage: "/projects/pavel-portfolio/preview.svg",
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
