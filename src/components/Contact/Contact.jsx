import React from "react";
import { data } from "../../data/portfolio";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section__header">
        <span className="section__num">05.</span>
        <h2 className="section__title">contact</h2>
        <div className="section__line" />
      </div>

      <div className="contact__wrap">
        <div className="contact__code">
          <span className="contact__code-kw">const </span>
          <span className="contact__code-var">reach</span>
          <span className="contact__code-op"> = </span>
          <span className="contact__code-str">"Let's build something."</span>
        </div>
        <p className="contact__desc">
          I'm open to full-time roles, interesting freelance projects, and collaborations on systems
          engineering or backend work. My inbox is always open.
        </p>
        <a href={`mailto:${data.email}`} className="contact__btn">
          say hello ↗
        </a>
        <div className="contact__links">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="contact__link">
            LinkedIn
          </a>
          <a href={data.github} target="_blank" rel="noreferrer" className="contact__link">
            GitHub
          </a>
          <a href={`mailto:${data.email}`} className="contact__link">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}