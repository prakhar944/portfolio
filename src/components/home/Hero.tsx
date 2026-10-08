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
