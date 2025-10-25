import React, { useEffect, useMemo, useRef, useState } from "react";
import { profile, projects, nav, experience } from "../mock";
import "../portfolio.css";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Github, Linkedin, Mail, Phone, ArrowRight, MessageCircleMore, ExternalLink, Briefcase, Calendar, MapPin } from "lucide-react";

const THEMES = [
  { id: "theme-ivory", label: "Ivory & Gold", className: "theme-ivory" },
  { id: "theme-slate", label: "Slate & Blue", className: "theme-slate" },
  { id: "theme-teal", label: "Soft Teal", className: "theme-teal" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || THEMES[0].id);
  useEffect(() => {
    const themeObj = THEMES.find(t => t.id === theme) || THEMES[0];
    document.documentElement.classList.remove(...THEMES.map(t => t.className));
    document.documentElement.classList.add(themeObj.className);
    document.body.classList.add("custom-portfolio");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

function useRevealOnScroll() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add('in-view');
      }
    }, { threshold: 0.18 });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header({ onNavClick, theme, setTheme }) {
  const current = THEMES.find(t => t.id === theme);
  return (
    <header className="header">
      <div className="container-xx flex items-center justify-between py-3">
        <a href="#home" className="display-font text-lg font-semibold nav-link" aria-label="Go to home">{profile.name}</a>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {nav.map(n => (
            <a key={n.id} href={`#${n.id}`} className="nav-link" onClick={onNavClick}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="btn-ghost" aria-label="Change theme">{current?.label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {THEMES.map(t => (
                <DropdownMenuItem key={t.id} onSelect={() => setTheme(t.id)}>{t.label}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <a href={`mailto:${profile.contacts.email}?subject=${encodeURIComponent(profile.contacts.mail.subject)}&body=${profile.contacts.mail.body}`}>
            <Button className="btn-brand" aria-label="Email me">
              <Mail size={18} className="mr-2"/> Contact
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function IntroOverlay() {
  const [done, setDone] = useState(false);
  const lettersRef = useRef([]);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setDone(true); return; }
    const name = profile.name;
    const total = name.length;
    const step = 55; // ms per letter
    lettersRef.current.forEach((el, idx) => {
      if (!el) return;
      el.style.transition = 'opacity 420ms ease, transform 420ms ease';
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, step * (idx + 1));
    });
    const totalDur = step * total + 700;
    const to = setTimeout(() => setDone(true), totalDur);
    return () => clearTimeout(to);
  }, []);

  if (done) return null;
  return (
    <div className="intro-overlay" role="status" aria-label="Intro animation">
      <h1 className="intro-name">
        {"Boomesh KS".split("").map((ch, i) => (
          <span key={i} ref={el => lettersRef.current[i] = el} className="intro-letter">{ch}</span>
        ))}
      </h1>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="section">
      <div className="container-xx grid md:grid-cols-2 gap-8 items-center">
        <div className="reveal">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight display-font">{profile.title}</h1>
          <p className="mt-4 text-[15px] md:text-base opacity-80">
            {profile.summary}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#projects"><Button className="btn-brand">View Projects <ArrowRight size={18} className="ml-2"/></Button></a>
            <a href="#contact"><Button variant="outline" className="btn-ghost">Get in touch</Button></a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a className="nav-link" href={profile.contacts.github} target="_blank" rel="noreferrer" aria-label="GitHub link"><Github size={20}/></a>
            <a className="nav-link" href={profile.contacts.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn link"><Linkedin size={20}/></a>
            <a className="nav-link" href={`tel:${profile.contacts.phone}`} aria-label="Call me"><Phone size={20}/></a>
          </div>
        </div>
        <div className="reveal md:justify-self-end">
          <div className="card p-6 max-w-md">
            <h3 className="text-xl font-semibold display-font">{profile.name}</h3>
            <p className="opacity-70 mt-1">{profile.location}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <a className="btn-ghost text-left" href={`mailto:${profile.contacts.email}?subject=${encodeURIComponent(profile.contacts.mail.subject)}&body=${profile.contacts.mail.body}`}>Email</a>
              <a className="btn-ghost text-left" href={`tel:${profile.contacts.phone}`}>Call</a>
              <a className="btn-ghost text-left" href={profile.contacts.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn-ghost text-left" href={profile.contacts.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-muted">
      <div className="container-xx">
        <h2 className="section-title reveal">About</h2>
        <p className="section-sub reveal max-w-3xl">I specialize in building performant web applications with a focus on clean UX, reliable APIs, and maintainable codebases. I enjoy improving DX through CI/CD and code standards.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {["Frontend Engineering", "Backend & APIs", "DevOps & Tooling"].map((t, i) => (
            <div key={t} className="card p-5 reveal">
              <h3 className="font-semibold display-font">{t}</h3>
              <p className="text-sm opacity-80 mt-2">{i===0?"React, accessibility-first UIs, micro-interactions, and performance optimization.":i===1?"Django/DRF, Node/Express, database design, caching strategies.":"CI/CD, containerization, testing pipelines, code quality."}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-xx">
        <h2 className="section-title reveal">Experience</h2>
        <p className="section-sub reveal">Selected roles and impact highlights sourced from my résumé.</p>
        <div className="timeline">
          {experience.map((e, idx) => (
            <div key={e.id} className="timeline-item mb-5 reveal">
              <span className="timeline-bullet" aria-hidden="true"></span>
              <Card>
                <CardHeader>
                  <CardTitle className="display-font text-lg flex items-center gap-2">
                    <Briefcase size={16}/> {e.role} • <span className="opacity-90">{e.company}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm opacity-80 flex items-center gap-4">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {e.start} – {e.end}</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {e.location}</span>
                  </div>
                  <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                    {e.bullets.slice(0,5).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-xx">
        <h2 className="section-title reveal">Projects</h2>
        <p className="section-sub reveal">Highlighted work with brief context. Links are placeholders in this mock.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map(p => (
            <Card key={p.id} className="reveal">
              <CardHeader>
                <CardTitle className="display-font text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-80">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <a className="inline-flex items-center mt-4 nav-link" href={p.link} aria-label={`Open ${p.title}`}>
                  View <ExternalLink size={16} className="ml-1"/>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const wa = `https://wa.me/${profile.contacts.whatsapp.number}?text=${encodeURIComponent(profile.contacts.whatsapp.message)}`;
  const mail = `mailto:${profile.contacts.email}?subject=${encodeURIComponent(profile.contacts.mail.subject)}&body=${profile.contacts.mail.body}`;
  return (
    <section id="contact" className="section section-muted">
    <div className="container-xx">
      <h2 className="section-title reveal">Contact</h2>
      <p className="section-sub reveal">
        Quick links to reach me. WhatsApp button floats on mobile too.
      </p>
      <div className="grid md:grid-cols-5 gap-4 justify-center">
        <a
          className="card p-5 reveal"
          href={mail}
          aria-label="Email with prefilled subject and body"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span>Email</span>
          </div>
          {/* <p className="text-sm opacity-70 mt-1">{profile.contacts.email}</p> */}
        </a>

        <a
          className="card p-5 reveal"
          href={`tel:${profile.contacts.phone}`}
          aria-label="Tap to call"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span>Phone</span>
          </div>
          {/* <p className="text-sm opacity-70 mt-1">{profile.contacts.phone}</p> */}
        </a>

        <a
          className="card p-5 reveal"
          href={profile.contacts.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="Open LinkedIn"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="flex items-center gap-2">
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </div>
          {/* <p className="text-sm opacity-70 mt-1 truncate">
            {profile.contacts.linkedin}
          </p> */}
        </a>

        <a
          className="card p-5 reveal"
          href={profile.contacts.github}
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="flex items-center gap-2">
            <Github size={18} />
            <span>GitHub</span>
          </div>
          {/* <p className="text-sm opacity-70 mt-1 truncate">
            {profile.contacts.github}
          </p> */}
        </a>

        <a
          className="card p-5 reveal"
          href={wa}
          aria-label="Chat on WhatsApp with prefilled text"
          style={{ width: "180px", margin: "auto" }}
        >
          <div className="flex items-center gap-2">
            <MessageCircleMore size={18} />
            <span>WhatsApp</span>
          </div>
          {/* <p className="text-sm opacity-70 mt-1 truncate">
            Prefilled: "{profile.contacts.whatsapp.message}"
          </p> */}
        </a>
      </div>
    </div>

      <a className="whatsapp-fab" href={wa} aria-label="Chat on WhatsApp">
        <Button className="btn-brand"><MessageCircleMore size={18} className="mr-2"/> WhatsApp</Button>
      </a>
    </section>
  );
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  useRevealOnScroll();

  const onNavClick = (e) => {
    // keep default anchor smooth scroll, ensure focus for accessibility
    const href = e.currentTarget.getAttribute('href');
    const id = href?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
    }
  };

  return (
    <div>
      <IntroOverlay/>
      <Header onNavClick={onNavClick} theme={theme} setTheme={setTheme}/>
      <main>
        <Hero/>
        <About/>
        <Experience/>
        <Projects/>
        <Contact/>
      </main>
      <footer className="footer">
        <div className="container-xx flex items-center justify-between">
          <p className="text-sm">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a className="nav-link" href="#home">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
