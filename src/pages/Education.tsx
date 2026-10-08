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
