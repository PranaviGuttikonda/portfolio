import React, { useState, useEffect, useRef } from "react";
import { useScramble } from "../../hooks/useScramble";
import { useTypewriter } from "../../hooks/useTypewriter";
import { data } from "../../data/portfolio";
import "./Hero.css";

function Terminal() {
  const [history, setHistory] = useState([
    { type: "output", text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const result = data.terminalCommands[trimmed];

    const newHistory = [...history, { type: "input", text: cmd }];

    if (result === "__CLEAR__") {
      setHistory([]);
    } else if (result) {
      setHistory([...newHistory, { type: "output", text: result }]);
    } else if (trimmed === "") {
      setHistory(newHistory);
    } else {
      setHistory([
        ...newHistory,
        { type: "error", text: `command not found: ${trimmed}. Try "help".` },
      ]);
    }
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") run(input);
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">pranavi@portfolio:~</span>
      </div>
      <div className="terminal__body">
        {history.map((line, i) => (
          <div key={i} className={`terminal__line terminal__line--${line.type}`}>
            {line.type === "input" && (
              <span className="terminal__prompt">$ </span>
            )}
            <span style={{ whiteSpace: "pre-wrap" }}>{line.text}</span>
          </div>
        ))}
        <div className="terminal__input-row">
          <span className="terminal__prompt">$ </span>
          <input
            ref={inputRef}
            className="terminal__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default function Hero() {
  const scrambledName = useScramble(data.name, { duration: 1400, delay: 300 });
  const role = useTypewriter(data.roles, { typeSpeed: 75, deleteSpeed: 40, pause: 2000 });

  return (
    <section className="hero" id="home">
      <div className="hero__left">
        <div className="hero__greeting">hello, world. I'm</div>
        <h1 className="hero__name">{scrambledName}</h1>
        <div className="hero__role">
          <span className="hero__role-prefix">// </span>
          <span className="hero__role-text">{role}</span>
          <span className="hero__cursor">█</span>
        </div>
        <p className="hero__summary">{data.summary}</p>
        <div className="hero__ctas">
          <a href="#projects" className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
            view my work
          </a>
          <a href="#contact" className="btn btn--ghost"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            get in touch
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">4<span className="hero__stat-plus">+</span></span>
            <span className="hero__stat-label">companies</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">3<span className="hero__stat-plus">+</span></span>
            <span className="hero__stat-label">projects</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">C++<span className="hero__stat-plus"> & </span>Py</span>
            <span className="hero__stat-label">core stack</span>
          </div>
        </div>
      </div>
      <div className="hero__right">
        <Terminal />
      </div>
    </section>
  );
}