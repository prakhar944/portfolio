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
