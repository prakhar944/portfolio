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
