"""
Portfolio Terminal API
Run: uvicorn main:app --reload --port 8000

Install deps: pip install fastapi uvicorn
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Pranavi Portfolio Terminal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-portfolio-domain.com"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

COMMANDS: dict[str, str] = {
    "whoami": (
        "pranavi guttikonda — backend & systems engineer\n"
        "currently building low-latency trading infra @ goquant\n"
        "based in hyderabad, india"
    ),
    "ls projects": (
        "drwxr-xr-x  trading-engine-cpp     [C++, Multithreading, WebSocket]\n"
        "drwxr-xr-x  trade-simulator-py     [Python, WebSocket, Latency Profiling]\n"
        "drwxr-xr-x  price-prediction-ml    [Python, ZenML, MLflow]"
    ),
    "cat skills.txt": (
        "languages:  C++ · Python · JavaScript · TypeScript · Java · SQL\n"
        "backend:    REST APIs · Microservices · Concurrency · Low-latency · CI/CD\n"
        "frontend:   React · Node.js · Express.js · HTML · CSS\n"
        "tools:      Git · AWS · Postman · MongoDB · PostgreSQL · Pandas · NumPy"
    ),
    "cat about.txt": (
        "name:        Pranavi Guttikonda\n"
        "education:   BSc Computer Science, University of Central Missouri\n"
        "gpa:         3.62 (Cum Laude, Dean's List)\n"
        "focus:       systems engineering, low-latency infra, distributed systems\n"
        "email:       p.avigutti05@gmail.com"
    ),
    "./hire_me.sh": (
        "#!/bin/bash\n"
        "checking availability................. ✓\n"
        "reviewing qualifications.............. ✓\n"
        "verifying low-latency expertise....... ✓\n"
        "validating c++ concurrency skills..... ✓\n"
        "confirming awesomeness................ ✓\n\n"
        "Result: HIGHLY RECOMMENDED\n"
        "Contact: p.avigutti05@gmail.com"
    ),
    "help": (
        "available commands:\n"
        "  whoami           — who is this person?\n"
        "  ls projects      — list projects\n"
        "  cat skills.txt   — view full tech stack\n"
        "  cat about.txt    — background & education\n"
        "  ./hire_me.sh     — run the most important script\n"
        "  clear            — clear the terminal"
    ),
}


class CommandRequest(BaseModel):
    command: str


class CommandResponse(BaseModel):
    output: str
    action: str = "output"   # "output" | "clear" | "error"


@app.post("/command", response_model=CommandResponse)
def run_command(req: CommandRequest):
    cmd = req.command.strip().lower()

    if cmd == "clear":
        return CommandResponse(output="", action="clear")

    if cmd in COMMANDS:
        return CommandResponse(output=COMMANDS[cmd], action="output")

    return CommandResponse(
        output=f"command not found: {cmd}\ntype 'help' to see available commands.",
        action="error",
    )


@app.get("/health")
def health():
    return {"status": "ok", "message": "Portfolio terminal API is running"}