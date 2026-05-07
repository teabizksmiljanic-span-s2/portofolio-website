import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { InteractiveMesh } from "./components/InteractiveMesh";
import AIAppBuilder from "./components/ai_app_builder";
import { GoogleGenAI } from "@google/genai";
import { 
  Code2, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Layers, 
  Terminal, 
  Zap, 
  Server, 
  Database, 
  Cloud,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  ExternalLink,
  Bot,
  RefreshCw,
  Settings,
  Link,
  Shield,
  ArrowRight,
  ArrowUp,
  Copy,
  Check,
  Plus,
  Minus,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Type,
  X,
  Sparkles,
  Wand2,
  FileCode,
  FileText
} from "lucide-react";

// Komponenta za navigaciju
const Navigacija = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-4 bg-[#050810]/85 backdrop-blur-[20px] border-b border-border-dim">
      <RouterLink to="/" className="font-mono text-[14px] text-brand-primary tracking-[0.15em] uppercase hover:opacity-80 transition-opacity">
        D.P. // Architect
      </RouterLink>
      <ul className="hidden md:flex items-center gap-8">
        {["about", "skills", "projects", "experience", "contact"].map((item) => (
          <li key={item}>
            <RouterLink 
              to={isHomePage ? `#${item}` : `/#${item}`} 
              className={`nav-link ${activeSection === item ? "active" : ""}`}
            >
              {item}
            </RouterLink>
          </li>
        ))}
        <li>
          <RouterLink to="/blog" className={`nav-link ${location.pathname === "/blog" ? "active" : ""}`}>
            blog
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/ai-builder" className={`nav-link ${location.pathname === "/ai-builder" ? "text-brand-primary font-bold border-b border-brand-primary" : "text-brand-accent hover:text-brand-primary"}`}>
            ai builder <span className="ml-1 text-[8px] bg-brand-primary text-[#050810] px-1.5 py-0.5 rounded font-black uppercase tracking-widest relative -top-0.5">Beta</span>
          </RouterLink>
        </li>
      </ul>
      <a href="#contact" className="hidden sm:block font-mono text-[11px] tracking-[0.1em] text-brand-primary border border-brand-primary px-5 py-2 hover:bg-brand-primary/10 transition-all uppercase">
        Hire me
      </a>
    </nav>
  );
};

// Gumb za povratak na vrh
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 p-3 bg-brand-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </motion.button>
  );
};

// Progress bar na vrhu stranice
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[60] origin-left"
      style={{ scaleX }}
    />
  );
};

// Hero sekcija
const HeroSekcija = () => (
  <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-16 relative overflow-hidden">
    <div className="scan-line" />
    
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="font-mono text-[11px] tracking-[0.2em] text-brand-primary uppercase mb-6 flex items-center gap-3 before:content-[''] before:w-10 before:h-px before:bg-brand-primary"
    >
      Available for Senior / Lead roles
    </motion.div>

    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.9] tracking-tight mb-8"
    >
      DARIO<br />
      <span className="block text-transparent stroke-brand-primary/50" style={{ WebkitTextStroke: '1px rgba(0, 212, 255, 0.4)' }}>PIKULA</span>
      <span className="block text-brand-primary text-[clamp(1.25rem,3vw,2.5rem)] font-normal italic tracking-wide mt-4">
        Solution Architect & Full Stack Developer
      </span>
    </motion.h1>

    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="max-w-[520px] text-lg text-[#64748b] leading-relaxed mb-12 font-light"
    >
      <span className="text-[#e2e8f0] font-medium">15+ years</span> building enterprise-grade systems at the edge of what's possible. Deep in <span className="text-[#e2e8f0] font-medium">.NET / C#</span>, cloud architecture, and intelligent automation.
    </motion.p>

    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap gap-4 mb-16"
    >
      <a href="#projects" className="font-mono text-[12px] tracking-widest bg-brand-primary text-[#050810] px-8 py-3.5 font-bold uppercase transition-transform hover:-translate-y-0.5">
        View my work
      </a>
      <a href="#contact" className="font-mono text-[12px] tracking-widest border border-border-dim text-brand-primary px-8 py-3.5 uppercase transition-all hover:border-brand-primary hover:bg-brand-primary/5">
        Let's talk
      </a>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap gap-12 pt-8 border-t border-border-dim"
    >
      {[
        { label: "Years experience", val: "15+" },
        { label: "Delivered projects", val: "50+" },
        { label: "Team members led", val: "8" },
        { label: "Lines of obsession", val: "∞" }
      ].map((stat, i) => (
        <div key={i}>
          <div className="font-display text-4xl font-extrabold text-brand-primary leading-none">{stat.val}</div>
          <div className="font-mono text-[10px] tracking-widest text-[#64748b] uppercase mt-1">{stat.label}</div>
        </div>
      ))}
    </motion.div>

    {/* Decorative code snippet */}
    <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[11px] text-[#64748b] border border-border-dim bg-[#0a0f1e]/80 p-6 max-w-[320px] backdrop-blur-md">
      <div className="leading-[2] whitespace-nowrap">
        <span className="text-[#374151] font-light italic opacity-60">// architect.cs — v15.0</span><br />
        <span className="text-[#c084fc]">public class</span> <span className="text-brand-primary">Dario</span> : <span className="text-brand-primary">ISolutionArchitect</span><br />
        {`{`}<br />
        &nbsp;&nbsp;<span className="text-[#c084fc]">public</span> <span className="text-brand-primary">Stack</span> Core =&gt; <span className="text-[#c084fc]">new</span>[] {`{`}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#86efac]">".NET 8"</span>, <span className="text-[#86efac]">"Angular"</span>,<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#86efac]">"Azure"</span>, <span className="text-[#86efac]">"AKS"</span><br />
        &nbsp;&nbsp;{`}`};<br />
        &nbsp;&nbsp;<span className="text-[#c084fc]">public int</span> Experience = <span className="text-[#fbbf24]">15</span>;<br />
        &nbsp;&nbsp;<span className="text-[#c084fc]">public bool</span> BuildingFuture = <span className="text-[#fbbf24]">true</span>;<br />
        {`}`}
      </div>
    </div>
  </section>
);

