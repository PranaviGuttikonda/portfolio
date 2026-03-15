import React from "react";
import { data } from "../../data/portfolio";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="section__header">
        <span className="section__num">03.</span>
        <h2 className="section__title">projects</h2>
        <div className="section__line" />
      </div>

      <div className="proj__grid">
        {data.projects.map((p, i) => (
          <div className="proj__card" key={i}>
            <div className="proj__card-top">
              <div className="proj__folder">
                <span className="proj__folder-icon">{"{ }"}</span>
                <span className="proj__type">{p.type}</span>
              </div>
              <div className="proj__links">
                <a href={data.github} target="_blank" rel="noreferrer" className="proj__link" title="GitHub">
                  ↗
                </a>
              </div>
            </div>
            <h3 className="proj__name">{p.name}</h3>
            <p className="proj__desc">{p.desc}</p>
            <div className="proj__highlight">
              <span className="proj__highlight-dot" />
              {p.highlight}
            </div>
            <div className="proj__stack">
              {p.stack.map((s) => (
                <span key={s} className="proj__tag">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}