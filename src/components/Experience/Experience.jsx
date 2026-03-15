import React, { useState } from "react";
import { data } from "../../data/portfolio";
import "./Experience.css";

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = data.experience[active];

  return (
    <section className="experience section" id="experience">
      <div className="section__header">
        <span className="section__num">02.</span>
        <h2 className="section__title">experience</h2>
        <div className="section__line" />
      </div>

      <div className="exp__layout">
        <div className="exp__tabs">
          {data.experience.map((e, i) => (
            <button
              key={i}
              className={`exp__tab ${active === i ? "exp__tab--active" : ""}`}
              onClick={() => setActive(i)}
            >
              {e.current && <span className="exp__tab-dot" />}
              {e.company}
            </button>
          ))}
        </div>

        <div className="exp__content">
          <div className="exp__header">
            <div>
              <h3 className="exp__role">{exp.role}</h3>
              <div className="exp__company">
                <span className="exp__at">@</span> {exp.company}
                {exp.current && <span className="exp__badge">current</span>}
              </div>
            </div>
            <div className="exp__meta">
              <span className="exp__period">{exp.period}</span>
              <span className="exp__location">{exp.location}</span>
            </div>
          </div>

          <ul className="exp__bullets">
            {exp.bullets.map((b, i) => (
              <li key={i} className="exp__bullet">
                <span className="exp__bullet-arrow">▹</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="exp__stack">
            {exp.stack.map((s) => (
              <span key={s} className="exp__tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}