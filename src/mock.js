// Frontend-only mock data for the portfolio
export const profile = {
  name: "Boomeshwara KS",
  title: "Full Stack Developer",
  location: "Erode, Tamil Nadu",
  summary:
    "Full Stack Developer with hands-on experience building and shipping web applications using MERN and Django. Improved performance through DB optimization and streamlined deployment processes. Passionate about crafting clean UX and reliable systems.",
  contacts: {
    email: "boomeshks@gmail.com",
    phone: "+91 7305235735",
    linkedin: "https://www.linkedin.com/in/boomesh-ks-full-stack-developer", // TODO: replace with actual profile
    github: "https://github.com/BoomeshKS", // TODO: replace with actual profile
    website: null,
    whatsapp: {
      number: "917305235735", // E.164 without + for wa.me links
      message: "Hi Boomeshwara, I saw your portfolio and would like to connect about an opportunity.",
    },
    mail: {
      subject: "Opportunity to connect",
      body: "Hi Boomeshwara,%0D%0A%0D%0AI came across your portfolio and would love to discuss an opportunity.\n\nThanks!",
    },
  },
};

export const experience = [
  {
    id: "e2",
    role: "Full Stack Developer",
    company: "Altruisty",
    location: "Remote",
    start: "Oct 2024",
    end: "Present",
    bullets: [
      "Build and maintain production web apps using Django and React, serving 1000+ active users.",
      "Delivered client portal with auth, RBAC and third‑party integrations; improved engagement by 40%.",
      "Reengineered data flow architecture, improving API response times by ~25%.",
      "Launched full‑stack apps with SSL + domain setup on GoDaddy/Hostinger (99.9% uptime).",
      "Led stand‑ups and sprint planning to streamline workflows and increase team efficiency (~15%).",
    ],
  },
  {
    id: "e1",
    role: "MERN Stack Developer",
    company: "Null Class",
    location: "Krishnagiri, Tamil Nadu",
    start: "Mar 2024",
    end: "Jul 2024",
    bullets: [
      "Built React apps with modular components; modernized build, reducing delivery time by ~25%.",
      "Implemented code splitting and lazy loading, improving load times by ~35%.",
      "Optimized MongoDB queries and indexes; 30% faster data retrieval across modules.",
      "Mentored junior devs via code reviews; boosted team productivity by ~15%.",
      "Established coding standards; ~20% reduction in production bugs.",
    ],
  },
];

export const projects = [
  {
    id: "p1",
    title: "Analytics Dashboard (MERN)",
    description:
      "A responsive analytics dashboard featuring role-based access, server-side pagination, and charts. Achieved faster load times via query optimization.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
  },
  {
    id: "p2",
    title: "Django E‑commerce Backend",
    description:
      "RESTful backend with JWT auth, payments integration, and admin panel. Unit-tested core services and reduced API latency by caching hot paths.",
    tags: ["Django", "DRF", "PostgreSQL", "Redis"],
    link: "#",
  },
  {
    id: "p3",
    title: "DevOps CI Revamp",
    description:
      "Revamped CI/CD pipelines (GitHub Actions), added preview deployments and test matrices, cutting turnaround time by ~25% across services.",
    tags: ["CI/CD", "GitHub Actions", "Docker"],
    link: "#",
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
