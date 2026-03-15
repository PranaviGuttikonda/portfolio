import React from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import StatusBar from "./components/StatusBar/StatusBar";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <p>
          designed & built by{" "}
          <a
            href="https://www.linkedin.com/in/pranaviguttikonda/"
            target="_blank"
            rel="noreferrer"
          >
            Pranavi Guttikonda
          </a>{" "}
          · crafted with React & ♥
        </p>
      </footer>
      <StatusBar />
    </>
  );
}