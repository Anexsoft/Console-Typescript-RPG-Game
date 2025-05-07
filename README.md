# 🧙 Console Typescript RPG Game

A retro-style **text-based RPG** built in **Node.js** using **TypeScript**. The game runs entirely in the console and features classic RPG mechanics like character leveling, special powers, and scene-based interactions.

Repository: [https://github.com/Anexsoft/Console-Typescript-RPG-Game](https://github.com/Anexsoft/Console-Typescript-RPG-Game)

## 🎮 Features

- Console-based RPG (text only)
- Max level: 50
- 3 special powers per character
- Dynamic combat messages with damage display
- Color-coded output for enhanced readability
- Scene-based progression and choices
- Modular and scalable folder structure

## 📁 Folder Structure

```
src/
│
├── character/        # Everything related to the player character
│
├── common/           # Shared constants, types, and utilities
│
├── engine/           # Game engine logic (manager, state, etc.)
│
├── npc/              # Non-playable character definitions and logic
│
└── scenes/           # Game scenes like battles, menus, and dialogs
```

## 🛠 Tech Stack

- Node.js
- TypeScript

## 🚀 Getting Started

1. Clone the repository:

```
git clone https://github.com/Anexsoft/Console-Typescript-RPG-Game.git
cd Console-Typescript-RPG-Game
```

2. Install dependencies:

```
npm install
```

3. Configure .enb file
   Copy the `.env.example` file, update the values as needed, and rename it to `.env` before starting the game.

4. Start the game:

```
npm start
```
