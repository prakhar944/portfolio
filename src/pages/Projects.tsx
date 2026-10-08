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
