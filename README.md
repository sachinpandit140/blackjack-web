
# Blackjack Game (Single Player)

This repository contains a single-player web-based Blackjack game built with **React**. The game is designed to simulate an engaging Blackjack experience with an intuitive interface and responsive design. 

## Features

- **Single-Player Gameplay**: Play against the dealer in classic Blackjack, aiming to reach 21 or get closer than the dealer without busting.
- **Dynamic Game Logic**: Core game functionality includes hitting, standing, and automatic dealer logic, with card drawing and hand value calculations.
- **Blackjack and Bust Detection**: The game immediately checks for Blackjack upon starting and announces a win or tie. It also detects busts instantly, ending the game if a player exceeds 21.
- **Responsive Design**: Optimized for both desktop and mobile devices, with responsive layouts and styling through **Tailwind CSS**.
- **Custom Components**: Components like `ConfirmationModal` provide a polished, user-friendly experience, delivering alerts, end-of-game summaries, and play-again options.

## Technologies Used

- **React**: Component-based structure for building the user interface and managing game state.
- **Tailwind CSS**: For styling, providing a clean, responsive design.
- **JavaScript ES6+**: Core game logic, card deck management, and game state handling.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sachinpandit140/blackjack-web.git
   cd blackjack-web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000) to play the game locally.

## How to Play

1. **Start New Game**: The game begins by dealing two cards to both the player and the dealer.
2. **Hit**: Draw a card to increase your hand’s total value. Be careful not to exceed 21!
3. **Stand**: End your turn, and the dealer will play their turn.
4. **Winning**: If you have a higher hand value than the dealer without going over 21, you win! A tie occurs if both player and dealer get a Blackjack or equal values.
5. **End Game Modal**: After each game, a modal offers the option to start a new game or continue playing.

## Custom Components

- **`ConfirmationModal`**: Displays custom messages for game over scenarios and allows players to confirm if they want to play again.
  
## Project Structure

```plaintext
blackjack-web/
├── public/
├── src/
│   ├── components/
│   │   ├── ConfirmationModal.js       # Handles modal popups for end-of-game scenarios
│   ├── pages/
│   │   ├── Singleplayer.js            # Main game interface and logic
│   ├── utils/
│   │   ├── gameLogic.js               # Core functions for game actions: hit, stand, bust check, etc.
│   ├── App.js                         # Root component
│   ├── index.js                       # Entry point for React
├── package.json
```

## Future Enhancements

- **Multiplayer Mode**: Expand the game to support multiple players.
- **Leaderboard**: Record and display player scores and statistics.
- **API Integration**: Fetch cards and score data from an external API for dynamic gameplay.
