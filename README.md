# Velocity Core — _Real-Time Racing Simulation Engine_

- Terminal Grand-Prix Edition 🏆🏁
- Deterministic multi-agent racing simulation rendered in pure ASCII.

![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![CLI](https://img.shields.io/badge/interface-CLI-black)

---

<br/>

<p align="center">
  <img src="src/assets/images/cli.png" width="700"/>
</p>

<br/>

## 🧠 What is Velocity Core  / Why It Exists

**Velocity Core** is a high-performance **terminal-based simulation engine** modeling real-time racing dynamics between multiple agents.
All executed directly inside the terminal using **pure ASCII + ANSI rendering**.
Velocity Core explores how deterministic systems, stochastic physics, and real-time rendering can coexist in a constrained environment like a terminal.

This project is a minimal representation of:
- game engines
- simulation systems
- real-time distributed thinking

---

## 🧱 Core Capabilities

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
┌──────────────────────────────────────────────┐
│              VELOCITY CORE                   │
│   terminal racing simulation engine          │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│           Player / CLI Input                 │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│               Configuration                  │
│   car brands • track • speed • seed          │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│              Simulation Loop                 │
│   countdown • ticks • frames • end           │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│               Physics Model                  │
│   speed • turbo • position • winner          │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│                 Race State                   │
│   cars • positions • speeds • ranking        │
└──────────────────────────────────────────────┘
                     │
                     ▼
        ┌──────────────────────────────┐   ┌──────────────────────────────┐
        │        ASCII Renderer        │   │         Scoreboard           │
        │   track • cars               │   │   ranking • stats            │
        └──────────────────────────────┘   └──────────────────────────────┘
                       │                         │
                       └───────────┬─────────────┘
                                   ▼
            ┌──────────────────────────────────────────────┐
            │               Terminal Output                │
            │     race • winner • final results            │
            └──────────────────────────────────────────────┘

```
---

## 🏛️ Project Structure
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
git clone https://github.com/louismarcel90/velocity-core.git
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

Nombre de tours : 1 - 5 (choose from 1 to 5 tours)
Vitesse : slow | normal | fast ( default: normal)
Seed : 42 
```
---

## 🎬 Terminal Preview

```bash
╔══════════════════════════════════════════════════════════════╗
║                 VELOCITY CORE — LIVE RACE                    ║
╚══════════════════════════════════════════════════════════════╝

MERCEDES      __________ _o==o\__ ______________________________  ║
FERRARI       _______________ _o==o\__ _________________________  ║
MCLAREN       __________________ _o==o\__ ______________________  ║
ASTON MARTIN  _________ _o==o\__ _______________________________  ║
AUDI          ______________________ _o==o\__ __________________  ║

──────────────────────────────────────────────────────────────
🏁 WINNER: MERCEDES 
```
---


## 📊 Example Output
```sh
🏁 RACE FINISHED

██████████████████████████
███ WINNER: FERRARI    ███
██████████████████████████

1. FERRARI       60 pts
2. MERCEDES      58 pts
3. MCLAREN       55 pts
4. ASTON MARTIN  52 pts
5. AUDI          49 pts
```

---

## ⚙️ Engineering Notes

- Deterministic RNG ensures reproducible simulations
- Tick-based loop avoids time drift issues
- Rendering is decoupled from physics updates
- Stateless frame computation for predictability

---

## 🔮 Future Work

- Multi-race championship mode
- Distributed simulation (multi-node)
- AI-driven car strategies
- Replay system
- Web visualization layer

---

## 👨‍💻 Author

Built with precision, systems thinking, and performance-first mindset.

---
  
## 📄 License

MIT License
