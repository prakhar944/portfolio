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
import "../styles/home.css";

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
    <div className="home-page">
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
    </div>
  );
}
