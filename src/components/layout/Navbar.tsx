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
