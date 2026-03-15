import React, { useState, useEffect } from "react";
import "./Navbar.css";

const links = ["about", "experience", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span className="navbar__logo-bracket">&lt;</span>
        PG
        <span className="navbar__logo-bracket">/&gt;</span>
      </div>
      <ul className="navbar__links">
        {links.map((link) => (
          <li key={link}>
            <button
              className={`navbar__link ${active === link ? "navbar__link--active" : ""}`}
              onClick={() => scrollTo(link)}
            >
              <span className="navbar__link-num">{String(links.indexOf(link) + 1).padStart(2, "0")}.</span>
              {link}
            </button>
          </li>
        ))}
      </ul>
      <a href="mailto:p.avigutti05@gmail.com" className="navbar__cta">
        hire me
      </a>
    </nav>
  );
}