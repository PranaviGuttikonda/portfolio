import React, { useState, useEffect } from "react";
import "./StatusBar.css";

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="statusbar">
      <div className="statusbar__left">
        <span className="statusbar__item statusbar__item--branch">⎇ main</span>
        <span className="statusbar__item">✓ 0 errors</span>
        <span className="statusbar__item">⚡ 0 warnings</span>
      </div>
      <div className="statusbar__right">
        <span className="statusbar__item">TypeScript</span>
        <span className="statusbar__item">UTF-8</span>
        <span className="statusbar__item">Ln 1, Col 1</span>
        <span className="statusbar__item">{fmt}</span>
      </div>
    </div>
  );
}