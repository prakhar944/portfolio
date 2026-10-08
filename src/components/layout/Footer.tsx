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
