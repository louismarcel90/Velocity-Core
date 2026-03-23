# Velocity Core — *Real-Time Racing Simulation Engine*

- Terminal Grand-Prix Edition 🏆🏁
- Deterministic multi-agent racing simulation rendered in pure ASCII.

---

## 🧠 Overview

**Velocity Core** is a high-performance **terminal-based simulation engine** modeling real-time racing dynamics between multiple agents.

Unlike simple visual demos, this project focuses on:

- deterministic simulation systems
- stochastic motion modeling
- real-time rendering pipelines
- event-driven architecture

All executed directly inside the terminal using **pure ASCII + ANSI rendering**.

---

## 🎯 Key Capabilities

- 🏎️ Multi-agent racing simulation (5 concurrent vehicles)
- ⏱ Real-time game loop (tick-based engine)
- 🎲 Deterministic randomness (seed-based replay)
- 🎨 ASCII rendering engine with ANSI styling
- 💨 Dynamic smoke trail system
- 🔄 Animated wheel system
- 📊 Live ranking system
- 🧮 Distance & speed tracking
- 🏁 Deterministic winner resolution
- ✨ Blinking winner banner

---

## ⚙️ System Architecture
```bash
                          [ Player / CLI Input ]
                                   |
                                   v
        +---------------------------------------------------+
        |                    Velocity Core                  |
        |         terminal racing simulation engine         |
        +---------------------------------------------------+
                                   |
                                   v
        +---------------------------------------------------+
        |                  Configuration Layer              |
        |  - car brands                                     |
        |  - track length                                   |
        |  - speed mode                                     |
        |  - optional seed                                  |
        +---------------------------------------------------+
                                   |
                                   v
        +---------------------------------------------------+
        |                   Simulation Loop                 |
        |  - countdown                                      |
        |  - tick scheduler                                 |
        |  - frame update                                   |
        |  - race termination                               |
        +---------------------------------------------------+
                                   |
                                   v
        +---------------------------------------------------+
        |                    Physics Model                  |
        |  - random speed                                   |
        |  - turbo boost probability                        |
        |  - position update                                |
        |  - winner resolution                              |
        +---------------------------------------------------+
                                   |
                                   v
        +---------------------------------------------------+
        |                  Race State Engine                |
        |  - cars                                           |
        |  - positions                                      |
        |  - speeds                                         |
        |  - ranking                                        |
        +---------------------------------------------------+
                                   |
                                   v
        +-------------------------+     +-------------------------+
        |     ASCII Renderer      | --> |     Scoreboard UI       |
        |  - track drawing        |     |  - live ranking         |
        |  - cars rendering       |     |  - speed / distance     |
        |  - smoke / wheels       |     |  - final winner         |
        +-------------------------+     +-------------------------+
                                   |
                                   v
        +---------------------------------------------------+
        |                  Terminal Output                  |
        |  - live animated race                             |
        |  - blinking WINNER banner                         |
        |  - final standings                                |
        +---------------------------------------------------+

```

---

## 🧠 Engine Design

### 1. Simulation Loop

The system runs on a **tick-based loop**:

```js
while (!winner) {
  updatePhysics()
  renderFrame()
}
```
---

## 🧱 Project Structure
```bash
velocity-core/
│
├── src/
│   ├── cli/
│   │   └── menu.js
│   │
│   ├── engine/
│   │   ├── race.js
│   │   ├── physics.js
│   │   ├── renderer.js
│   │
│   ├── utils/
│   │   └── random.js
│   │
│   └── index.js
│
├── package.json
└── README.md

```


## 🚀 Getting Started

1. 📦 Installation
```bash
git clone https://github.com/your-username/velocity-core.git
cd velocity-core
npm install
```

2. Run
```sh
npm start
```

3. Optional (seed replay)
```sh
node src/index.js --seed=42
```
---

## 🎮 CLI Experience

At launch:

```sh

⚡ VELOCITY CORE

Nombre de tours : 3
Vitesse : fast
Seed : 42
```
---

## 🎬 Terminal Preview
```sh
╔══════════════════════════════════════════════╗
║        VELOCITY CORE — LIVE RACE            ║
╚══════════════════════════════════════════════╝

MERCEDES       ████████🏎️████████      │
FERRARI        ███████🏎️█████████      │
MCLAREN        ██████🏎️██████████      │
ASTON MARTIN   █████🏎️███████████      │
AUDI           ████🏎️████████████      │

──────────────────────────────────────────────
🏁 WINNER: MERCEDES
```
---


## 📊 Example Output
```sh
🏁 RACE FINISHED

██████████████████████████
███ WINNER: FERRARI ███
██████████████████████████

1. FERRARI       60 pts
2. MERCEDES      58 pts
3. MCLAREN       55 pts
4. ASTON MARTIN  52 pts
5. AUDI          49 pts
```

---

## 👨‍💻 Author

Built with precision, systems thinking, and performance-first mindset.

---

## ⭐ Support

If you find this project interesting:

- ⭐ Star the repository
- 🍴 Fork it
- 🧠 Explore the architecture

---
  
## 📄 License

MIT License
