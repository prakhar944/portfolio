# Complete portfolio implementation

Every path below is relative to the portfolio project root. Each code block contains the complete file, including imports. Run `npm install` followed by `npm run dev`. See README.md for the folder structure, installation commands, deployment and integration notes.

The supplied binary artwork is available at `public/prakhar-profile.jpg`. The complete npm-generated dependency lockfile is available at `package-lock.json`; neither is duplicated inside this text document.

## package.json

````json
{
  "name": "prakhar-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "check": "tsc -b",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --write src scripts *.ts *.json *.html README.md",
    "docs:source": "node scripts/export-source.mjs"
  },
  "dependencies": {
    "@fontsource/dm-serif-display": "^5.2.6",
    "@fontsource/inter": "^5.2.8",
    "@fontsource/space-grotesk": "^5.2.10",
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.4.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.468.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.4",
    "three": "^0.180.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@testing-library/react": "^16.3.3",
    "@testing-library/user-event": "^14.6.7",
    "@types/node": "^24.7.2",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@types/three": "^0.180.0",
    "@vitejs/plugin-react": "^5.0.4",
    "jsdom": "^29.1.1",
    "prettier": "^3.9.9",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.9.3",
    "vite": "^7.1.9",
    "vitest": "^5.0.3"
  }
}
````

## tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "types": ["vite/client", "node"]
  },
  "include": ["src", "vite.config.ts"]
}
````

## vite.config.ts

````ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { chunkSizeWarningLimit: 1100 },
});
````

## vitest.config.ts

````ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    pool: "threads",
    maxWorkers: 1,
    fileParallelism: false,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/test/**/*.test.tsx"],
  },
});
````

## index.html

````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#080808" />
    <meta
      name="description"
      content="Prakhar Shrivastava, Computer Science student at IIIT Sonipat and aspiring full-stack developer. Explore React, Node.js, Express and MongoDB projects."
    />
    <meta
      property="og:title"
      content="Prakhar Shrivastava | Full-Stack Developer"
    />
    <meta
      property="og:description"
      content="Computer Science at IIIT Sonipat. Full-stack applications, thoughtful interfaces and structured backend systems."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <title>Prakhar Shrivastava | Full-Stack Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## .gitignore

````text
node_modules/
dist/
*.local
*.tsbuildinfo
.env
.env.*
!.env.example
artifacts/
````

## .env.example

````text
# Optional HTTPS contact endpoint accepting JSON. See README.md.
VITE_CONTACT_ENDPOINT=
````

## vercel.json

````json
{
  "rewrites": [{ "source": "/((?!.*\\.).*)", "destination": "/index.html" }]
}
````

## public/_redirects

