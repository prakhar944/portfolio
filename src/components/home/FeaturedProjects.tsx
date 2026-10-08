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
