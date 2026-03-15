export const data = {
  name: "Pranavi Guttikonda",
  shortName: "Pranavi",
  email: "p.avigutti05@gmail.com",
  linkedin: "https://www.linkedin.com/in/pranaviguttikonda/",
  github: "https://github.com/pranaviguttikonda",
  roles: [
    "Software Engineer",
    "Backend Engineer",
    "Systems Developer",
    "Full Stack Developer",
    "Problem Solver",
  ],
  summary:
    "Software Engineer building performance-critical systems in C++ and Python on large, distributed codebases with real-time constraints. Currently developing low-latency trading and market data infrastructure, with a focus on concurrency, system reliability, and clean interface-driven design.",
  education: {
    school: "University of Central Missouri",
    degree: "Bachelor's in Computer Science",
    gpa: "3.62",
    graduation: "May 2024",
    honors: ["Cum Laude", "Dean's List: Fall 2022, Spring 2023"],
  },
  experience: [
    {
      company: "GoQuant",
      role: "Quantitative / Backend Developer",
      location: "Florida, USA",
      period: "June 2025 – Present",
      current: true,
      bullets: [
        "Designed low-latency trading and market-making components on live order book data with real-time constraints.",
        "Integrated multiple crypto exchanges into a unified order and market-data pipeline, normalizing heterogeneous APIs.",
        "Developed performance-critical pricing and execution logic, balancing latency, correctness, and inventory risk.",
        "Worked on concurrent systems handling live data feeds, order routing, and execution acknowledgements.",
        "Implemented robust logging, monitoring, and alerting to diagnose production issues and performance regressions.",
      ],
      stack: ["C++", "Python", "WebSocket", "Multithreading"],
    },
    {
      company: "DeepEdge",
      role: "Software Engineer",
      location: "CA, USA",
      period: "July 2025 – August 2025",
      current: false,
      bullets: [
        "Contributed to frontend features using React.js and JavaScript, enhancing user experience.",
        "Developed and integrated lightweight C++ components for cross-system workflows.",
        "Assisted in debugging and maintaining integrations between frontend and backend systems.",
      ],
      stack: ["React.js", "JavaScript", "C++"],
    },
    {
      company: "S Solutions LLC",
      role: "Software Engineer",
      location: "Huntsville, Alabama, USA",
      period: "March 2024 – February 2025",
      current: false,
      bullets: [
        "Designed and maintained scalable backend services using Python and SQL, supporting reliable production workflows.",
        "Automated data ingestion and transformation pipelines, reducing manual processing by ~80%.",
        "Built and integrated RESTful APIs for third-party systems, handling validation, errors, and logging.",
        "Collaborated with product and engineering teams to deliver end-to-end features using Git workflows and CI/CD.",
      ],
      stack: ["Python", "SQL", "REST APIs", "CI/CD"],
    },
    {
      company: "New York State Government",
      role: "Software Engineering Intern",
      location: "New York, USA",
      period: "August 2023 – November 2023",
      current: false,
      bullets: [
        "Contributed to backend API enhancements for the NYSDOT–DMV Accident Information System.",
        "Developed complex T-SQL queries and optimized SSIS ETL pipelines for secure data processing.",
        "Validated API integrations and data flows using Postman, ensuring correctness across systems.",
      ],
      stack: ["T-SQL", "SSIS", "REST APIs", "Postman"],
    },
  ],
  projects: [
    {
      name: "High-Performance Trading Engine",
      desc: "Low-latency trading engine for simulated crypto execution under live data streams with thread-safe architecture.",
      stack: ["C++", "Multithreading", "WebSocket"],
      highlight: "Sub-millisecond execution benchmarking",
      type: "Systems",
    },
    {
      name: "Real-Time Trade Simulator",
      desc: "Modular simulator processing live L2 order book data to estimate transaction costs with slippage and market impact models.",
      stack: ["Python", "WebSocket", "Latency Profiling"],
      highlight: "End-to-end latency analysis",
      type: "Backend",
    },
    {
      name: "Price Prediction System",
      desc: "End-to-end ML pipeline with automated training, validation, and deployment using experiment tracking.",
      stack: ["Python", "ZenML", "MLflow"],
      highlight: "Reproducible ML workflows",
      type: "ML",
    },
  ],
  skills: {
    Languages: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
    "Systems & Backend": [
      "Concurrency",
      "Multithreading",
      "Low-latency systems",
      "RESTful APIs",
      "Microservices",
      "CI/CD",
    ],
    "Web & Platform": ["React", "Node.js", "Express.js", "HTML", "CSS"],
    "Data & Tools": [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Git",
      "AWS",
      "Postman",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  certifications: [
    { name: "Analyze Data to Answer Questions – SQL", issuer: "Google", date: "Apr 2025" },
    { name: "React – Complete Guide 2025, incl. Next.js & Redux", issuer: "Udemy", date: "Apr 2025" },
    { name: "Foundations: Data, Data Everywhere", issuer: "Google", date: "Mar 2025" },
  ],
  terminalCommands: {
    whoami:
      "pranavi guttikonda — backend & systems engineer\ncurrently building low-latency trading infra @ goquant",
    "ls projects":
      "drwxr-xr-x  trading-engine-cpp\ndrwxr-xr-x  trade-simulator-py\ndrwxr-xr-x  price-prediction-ml",
    "cat skills.txt":
      "languages:  C++ · Python · JavaScript · TypeScript · SQL\nbackend:    REST APIs · Microservices · Concurrency · CI/CD\nfrontend:   React · Node.js · Express.js\ntools:      Git · AWS · Postman · MongoDB · PostgreSQL",
    "cat about.txt":
      "name:       Pranavi Guttikonda\neducation:  BSc Computer Science, University of Central Missouri\ngpa:        3.62 (Cum Laude)\nfocus:      systems engineering, low-latency infra, distributed systems",
    "./hire_me.sh":
      "checking availability............ ✓\nreviewing qualifications......... ✓\nverifying awesomeness............ ✓\n\nResult: Highly recommended. Contact at p.avigutti05@gmail.com",
    help: "available commands:\n  whoami          — who is this person?\n  ls projects     — list projects\n  cat skills.txt  — view tech stack\n  cat about.txt   — background & education\n  ./hire_me.sh    — run the most important script\n  clear           — clear terminal",
    clear: "__CLEAR__",
  },
};