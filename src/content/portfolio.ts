export const site = {
  name: "Pavel Kostin",
  title: "Pavel - Web Designer & Developer in Tbilisi",
  description:
    "Independent web designer and developer creating visually strong websites for modern businesses in Tbilisi and worldwide.",
  availability: "Available for new projects",
  location: "Tbilisi / Worldwide"
};

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const contact = {
  instagram: "REPLACE_WITH_INSTAGRAM_URL",
  telegram: "REPLACE_WITH_TELEGRAM_URL",
  whatsapp: "REPLACE_WITH_WHATSAPP_URL",
  email: "REPLACE_WITH_EMAIL"
};

export const projectLinks = {
  thaiNari: "REPLACE_WITH_THAI_NARI_LIVE_URL"
};

export const homepageServices = [
  {
    title: "Web Design",
    copy: "Clear visual systems and interfaces shaped around the business and its audience."
  },
  {
    title: "Development",
    copy: "Responsive, animated and production-ready implementation."
  },
  {
    title: "Launch & Integrations",
    copy: "Forms, deployment, domains and lightweight business integrations."
  }
];

export const project = {
  slug: "thai-nari",
  title: "Thai Nari",
  category: "Thai SPA & Wellness",
  service: "Web Design & Development",
  status: "Concept Project / 2026",
  intro:
    "Thai Nari is a website concept for a Thai wellness studio, designed to translate the calm atmosphere of the physical space into a refined and easy-to-explore digital experience.",
  role: "Art Direction, UI Design, Development, Motion",
  year: "2026",
  type: "Concept Project",
  route: "/work/thai-nari"
};

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

export const goals = [
  {
    title: "Present services",
    description:
      "Organize complex services, specialists, prices and frequently asked questions into a clear structure.",
    structure: ["Overview", "Services", "Specialists", "FAQ", "Contact"],
    cta: "Explore services"
  },
  {
    title: "Show projects",
    description:
      "Turn completed work into a structured portfolio that communicates quality and builds trust.",
    structure: ["Selected work", "Project details", "Process", "About", "Enquiry"],
    cta: "View projects"
  },
  {
    title: "Receive bookings",
    description:
      "Create a simple path from interest to a direct enquiry, consultation or booking request.",
    structure: ["Offer", "Details", "Availability", "Reviews", "Booking"],
    cta: "Book a consultation"
  }
] as const;