````text
/* /index.html 200
````

## public/favicon.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#080808"/><text x="8" y="42" fill="#e8ddc7" font-family="Arial,sans-serif" font-size="30" font-weight="bold">PS</text><rect x="48" y="46" width="7" height="7" fill="#d11a2a"/></svg>
````

## public/og-image.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#080808"/><path d="M80 100h1040" stroke="#443c32"/><text x="80" y="180" fill="#d11a2a" font-family="Arial" font-size="22" letter-spacing="5">COMPUTER SCIENCE · IIIT SONIPAT</text><g fill="#e8ddc7" font-family="Arial" font-size="100" font-weight="bold"><text x="75" y="320">Prakhar</text><text x="75" y="425">Shrivastava.</text></g><text x="80" y="530" fill="#aaa69e" font-family="Arial" font-size="27">Full-Stack Developer / React · Node.js · MongoDB</text></svg>
````

## src/App.tsx

````tsx
import { lazy, Suspense, useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Education = lazy(() => import("./pages/Education"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RoutePosition() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let observer: MutationObserver | undefined;
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ block: "start", behavior: "instant" });
      observer?.disconnect();
      return true;
    };
    if (!scroll()) {
      observer = new MutationObserver(scroll);
      observer.observe(document.getElementById("main-content")!, {
        childList: true,
        subtree: true,
      });
    }
    return () => observer?.disconnect();
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <Suspense
              fallback={
                <div className="container route-loading" role="status">
                  Loading page…
                </div>
              }
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/education" element={<Education />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <RoutePosition />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  );
}
````

## src/components/home/FeaturedProjects.tsx

````tsx
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import { ProjectVisual } from "../projects/ProjectVisual";
import { Reveal } from "../ui/Reveal";

export function FeaturedProjects() {
  return (
    <section className="section cream-section" id="selected-work">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / SELECTED WORK</p>
              <h2>
                Built to work.
                <br />
                <span className="serif">Designed to feel right.</span>
              </h2>
            </div>
            <Link className="text-link" to="/projects">
              Explore all projects
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
        <div className="featured-grid">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <article className="featured-project">
                <Link
                  to={`/projects#${project.id}`}
                  className="project-image-link"
                  aria-label={`Explore ${project.title} case study`}
                >
                  <ProjectVisual kind={project.id} />
                </Link>
                <div className="project-summary">
                  <div className="project-number">{project.number}</div>
                  <div>
                    <p className="eyebrow">{project.category}</p>
                    <Link
                      to={`/projects#${project.id}`}
                      className="project-title"
                    >
                      {project.title}
                      <ArrowUpRight size={26} />
                    </Link>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
````

## src/components/home/Hero.tsx

````tsx
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../../data/profile";
import { ScenePanel } from "../three/ScenePanel";
import { ButtonLink, ExternalLink } from "../ui/Links";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="red-square" />
          COMPUTER SCIENCE @ IIIT SONIPAT
        </p>
        <span className="hero-location">
          SONEPAT, INDIA <span className="red-dot" />
        </span>
      </div>
      <div className="hero-grid">
        <Reveal className="hero-copy">
          <h1>
            Prakhar
            <br />
            Shrivastava<span className="title-dot">.</span>
          </h1>
          <p className="hero-role">
            Computer Science Student
            <br className="mobile-only" />{" "}
            <span className="serif">& Full-Stack Developer</span>
          </p>
          <p className="hero-description">
            I build responsive interfaces and the systems behind them. Computer
            Science at IIIT Sonipat, working with React, Node.js, Express and
            MongoDB.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/projects">View projects</ButtonLink>
            <ButtonLink to="/contact" secondary>
              Contact me
            </ButtonLink>
          </div>
          <div className="hero-socials">
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.resume}>Resume</ExternalLink>
          </div>
        </Reveal>
        <Reveal className="hero-art" delay={0.15}>
          <ScenePanel />
          <Link className="portrait-note" to="/about">
            <img
              src="/prakhar-profile.jpg"
              alt="Supplied hand-drawn portrait in a crimson kurta"
              width="64"
              height="76"
            />
            <span>
              A little about
              <br />
              <strong>the person behind the code.</strong>
            </span>
            <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <a href="#selected-work">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </a>
        <span>
          FRONTEND <i /> BACKEND <i /> EVERYTHING IN BETWEEN
        </span>
        <span className="hero-bottom-index">
          PORTFOLIO / {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}
````

## src/components/home/TechStack.tsx

````tsx
import { Braces, Layers, Terminal, Database } from "lucide-react";
import { skills } from "../../data/skills";
import { Reveal } from "../ui/Reveal";
const icons = [Braces, Layers, Terminal, Database];

export function TechStack() {
  return (
    <section className="section tech-section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / THE TOOLKIT</p>
              <h2>
                The tools behind
                <br />
                <span className="serif">the work.</span>
              </h2>
            </div>
            <p className="section-side-copy">
              From the first component to the final API endpoint. A stack
              grounded in fundamentals.
            </p>
          </div>
        </Reveal>
        <div className="tech-grid">
          {skills.map((group, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                key={group.title}
                delay={i * 0.05}
                className="tech-column"
              >
                <div className="flex items-center justify-between mb-8">
                  <Icon size={25} strokeWidth={1.3} />
                  <span className="small-index">{group.number}</span>
                </div>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      {item}
                      <span>↗</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
````

## src/components/layout/Footer.tsx

````tsx
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { navigation, profile } from "../../data/profile";
import { ExternalLink } from "../ui/Links";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link to="/" className="footer-name">
              Prakhar Shrivastava<span>.</span>
            </Link>
            <p className="mt-2 text-sm text-muted">Full-Stack Developer</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <a
              className="inline-flex items-center gap-2"
              href={`mailto:${profile.email}`}
            >
              Email
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Prakhar Shrivastava</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-5">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <span>
            Sonepat, India <span className="red-dot" />
          </span>
        </div>
      </div>
    </footer>
  );
}
````

## src/components/layout/Navbar.tsx

````tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation, profile } from "../../data/profile";
import { ExternalLink } from "../ui/Links";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="monogram" aria-label="Prakhar Shrivastava home">
          ps<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-resume">
          <ExternalLink href={profile.resume} className="resume-link">
            Resume <ArrowDownToLine size={14} aria-hidden="true" />
          </ExternalLink>
        </div>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navigation.map((item, i) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                <span>0{i + 1}</span>
                {item.label}
              </NavLink>
            ))}
            <ExternalLink href={profile.resume}>Resume</ExternalLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
````

## src/components/projects/Architecture.tsx

````tsx
import { ArrowDown, Database, Monitor, Server, Cloud } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function Architecture() {
  return (
    <Reveal className="architecture">
      <div className="eyebrow mb-8">MYTUBE / SYSTEM OVERVIEW</div>
      <div className="architecture-node">
        <Monitor size={20} />
        <div>
          <strong>React frontend</strong>
          <span>Responsive interface · protected routes</span>
        </div>
      </div>
      <div className="architecture-connector">
        <ArrowDown size={16} />
        <span>REST API / HTTP-only cookies</span>
      </div>
      <div className="architecture-node crimson-node">
        <Server size={20} />
        <div>
          <strong>Node.js + Express</strong>
          <span>Authentication · application logic</span>
        </div>
      </div>
      <div className="architecture-connector">
        <ArrowDown size={16} />
        <span>Data persistence & media workflows</span>
      </div>
      <div className="architecture-branches">
        <div className="architecture-node">
          <Database size={20} />
          <div>
            <strong>MongoDB</strong>
            <span>Mongoose · aggregations</span>
          </div>
        </div>
        <div className="architecture-node">
          <Cloud size={20} />
          <div>
            <strong>Cloudinary</strong>
            <span>Videos · thumbnails</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
````

## src/components/projects/ProjectVisual.tsx

````tsx
import { ArrowUpRight, Play, Search, Menu, PenLine } from "lucide-react";

// Original editorial illustrations of project functionality, not claimed screenshots.
export function ProjectVisual({ kind }: { kind: "mytube" | "blog" }) {
  return (
    <div
      className={`project-visual ${kind}`}
      aria-label={`${kind === "mytube" ? "MyTube" : "Blog"} conceptual interface illustration`}
      role="img"
    >
      <div className="preview-caption">
        <span>INTERFACE STUDY</span>
        <ArrowUpRight size={15} />
      </div>
      {kind === "mytube" ? (
        <div className="video-window">
          <div className="video-toolbar">
            <strong>
              <span className="play-logo">
                <Play size={10} fill="currentColor" />
              </span>
              MyTube
            </strong>
            <span className="mock-search">
              Search videos
              <Search size={10} />
            </span>
            <Menu size={13} />
          </div>
          <div className="video-body">
            <div className="mock-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="video-main">
              <div className="video-screen">
                <div className="video-orbit orbit-one" />
                <div className="video-orbit orbit-two" />
                <div className="video-orbit orbit-three" />
                <span className="video-play">
                  <Play size={21} fill="currentColor" />
                </span>
                <span className="screen-label">
                  A SPACE TO
                  <br />
                  WATCH & DISCOVER.
                </span>
              </div>
              <div className="mock-title" />
              <div className="mock-description" />
              <div className="video-thumbs">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="blog-window">
          <div className="blog-toolbar">
            <strong>
              the margin<span>.</span>
            </strong>
            <span>Stories & perspectives</span>
            <PenLine size={12} />
          </div>
          <div className="blog-preview-content">
            <span className="blog-kicker">A PLACE FOR YOUR WORDS</span>
            <h3>
              Ideas deserve
              <br />
              <em>a little space.</em>
            </h3>
            <div className="blog-rule" />
            <div className="blog-columns">
              <div className="blog-art">
                <div />
                <div />
                <div />
              </div>
              <div>
                <span className="blog-small-label">WRITE. REFLECT. SHARE.</span>
                <div className="mock-title" />
                <div className="mock-description" />
                <div className="mock-description" />
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>
        </div>
      )}
      <span className="visual-index">
        {kind === "mytube" ? "01 / MERN APPLICATION" : "02 / REACT APPLICATION"}
      </span>
    </div>
  );
}
````

## src/components/three/ScenePanel.tsx

````tsx
import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const TechnicalScene = lazy(() => import("./TechnicalScene"));
function StaticStructure() {
  return (
    <svg viewBox="0 0 400 380" className="static-structure" aria-hidden="true">
      {[0, 70, 140].map((offset, i) => (
        <g key={offset} transform={`translate(0 ${offset})`}>
          <path
            d="M65 105 200 45 335 105 200 165Z"
            fill={i === 1 ? "#791422" : "#322d27"}
            stroke={i === 1 ? "#d11a2a" : "#a69780"}
          />
          <path d="M65 105v65m135-5v65m135-125v65" stroke="#756655" />
        </g>
      ))}
    </svg>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticStructure /> : this.props.children;
  }
}

export function ScenePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);
  const [paused, setPaused] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    const desktop = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)",
    ).matches;
    setCapable(!!context && desktop && navigator.hardwareConcurrency >= 4);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const visibility = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return (
    <div
      className="scene-panel"
      ref={ref}
      role="group"
      aria-label="Layered architectural structure representing frontend, API and database systems"
    >
      <div className="scene-caption">
        <span>SYSTEM / 001</span>
        <span>FULL-STACK ARCHITECTURE</span>
      </div>
      <div className="scene-cross scene-cross-one">+</div>
      <div className="scene-cross scene-cross-two">+</div>
      <div className="scene-render">
        <SceneBoundary>
          {capable ? (
            <Suspense fallback={<StaticStructure />}>
              <TechnicalScene
                animated={visible && tabActive && !paused && !reduced}
              />
            </Suspense>
          ) : (
            <StaticStructure />
          )}
        </SceneBoundary>
      </div>
      <div className="scene-bottom">
        <span>
          <i /> INTERFACE. LOGIC. DATA.
        </span>
        {capable && !reduced && (
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}
````

## src/components/three/TechnicalScene.tsx

````tsx
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { Group, MathUtils } from "three";

function Structure({ animated }: { animated: boolean }) {
  const structure = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!structure.current || !animated) return;
    structure.current.rotation.y = MathUtils.damp(
      structure.current.rotation.y,
      0.65 + Math.sin(clock.elapsedTime * 0.17) * 0.2 + pointer.x * 0.12,
      3,
      delta,
    );
    structure.current.rotation.x = MathUtils.damp(
      structure.current.rotation.x,
      0.36 - pointer.y * 0.08,
      3,
      delta,
    );
  });
  return (
    <group ref={structure} rotation={[0.36, 0.65, -0.12]}>
      {[-1, 0, 1].map((y) => (
        <group key={y} position={[0, y * 0.88, 0]}>
          <mesh>
            <boxGeometry args={[2.45, 0.15, 2.45]} />
            <meshStandardMaterial
              color={y === 0 ? "#b11226" : "#b9ab93"}
              metalness={0.55}
              roughness={0.48}
            />
            <Edges color={y === 0 ? "#ed4350" : "#e8ddc7"} />
          </mesh>
          {[-0.9, 0.9].flatMap((x) =>
            [-0.9, 0.9].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.43, z]}>
                <boxGeometry args={[0.035, 0.72, 0.035]} />
                <meshBasicMaterial color="#98856e" />
              </mesh>
            )),
          )}
        </group>
      ))}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.1, 2.6, 1.1]} />
        <meshStandardMaterial
          color="#2a2622"
          transparent
          opacity={0.45}
          wireframe
        />
      </mesh>
      <mesh position={[0, 1.57, 0]}>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshStandardMaterial color="#d11a2a" />
      </mesh>
    </group>
  );
}

export default function TechnicalScene({ animated }: { animated: boolean }) {
  return (
    <Canvas
      camera={{ position: [4, 2.8, 6.5], fov: 37 }}
      dpr={[1, 1.4]}
      frameloop={animated ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 7, 4]} intensity={3} />
      <directionalLight position={[-4, 0, 1]} color="#b11226" intensity={2} />
      <Structure animated={animated} />
    </Canvas>
  );
}
````

## src/components/ui/Links.tsx

````tsx
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-outline" : "button-primary"}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const missing = href.startsWith("YOUR_");
  if (missing)
    return (
      <span
        className={`unavailable-link ${className}`}
        aria-label={`${typeof children === "string" ? children : "Link"}: link not yet provided`}
        title={`Link not yet provided (${href})`}
      >
        {children}
        <span className="link-pending">Pending</span>
      </span>
    );
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}
````

## src/components/ui/PageHeading.tsx

````tsx
import { Reveal } from "./Reveal";

export function PageHeading({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <header className="page-heading container">
      <Reveal>
        <p className="eyebrow">
          <span className="red-square" />
          {label}
        </p>
        <h1>
          {title}
          <br />
          <span className="serif">{accent}</span>
        </h1>
        <p className="page-description">{description}</p>
      </Reveal>
    </header>
  );
}
````

## src/components/ui/Reveal.tsx

````tsx
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-35px" }}
      transition={{ duration: reduced ? 0 : 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}
````

## src/data/profile.ts

````ts
export const profile = {
  name: "Prakhar Shrivastava",
  email: "prakharshrivastava109@gmail.com",
  location: "Sonepat, India",
  // Replace these explicit placeholders with your actual public URLs.
  github: "YOUR_GITHUB_URL",
  linkedin: "YOUR_LINKEDIN_URL",
  twitter: "YOUR_TWITTER_URL",
  resume: "YOUR_RESUME_URL",
};

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Education", to: "/education" },
  { label: "Contact", to: "/contact" },
];
````

## src/data/projects.ts

````ts
export const projects = [
  {
    id: "mytube",
    number: "01",
    title: "MyTube",
    category: "FULL-STACK DEVELOPMENT",
    subtitle: "A platform for every frame.",
    description:
      "A full-stack YouTube-style video streaming platform. From secure authentication to video uploads, built with the MERN stack.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "REST APIs",
      "Postman",
      "Git",
      "GitHub",
    ],
    github: "YOUR_MYTUBE_GITHUB_URL",
    features: [
      "JWT authentication",
      "HTTP-only cookies",
      "Protected routes",
      "Video uploads & management",
      "Comments & likes",
      "Playlists & subscriptions",
      "Tweets",
      "Watch history",
      "Channel-based video retrieval",
      "Cloudinary media storage",
    ],
  },
  {
    id: "blog",
    number: "02",
    title: "Blog",
    category: "FRONTEND DEVELOPMENT",
    subtitle: "A little room for good ideas.",
    description:
      "A responsive blog-writing frontend built with React and Tailwind CSS. Reusable components bring browsing and writing into one considered interface.",
    stack: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Vite",
      "Git",
      "GitHub",
      "Vercel",
    ],
    github: "YOUR_BLOG_GITHUB_URL",
    live: "YOUR_BLOG_LIVE_URL",
    features: [
      "Blog browsing",
      "Blog writing interface",
      "Reusable React components",
      "Responsive layouts",
      "Vite development workflow",
      "Vercel deployment",
    ],
  },
] as const;
````

## src/data/skills.ts

````ts
export const skills = [
  {
    title: "Languages",
    number: "01",
    items: ["C++", "Python", "C", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks & libraries",
    number: "02",
    items: ["React", "Node.js", "Tailwind CSS", "Spring Boot"],
  },
  {
    title: "Backend & tools",
    number: "03",
    items: ["Express", "REST APIs", "Postman", "Git", "GitHub"],
  },
  {
    title: "Databases",
    number: "04",
    items: ["MongoDB", "PostgreSQL", "MySQL"],
  },
];
````

## src/hooks/usePageMeta.ts

````ts
import { useEffect } from "react";

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | Prakhar Shrivastava`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
}
````

## src/index.css

````css
@import "tailwindcss";

@theme {
  --color-ink: #080808;
  --color-parchment: #e8ddc7;
  --color-crimson: #b11226;
  --color-muted: #a3a09a;
  --font-sans: "Inter", sans-serif;
  --font-heading: "Space Grotesk", sans-serif;
}

:root {
  font-family: var(--font-sans);
  color: #e8ddc7;
  background: #080808;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color-scheme: dark;
}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 95px;
}
body {
  margin: 0;
  min-width: 320px;
}
button,
input,
textarea {
  font: inherit;
}
button,
a {
  -webkit-tap-highlight-color: transparent;
}
button {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;
}
button,
a,
input,
textarea {
  touch-action: manipulation;
}
::selection {
  background: #b11226;
  color: #f1e8d8;
}
:focus-visible {
  outline: 2px solid #d11a2a;
  outline-offset: 5px;
}
main:focus {
  outline: none;
}
button:disabled {
  cursor: wait;
  opacity: 0.6;
}
h1,
h2,
h3,
h4,
p {
  margin: 0;
}
h1,
h2,
h3,
h4 {
  font-family: var(--font-heading);
  font-weight: 500;
}
h2 {
  font-size: clamp(2.4rem, 4.2vw, 4.15rem);
  letter-spacing: -0.055em;
  line-height: 1.12;
}
svg {
  flex-shrink: 0;
}
.container {
  width: min(1280px, calc(100% - 112px));
  margin-inline: auto;
}
.section {
  padding-block: 108px;
}
.serif {
  font-family: "DM Serif Display", Georgia, serif;
  font-style: italic;
  font-weight: 400;
}
.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.16em;
}
.red-square {
  width: 6px;
  height: 6px;
  background: #d11a2a;
  display: inline-block;
}
.red-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #d11a2a;
  margin-left: 7px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  border: 1px solid transparent;
  padding: 16px 22px;
  min-height: 50px;
  font-size: 12px;
  font-weight: 500;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
  border-radius: 2px;
}
.button:hover {
  transform: translateY(-2px);
}
.button-primary {
  background: #b11226;
  color: #fff5ee;
}
.button-primary:hover {
  background: #cf1b31;
}
.button-outline {
  border-color: #514b42;
  color: inherit;
}
.button-outline:hover {
  border-color: #b11226;
  background: #b11226;
  color: #fff5ee;
}
.text-link {
  display: inline-flex;
  gap: 26px;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid currentColor;
  padding-bottom: 7px;
  width: fit-content;
  transition: color 0.2s;
}
.text-link:hover {
  color: #d11a2a;
}
.unavailable-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;
  cursor: default;
}
.link-pending {
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.02em;
  opacity: 0.65;
  font-weight: 400;
}
.unavailable-link.button:hover {
  transform: none;
  background: none;
  color: inherit;
  border-color: #514b42;
}
.skip-link {
  position: fixed;
  top: -80px;
  left: 20px;
  background: #e8ddc7;
  color: #080808;
  padding: 15px;
  z-index: 100;
}
.skip-link:focus {
  top: 10px;
}
.site-header {
  height: 88px;
  position: sticky;
  top: 0;
  background: #080808f7;
  z-index: 40;
  border-bottom: 1px solid #25231f;
}
.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.monogram {
  font-family: var(--font-heading);
  font-size: 37px;
  font-weight: 700;
  letter-spacing: -0.1em;
  line-height: 1;
  padding-right: 10px;
}
.monogram span {
  color: #d11a2a;
}
.desktop-nav {
  display: flex;
  gap: 33px;
  margin-left: auto;
  margin-right: 48px;
  height: 100%;
  align-items: center;
}
.desktop-nav a {
  font-size: 11px;
  color: #aaa59d;
  padding-block: 12px;
  position: relative;
  transition: color 0.2s;
}
.desktop-nav a:hover,
.desktop-nav a.active {
  color: #f1e8d8;
}
.desktop-nav a.active::after {
  content: "";
  height: 2px;
  width: 16px;
  background: #d11a2a;
  position: absolute;
  bottom: 1px;
  left: 0;
}
.resume-link {
  font-size: 11px;
  border: 1px solid #4e473d;
  padding: 10px 15px;
}
.menu-toggle {
  display: none;
  background: none;
  border: 0;
  color: #e8ddc7;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}
.mobile-nav {
  display: none;
}
.hero {
  padding-top: 46px;
}
.hero-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hero-location {
  font-size: 9px;
  color: #aaa59d;
  letter-spacing: 0.12em;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  align-items: center;
  padding: 49px 0 50px;
}
.hero h1 {
  font-size: clamp(4.1rem, 6.7vw, 6.6rem);
  font-weight: 500;
  line-height: 0.99;
  letter-spacing: -0.065em;
}
.title-dot {
  color: #d11a2a;
}
.hero-role {
  font-family: var(--font-heading);
  font-size: clamp(16px, 1.6vw, 23px);
  margin: 23px 0 19px;
  letter-spacing: -0.02em;
}
.hero-role .serif {
  color: #c8bba5;
}
.hero-description {
  font-size: 13px;
  line-height: 1.9;
  color: #a8a49c;
  max-width: 440px;
  margin-bottom: 27px;
}
.hero-socials {
  display: flex;
  gap: 23px;
  font-size: 10px;
  margin-top: 28px;
  color: #b9b1a4;
}
.hero-art {
  padding-left: 15px;
}
.scene-panel {
  position: relative;
  height: 345px;
  background-image:
    linear-gradient(#b9ab9310 1px, transparent 1px),
    linear-gradient(90deg, #b9ab9310 1px, transparent 1px);
  background-size: 40px 40px;
  border: 1px solid #302b24;
}
.scene-caption,
.scene-bottom {
  position: absolute;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  color: #b0a18c;
  font-family: var(--font-heading);
  font-size: 7px;
  letter-spacing: 0.1em;
}
.scene-caption {
  top: 17px;
}
.scene-bottom {
  bottom: 13px;
}
.scene-bottom span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.scene-bottom i {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #b11226;
}
.scene-bottom button {
  color: #cdbfa7;
  display: grid;
  place-items: center;
  padding: 8px;
  margin: -8px;
  background: none;
  border: 0;
}
.scene-render {
  height: 100%;
}
.static-structure {
  height: 100%;
  width: 100%;
  padding: 25px;
}
.scene-cross {
  position: absolute;
  color: #978b78;
  font-size: 15px;
  z-index: 1;
}
.scene-cross-one {
  top: -12px;
  left: -5px;
}
.scene-cross-two {
  bottom: -10px;
  right: -5px;
}
.portrait-note {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 19px;
  padding-top: 17px;
  border-top: 1px solid #302b24;
}
.portrait-note img {
  object-fit: cover;
  object-position: top;
  width: 43px;
  height: 49px;
  filter: saturate(0.7);
}
.portrait-note span {
  color: #a3a09a;
  font-size: 10px;
  line-height: 1.8;
}
.portrait-note strong {
  color: #d6cbb8;
  font-weight: 400;
}
.portrait-note > svg {
  margin-left: auto;
}
.hero-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  border-top: 1px solid #302b24;
  padding: 23px 0;
  font-size: 8px;
  letter-spacing: 0.12em;
  color: #a9a296;
}
.hero-bottom a,
.hero-bottom > span {
  display: flex;
  align-items: center;
  gap: 13px;
}
.hero-bottom i {
  width: 3px;
  height: 3px;
  background: #b11226;
}
.cream-section {
  background: #e8ddc7;
  color: #171613;
  color-scheme: light;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 53px;
}
.section-heading .eyebrow {
  margin-bottom: 20px;
}
.section-heading .text-link {
  margin-bottom: 8px;
  white-space: nowrap;
}
.section-side-copy {
  max-width: 300px;
  font-size: 13px;
  line-height: 1.9;
  color: #aaa49a;
}
.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}
.project-image-link {
  display: block;
}
.project-visual {
  height: 315px;
  position: relative;
  overflow: hidden;
  padding: 54px 34px 0;
}
.project-visual.mytube {
  background: #24221f;
}
.project-visual.blog {
  background: #c5bda9;
}
.preview-caption {
  position: absolute;
  top: 20px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 7px;
  letter-spacing: 0.13em;
  color: #d2c7b2;
}
.blog .preview-caption {
  color: #554c3c;
}
.visual-index {
  position: absolute;
  bottom: 16px;
  left: 24px;
  font-size: 7px;
  letter-spacing: 0.1em;
  color: #afa58f;
}
.blog .visual-index {
  color: #554c3c;
}
.video-window,
.blog-window {
  width: 100%;
  height: 226px;
  overflow: hidden;
  transform: perspective(1200px) rotateY(-8deg) rotateX(6deg) rotateZ(-2deg);
  transition: transform 0.6s;
  box-shadow: 9px 14px 35px #0004;
  border: 1px solid #4a443b;
  background: #131313;
}
.project-image-link:hover .video-window,
.project-image-link:hover .blog-window {
  transform: perspective(1200px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)
    translateY(-4px);
}
.video-toolbar {
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 12px;
  border-bottom: 1px solid #2d2d2d;
  color: #ddd6ca;
}
.video-toolbar strong {
  font-size: 9px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.play-logo {
  display: grid;
  place-items: center;
  width: 15px;
  height: 12px;
  background: #b11226;
  color: #fff;
  border-radius: 2px;
}
.mock-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
  font-size: 6px;
  color: #8e8e8e;
  border: 1px solid #333;
  padding: 4px 7px;
}
.video-body {
  display: flex;
}
.mock-sidebar {
  width: 34px;
  padding: 15px 10px;
  border-right: 1px solid #282828;
}
.mock-sidebar i {
  display: block;
  width: 10px;
  height: 3px;
  background: #666;
  margin-bottom: 15px;
}
.video-main {
  padding: 13px;
  flex: 1;
}
.video-screen {
  height: 103px;
  position: relative;
  overflow: hidden;
  background: #62222b;
}
.video-orbit {
  position: absolute;
  border: 1px solid #d5ad8e;
  width: 150px;
  height: 150px;
  top: -28px;
  right: 30px;
  transform: rotate(34deg);
}
.orbit-two {
  transform: rotate(54deg);
  width: 130px;
  right: 42px;
}
.orbit-three {
  transform: rotate(74deg);
  width: 110px;
  right: 52px;
}
.video-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #f0ddbb;
}
.screen-label {
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.04em;
  line-height: 1.4;
  color: #ecd8b8;
  position: absolute;
  left: 10px;
  bottom: 9px;
}
.mock-title {
  background: currentColor;
  opacity: 0.4;
  height: 4px;
  width: 65%;
  margin-top: 10px;
}
.mock-description {
  background: currentColor;
  opacity: 0.2;
  height: 3px;
  width: 40%;
  margin-top: 5px;
}
.video-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.video-thumbs div {
  height: 34px;
  flex: 1;
  background: #393730;
}
.video-thumbs div:nth-child(2) {
  background: #4b252b;
}
.video-thumbs div:nth-child(3) {
  background: #484b42;
}
.blog-window {
  background: #f3eedf;
  border-color: #e1d7c1;
  color: #28251e;
  transform: perspective(1200px) rotateY(7deg) rotateX(6deg) rotateZ(2deg);
}
.blog-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #b6ad97;
  height: 34px;
  margin: 0 19px;
}
.blog-toolbar strong {
  font-family: Georgia, serif;
  font-size: 14px;
  letter-spacing: -0.04em;
}
.blog-toolbar strong span {
  color: #b11226;
}
.blog-toolbar > span {
  font-size: 6px;
}
.blog-preview-content {
  padding: 18px 22px;
}
.blog-kicker {
  font-size: 5px;
  letter-spacing: 0.15em;
}
.blog-preview-content h3 {
  font-family: Georgia, serif;
  font-size: 29px;
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 9px 0;
}
.blog-preview-content em {
  font-weight: 400;
}
.blog-rule {
  height: 1px;
  background: #bdb29c;
  margin: 13px 0 10px;
}
.blog-columns {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 14px;
}
.blog-art {
  background: #a34633;
  height: 55px;
  display: flex;
  gap: 4px;
  align-items: end;
  padding: 0 15px;
  overflow: hidden;
}
.blog-art div {
  width: 35%;
  height: 70px;
  background: #d9b489;
  transform: rotate(25deg) translateY(18px);
}
.blog-small-label {
  font-size: 5px;
}
.blog-columns .mock-title {
  margin-top: 5px;
}
.blog-columns svg {
  margin-top: 5px;
}
.project-summary {
  display: grid;
  grid-template-columns: 29px 1fr;
  gap: 15px;
  padding-top: 25px;
}
.project-number {
  font-size: 11px;
  color: #8a7d69;
  padding-top: 2px;
}
.project-summary .eyebrow {
  font-size: 8px;
  color: #746a5a;
}
.project-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-heading);
  font-size: 31px;
  letter-spacing: -0.045em;
  margin: 6px 0 10px;
}
.project-title:hover {
  color: #b11226;
}
.project-summary p:not(.eyebrow) {
  font-size: 12px;
  line-height: 1.85;
  color: #645c50;
  max-width: 415px;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 19px;
}
.project-tags span {
  border: 1px solid #a79b843d;
  padding: 5px 9px;
  font-size: 9px;
  line-height: 1.5;
}
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 90px;
}
.intro-grid .eyebrow {
  margin-bottom: 24px;
}
.intro-description {
  font-size: 14px;
  color: #aaa49a;
  line-height: 1.9;
  margin-bottom: 31px;
}
.focus-row {
  display: flex;
  align-items: center;
  gap: 18px;
  border-top: 1px solid #322d26;
  padding: 20px 0;
}
.focus-row > svg:first-child {
  color: #bca88c;
}
.focus-row > svg:last-child {
  margin-left: auto;
  color: #786b57;
}
.focus-row h3 {
  font-size: 16px;
  letter-spacing: -0.02em;
}
.focus-row p {
  font-size: 11px;
  color: #aaa49a;
  margin-top: 6px;
}
.tech-section {
  border-top: 1px solid #2b261f;
  background: #0e0e0d;
}
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.tech-column {
  padding: 26px;
  border-top: 1px solid #3a342b;
  border-bottom: 1px solid #3a342b;
  border-left: 1px solid #3a342b;
}
.tech-column:last-child {
  border-right: 1px solid #3a342b;
}
.tech-column svg {
  color: #c6b598;
}
.small-index {
  font-size: 9px;
  color: #8d806d;
}
.tech-column h3 {
  font-size: 14px;
  margin-bottom: 26px;
}
.tech-column ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.tech-column li {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 8px 0;
  color: #aaa49a;
}
.tech-column li span {
  color: #756b5c;
}
.contact-banner {
  padding-block: 74px;
  background: #b11226;
  color: #f1e8d8;
}
.contact-banner .eyebrow {
  color: #eac0bf;
}
.contact-banner a {
  display: flex;
  align-items: center;
  width: fit-content;
  font-family: var(--font-heading);
  font-size: clamp(3rem, 7vw, 7rem);
  letter-spacing: -0.065em;
  margin: 10px 0 19px;
}
.contact-banner .serif {
  margin-left: 0.2em;
}
.contact-banner svg {
  width: 65px;
  height: 65px;
  margin-left: 90px;
  stroke-width: 1;
}
.contact-banner p:last-child {
  font-size: 12px;
  color: #efcecc;
}
.site-footer {
  padding: 49px 0 22px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 38px;
}
.footer-name {
  font-size: 21px;
  font-family: var(--font-heading);
  letter-spacing: -0.035em;
}
.footer-name span {
  color: #d11a2a;
}
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding-top: 22px;
  border-top: 1px solid #302b24;
  color: #9e9588;
  font-size: 9px;
}
.footer-bottom a:hover {
  color: #e8ddc7;
}
.footer-top a:hover {
  color: #d11a2a;
}
.page-heading {
  padding-block: 78px 80px;
}
.page-heading .eyebrow {
  margin-bottom: 29px;
}
.page-heading h1 {
  font-size: clamp(3.5rem, 6.5vw, 6.4rem);
  line-height: 1.02;
  letter-spacing: -0.06em;
}
.page-description {
  max-width: 530px;
  font-size: 14px;
  line-height: 1.9;
  color: #a8a49c;
  margin-top: 27px;
}
.route-loading {
  min-height: 70vh;
  display: grid;
  place-items: center;
  font-size: 14px;
}
.about-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  align-items: start;
  gap: 100px;
}
.profile-composition {
  position: relative;
  padding: 0 16px 0 0;
}
.profile-composition::before {
  content: "";
  position: absolute;
  top: 20px;
  right: 0;
  bottom: 50px;
  left: 20px;
  border: 1px solid #b11226;
}
.profile-image {
  position: relative;
  background: #c6b99f;
  overflow: hidden;
}
.profile-image img {
  width: 100%;
  height: auto;
  display: block;
  filter: saturate(0.8);
  transition:
    filter 0.5s,
    transform 0.6s;
}
.profile-image:hover img {
  transform: scale(1.015);
  filter: saturate(1);
}
.profile-caption {
  display: flex;
  justify-content: space-between;
  padding-top: 21px;
  gap: 10px;
  font-size: 8px;
  letter-spacing: 0.08em;
  color: #6b6050;
}
.about-copy .eyebrow {
  margin-bottom: 25px;
}
.about-copy h2 {
  margin-bottom: 28px;
}
.about-copy > p:not(.eyebrow) {
  font-size: 13px;
  color: #62594c;
  line-height: 1.95;
  margin-bottom: 17px;
}
.about-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  padding-top: 25px;
  border-top: 1px solid #c5b9a3;
  margin-top: 30px;
}
.about-facts dt {
  color: #766953;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.1em;
  margin-bottom: 7px;
}
.about-facts dd {
  margin: 0;
  font-size: 13px;
}
.exploration-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 100px;
}
.exploration-grid .eyebrow {
  margin-bottom: 25px;
}
.exploration-row {
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid #3a342b;
  padding: 25px 0;
}
.exploration-row > span {
  font-size: 10px;
  color: #b11226;
}
.exploration-row h3 {
  font-size: 22px;
  letter-spacing: -0.03em;
}
.exploration-row svg {
  margin-left: auto;
}
.problem-strip {
  padding: 65px 0;
}
.problem-strip .container {
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  gap: 80px;
}
.problem-strip h2 {
  font-size: 35px;
  margin: 15px 0;
}
.problem-strip p:not(.eyebrow) {
  font-size: 13px;
  line-height: 1.8;
  color: #645c50;
  max-width: 400px;
}
.problem-strip strong {
  font-family: var(--font-heading);
  font-size: 75px;
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 1;
}
.problem-strip strong > span {
  color: #b11226;
}
.problem-strip .container > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.problem-strip .container > div:last-child > span {
  font-size: 9px;
  letter-spacing: 0.1em;
}
.problem-strip .text-link {
  margin-top: 10px;
}
.case-study-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
  margin-bottom: 40px;
}
.case-study-header h2 {
  font-size: 65px;
  margin: 13px 0;
}
.case-study-header p:last-child {
  font-size: 14px;
}
.project-ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.case-study > .container > div > .project-visual {
  height: 450px;
  padding: 55px max(40px, 15%) 0;
}
.case-study .project-visual .video-window,
.case-study .project-visual .blog-window {
  height: 337px;
}
.case-study .video-screen {
  height: 192px;
}
.case-study .video-thumbs div {
  height: 60px;
}
.case-study .blog-preview-content {
  padding: 22px 40px;
}
.case-study .blog-preview-content h3 {
  font-size: 48px;
}
.case-study .blog-art {
  height: 90px;
}
.case-study .blog-art div {
  height: 130px;
}
.case-overview {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 50px;
  padding: 55px 0;
  border-bottom: 1px solid #877b6340;
}
.case-overview h3 {
  font-size: 25px;
  line-height: 1.55;
  letter-spacing: -0.025em;
  max-width: 800px;
}
.case-architecture {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 70px;
  align-items: center;
  margin: 65px 0;
}
.case-architecture h3 {
  font-size: 37px;
  line-height: 1.2;
  letter-spacing: -0.04em;
  margin: 20px 0;
}
.case-architecture p:not(.eyebrow) {
  font-size: 13px;
  line-height: 1.9;
  color: #645c50;
}
.architecture {
  padding: 30px;
  background: #ded2ba;
  border: 1px solid #b6a890;
}
.architecture-node {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border: 1px solid #a89a83;
  padding: 18px 12px;
  background: #e8ddc7;
}
.architecture-node strong {
  display: block;
  font-size: 13px;
  font-weight: 500;
}
.architecture-node span {
  display: block;
  margin-top: 5px;
  font-size: 8px;
  color: #645c50;
}
.architecture-connector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding: 13px 0;
  font-size: 8px;
  color: #6b5c47;
}
.crimson-node {
  background: #b11226;
  color: #f1e8d8;
  border-color: #b11226;
}
.crimson-node span {
  color: #f0d4cf;
}
.architecture-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.case-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px 55px;
  margin-top: 55px;
}
.case-details > div {
  border-top: 1px solid #877b6340;
  padding-top: 24px;
}
.case-details h3 {
  font-size: 20px;
  margin-bottom: 12px;
}
.case-details p {
  font-size: 13px;
  line-height: 1.9;
  color: #aaa49a;
}
.cream-section .case-details p {
  color: #645c50;
}
.feature-section {
  padding-top: 50px;
  margin-top: 45px;
  border-top: 1px solid #877b6340;
}
.feature-section ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style: none;
  padding: 25px 0 0;
}
.feature-section li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}
.feature-section svg {
  color: #b11226;
}
.education-layout {
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  gap: 50px;
}
.timeline {
  border-left: 1px solid #ac9d83;
  padding-left: 50px;
}
.timeline-entry {
  position: relative;
  padding-bottom: 65px;
}
.timeline-entry:last-child {
  padding-bottom: 0;
}
.timeline-dot {
  position: absolute;
  left: -55px;
  top: 3px;
  width: 9px;
  height: 9px;
  background: #b11226;
  outline: 7px solid #e8ddc7;
}
.timeline-entry h2 {
  margin: 19px 0 15px;
}
.timeline-entry .degree {
  font-size: 20px;
  margin-bottom: 10px;
  font-family: var(--font-heading);
}
.timeline-entry > p:not(.eyebrow):not(.degree) {
  font-size: 13px;
  color: #645c50;
}
.academic-metrics {
  display: flex;
  gap: 70px;
  margin-top: 35px;
  padding: 30px 0;
  border-bottom: 1px solid #b4a68d;
  border-top: 1px solid #b4a68d;
}
.academic-metrics strong,
.jee-rank strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 60px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.05em;
}
.academic-metrics span,
.jee-rank span {
  display: block;
  font-size: 9px;
  letter-spacing: 0.1em;
  margin-top: 12px;
  color: #6b5b44;
}
.timeline-entry h3 {
  font-size: 32px;
  margin: 18px 0 25px;
}
.competitive-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
}
.competitive-grid .eyebrow {
  margin-bottom: 20px;
}
.codechef-panel {
  border: 1px solid #4c4031;
  padding: 40px;
}
.codechef-panel > strong {
  display: block;
  font-family: var(--font-heading);
  font-size: clamp(70px, 9vw, 120px);
  font-weight: 400;
  letter-spacing: -0.07em;
  line-height: 1.3;
}
.codechef-panel > strong span {
  color: #b11226;
}
.codechef-panel > p {
  font-size: 10px;
  letter-spacing: 0.12em;
}
.codechef-panel .eyebrow {
  margin-bottom: 0;
}
.rating-rule {
  height: 1px;
  background: #544430;
  margin: 35px 0 25px;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 80px;
}
.contact-details h2 {
  margin: 22px 0 33px;
}
.contact-method {
  display: flex;
  gap: 16px;
  align-items: center;
  padding-block: 23px;
  border-top: 1px solid #bcaf96;
}
.contact-method > div {
  min-width: 0;
}
.contact-method span {
  display: block;
  font-size: 9px;
  color: #736551;
  letter-spacing: 0.1em;
  margin-bottom: 9px;
}
.contact-method a,
.contact-method p {
  font-size: 12px;
  overflow-wrap: anywhere;
}
.contact-method > button {
  border: 0;
  background: transparent;
  margin-left: auto;
  padding: 10px;
}
.contact-method a:hover {
  color: #b11226;
}
.contact-social {
  border-top: 1px solid #bcaf96;
  padding-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 17px;
}
.contact-social .eyebrow {
  margin-bottom: 7px;
}
.contact-social > span {
  font-size: 13px;
}
.copy-status {
  font-size: 12px;
  margin-top: 15px;
}
.contact-form {
  border-left: 1px solid #bcaf96;
  padding-left: 45px;
}
.contact-form label {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 11px;
  margin-bottom: 25px;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  background: #f1e8d870;
  border: 1px solid #b9ad97;
  color: #201c16;
  border-radius: 0;
  padding: 14px;
  font-size: 12px;
  line-height: 1.6;
}
.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #817664;
}
.contact-form textarea {
  resize: vertical;
  min-height: 130px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 17px;
}
.form-note {
  font-size: 11px;
  color: #645c50;
  line-height: 1.7;
  margin-bottom: 20px;
}
.form-feedback {
  font-size: 12px;
  line-height: 1.8;
  margin-top: 20px;
}
.form-feedback .text-link {
  display: flex;
}
.form-feedback.is-error {
  color: #a00f20;
}
.mobile-only {
  display: none;
}

@media (min-width: 1600px) {
  .hero-grid {
    padding-block: 80px;
  }
  .scene-panel {
    height: 405px;
  }
}
@media (max-width: 1100px) {
  .container {
    width: calc(100% - 72px);
  }
  .hero h1 {
    font-size: 6.9vw;
  }
  .hero-grid {
    gap: 20px;
    grid-template-columns: 1.2fr 1fr;
  }
  .hero-art {
    padding: 0;
  }
  .scene-panel {
    height: 310px;
  }
  .hero-role {
    font-size: 17px;
  }
  .hero-description {
    font-size: 12px;
  }
  .desktop-nav {
    gap: 24px;
    margin-right: 28px;
  }
  .hero-bottom-index {
    display: none !important;
  }
  .project-visual {
    height: 280px;
    padding-inline: 22px;
  }
  .video-window,
  .blog-window {
    height: 198px;
  }
  .project-summary {
    grid-template-columns: 20px 1fr;
    gap: 9px;
  }
  .intro-grid {
    gap: 55px;
  }
  .tech-column {
    padding: 22px 18px;
  }
  .tech-column h3 {
    font-size: 12px;
  }
  .about-grid {
    gap: 55px;
  }
  .contact-grid {
    gap: 40px;
  }
  .contact-form {
    padding-left: 30px;
  }
  .contact-method {
    gap: 10px;
  }
  .contact-method a {
    font-size: 11px;
  }
  .case-architecture {
    gap: 40px;
  }
  .architecture-branches {
    grid-template-columns: 1fr;
  }
  .competitive-grid {
    gap: 60px;
  }
}
@media (max-width: 767px) {
  .container {
    width: calc(100% - 40px);
  }
  .section {
    padding-block: 65px;
  }
  .site-header {
    height: 72px;
  }
  .monogram {
    font-size: 33px;
  }
  .desktop-nav {
    display: none;
  }
  .nav-resume {
    margin-left: auto;
    margin-right: 15px;
  }
  .resume-link {
    font-size: 10px;
    padding: 9px 12px;
  }
  .menu-toggle {
    display: flex;
  }
  .mobile-nav {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0 25px;
    position: absolute;
    top: 71px;
    left: 0;
    right: 0;
    background: #10100f;
    border-bottom: 1px solid #463b2e;
    box-shadow: 0 15px 20px #0005;
  }
  .mobile-nav > a {
    padding: 18px 0;
    border-top: 1px solid #29251f;
    font-family: var(--font-heading);
    font-size: 22px;
    display: flex;
    gap: 20px;
  }
  .mobile-nav > a > span {
    font-size: 10px;
    color: #b11226;
    align-self: center;
  }
  .mobile-nav > a.active {
    color: #ed6570;
  }
  .mobile-nav > .unavailable-link {
    margin-block: 18px;
    font-size: 14px;
  }
  .hero {
    padding-top: 29px;
  }
  .hero-topline .eyebrow {
    font-size: 8px;
  }
  .hero-location {
    display: none;
  }
  .hero-grid {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 36px;
    padding: 32px 0 28px;
  }
  .hero h1 {
    font-size: clamp(3.2rem, 11.5vw, 5.6rem);
    letter-spacing: -0.065em;
  }
  .hero-role {
    font-size: 19px;
    line-height: 1.5;
    margin-block: 20px 16px;
  }
  .mobile-only {
    display: block;
  }
  .hero-description {
    font-size: 13px;
    max-width: 500px;
  }
  .hero-socials {
    margin-top: 23px;
  }
  .hero-art {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 18px;
    align-items: center;
  }
  .scene-panel {
    height: 218px;
  }
  .scene-caption {
    font-size: 6px;
    left: 10px;
    right: 10px;
  }
  .scene-caption span:last-child {
    display: none;
  }
  .scene-bottom {
    left: 10px;
    right: 10px;
    font-size: 5px;
  }
  .static-structure {
    padding: 23px 0;
  }
  .portrait-note {
    flex-wrap: wrap;
    border-top: 0;
    margin: 0;
    padding: 0;
    gap: 10px;
  }
  .portrait-note img {
    width: 60px;
    height: 76px;
  }
  .portrait-note span {
    width: 100%;
    font-size: 9px;
  }
  .portrait-note svg {
    display: none;
  }
  .hero-bottom {
    font-size: 7px;
    padding-block: 19px;
  }
  .hero-bottom > span {
    display: none;
  }
  .section-heading {
    display: block;
    margin-bottom: 32px;
  }
  .section-heading h2 {
    font-size: 36px;
  }
  .section-heading .text-link {
    margin-top: 25px;
  }
  .section-heading .eyebrow {
    margin-bottom: 17px;
  }
  .featured-grid {
    grid-template-columns: 1fr;
    gap: 42px;
  }
  .project-visual {
    height: 310px;
    padding: 55px 28px 0;
  }
  .video-window,
  .blog-window {
    height: 220px;
  }
  .project-summary {
    padding-top: 22px;
    grid-template-columns: 23px 1fr;
  }
  .project-summary p:not(.eyebrow) {
    font-size: 12px;
  }
  .project-title {
    font-size: 30px;
  }
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .intro-grid h2 {
    font-size: 38px;
  }
  .desktop-only {
    display: none;
  }
  .intro-description {
    font-size: 13px;
  }
  .tech-grid {
    grid-template-columns: 1fr 1fr;
  }
  .tech-column {
    border-bottom: 0;
    padding: 24px 18px;
  }
  .tech-column:nth-child(2n) {
    border-right: 1px solid #3a342b;
  }
  .tech-column:nth-child(n + 3) {
    border-bottom: 1px solid #3a342b;
  }
  .tech-column h3 {
    font-size: 12px;
  }
  .tech-column li {
    font-size: 11px;
  }
  .section-side-copy {
    margin-top: 22px;
  }
  .contact-banner {
    padding-block: 52px;
  }
  .contact-banner a {
    font-size: clamp(42px, 9vw, 65px);
  }
  .contact-banner svg {
    width: 36px;
    height: 36px;
    margin-left: 25px;
  }
  .contact-banner p:last-child {
    font-size: 11px;
    line-height: 1.8;
    max-width: 280px;
  }
  .footer-top {
    display: block;
    padding-bottom: 28px;
  }
  .footer-top > div:last-child {
    margin-top: 25px;
    font-size: 11px;
  }
  .footer-bottom {
    flex-wrap: wrap;
    font-size: 9px;
    gap: 21px;
  }
  .footer-bottom > nav {
    order: 3;
    width: 100%;
    gap: 20px;
  }
  .footer-name {
    font-size: 22px;
  }
  .page-heading {
    padding-block: 50px;
  }
  .page-heading h1 {
    font-size: clamp(44px, 10vw, 70px);
  }
  .page-heading .eyebrow {
    font-size: 9px;
    margin-bottom: 24px;
  }
  .page-description {
    font-size: 13px;
  }
  .about-grid {
    grid-template-columns: 1fr;
    gap: 45px;
  }
  .profile-composition {
    max-width: 420px;
  }
  .profile-image img {
    max-height: 540px;
    object-fit: cover;
    object-position: top;
  }
  .about-copy h2 {
    font-size: 37px;
  }
  .exploration-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .exploration-row h3 {
    font-size: 20px;
  }
  .problem-strip .container {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .problem-strip h2 {
    font-size: 32px;
  }
  .case-study-header {
    align-items: start;
    flex-direction: column;
    gap: 23px;
  }
  .case-study-header h2 {
    font-size: 54px;
  }
  .project-ctas .button {
    padding: 12px 15px;
    gap: 10px;
    font-size: 11px;
  }
  .case-study > .container > div > .project-visual {
    height: 300px;
    padding: 53px 25px 0;
  }
  .case-study .project-visual .video-window,
  .case-study .project-visual .blog-window {
    height: 212px;
  }
  .case-study .video-screen {
    height: 110px;
  }
  .case-study .video-thumbs div {
    height: 40px;
  }
  .case-study .blog-preview-content {
    padding: 18px 22px;
  }
  .case-study .blog-preview-content h3 {
    font-size: 28px;
  }
  .case-study .blog-art {
    height: 60px;
  }
  .case-overview {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-block: 38px;
  }
  .case-overview h3 {
    font-size: 21px;
  }
  .case-architecture {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-block: 40px;
  }
  .case-architecture h3 {
    font-size: 33px;
  }
  .architecture {
    padding: 22px;
  }
  .architecture-branches {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .architecture-branches .architecture-node {
    flex-direction: column;
    text-align: center;
    padding: 15px 6px;
  }
  .architecture-node strong {
    font-size: 12px;
  }
  .architecture-node span {
    font-size: 7px;
  }
  .case-details {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 30px;
  }
  .feature-section {
    margin-top: 35px;
    padding-top: 35px;
  }
  .feature-section ul {
    grid-template-columns: 1fr 1fr;
    gap: 20px 14px;
  }
  .feature-section li {
    font-size: 11px;
    align-items: start;
  }
  .education-layout {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .timeline {
    margin-left: 5px;
    padding-left: 27px;
  }
  .timeline-dot {
    left: -32px;
  }
  .timeline-entry h2 {
    font-size: 37px;
  }
  .timeline-entry .degree {
    font-size: 18px;
  }
  .academic-metrics {
    gap: 40px;
  }
  .academic-metrics strong,
  .jee-rank strong {
    font-size: 51px;
  }
  .academic-metrics span {
    font-size: 8px;
    line-height: 1.7;
    max-width: 115px;
  }
  .competitive-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .codechef-panel {
    padding: 30px;
  }
  .codechef-panel > strong {
    font-size: 100px;
  }
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .contact-form {
    padding-left: 0;
    border-left: 0;
    padding-top: 30px;
    border-top: 1px solid #bcaf96;
  }
  .contact-method a {
    font-size: 12px;
  }
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .contact-form input,
  .contact-form textarea {
    font-size: 16px;
  }
  .contact-social {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 23px;
  }
  .contact-social .eyebrow {
    width: 100%;
  }
  .contact-details h2 {
    margin-block: 20px 25px;
  }
}
@media (max-width: 370px) {
  .container {
    width: calc(100% - 32px);
  }
  .hero h1 {
    font-size: 11.2vw;
  }
  .hero .button {
    padding-inline: 16px;
    gap: 18px;
  }
  .hero-art {
    grid-template-columns: 1.15fr 1fr;
  }
  .hero-socials {
    gap: 16px;
  }
  .project-visual {
    padding-inline: 20px;
  }
  .contact-method {
    gap: 8px;
  }
  .contact-method a {
    font-size: 10px;
  }
  .contact-method > button {
    padding: 5px;
  }
  .architecture {
    padding: 18px;
  }
  .academic-metrics {
    gap: 26px;
  }
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .project-image-link:hover .video-window,
  .project-image-link:hover .blog-window,
  .profile-image:hover img,
  .button:hover {
    transform: none;
  }
}
````

## src/lib/contact.ts

````ts
export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export const contactEndpoint =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? "";

// Integration boundary: configure VITE_CONTACT_ENDPOINT for a Formspree/custom
// endpoint that accepts this JSON. For EmailJS, replace this function with its SDK.
// Only a successful HTTP response is considered submitted; never simulate delivery.
export async function sendContactMessage(
  message: ContactMessage,
): Promise<void> {
  if (!contactEndpoint)
    throw new Error("Contact delivery has not been configured.");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(contactEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        "Your message could not be submitted. Please try again or email me directly.",
      );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw new Error(
        "The request timed out. Please try again or email me directly.",
      );
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
````

## src/main.tsx

````tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/dm-serif-display/latin-400-italic.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
````

## src/pages/About.tsx

````tsx
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeading } from "../components/ui/PageHeading";
import { Reveal } from "../components/ui/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

export default function About() {
  usePageMeta(
    "About",
    "Meet Prakhar Shrivastava, a Computer Science student at IIIT Sonipat focused on full-stack development and problem solving.",
  );
  return (
    <>
      <PageHeading
        label="01 / ABOUT ME"
        title="The person"
        accent="behind the code."
        description="A student of computer science. A builder by curiosity."
      />
      <section className="cream-section section">
        <div className="container about-grid">
          <Reveal className="profile-composition">
            <div className="profile-image">
              <img
                src="/prakhar-profile.jpg"
                alt="Hand-drawn artwork supplied by Prakhar, showing a figure wearing a crimson kurta and sunglasses"
                width="864"
                height="1184"
                fetchPriority="high"
              />
            </div>
            <div className="profile-caption">
              <span>PRAKHAR SHRIVASTAVA</span>
              <span>SONEPAT, INDIA</span>
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <p className="eyebrow">HELLO, I'M PRAKHAR.</p>
            <h2>
              Frontend detail.
              <br />
              <span className="serif">Backend thinking.</span>
            </h2>
            <p>
              I'm Prakhar Shrivastava, a Computer Science student at IIIT
              Sonipat with a strong interest in full-stack development and
              problem solving. I enjoy building web applications that connect
              responsive frontend experiences with structured backend systems.
            </p>
            <p>
              My work includes React interfaces, Node.js and Express APIs,
              MongoDB aggregation pipelines, authentication systems and
              cloud-based media workflows. Alongside development, I work on DSA
              and competitive programming.
            </p>
            <dl className="about-facts">
              {[
                ["Location", "Sonepat, India"],
                ["College", "IIIT Sonipat"],
                ["Degree", "B.Tech"],
                ["Graduation", "2029"],
                ["Languages", "English, Hindi"],
              ].map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container exploration-grid">
          <Reveal>
            <p className="eyebrow">ALWAYS LEARNING</p>
            <h2>
              Currently
              <br />
              <span className="serif">exploring.</span>
            </h2>
          </Reveal>
          <div>
            {[
              "Full-stack engineering",
              "DSA",
              "Backend architecture",
              "Database systems",
            ].map((topic, i) => (
              <Reveal key={topic} className="exploration-row">
                <span>0{i + 1}</span>
                <h3>{topic}</h3>
                <ArrowUpRight size={20} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="problem-strip cream-section">
        <div className="container">
          <div>
            <p className="eyebrow">PROBLEM SOLVING</p>
            <h2>Logic before syntax.</h2>
            <p>
              A strong foundation in DSA, strengthened through competitive
              programming.
            </p>
          </div>
          <div>
            <strong>
              1500<span>+</span>
            </strong>
            <span>CODECHEF CONTEST RATING · 2 STAR</span>
            <Link to="/education" className="text-link">
              Education & achievements
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
````

## src/pages/Contact.tsx

````tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { PageHeading } from "../components/ui/PageHeading";
import { Reveal } from "../components/ui/Reveal";
import { ExternalLink } from "../components/ui/Links";
import { profile } from "../data/profile";
import { contactEndpoint, sendContactMessage } from "../lib/contact";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  usePageMeta(
    "Contact",
    "Contact Prakhar Shrivastava in Sonepat, India, for projects and conversations about full-stack development.",
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "email"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [mailLink, setMailLink] = useState("");
  const [copied, setCopied] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      subject: String(data.get("subject")).trim(),
      message: String(data.get("message")).trim(),
    };
    if (Object.values(message).some((value) => !value)) {
      setStatus("error");
      setFeedback("Please complete every field.");
      return;
    }
    if (!contactEndpoint) {
      setMailLink(
        `mailto:${profile.email}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(`Name: ${message.name}\nReply to: ${message.email}\n\n${message.message}`)}`,
      );
      setStatus("email");
      setFeedback(
        "Your email draft is ready. Open your email app to review and send it. Nothing has been sent from this website.",
      );
      return;
    }
    setStatus("sending");
    setFeedback("Submitting your message…");
    try {
      await sendContactMessage(message);
      setStatus("success");
      setFeedback(
        "Your message was submitted successfully. Thank you for getting in touch.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to submit. Please email me directly.",
      );
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setFeedback(
        "Copy was unavailable. You can select the email address or open the email link.",
      );
      setStatus("error");
    }
  }
  return (
    <>
      <PageHeading
        label="04 / CONTACT"
        title="Good things start"
        accent="with a conversation."
        description="Have a project in mind, an opportunity to share, or a question about my work? Get in touch."
      />
      <section className="cream-section section">
        <div className="container contact-grid">
          <Reveal className="contact-details">
            <p className="eyebrow">LET'S CONNECT</p>
            <h2>
              Say hello<span className="text-crimson">.</span>
            </h2>
            <div className="contact-method">
              <Mail size={21} />
              <div>
                <span>EMAIL</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <button
                aria-label={
                  copied ? "Email address copied" : "Copy email address"
                }
                title={copied ? "Copied" : "Copy email"}
                onClick={copyEmail}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <div className="contact-method">
              <MapPin size={21} />
              <div>
                <span>BASED IN</span>
                <p>{profile.location}</p>
              </div>
            </div>
            <div className="contact-social">
              <p className="eyebrow">ELSEWHERE ON THE INTERNET</p>
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={profile.twitter}>X / Twitter</ExternalLink>
            </div>
            <p className="copy-status" aria-live="polite">
              {copied ? "Email address copied." : ""}
            </p>
          </Reveal>
          <Reveal>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="alex@example.com"
                    required
                    maxLength={254}
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  name="subject"
                  placeholder="What would you like to talk about?"
                  required
                  maxLength={200}
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell me a little about it…"
                  required
                  rows={5}
                  maxLength={5000}
                />
              </label>
              <p className="form-note" id="form-note">
                {contactEndpoint
                  ? "Your message will be submitted through the contact service."
                  : "This form prepares an email draft for you to review and send in your email app."}
              </p>
              <button
                className="button button-primary"
                type="submit"
                disabled={status === "sending"}
                aria-describedby="form-note"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <Send size={16} />
              </button>
              <div
                className={`form-feedback ${status === "error" ? "is-error" : ""}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
                {status === "email" && (
                  <a className="text-link mt-3" href={mailLink}>
                    Open email app
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
````

## src/pages/Education.tsx

````tsx
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeading } from "../components/ui/PageHeading";
import { Reveal } from "../components/ui/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Education() {
  usePageMeta(
    "Education",
    "B.Tech at IIIT Sonipat, 2025–2029. Academic achievements and competitive programming from Prakhar Shrivastava’s resume.",
  );
  return (
    <>
      <PageHeading
        label="03 / EDUCATION"
        title="Building on"
        accent="strong foundations."
        description="Computer science, consistent learning and a curiosity for how systems work."
      />
      <section className="cream-section section">
        <div className="container education-layout">
          <p className="eyebrow">THE ACADEMIC JOURNEY</p>
          <div className="timeline">
            <Reveal className="timeline-entry">
              <span className="timeline-dot" />
              <p className="eyebrow">2025 – 2029 / PRESENT</p>
              <h2>
                IIIT Sonipat<span className="text-crimson">.</span>
              </h2>
              <p className="degree">Bachelor of Technology</p>
              <p>Computer Science · Second Year</p>
              <div className="academic-metrics">
                <div>
                  <strong>8.6</strong>
                  <span>CGPA</span>
                </div>
                <div>
                  <strong>9.1</strong>
                  <span>FIRST SEMESTER SGPA</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="timeline-entry">
              <span className="timeline-dot" />
              <p className="eyebrow">2025 / ENTRANCE EXAMINATION</p>
              <h3>JEE Mains</h3>
              <div className="jee-rank">
                <strong>33,000</strong>
                <span>COMMON RANK LIST</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container competitive-grid">
          <Reveal>
            <p className="eyebrow">BEYOND THE CLASSROOM</p>
            <h2>
              Problem
              <br />
              <span className="serif">solving.</span>
            </h2>
            <p className="section-side-copy mt-6">
              A strong foundation in data structures and algorithms. Competitive
              programming is a place to put that thinking into practice.
            </p>
            <Link to="/projects" className="text-link mt-8">
              See it applied in projects
              <ArrowUpRight size={17} />
            </Link>
          </Reveal>
          <Reveal className="codechef-panel">
            <div className="flex justify-between items-center">
              <span>CodeChef</span>
              <span className="eyebrow">2 STAR</span>
            </div>
            <strong>
              1500<span>+</span>
            </strong>
            <p>CONTEST RATING</p>
            <div className="rating-rule" />
            <span className="text-sm text-muted">
              Data structures · Algorithms · Problem solving
            </span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
````

## src/pages/Home.tsx

````tsx
import {
  ArrowUpRight,
  Code2,
  Database,
  LayoutTemplate,
  Network,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import { FeaturedProjects } from "../components/home/FeaturedProjects";
import { TechStack } from "../components/home/TechStack";
import { Reveal } from "../components/ui/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";

const focus = [
  {
    icon: Code2,
    title: "Full-stack development",
    detail: "Connecting interfaces, APIs and data.",
  },
  {
    icon: LayoutTemplate,
    title: "Frontend engineering",
    detail: "Responsive React interfaces built with care.",
  },
  {
    icon: Network,
    title: "Backend APIs",
    detail: "Structured Node.js and Express systems.",
  },
  {
    icon: Database,
    title: "Databases",
    detail: "Working with relational and document data.",
  },
  {
    icon: Terminal,
    title: "DSA & problem solving",
    detail: "A foundation in logic and algorithms.",
  },
];

export default function Home() {
  usePageMeta(
    "Full-Stack Developer",
    "Prakhar Shrivastava, Computer Science student at IIIT Sonipat. Explore full-stack React, Node.js, Express and MongoDB projects.",
  );
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <section className="section intro-section">
        <div className="container intro-grid">
          <Reveal>
            <p className="eyebrow">02 / A LITTLE CONTEXT</p>
            <h2>
              I build complete
              <br />
              web experiences,
              <br />
              <span className="serif">
                from API design
                <br />
                to responsive
                <br className="desktop-only" /> interfaces.
              </span>
            </h2>
            <Link to="/about" className="text-link mt-8">
              More about me
              <ArrowUpRight size={17} />
            </Link>
          </Reveal>
          <Reveal>
            <p className="intro-description">
              I'm Prakhar, a Computer Science student at IIIT Sonipat. I enjoy
              understanding how things work, then turning that understanding
              into applications people can use.
            </p>
            <div className="focus-list">
              {focus.map(({ icon: Icon, title, detail }) => (
                <div className="focus-row" key={title}>
                  <Icon size={21} strokeWidth={1.4} />
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                  <ArrowUpRight size={16} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <TechStack />
      <section className="contact-banner">
        <div className="container">
          <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
          <Link to="/contact">
            Let's talk<span className="serif"> code.</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <p>A project, an opportunity, or a conversation about development.</p>
        </div>
      </section>
    </>
  );
}
````

## src/pages/NotFound.tsx

````tsx
import { ButtonLink } from "../components/ui/Links";
import { PageHeading } from "../components/ui/PageHeading";
import { usePageMeta } from "../hooks/usePageMeta";
export default function NotFound() {
  usePageMeta(
    "Page not found",
    "This page does not exist. Return to Prakhar Shrivastava’s portfolio.",
  );
  return (
    <>
      <PageHeading
        label="404 / PAGE NOT FOUND"
        title="A small"
        accent="wrong turn."
        description="The page you are looking for doesn't exist."
      />
      <div className="container pb-24">
        <ButtonLink to="/">Back to home</ButtonLink>
      </div>
    </>
  );
}
````

## src/pages/Projects.tsx

````tsx
import { Github, ArrowUpRight, Check } from "lucide-react";
import { projects } from "../data/projects";
import { ProjectVisual } from "../components/projects/ProjectVisual";
import { Architecture } from "../components/projects/Architecture";
import { PageHeading } from "../components/ui/PageHeading";
import { Reveal } from "../components/ui/Reveal";
import { ExternalLink } from "../components/ui/Links";
import { usePageMeta } from "../hooks/usePageMeta";

const mytubeDetails = [
  [
    "Problem",
    "A video platform brings several connected workflows together: publishing media, controlling access, finding videos and interacting with channels. MyTube explores how those workflows fit into a full-stack application.",
  ],
  [
    "Frontend",
    "A responsive React frontend built with Vite and Tailwind CSS. Protected routes connect browsing and channel views with authenticated interactions.",
  ],
  [
    "Backend",
    "Node.js and Express provide REST APIs for videos, comments, likes, playlists, subscriptions, tweets and watch history. Endpoints are tested with Postman and code is managed with Git/GitHub.",
  ],
  [
    "Authentication",
    "JWT-based authentication and authorization, HTTP-only cookies and protected routes manage access to authenticated features.",
  ],
  [
    "Database",
    "MongoDB and Mongoose model application data. Aggregation pipelines support data retrieval, including channel-based video queries.",
  ],
  [
    "Media storage",
    "Cloudinary stores uploaded videos and thumbnails, separating media storage from application data.",
  ],
];
const blogDetails = [
  [
    "Frontend architecture",
    "A React.js frontend developed with Vite. Separate browsing and writing interfaces support the core blog workflow.",
  ],
  [
    "Responsive design",
    "Tailwind CSS adapts the layout for different screen sizes, keeping the browsing and writing interfaces usable on mobile and desktop.",
  ],
  [
    "Component design",
    "Reusable React components keep shared interface patterns consistent across the application.",
  ],
  [
    "Deployment",
    "Deployed with Vercel. Git and GitHub support source control and the development workflow.",
  ],
];

export default function Projects() {
  usePageMeta(
    "Projects",
    "Explore MyTube, a MERN video platform, and Blog, a responsive React writing frontend, with architecture and implementation details.",
  );
  return (
    <>
      <PageHeading
        label="02 / PROJECTS"
        title="From an idea"
        accent="to an application."
        description="A closer look at the interfaces, APIs and decisions behind my work."
      />
      {projects.map((project, index) => (
        <section
          id={project.id}
          className={`case-study section ${index === 0 ? "cream-section" : ""}`}
          key={project.id}
        >
          <div className="container">
            <Reveal>
              <div className="case-study-header">
                <div>
                  <p className="eyebrow">
                    {project.number} / {project.category}
                  </p>
                  <h2>
                    {project.title}
                    <span className="text-crimson">.</span>
                  </h2>
                  <p>{project.subtitle}</p>
                </div>
                <div className="project-ctas">
                  <ExternalLink
                    href={project.github}
                    className="button button-outline"
                  >
                    <Github size={17} />
                    GitHub
                  </ExternalLink>
                  {"live" in project && (
                    <ExternalLink
                      href={project.live}
                      className="button button-outline"
                    >
                      Live website
                      <ArrowUpRight size={16} />
                    </ExternalLink>
                  )}
                </div>
              </div>
              <ProjectVisual kind={project.id} />
            </Reveal>
            <div className="case-overview">
              <p className="eyebrow">OVERVIEW</p>
              <Reveal>
                <h3>{project.description}</h3>
                <div className="project-tags">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </Reveal>
            </div>
            {index === 0 && (
              <div className="case-architecture">
                <div>
                  <p className="eyebrow">ARCHITECTURE</p>
                  <h3>
                    One application.
                    <br />
                    <span className="serif">Connected systems.</span>
                  </h3>
                  <p>
                    The React interface communicates with the Express API. The
                    backend coordinates authentication, MongoDB data and
                    Cloudinary media storage.
                  </p>
                </div>
                <Architecture />
              </div>
            )}
            <div className="case-details">
              {(index === 0 ? mytubeDetails : blogDetails).map(
                ([heading, copy]) => (
                  <Reveal key={heading}>
                    <h3>{heading}</h3>
                    <p>{copy}</p>
                  </Reveal>
                ),
              )}
            </div>
            <Reveal className="feature-section">
              <p className="eyebrow">KEY FEATURES</p>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
````

## src/test/portfolio.test.tsx

````tsx
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import Contact from "../pages/Contact";
import { Navbar } from "../components/layout/Navbar";
import { ExternalLink } from "../components/ui/Links";

describe("Portfolio navigation and content", () => {
  it.each([
    ["/about", "The person"],
    ["/projects", "From an idea"],
    ["/education", "Building on"],
    ["/contact", "Good things start"],
    ["/not-a-route", "A small"],
  ])("loads %s with a unique heading and title", async (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
    const title = await screen.findByRole("heading", { level: 1 });
    expect(title.textContent).toContain(heading);
    expect(document.title).toContain("Prakhar Shrivastava");
  });

  it("navigates from the home project CTA to the case studies", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Prakhar",
    );
    await user.click(screen.getByRole("link", { name: "View projects" }));
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
        "From an idea",
      ),
    );
    expect(document.activeElement?.id).toBe("main-content");
  });

  it("opens the mobile menu and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeTruthy();
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Mobile navigation" }),
      ).toBeNull(),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("does not turn missing URLs into broken external links", () => {
    render(<ExternalLink href="YOUR_GITHUB_URL">GitHub</ExternalLink>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Pending")).toBeTruthy();
  });
});

describe("Contact form without an endpoint", () => {
  it("prepares a correctly encoded email and never sends a network request", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<Contact />);
    await user.type(screen.getByLabelText("Your name"), "Test Visitor");
    await user.type(
      screen.getByLabelText("Email address"),
      "visitor@example.com",
    );
    await user.type(screen.getByLabelText("Subject"), "React & APIs?");
    await user.type(
      screen.getByLabelText("Message"),
      "A development question.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByRole("status").textContent).toContain(
      "Nothing has been sent",
    );
    const draft = screen
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href")!;
    expect(draft).toContain(
      "mailto:prakharshrivastava109@gmail.com?subject=React%20%26%20APIs%3F",
    );
    expect(decodeURIComponent(draft)).toContain(
      "Reply to: visitor@example.com",
    );
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("rejects whitespace-only messages", async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "   " },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Send message" }).closest("form")!,
    );
    expect(screen.getByRole("status").textContent).toBe(
      "Please complete every field.",
    );
    expect(screen.queryByRole("link", { name: "Open email app" })).toBeNull();
  });

  it("marks all four fields as required and uses email validation", () => {
    render(<Contact />);
    for (const label of ["Your name", "Email address", "Subject", "Message"])
      expect(screen.getByLabelText(label).hasAttribute("required")).toBe(true);
    expect(screen.getByLabelText("Email address").getAttribute("type")).toBe(
      "email",
    );
  });
});
````

## src/test/setup.ts

````ts
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = "";
  thresholds = [];
  takeRecords = () => [];
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
window.scrollTo = vi.fn();
HTMLElement.prototype.scrollIntoView = vi.fn();
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);
````

## scripts/export-source.mjs

````js
import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const extensions = new Set([".tsx", ".ts", ".css", ".svg", ".mjs"]);
async function walk(directory) {
  const entries = await readdir(join(root, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else if (extensions.has(extname(file))) files.push(file);
  }
  return files.sort();
}

const files = [
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "vitest.config.ts",
  "index.html",
  ".gitignore",
  ".env.example",
  "vercel.json",
  "public/_redirects",
  ...(await walk("public")),
  ...(await walk("src")),
  ...(await walk("scripts")),
  "README.md",
];
const sections = [
  "# Complete portfolio implementation",
  "Every path below is relative to the portfolio project root. Each code block contains the complete file, including imports. Run `npm install` followed by `npm run dev`. See README.md for the folder structure, installation commands, deployment and integration notes.",
  "The supplied binary artwork is available at `public/prakhar-profile.jpg`. The complete npm-generated dependency lockfile is available at `package-lock.json`; neither is duplicated inside this text document.",
];
for (const file of files) {
  const path = relative(root, join(root, file)).replaceAll("\\", "/");
  const language =
    {
      ".tsx": "tsx",
      ".ts": "ts",
      ".css": "css",
      ".svg": "xml",
      ".mjs": "js",
      ".json": "json",
      ".html": "html",
      ".md": "markdown",
    }[extname(file)] ?? "text";
  sections.push(
    `## ${path}\n\n\`\`\`\`${language}\n${(await readFile(join(root, file), "utf8")).trimEnd()}\n\`\`\`\``,
  );
}
await writeFile(join(root, "IMPLEMENTATION.md"), sections.join("\n\n") + "\n");
console.log(
  `Exported ${files.length} complete source and configuration files to IMPLEMENTATION.md`,
);
````

## README.md

````markdown
# Prakhar Shrivastava / Portfolio

A complete five-page React + TypeScript portfolio built from the supplied resume facts. Black, parchment and crimson; self-hosted Space Grotesk, Inter and DM Serif Display; responsive editorial layouts; original code-drawn project illustrations; and a lazy-loaded technical Three.js scene.

## Run

Requires Node.js 22.12+ or a compatible newer LTS version (developed with Node 24).

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173.

```powershell
npm run check
npm test
npm run build
npm run preview
npm run format
npm run docs:source
```

The build produces `dist/`. `package-lock.json` pins dependencies; use `npm ci` in CI.

## Installation commands from scratch

The provided package.json already declares everything. These explicit commands are included for reference; you only need `npm install` with this checkout.

```powershell
npm install react react-dom react-router-dom three @react-three/fiber @react-three/drei framer-motion lucide-react @fontsource/inter @fontsource/space-grotesk @fontsource/dm-serif-display
npm install -D typescript vite @vitejs/plugin-react tailwindcss @tailwindcss/vite @types/react @types/react-dom @types/three @types/node
npm install -D vitest jsdom @testing-library/react @testing-library/user-event prettier
```

Tailwind uses its Vite plugin and the CSS-first `@theme` configuration in `src/index.css`; a legacy tailwind.config.js is not required. Component utilities handle reusable layout and spacing; authored styles implement the editorial composition and detailed responsive layouts.

## Folder structure

```text
portfolio/
  public/
    prakhar-profile.jpg
    favicon.svg
    og-image.svg
    _redirects
  scripts/
    export-source.mjs
  src/
    components/
      layout/Navbar.tsx
      layout/Footer.tsx
      home/Hero.tsx
      home/FeaturedProjects.tsx
      home/TechStack.tsx
      projects/ProjectVisual.tsx
      projects/Architecture.tsx
      three/TechnicalScene.tsx
      three/ScenePanel.tsx
      ui/Links.tsx
      ui/Reveal.tsx
      ui/PageHeading.tsx
    data/profile.ts
    data/projects.ts
    data/skills.ts
    hooks/usePageMeta.ts
    lib/contact.ts
    pages/Home.tsx
    pages/About.tsx
    pages/Projects.tsx
    pages/Education.tsx
    pages/Contact.tsx
    pages/NotFound.tsx
    test/setup.ts
    test/portfolio.test.tsx
    App.tsx
    main.tsx
    index.css
  .env.example
  .gitignore
  index.html
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  vitest.config.ts
  vercel.json
  README.md
  IMPLEMENTATION.md
```

`IMPLEMENTATION.md` contains exact relative paths and complete text for the application and configuration files. The JPEG and npm-generated lockfile are provided directly in the checkout.

## Personalize the missing information

- `src/data/profile.ts`: replace `YOUR_GITHUB_URL`, `YOUR_LINKEDIN_URL`, `YOUR_TWITTER_URL` and `YOUR_RESUME_URL`. To use a resume PDF, add `public/resume.pdf` and set `resume: '/resume.pdf'`. The original PDF was not supplied; no resume document or link is fabricated.
- `src/data/projects.ts`: replace `YOUR_MYTUBE_GITHUB_URL`, `YOUR_BLOG_GITHUB_URL`, `YOUR_BLOG_LIVE_URL`.
- Missing links appear as non-interactive, clearly marked Pending text instead of pointing to invalid URLs. After replacing a placeholder with a real URL, the shared component renders a functional external link automatically.
- `public/prakhar-profile.jpg`: currently the supplied artwork, copied without alteration. Replace this file with your photograph. Also update the two image alt descriptions in `Hero.tsx` and `About.tsx` to describe the replacement image accurately; no layout changes are needed.
- All academic figures, projects and skills come from the supplied brief. Appwrite was not confirmed in the resume data and is intentionally omitted. Project previews are labeled INTERFACE STUDY, not represented as screenshots of the original applications.

## Contact delivery

With no configured endpoint, the form validates input and creates a `mailto:` draft. The visitor explicitly opens their email app to review and send it. The UI never claims that the website sent an email.

To connect Formspree or a custom backend:

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTACT_ENDPOINT` to the real HTTPS endpoint.
3. Configure the provider/server to accept JSON fields `name`, `email`, `subject`, `message`, allow requests from your deployment origin, validate input, and handle spam/rate limiting.
4. Restart Vite or rebuild. Test delivery with your provider before publishing.

`src/lib/contact.ts` is the integration boundary. It handles timeout and non-success responses; the form preserves input when submission fails. A 2xx response means submission was accepted, not proof of email delivery. For EmailJS, implement its SDK integration in this module. Never put private API secrets into VITE_ environment variables, which are public in the browser bundle.

## Interaction and accessibility

- Semantic landmarks, one h1 per route, associated field labels, native required/email validation, status announcements, visible focus, skip link and route focus management.
- Mobile navigation is an expanding inline menu. Escape closes it and returns focus to its toggle. It is not a modal and does not trap focus.
- Framer Motion handles restrained page fades and section reveals. CSS and Motion respect reduced motion. No scroll-jacking or cursor-following UI.
- The desktop Three.js scene uses simple geometry, bounded DPR and local lighting, with no external models or environments. It pauses outside the viewport, in hidden tabs, when paused manually, or for reduced motion. React Three Fiber manages disposal on unmount.
- Mobile, coarse-pointer, low-core-count and unavailable-WebGL environments receive a lightweight SVG architecture illustration. WebGL errors have a static fallback.
- Fonts are bundled locally through Fontsource; no font CDN is required at runtime.

## Deployment and metadata

Deploy `dist/` to a static host. Client-side routes need an SPA fallback to `/index.html`; Vercel rewrites and a Netlify-compatible `_redirects` file are included. For other hosts, configure an equivalent rewrite.

Base title, description and OpenGraph tags are in `index.html`; page-specific title/description updates are in `usePageMeta.ts`. `public/og-image.svg` is an editable share-art placeholder. For production social previews, export it to a 1200×630 PNG/JPEG and use the deployed absolute image URL; many crawlers do not support SVG or execute client-side route metadata. Set `og:url` and a canonical URL after the final domain is known. Server rendering or prerendering is needed if distinct crawler-visible metadata per route is required.

## Validation

`npm run check` enforces strict TypeScript and unused-import checks. `npm test` checks page routes, home-to-project navigation, route focus, mobile-menu Escape behavior, unavailable URLs, contact field validation and the no-backend email draft flow. All 11 tests passed during implementation, along with the production build and HTTP checks for all five routes and the profile image. The test runner uses one thread to avoid a Windows fork-worker startup issue.

These DOM tests do not substitute for browser rendering checks. No browser surface was connected in the implementation session, so desktop/mobile overflow, visual appearance and GPU rendering could not be verified visually. Check these on the deployment preview before public release.

## Reference documentation

- [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite)
- [React Three Fiber performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
````
