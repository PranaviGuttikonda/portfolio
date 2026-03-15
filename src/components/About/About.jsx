import React from "react";
import { data } from "../../data/portfolio";
import "./About.css";

export default function About() {
  const { education } = data;
  return (
    <section className="about section" id="about">
      <div className="section__header">
        <span className="section__num">01.</span>
        <h2 className="section__title">about</h2>
        <div className="section__line" />
      </div>

      <div className="about__grid">
        <div className="about__text">
          <p>
            I'm a software engineer focused on building <span className="about__highlight">performance-critical systems</span> in C++ and Python. I thrive at the intersection of systems engineering and product delivery — from low-latency trading infrastructure to full-stack web applications.
          </p>
          <p>
            Currently at <span className="about__highlight">GoQuant</span>, I work on real-time market data pipelines and trading components on live crypto exchanges. I care deeply about concurrency, clean APIs, and systems that are reliable under pressure.
          </p>
          <p>
            Outside of work, I'm exploring distributed systems, contributing to open source, and thinking about how to make software faster.
          </p>
        </div>

        <div className="about__edu">
          <div className="about__edu-card">
            <div className="about__edu-icon">🎓</div>
            <div>
              <div className="about__edu-school">{education.school}</div>
              <div className="about__edu-degree">{education.degree}</div>
              <div className="about__edu-meta">
                GPA {education.gpa} · {education.graduation}
              </div>
              <div className="about__edu-honors">
                {education.honors.map((h) => (
                  <span className="about__honor" key={h}>{h}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}