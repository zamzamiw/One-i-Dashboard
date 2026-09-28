import type { Dictionary } from ".";

// Teks halaman bahasa Inggris.
// TODO: SEMUA teks di file ini adalah terjemahan draft Claude dari id.ts (PRD hanya berbahasa
// Indonesia). Minta penutur/penerjemah meninjau sebelum go-live.
export const en: Dictionary = {
  meta: {
    title: "Sales Information System for Distributors",
    description: "An information system that helps distributors monitor their sales team, margins, and business performance.",
    ogLocale: "en_US",
  },
  common: {
    newTab: "(opens in a new tab)",
  },
  whatsapp: {
    // Still mentions "website" so leads from the site can be counted (PRD section 9).
    message: "Hi One-I, I found you through your website and would like a consultation.",
    floatLabel: "Chat with One-I on WhatsApp",
  },
  nav: {
    ariaLabel: "Main navigation",
    home: "back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    more: "More",
    switchLanguage: "Switch language to",
    links: {
      tentang: "About",
      masalah: "Problems",
      layanan: "Services",
      "cara-kerja": "How It Works",
      kenapa: "Why One-I?",
      testimoni: "Testimonials",
    },
    whatsapp: "WhatsApp",
    contact: "Contact Us",
  },
  languageTransition: {
    status: "Switching language…",
  },
  hero: {
    titleLead: "Know every sales move,",
    titleAccent: "grow with confidence.",
    subtitle: "An information system that helps distributors monitor their sales team, margins, and business performance.",
    chartTitle: "Growth route chart: gradual in the Track stage, rising at Perform, then soaring at Grow",
    stages: [
      { name: "Track", text: "Monitor your sales team's field activity and routes in real time." },
      { name: "Perform", text: "Measure sales performance and the profit margin of every customer." },
      { name: "Grow", text: "Make decisions from business insights and grow with confidence." },
    ],
  },
  techStack: {
    eyebrow: "Built on proven technology",
    title: "The Technology Behind One-I",
  },
  about: {
    title: "About One-I",
    intro:
      "One-I is a digital platform that provides sales information systems for distributors. It turns complex field data into insights that are easy to understand.",
    acronymLabel: "One-I stands for",
    body: "We build an integrated information system that helps distributors manage, monitor, and grow every sales activity — from the field to the management desk. Track sales, monitor your team, and analyze profit margins in real time, with a system that adapts to your business.",
  },
  problems: {
    title: "Problems Distributors Face",
    description:
      "Many distributors still rely on manual reports and scattered data, so problems in the field only surface when it is already too late.",
    counter: "Problem",
    items: [
      { title: "Sales team out of sight", text: "Field sales activity is hard to monitor in real time" },
      { title: "Margins you can't see", text: "Profit margin per customer is not clearly visible" },
      { title: "Scattered reports", text: "Management reports are scattered and disconnected" },
      {
        title: "Unplanned routes",
        text: "Sales team routes and movements are unplanned, leading to ineffective visits and missed stores",
      },
      { title: "Inefficient deliveries", text: "Poorly structured delivery routes hold back efficiency" },
    ],
  },
  features: {
    title: "What One-I Does",
    description: "One-I is designed to help distributors connect their field teams with the information management needs.",
    items: [
      {
        title: "Sales-to-Customer Tracking",
        description: "Monitor each salesperson's transactions and sales activity with every customer or store in real time.",
      },
      {
        title: "Sales Team Movement Tracking",
        description: "Monitor your sales team's routes and movements in the field for optimal visit coverage.",
      },
      {
        title: "One-Page Info for Presentations",
        description: "Concise one-page material for salespeople when presenting products to stores.",
      },
      {
        title: "Profit Margin Tracking per Customer",
        description: "Calculate and monitor the profit margin of every transaction per customer.",
      },
      {
        title: "Business Insights per Business Line",
        description: "Summarize overall business performance per business line for management decisions.",
      },
    ],
  },
  howItWorks: {
    title: "How Can We Help?",
    steps: ["Needs consultation", "System implementation", "Ongoing monitoring & development"],
  },
  why: {
    title: "Why One-I?",
    points: ["Real-time monitoring", "Data-driven insights", "Tailored to your business", "Supported by a local team"],
  },
  testimonials: {
    title: "What People Say About One-I",
    description: "Stories from distribution teams who monitor their sales with One-I.",
    labels: { carousel: "Customer testimonials", previous: "Previous testimonial", next: "Next testimonial" },
    // TODO: placeholder testimonials, same as id.ts; replace before go-live.
    items: [
      {
        quote: "Now I can see my sales team's field activity anytime, without waiting for the afternoon report.",
        name: "Budi Santoso",
        role: "Owner, FMCG distributor, Surabaya",
      },
      {
        quote: "Margins per store are finally clear. We now know which customers are truly profitable.",
        name: "Rina Wulandari",
        role: "Finance Manager, beverage distributor, Bandung",
      },
      {
        quote: "Reports that used to be scattered across many files are now in one place. Weekly meetings are much shorter.",
        name: "Hendra Kurniawan",
        role: "General Manager, consumer goods distributor, Semarang",
      },
      {
        quote: "Visit routes are more organized. Stores we used to miss are now covered.",
        name: "Dewi Lestari",
        role: "Sales Supervisor, snack distributor, Medan",
      },
      {
        quote: "The one-page material really helps our salespeople when presenting products to new stores.",
        name: "Agus Pratama",
        role: "Head of Sales, staple foods distributor, Makassar",
      },
      {
        quote: "Our sales team adapted quickly. Within a week, everyone was using it every day.",
        name: "Siti Nurhaliza",
        role: "Operations Manager, pharmaceutical distributor, Yogyakarta",
      },
      {
        quote: "The One-I team is always responsive whenever we need help. It feels like having our own IT team.",
        name: "Yohanes Tanoto",
        role: "Owner, stationery distributor, Denpasar",
      },
      {
        quote: "We now decide on opening new areas based on data, not guesswork.",
        name: "Fitri Amalia",
        role: "Operations Director, cosmetics distributor, Jakarta",
      },
    ],
  },
  cta: {
    title: "Ready to get full visibility of your sales team?",
    subtitle: "Discuss your distribution needs with One-I.",
    button: "Contact Us Now",
    newTab: "(opens WhatsApp in a new tab)",
  },
  footer: {
    heading: "Contact Us",
    navigation: "Navigation",
    home: "Home",
    contact: "Contact",
    social: "Social Media",
    designedBy: "Designed by",
    backToTop: "Back to top",
  },
};
