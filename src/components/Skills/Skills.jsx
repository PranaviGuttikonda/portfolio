import React from "react";
import { data } from "../../data/portfolio";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="section__header">
        <span className="section__num">04.</span>
        <h2 className="section__title">skills</h2>
        <div className="section__line" />
      </div>

      <div className="skills__grid">
        {Object.entries(data.skills).map(([category, items]) => (
          <div className="skills__group" key={category}>
            <div className="skills__group-title">
              <span className="skills__group-slash">// </span>
              {category}
            </div>
            <div className="skills__items">
              {items.map((skill) => (
                <span className="skills__item" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills__certs">
        <div className="skills__certs-title">
          <span className="skills__group-slash">// </span>
          certifications
        </div>
        <div className="skills__certs-list">
          {data.certifications.map((c, i) => (
            <div className="skills__cert" key={i}>
              <span className="skills__cert-icon">✓</span>
              <div>
                <div className="skills__cert-name">{c.name}</div>
                <div className="skills__cert-meta">{c.issuer} · {c.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}