import React, { useState, useEffect } from "react";
import { startGame, drawCard, dealerTurn, checkBust, checkWinner, handValue, checkBlackjack } from "./gameLogic";
import ConfirmationModal from "./ConfirmationModal";


const Singleplayer = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [gameState, setGameState] = useState({
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 3,
    gameOver: false,
    result: "",
    showPlayAgain: false,
    showModal: false,
    modalMessage: "",
  });

  useEffect(() => {
    initializeNewGame();

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  const initializeNewRound = () => {
    const newGame = startGame();  // Starts a new round
    const playerHand = newGame.playerHand;
    const dealerHand = newGame.dealerHand;
  
    const playerHasBlackjack = checkBlackjack(playerHand);
    const dealerHasBlackjack = checkBlackjack(dealerHand);
  
    let result = "";
    let gameOver = false;
    let newScore = gameState.playerScore;
  
    // Check if either player or dealer has blackjack at the start of the round
    if (playerHasBlackjack && dealerHasBlackjack) {
      result = "Tie! Both have Blackjack!";
      gameOver = true;
    } else if (playerHasBlackjack) {
      result = "Blackjack! Player Wins!";
      newScore += 1;
      gameOver = true;
    } else if (dealerHasBlackjack) {
      result = "Blackjack! Dealer Wins!";
      newScore -= 1;
      gameOver = true;
    }
  
    setGameState({
      ...gameState,
      deck: newGame.deck,
      playerHand,
      dealerHand,
      playerScore: newScore,
      gameOver,
      result,
      showPlayAgain: gameOver,
      showModal: gameOver,
      modalMessage: gameOver ? result : "",
    });
  };
  
  const initializeNewGame = () => {
    // Reset the score and start a fresh game
    setGameState({
      deck: [],
      playerHand: [],
      dealerHand: [],
      playerScore: 3,
      gameOver: false,
      result: "",
      showPlayAgain: false,
      showModal: false,
      modalMessage: "",
    });
    initializeNewRound();  // Start the first round of the new game
  };
  

    const handleHit = () => {
      if (gameState.gameOver) return;

      // Draw a card and update the player's hand
      const newHand = drawCard(gameState.deck, [...gameState.playerHand]);
      let isBust = checkBust(newHand);
      let newScore = isBust ? gameState.playerScore - 1 : gameState.playerScore;

      setGameState((prevState) => ({
        ...prevState,
        playerHand: newHand,
        gameOver: isBust,
        result: isBust ? "Player Busts! Dealer Wins!" : prevState.result,
        playerScore: newScore,
        showModal: isBust,
        modalMessage: isBust ? "You busted!" : "",
      }));

      if (isBust && newScore <= 0) {
        endGame();
      }
    };

    const handleStand = () => {
      if (gameState.gameOver) return;
    
      // Dealer's turn and determine winner
      const dealerFinalHand = dealerTurn(gameState.deck, [...gameState.dealerHand]);
      let isDealerBust = checkBust(dealerFinalHand); // Check if dealer busts
      let winner;
    
      if (isDealerBust) {
        winner = "Player Wins! Dealer Busts!";
      } else {
        // If dealer doesn’t bust, check for the winner
        winner = checkWinner(gameState.playerHand, dealerFinalHand);
      }
    
      let newScore = winner === "Player Wins! Dealer Busts!" || winner === "Player Wins!" 
                     ? gameState.playerScore + 1 
                     : gameState.playerScore - 1;
    
      setGameState({
        ...gameState,
        dealerHand: dealerFinalHand,
        gameOver: newScore <= 0,
        result: winner,
        playerScore: newScore,
        showPlayAgain: true,
        showModal: true,
        modalMessage: winner.includes("Wins") ? "You win!" : "You lose!",
      });
    
    
      if (newScore <= 0) {
        endGame();
      }
    };
    

  const handleForfeit = () => {
    let newScore = gameState.playerScore - 1;
    console.log(newScore);
    setGameState({
      ...gameState,
      gameOver: newScore <= 0,
      result: "You forfeited the game!",
      playerScore: newScore,
      showPlayAgain: true,
      showModal: true,
      modalMessage: "You forfeited!",
    });


    if (newScore <= 0) {
      endGame();
    }
  };

  const handlePlayAgain = () => {
    setGameState((prevState) => ({
      ...prevState,
      gameOver: false,
      result: "",
      showPlayAgain: false,
      showModal: false,
    }));
    initializeNewRound();
  };

  const handleNewGame = () => {
    initializeNewGame();
  };
  

  const handleModalConfirm = () => {
    if (gameState.playerScore <= 0) {
      handleNewGame();
    } else {
      handlePlayAgain();
    }
  };
  

  const endGame = () => {
    setGameState((prevState) => ({
      ...prevState,
      gameOver: true,
      showModal: true,
      modalMessage: "Start a new game?",
    }));
  };

  return (
  <div className="bg-gray-800 min-h-screen text-white pt-10 overflow-hidden">
    

  {/* Responsive Layout */}
  <div className={isMobile ? "flex flex-col items-center mt-10" : "grid grid-cols-2 gap-4 mt-16"}>
    {/* Player's Hand */}
    <div className={isMobile ? "mb-8 w-full text-center" : ""}>
      <h2 className="text-2xl mb-4">Your Cards</h2>
      <h1 className="text-xl mb-4">Hand Value: {handValue(gameState.playerHand)}</h1>
      <div className="bg-comp text-black p-4 rounded-lg shadow-md w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th>Card</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="1">
                <div className="flex flex-wrap justify-start gap-2">
                  {gameState.playerHand.map((card, index) => (
                    <div key={index} className="flex p-2">
                      <img
                        src={card.img}
                        alt={`${card.value} of ${card.suit}`}
                        className={`${isMobile ? 'w-6 h-10' : 'w-10 h-14'}shadow-md`}
                      />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Dealer's Hand */}
    <div className={isMobile ? "w-full text-center" : ""}>
      <h2 className="text-2xl mb-4 justify-center">Dealer's Cards</h2>
      <h1 className="text-xl mb-4">Hand Value: {handValue(gameState.dealerHand)}</h1>
      <div className="bg-comp text-black p-4 rounded-lg shadow-md w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th>Card</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="1">
                <div className="flex flex-wrap justify-start gap-2">
                  {gameState.dealerHand.map((card, index) => (
                    <div key={index} className="flex p-2">
                      <img
                        src={card.img}
                        alt={`${card.value} of ${card.suit}`}
                        className={`${isMobile ? 'w-6 h-10' : 'w-10 h-14'}shadow-md`}
                      />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

    <div className="flex items-center justify-center z-10">
      <span className="mr-3 text-xl mt-10">Current Score: {gameState.playerScore}</span>
    </div>

  {/* Action Buttons */}
  <div className="mt-8 flex justify-center space-x-4">
    <button
      className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-md"
      onClick={handleHit}
      disabled={gameState.gameOver}
    >
      Hit
    </button>
    <button
      className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-3 rounded-md"
      onClick={handleStand}
      disabled={gameState.gameOver}
    >
      Stand
    </button>
    <button
      className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-md"
      onClick={handleForfeit}
      disabled={gameState.gameOver}
    >
      Forfeit
    </button>
  </div>

  {/* Confirmation Modal */}
  <ConfirmationModal
    showModal={gameState.showModal}
    onConfirm={handleModalConfirm}
    message={
      gameState.gameOver
        ? `${gameState.modalMessage} Game Over! Your score is: ${gameState.playerScore}.`
        : `Round Over! ${gameState.modalMessage} Current score: ${gameState.playerScore}`
    }
    Over={gameState.gameOver}
  />
</div>
)
;
};

export default Singleplayer;