// O Nama Sekcija
const ONamaSekcija = () => (
  <section id="about" className="px-6 md:px-10 py-24 border-t border-border-dim">
    <div className="flex items-baseline gap-4 mb-16">
      <span className="font-mono text-[10px] text-brand-primary tracking-[0.2em] opacity-80">01</span>
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">About me</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
      <div className="space-y-6 text-lg text-[#64748b] leading-[1.8] font-light">
        <p>I'm a <strong className="text-[#e2e8f0] font-medium">Solution Architect and Full-Stack Developer</strong> based in Zagreb, Croatia, with over 15 years of experience designing and delivering complex enterprise systems.</p>
        <p>My core expertise lies in the <strong className="text-[#e2e8f0] font-medium">.NET ecosystem</strong> — architecting scalable APIs, distributed services, and cloud-native solutions on Azure. I lead a team of 8, spanning developers, QA, PM, and support.</p>
        <div className="font-mono text-[13px] border-left-2 border-brand-primary bg-brand-primary/5 p-4 text-[#e2e8f0] leading-relaxed border-l-2 mt-6 group">
          <span className="text-brand-primary opacity-50 font-bold mr-2 transition-all group-hover:opacity-100">"</span>
          The best architecture isn't the one that solves today's problem — it's the one that makes tomorrow's problems invisible.
          <span className="text-brand-primary opacity-50 font-bold ml-2 transition-all group-hover:opacity-100">"</span>
        </div>
      </div>
      <div className="space-y-6 text-lg text-[#64748b] leading-[1.8] font-light">
        <p>My work spans <strong className="text-[#e2e8f0] font-medium">enterprise DNS management</strong>, trading engine architecture, Azure DevOps pipeline engineering, and AI-powered tooling. I obsess over the gap between what systems are and what they could be.</p>
        <p>I believe in <strong className="text-[#e2e8f0] font-medium">building teams as carefully as building systems</strong> — both require clear interfaces, fault tolerance, and room to evolve.</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {["Solution Architect", "Full Stack Dev", "Team Lead", "Cloud Native", "API Design", "CI/CD", "AI Integration", "Algo Trading"].map(tag => (
            <span key={tag} className="font-mono text-[10px] tracking-widest text-brand-primary border border-border-dim px-3 py-1.5 uppercase hover:border-brand-primary transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Skills Sekcija
const SkillsSekcija = () => {
  const groups = [
    {
      title: "Backend",
      name: ".NET / C#",
      skills: [
        { label: "C# / .NET 8", val: 98 },
        { label: "EF Core / SQL", val: 95 },
        { label: "REST API / gRPC", val: 94 }
      ],
      tech: ["ASP.NET Core", "SignalR", "Worker Services", "CQRS", "Outbox Pattern"]
    },
    {
      title: "Frontend",
      name: "Angular & Web",
      skills: [
        { label: "Angular (11–17)", val: 92 },
        { label: "TypeScript", val: 90 },
        { label: "HTML / SCSS", val: 88 }
      ],
      tech: ["RxJS", "NgRx", "Material", "Webpack", "Firebase"]
    },
    {
      title: "Cloud & DevOps",
      name: "Azure / AKS",
      skills: [
        { label: "Azure Platform", val: 93 },
        { label: "Kubernetes / AKS", val: 88 },
        { label: "Azure DevOps", val: 95 }
      ],
      tech: ["Azure SQL", "Key Vault", "ACR", "App Insights", "Nuke Build"]
    },
    {
      title: "Architecture",
      name: "System Design",
      skills: [
        { label: "Enterprise Arch", val: 96 },
        { label: "Distributed Systems", val: 91 },
        { label: "AI Integration", val: 87 }
      ],
      tech: ["Microservices", "DDD", "Event Sourcing", "Saga Pattern", "ADR"]
    }
  ];

  return (
    <section id="skills" className="px-6 md:px-10 py-24 border-t border-border-dim">
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-[10px] text-brand-primary tracking-[0.2em] opacity-80">02</span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Tech stack</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border-dim">
        {groups.map((group, i) => (
          <div key={i} className="bg-[#050810] p-8 hover:bg-[#0a0f1e] transition-colors relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="font-mono text-[10px] tracking-widest text-brand-primary uppercase mb-4 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-brand-primary before:rounded-full">
                {group.title}
              </div>
              <h3 className="font-display text-xl font-bold mb-6">{group.name}</h3>
              <div className="space-y-4 mb-6">
                {group.skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between font-mono text-[10px] text-[#64748b] uppercase tracking-wider mb-1.5">
                      <span>{s.label}</span>
                      <span>{s.val}%</span>
                    </div>
                    <div className="h-[2px] bg-white/5 relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.val}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-brand-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.tech.map(t => (
                  <span key={t} className="font-mono text-[9px] text-[#64748b] bg-white/5 border border-white/10 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Projects Sekcija
const ProjectsSekcija = () => {
  const projects = [
    { 
      title: "McD.SmartDNS", 
      num: "01 — ENTERPRISE", 
      desc: "Enterprise DNS management platform with real-time Micetro sync via Outbox/Inbox pattern, SHA256 metadata change detection, and full Azure AKS deployment pipeline.", 
      stack: [".NET 8", "EF Core", "Azure SQL", "AKS", "Angular"], 
      featured: true,
      repoUrl: "https://github.com/dp-architect/McD.SmartDNS",
      demoUrl: "https://smartdns-demo.azurewebsites.net"
    },
    { 
      title: "Crypto Trading Engine", 
      num: "02 — FINTECH", 
      desc: "Institutional-grade C# trading engine with multi-indicator confluence strategy, adaptive trailing stop, spike detection, and Sharpe/Sortino analytics.", 
      stack: ["C# .NET 8", "Binance API", "Grid/DCA", "Analytics"],
      repoUrl: "https://github.com/dp-architect/CryptoEngine",
      demoUrl: "https://crypto-engine-dashboard.vercel.app"
    },
    { 
      title: "PS.MojaPosta.Api", 
      num: "03 — PLATFORM", 
      desc: "High-reliability postal API platform with Nuke-based build system, advanced Azure DevOps release pipelines, and automated promotion workflows.", 
      stack: ["ASP.NET", "Nuke", "Azure DevOps", "Docker"],
      repoUrl: "https://github.com/dp-architect/MojaPosta.Api"
    },
    { 
      title: "AI Dev Automation Suite", 
      num: "04 — TOOLING", 
      desc: "Windows 11 dev environment automation with interactive PowerShell menus, winget integration, and AI-powered prompt management.", 
      stack: ["PowerShell", "Claude API", "winget", "AI Prompts"],
      repoUrl: "https://github.com/dp-architect/DevAutomation"
    },
    { 
      title: "Angular Marketplace App", 
      num: "05 — MARKETPLACE", 
      desc: "Modern marketplace application with Angular frontend, Firebase backend, and Google AI Studio integration.", 
      stack: ["Angular", "Firebase", "Google AI", "TypeScript"],
      repoUrl: "https://github.com/dp-architect/Marketplace-AI",
      demoUrl: "https://marketplace-ai-demo.web.app"
    },
    { 
      title: "Enterprise Arch Documenter", 
      num: "06 — ARCHITECTURE", 
      desc: "Automated architecture documentation skill with Mermaid diagram generation, ADR templates, and security checklist framework.", 
      stack: ["Mermaid", "Claude Skills", "ADR", "Security"],
      repoUrl: "https://github.com/dp-architect/ArchDocumenter"
    }
  ];

  return (
    <section id="projects" className="px-6 md:px-10 py-24 border-t border-border-dim">
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-[10px] text-brand-primary tracking-[0.2em] opacity-80">03</span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Featured projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border-dim">
        {projects.map((p, i) => (
          <div key={i} className={`bg-[#050810] p-8 hover:bg-[#0a0f1e] cursor-pointer transition-colors group relative ${p.featured ? 'border-l-2 border-brand-primary' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="font-mono text-[11px] text-border-dim tracking-widest">{p.num}</div>
              <div className="flex gap-2">
                {p.repoUrl && (
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={p.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-[#64748b] hover:text-brand-primary hover:border-brand-primary/50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    title="View Repository"
                  >
                    <Github size={16} />
                  </motion.a>
                )}
                {p.demoUrl && (
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={p.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-[#64748b] hover:text-brand-accent hover:border-brand-accent/50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    title="View Live Demo"
                  >
                    <Globe size={16} />
                  </motion.a>
                )}
              </div>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 transition-colors group-hover:text-brand-primary">{p.title}</h3>
            <p className="text-[13px] text-[#64748b] font-light leading-relaxed mb-6 line-clamp-3">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {p.stack.map(s => (
                <span key={s} className="font-mono text-[9px] tracking-wider text-brand-accent border border-brand-accent/20 px-2.5 py-1 uppercase">
                  {s}
                </span>
              ))}
            </div>
            <div className="font-mono text-[11px] text-brand-primary tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              View case study <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Advantage Sekcija
const AdvantageSekcija = () => (
  <section id="advantage" className="px-6 md:px-10 py-20 border-t border-border-dim bg-brand-primary/[0.02]">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: "Direct Access", desc: "Skip the middlemen. Talk directly to the hands-on architect." },
        { title: "Enterprise Grade", desc: "15+ years of systems that don't fail." },
        { title: "Predictable Cost", desc: "Clear milestones. No hidden surprises." },
        { title: "Global Ready", desc: "Remote-first workflow in your time zone." }
      ].map((item, i) => (
        <div key={i} className="space-y-2">
          <h3 className="font-mono text-xs text-brand-primary uppercase tracking-widest">{item.title}</h3>
          <p className="text-[14px] text-[#64748b] font-light leading-snug">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// Experience Sekcija
const ExperienceSekcija = () => {
  const jobs = [
    { date: "2020 — Present", role: "Solution Architect & Lead Developer", co: "Enterprise DNS / SmartDNS Platform", desc: "Leading architecture and development of enterprise DNS management solutions. Managing a team of 8, owning Azure cloud infrastructure, CI/CD pipelines, and full-stack delivery.", tags: [".NET 8", "Azure AKS", "Angular", "Team Lead"] },
    { date: "2016 — 2020", role: "Senior Full-Stack Developer", co: "Enterprise Software Development", desc: "Designed and built complex .NET and Angular solutions for enterprise clients. Deep work on distributed architectures and SQL performance tuning.", tags: ["ASP.NET Core", "SQL Server", "Angular", "Azure"] },
    { date: "2012 — 2016", role: "Full-Stack Developer", co: "Software & Web Development", desc: "Built full-stack web applications across a wide range of industries. Developed strong foundations in C# backend architecture and relational database design.", tags: ["C#", "MVC", "JavaScript", "SQL"] }
  ];

  return (
    <section id="experience" className="px-6 md:px-10 py-24 border-t border-border-dim">
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-[10px] text-brand-primary tracking-[0.2em] opacity-80">04</span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Experience timeline</h2>
      </div>
      <div className="relative pl-8 md:pl-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-brand-primary before:to-transparent">
        {jobs.map((job, i) => (
          <div key={i} className="relative pb-16 last:pb-0 group">
            <div className="absolute -left-[36px] md:-left-[44px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand-primary bg-[#050810] transition-colors group-hover:bg-brand-primary" />
            <div className="font-mono text-[10px] tracking-widest text-brand-primary uppercase mb-2">{job.date}</div>
            <h3 className="font-display text-xl font-bold mb-1">{job.role}</h3>
            <div className="font-mono text-[12px] text-[#64748b] mb-4">{job.co}</div>
            <p className="text-[14px] text-[#64748b] font-light leading-relaxed max-w-2xl">{job.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {job.tags.map(t => (
                <span key={t} className="font-mono text-[9px] text-[#64748b] bg-white/5 border border-white/10 px-2 py-1 uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Kontakt Sekcija
const KontaktSekcija = () => {
  const email = "dado.piksi@gmail.com";
  const [messages, setMessages] = useState<any[]>([{ id: crypto.randomUUID(), type: "ai", text: "Hey! I'm dario.ai. I'm a neural reflection of Dario's expertise. Ask me anything about his .NET background, system design philosophy, or current availability." }]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const [inquiryData, setInquiryData] = useState<{content: string, name: string, fileName: string} | null>(null);

  useEffect(() => {
    if (location.state && location.state.projectInquiry && !inquiryData) {
      const projName = location.state.projectName || "Novi_Projekt";
      const fileId = projName.replace(/\s+/g, "_").toLowerCase();
      
      setInquiryData({
         content: location.state.projectInquiry,
         name: projName,
         fileName: `upit_${fileId}.md`
      });
      
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "ai",
          text: `Podaci uspješno prebačeni iz AI Wizarda. Dokument je analiziran i prikvačen! Unesite 'Pošalji' (ili 'Send') ispod kako bi potvrdili i otvorili email klijent za slanje upita izravno Dariju.`,
          isAttachment: true,
          fileName: `upit_${fileId}.md`
        }
      ]);
      window.history.replaceState({}, document.title);
    }
  }, [location, inquiryData]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || inputMsg;
    if (!textToSend.trim() || isTyping) return;

    if (inquiryData && (textToSend.toLowerCase().includes('send') || textToSend.toLowerCase().includes('pošalji') || textToSend.toLowerCase().includes('posalji') || textToSend.toLowerCase().includes('yes') || textToSend.toLowerCase().includes('da'))) {
       const userMsg = { id: crypto.randomUUID(), type: "user", text: textToSend };
       setMessages(prev => [...prev, userMsg]);
       setInputMsg("");
       
       setTimeout(() => {
          setMessages(prev => [...prev, { id: crypto.randomUUID(), type: "ai", text: "Otvaram email klijent za slanje upita..." }]);
          const md = inquiryData.content;
          const encodedBody = encodeURIComponent(md);
          const encodedSubject = encodeURIComponent(`Upit za Projekt: ${inquiryData.name}`);
          window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
          setInquiryData(null);
       }, 500);
       return;
    }

    const userMsg = { id: crypto.randomUUID(), type: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customMsg) setInputMsg("");
    setErrorVisible(false);
    
    setIsTyping(true);

    try {
      // Lazy initialization of Gemini
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Simulate natural thinking delay based on message length (1-2.5 seconds)
      const thinkingDelay = Math.min(2500, Math.max(1000, textToSend.length * 20));
      await new Promise(resolve => setTimeout(resolve, thinkingDelay));

      const chatModel = "gemini-3-flash-preview";
      const systemInstruction = `You are "dario.ai", a virtual assistant for Dario Pikula, a Solution Architect and Full-Stack (.NET/Angular/Cloud) Developer.
      
      Context about Dario:
      - 15+ years experience.
      - Core stack: .NET 8, C#, EF Core, Azure, AKS, SQL, Angular (11-17), K8s, DevOps.
      - Role: Solution Architect & Lead Developer of enterprise DNS management platforms.
      - Location: Zagreb, Croatia. Available globally.
      - Email: dado.piksi@gmail.com
      - LinkedIn: linkedin.com/in/dp-architect
      - Portfolio highlights: Enterprise DNS sync (McD.SmartDNS), Crypto Trading Engines, AI Automation Tooling.
      
      Traits:
      - Professional, technical, confident, yet humble and direct.
      - Monospace-friendly aesthetic (use code terms like "fault-tolerant", "scalable", "low-latency" naturally).
      - Encourage callers to reach out to Dario directly for detailed architectural consulting via email.
      
      Instructions:
      - Keep responses relatively concise (1-3 sentences unless asked for detail).
      - If you don't know something specific, politely suggest professional contact.
      - Never hallucinate non-existent projects. Use the projects listed above.`;

      const response = await genAI.models.generateContent({
        model: chatModel,
        contents: textToSend,
        config: { systemInstruction }
      });

      const aiText = response.text || "Connection timeout. Please reach out via email.";
      setMessages(prev => [...prev, { id: crypto.randomUUID(), type: "ai", text: aiText }]);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      setErrorVisible(true);
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        type: "ai", 
        text: "I encountered a synchronization error while processing your request. Please check your connectivity or try again in a few seconds." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="contact" className="px-6 md:px-10 py-24 border-t border-border-dim">
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-[10px] text-brand-primary tracking-[0.2em] opacity-80">05</span>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Get in touch</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <div>
          <div className="mb-12 p-5 border border-brand-primary/20 bg-brand-primary/5 shadow-inner">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-brand-primary" />
              Project Inquiry?
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
              Not sure how to structure your technical requirements? Help yourself with the interactive <strong className="text-slate-300 font-medium">AI Wizard Builder</strong> to generate a structured project inquiry before reaching out.
            </p>
            <RouterLink 
              to="/ai-builder" 
              className="inline-flex items-center gap-2 text-[10px] text-[#050810] bg-brand-primary px-4 py-2 font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Open AI Wizard <ArrowRight size={12} />
            </RouterLink>
          </div>

          <div className="font-mono text-[11px] text-[#64748b] tracking-[0.15em] uppercase mb-8">Direct contact</div>
          <div className="space-y-6">
            {[
              { icon: "LOC", label: "Location", val: "Zagreb, Croatia" },
              { icon: "EMAIL", label: "Email", val: email, link: `mailto:${email}` },
              { icon: "LI", label: "LinkedIn", val: "linkedin.com/in/dp-architect", link: "#" },
              { icon: "GH", label: "GitHub", val: "github.com/dp-architect", link: "#" }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 pb-6 border-b border-border-dim last:border-0 hover:border-brand-primary/30 transition-colors group">
                <div className="font-mono text-[10px] text-brand-primary border border-border-dim px-3 py-1.5 h-fit mt-1 group-hover:border-brand-primary transition-colors">{item.icon}</div>
                <div>
                  <div className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-[15px] font-medium transition-colors group-hover:text-brand-primary">
                    {item.link ? <a href={item.link}>{item.val}</a> : item.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[11px] text-brand-primary tracking-[0.15em] uppercase mb-8 flex justify-between items-center">
            <span>AI assistant // powered by Gemini</span>
            {errorVisible && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-500 text-[9px] flex items-center gap-1"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> SYSTEM_ERROR
              </motion.span>
            )}
          </div>
          <div className="bg-[#0a0f1e] border border-border-dim flex flex-col h-[480px] font-mono overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-border-dim flex items-center gap-3 shrink-0 bg-[#050810]/80 backdrop-blur-md relative z-10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/50" />
              </div>
              <div className="text-[11px] text-[#64748b] uppercase tracking-widest flex items-center gap-2">
                <Bot size={12} className="text-brand-primary" />
                <span>dario.ai // v2.1.0_LATEST</span>
                <span className="text-border-dim mx-1">|</span>
                <RouterLink 
                  to="/ai-builder" 
                  className="text-[9px] font-bold text-brand-primary hover:text-white transition-colors flex items-center gap-1"
                >
                  <Wand2 size={10} /> Launch AI Wizard
                </RouterLink>
              </div>
            </div>
            
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-brand-primary/10 hover:scrollbar-thumb-brand-primary/20 transition-all scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {messages.map(m => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`max-w-[85%] text-[12px] leading-relaxed p-4 border rounded-lg relative ${
                      m.type === 'ai' 
                        ? 'bg-brand-primary/5 border-white/5 self-start rounded-tl-none text-white/90' 
                        : 'bg-brand-accent/10 border-brand-accent/20 self-end rounded-tr-none text-brand-accent'
                    }`}
                  >
                    <div className="text-[8px] text-[#64748b] uppercase tracking-widest mb-2 font-bold opacity-30">
                      {m.type === 'ai' ? 'CORE.LOG' : 'USER.INPUT'}
                    </div>
                    {m.text}
                    {m.isAttachment && (
                      <div className="mt-4 p-3 border border-emerald-500/30 bg-emerald-500/10 rounded-md flex items-center gap-3 cursor-pointer hover:bg-emerald-500/20 transition-colors" onClick={() => {
                        const blob = new Blob([inquiryData?.content || ''], { type: 'text/markdown' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = m.fileName;
                        link.click();
                      }}>
                         <div className="bg-emerald-500/20 p-2 rounded shrink-0">
                           <FileText size={16} className="text-emerald-400" />
                         </div>
                         <div className="min-w-0 flex-1">
                           <div className="font-bold text-emerald-400 text-[10px] uppercase font-mono truncate">{m.fileName}</div>
                           <div className="text-[#64748b] text-[8px] uppercase tracking-widest">Click to download spec (.md)</div>
                         </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg w-fit self-start rounded-tl-none"
                >
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-brand-primary rounded-full animate-bounce" />
                  </div>
                  <span className="text-[9px] text-[#64748b] font-mono tracking-tighter animate-pulse">PROCESSING_BUFFER...</span>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-border-dim bg-[#050810]/50 backdrop-blur-sm relative z-10 flex flex-col gap-2">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value.slice(0, 300))}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Synchronize with agent..." 
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-[12px] outline-none focus:border-brand-primary/50 transition-all text-white placeholder-[#64748b]"
                  disabled={isTyping}
                  maxLength={300}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isTyping || !inputMsg.trim()}
                  className="bg-brand-primary text-[#050810] px-6 py-3 text-[11px] font-bold uppercase transition-all hover:bg-white disabled:opacity-30 flex items-center gap-2 group"
                >
                  Send <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="flex justify-end px-1">
                <span className={`text-[10px] font-mono transition-colors ${inputMsg.length >= 300 ? 'text-red-500' : inputMsg.length > 250 ? 'text-orange-400' : 'text-[#64748b]'}`}>
                  {inputMsg.length} / 300
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {[".NET Experience", "System Design", "Work Availability"].map(prompt => (
              <button 
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                className="font-mono text-[9px] text-[#64748b] border border-border-dim px-4 py-2 uppercase hover:border-brand-primary/50 hover:text-brand-primary hover:bg-brand-primary/5 transition-all disabled:opacity-30"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Podnožje stranice
const Podnozje = () => {
  return (
  <footer className="px-6 md:px-10 py-8 border-t border-border-dim flex flex-col sm:flex-row justify-between items-center gap-6">
    <div className="font-mono text-[10px] text-[#64748b] tracking-widest uppercase">
      © {new Date().getFullYear()} <span className="text-brand-primary">Dario Pikula</span> — Built with obsession
    </div>
    <div className="font-mono text-[10px] text-[#64748b] tracking-widest uppercase">
      Zagreb, Croatia — <span className="text-brand-primary">Available globally</span>
    </div>
  </footer>
  );
};

// Komponenta za promjenu veličine fonta (Slideout)
const FontSizeSlideout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(100);

  useEffect(() => {
    const saved = localStorage.getItem("font-scale");
    if (saved) {
      const parsed = parseInt(saved, 10);
      setScale(parsed);
      document.documentElement.style.fontSize = `${parsed}%`;
    }
  }, []);

  const changeScale = (newScale: number) => {
    const clamped = Math.min(Math.max(newScale, 80), 160);
    setScale(clamped);
    document.documentElement.style.fontSize = `${clamped}%`;
    localStorage.setItem("font-scale", clamped.toString());
  };

  return (
    <>
      <motion.button
        className="fixed top-1/2 right-0 -translate-y-1/2 z-[90] bg-[#0a0f1e] text-slate-400 p-3 lg:p-4 border-y border-l border-border-dim rounded-l-xl hover:text-brand-primary hover:border-brand-primary transition-colors shadow-2xl"
        onClick={() => setIsOpen(true)}
        initial={{ x: 100 }}
        animate={{ x: isOpen ? 100 : 0 }}
        transition={{ type: "spring", bounce: 0 }}
        aria-label="Adjust font size"
      >
        <Type size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm lg:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] sm:w-80 bg-[#050810]/95 backdrop-blur-3xl border-l border-border-dim z-[101] p-6 lg:p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary shrink-0">
                    <Type size={18} />
                  </div>
                  <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm leading-tight">Typography<br/>Config</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors p-2"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-10 flex-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Global Scale
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => changeScale(scale - 10)}
                      disabled={scale <= 80}
                      className="w-12 h-12 flex items-center justify-center border border-border-dim text-white font-mono text-lg hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 disabled:opacity-30 transition-all rounded-lg shrink-0"
                    >
                      -
                    </button>
                    
                    <div className="flex-1 h-12 flex items-center justify-center border border-border-dim font-mono text-brand-primary font-bold tracking-widest bg-slate-900/50 rounded-lg">
                      {scale}%
                    </div>
                    
                    <button 
                      onClick={() => changeScale(scale + 10)}
                      disabled={scale >= 160}
                      className="w-12 h-12 flex items-center justify-center border border-border-dim text-white font-mono text-lg hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 disabled:opacity-30 transition-all rounded-lg shrink-0"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Visual scale indicator */}
                  <div className="mt-6">
                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-brand-primary transition-all duration-300 ease-out" 
                        style={{ width: `${((scale - 80) / (160 - 80)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] font-mono text-slate-600 uppercase tracking-wider">
                      <span>Min</span>
                      <span>Max</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => changeScale(100)}
                    disabled={scale === 100}
                    className="w-full py-4 border border-border-dim text-slate-400 font-mono text-[10px] uppercase tracking-widest font-bold hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all disabled:opacity-30 rounded-lg"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border-dim">
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-xs text-slate-400 leading-relaxed font-light">
                  <span className="text-brand-primary font-bold font-mono tracking-widest uppercase text-[10px] block mb-2">// Note</span> 
                  Scale adjustments alter the global root REM value and persist across sessions via localStorage.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Komponenta za privolu o kolačićima (GDPR compliance)
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: "accept" | "reject") => {
    localStorage.setItem("cookie-consent", type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-[420px]"
    >
      <div className="bg-[#0a0f1e]/95 backdrop-blur-2xl p-8 border border-border-dim shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-start gap-5 mb-6">
          <div className="p-3 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shrink-0">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-2 tracking-tight uppercase">Privacy Protocols</h4>
            <p className="text-sm text-[#64748b] leading-relaxed font-light">
              This system uses essential operational cookies and telemetry to analyze traffic. 
              By accepting, you authorize the deployment of these cookies to your local storage.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => handleAction("accept")}
            className="flex-1 px-6 py-3 bg-brand-primary text-[#050810] font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors"
          >
            Accept All
          </button>
          <button 
            onClick={() => handleAction("reject")}
            className="flex-1 px-6 py-3 border border-border-dim text-white font-mono text-[11px] font-bold uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
          >
            Reject All
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Sekcija Bloga
const BlogSekcija = () => {
  const [viewingImg, setViewingImg] = useState<{url: string, title: string} | null>(null);
  const [viewingPost, setViewingPost] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewingImg) setViewingImg(null);
        else if (viewingPost) setViewingPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewingImg, viewingPost]);

  const posts = [
    {
      id: 1,
      title: "Building Scalable Solution Architectures",
      excerpt: "Expertise in managing complex technology ecosystems to deliver high-performance applications. Insights from my role as a Solution Architect.",
      content: `
        As a Solution Architect with over 15 years of hands-on experience, I've learned that true scalability isn't just about adding more servers—it's about the fundamental design of the system's DNA.

        On my previous projects (like the SmartDNS enterprise platform), I focused on decoupling high-frequency operations from long-running management tasks. By implementing the Outbox/Inbox pattern using EF Core and Azure SQL, we ensured that even under extreme load, the system remained perfectly synchronized.

        Key architectural principles I strictly follow:
        - **Decoupling over centralization**: Avoid the monolith trap early.
        - **Fail-fast synchronization**: Real-time sync via idempotent worker patterns.
        - **Metadata as a first-class citizen**: Real-time SHA256 change detection for sensitive DNS records.

        Building a system that manages thousands of requests per second requires a mindset shift: you're not just writing code; you're orchestrating resources in a fault-tolerant way.
      `,
      date: "May 10, 2026",
      readTime: "7 min",
      tags: ["Architecture", "Scalability"],
      image: "https://picsum.photos/seed/blueprint/800/450"
    },
    {
      id: 2,
      title: "DevOps Best Practices: Bridging Development and Operations",
      excerpt: "Leveraging years of DevOps experience to streamline CI/CD pipelines and infrastructure management for modern .NET applications.",
      content: `
        DevOps is not a role; it's a culture of automation that starts on the developer's machine and ends with a robust, self-healing production environment.

        In my work with PS.MojaPosta.Api and other enterprise systems, I've transitioned from manual deployments to semi-autonomous pipelines using Nuke and Azure DevOps. 

        Why automation is non-negotiable:
        - **Repeatability**: If it worked in Staging, it MUST work in Production exactly the same way.
        - **Visibility**: Every commit should be traceable from the developer's laptop to the AKS pod.
        - **Security**: Integrating security checkpoints into the pipeline (SAST/DAST) ensures we don't fix vulnerabilities after deployment.

        My focus remains on empowering teams to deliver faster and more reliably. By treating infrastructure as code (IaC) and using tools like Docker and Kubernetes, we eliminate the 'it works on my machine' excuse.
      `,
      date: "April 22, 2026",
      readTime: "9 min",
      tags: ["DevOps", "CI/CD"],
      image: "https://picsum.photos/seed/server/800/450"
    },
    {
      id: 3,
      title: "Real-World Projects: Sorting the High-Rated Systems",
      excerpt: "A retrospective on recent high-rated projects. What makes a project truly successful in terms of performance and user impact?",
      content: `
        Success in technical leadership is measured by the longevity and reliability of the systems you build. I've been fortunate to lead some high-rated projects that pushed the boundaries of .NET performance.

        One standout was the Crypto Trading Engine. The challenge was massive: ultra-low latency requirements and the need for complex indicator confluences in real-time. We didn't just use standard libraries; we optimized the C# logic for garbage collection efficiency and used high-throughput data processing patterns.

        What makes a project 'High-Rated'?
        - **Operational Excellence**: Zero unplanned downtime during peak loads.
        - **Technical Debt Management**: A clean codebase that remains maintainable even years after the initial launch.
        - **Business Alignment**: Technical choices should always serve the business goal (e.g., faster trades, lower AWS costs).

        I am your 'new employee' in spirit every time I start a project—approaching it with fresh curiosity but backed by 15+ years of hardened experience.
      `,
      date: "March 30, 2026",
      readTime: "6 min",
      tags: ["Full Stack", "Projects"],
      image: "https://picsum.photos/seed/workspace/800/450"
    }
  ];

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-80">Engineering Blog</h2>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">Insights & <span className="gradient-text">Architectures.</span></h1>
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-accent transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setViewingPost(post)}
            >
              <div className="glass-card overflow-hidden flex flex-col h-full border-slate-800 hover:border-brand-primary/30 transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingImg({url: post.image, title: post.title});
                    }}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 cursor-zoom-in"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.slice(0, 1).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-brand-primary text-[10px] font-black uppercase tracking-widest rounded-md text-white shadow-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5 font-medium uppercase tracking-wider">
                      <Calendar size={14} /> {post.date}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium uppercase tracking-wider">
                      <Clock size={14} /> {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-brand-accent transition-colors leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-widest">
                    Read Article <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Prošireni newsletter placeholder */}
        <div className="mt-32 glass-card p-12 relative overflow-hidden border-brand-primary/10">
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Stay updated on <span className="text-brand-accent">.NET architecture.</span></h3>
              <p className="text-slate-400 font-light leading-relaxed">
                I share my real-world experience, migration guides, and performance tuning tips once a month. No spam, just engineering.
              </p>
            </div>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="you@company.com" 
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 outline-none focus:border-brand-primary transition-all text-sm"
              />
              <button className="px-8 py-4 bg-brand-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {viewingImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingImg(null)}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-50 shadow-2xl"
              onClick={() => setViewingImg(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={viewingImg.url} 
                alt={viewingImg.title} 
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
                referrerPolicy="no-referrer"
              />
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase text-white">{viewingImg.title}</h3>
                <p className="text-brand-accent text-[10px] font-black uppercase tracking-widest bg-brand-primary/10 px-4 py-2 rounded-full inline-block">Click anywhere to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Modal */}
      <AnimatePresence>
        {viewingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingPost(null)}
            className="fixed inset-0 z-[101] bg-[#050810]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-border-dim max-w-3xl w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(30,58,138,0.2)] flex flex-col my-auto max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="relative h-48 md:h-64 shrink-0">
                <img 
                  src={viewingPost.image} 
                  alt={viewingPost.title} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingImg({url: viewingPost.image, title: viewingPost.title});
                  }}
                  className="w-full h-full object-cover opacity-50 cursor-zoom-in hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
                <button 
                  onClick={() => setViewingPost(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/50 hover:bg-white/10 rounded-full transition-colors border border-white/5"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {viewingPost.tags.map((t: string) => (
                      <span key={t} className="text-[9px] font-black uppercase tracking-widest bg-brand-primary px-3 py-1 rounded text-white">{t}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight uppercase">{viewingPost.title}</h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                <div className="flex items-center gap-6 text-[11px] font-mono text-[#64748b] uppercase tracking-widest mb-10 pb-6 border-b border-border-dim">
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-brand-primary" /> {viewingPost.date}</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-brand-primary" /> {viewingPost.readTime} read</div>
                </div>

                <div className="prose prose-invert prose-slate max-w-none">
                  <div className="text-[15px] text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                    {viewingPost.content}
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-border-dim flex justify-between items-center bg-brand-primary/[0.02] p-8 rounded-xl">
                  <div>
                    <h4 className="font-mono text-xs text-brand-primary uppercase tracking-widest mb-2 font-bold whitespace-nowrap">Ready to discuss architecture?</h4>
                    <p className="text-xs text-[#64748b] font-light max-w-sm">I'm currently accepting new projects for Senior / Lead architectural consulting.</p>
                  </div>
                  <a href="/#contact" onClick={() => setViewingPost(null)} className="font-mono text-[11px] text-brand-primary border border-brand-primary px-6 py-3 ml-4 hover:bg-brand-primary hover:text-[#050810] transition-all uppercase font-bold whitespace-nowrap">
                    Start a Sync
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper to handle hash scrolling
const ScrollToHashElement = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pathname === "/") {
       window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
};

// Početna stranica
const PocetnaStranica = () => (
  <>
    <HeroSekcija />
    <ONamaSekcija />
    <SkillsSekcija />
    <ProjectsSekcija />
    <AdvantageSekcija />
    <ExperienceSekcija />
    <KontaktSekcija />
  </>
);

export default function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.getElementById('glow');
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <ScrollToHashElement />
      <div id="glow" className="cursor-glow" />
      <div className="min-h-screen selection:bg-brand-primary/30 selection:text-brand-primary scroll-smooth bg-[#050810] text-[#e2e8f0] relative">
        <Navigacija />
        <main className="relative z-10 font-sans mt-20">
          <Routes>
            <Route path="/" element={<PocetnaStranica />} />
            <Route path="/blog" element={<BlogSekcija />} />
            <Route path="/ai-builder" element={<AIAppBuilder />} />
          </Routes>
        </main>
        <Podnozje />
        <BackToTop />
        <FontSizeSlideout />
        <CookieBanner />
      </div>
    </Router>
  );
}
