// gameLogic_helper.js

// Function to calculate the total value of a hand
export const calculateHandValue = (hand) => {
  let totalValue = 0;
  let aces = 0;

  hand.forEach(card => {
    if (card.value === "A") {
      aces += 1;
      totalValue += 11; // Initially count Ace as 11
    } else if (["J", "Q", "K"].includes(card.value)) {
      totalValue += 10; // Face cards are worth 10
    } else {
      totalValue += parseInt(card.value); // Number cards are worth their face value
    }
  });

  // Adjust for Aces if the total value exceeds 21
  while (totalValue > 21 && aces > 0) {
    totalValue -= 10; // Adjust Ace from 11 to 1
    aces -= 1;
  }

  return totalValue;
};

// Function to start a new game
export const startGame = () => {
  const deck = shuffleDeck(); // Ensure the deck is shuffled correctly
  const playerHand = [deck.pop(), deck.pop()]; // Player gets 2 cards
  const dealerHand = [deck.pop(), deck.pop()]; // Dealer gets 2 cards

  console.log("Player Hand:", playerHand);
  console.log("Dealer Hand:", dealerHand);

  return { deck, playerHand, dealerHand };
};

// Function to deal a card to a player or dealer
export const drawCard = (deck, hand) => {
  const card = deck.pop(); // Draw the top card from the deck
  hand.push(card); // Add it to the player's hand
  return hand;
};

// Dealer's turn (dealer draws until their hand value is 17 or more)
export const dealerTurn = (deck, dealerHand) => {
  while (calculateHandValue(dealerHand) < 17) {
    drawCard(deck, dealerHand);
  }
  return dealerHand;
};

// Function to check if the player has busted
export const checkBust = (hand) => calculateHandValue(hand) > 21;

// Function to check who won the game
export const checkWinner = (playerHand, dealerHand) => {
  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  if (playerTotal > 21) return "Player Busts! Dealer Wins!";
  if (dealerTotal > 21) return "Dealer Busts! Player Wins!";

  if (playerTotal > dealerTotal) return "Player Wins!";
  if (playerTotal < dealerTotal) return "Dealer Wins!";
  return "It's a Tie!";
};

// Function to get the value of the hand (player or dealer)
export const handValue = (hand) => calculateHandValue(hand);

// Function to check if the player has blackjack (hand value = 21 with 2 cards)
export const checkBlackjack = (hand) => {
  return hand.length === 2 && handValue(hand) === 21;
};

// Shuffle the deck (for resetting the game)
export const shuffleDeck = () => {
  const deck = [
    { value: "2", suit: "hearts", img: "2_of_hearts.png" },
    { value: "3", suit: "hearts", img: "3_of_hearts.png" },
    { value: "4", suit: "hearts", img: "4_of_hearts.png" },
    { value: "5", suit: "hearts", img: "5_of_hearts.png" },
    { value: "6", suit: "hearts", img: "6_of_hearts.png" },
    { value: "7", suit: "hearts", img: "7_of_hearts.png" },
    { value: "8", suit: "hearts", img: "8_of_hearts.png" },
    { value: "9", suit: "hearts", img: "9_of_hearts.png" },
    { value: "10", suit: "hearts", img: "10_of_hearts.png" },
    { value: "J", suit: "hearts", img: "jack_of_hearts.png" },
    { value: "Q", suit: "hearts", img: "queen_of_hearts.png" },
    { value: "K", suit: "hearts", img: "king_of_hearts.png" },
    { value: "A", suit: "hearts", img: "ace_of_hearts.png" },

    { value: "2", suit: "diamonds", img: "2_of_diamonds.png" },
    { value: "3", suit: "diamonds", img: "3_of_diamonds.png" },
    { value: "4", suit: "diamonds", img: "4_of_diamonds.png" },
    { value: "5", suit: "diamonds", img: "5_of_diamonds.png" },
    { value: "6", suit: "diamonds", img: "6_of_diamonds.png" },
    { value: "7", suit: "diamonds", img: "7_of_diamonds.png" },
    { value: "8", suit: "diamonds", img: "8_of_diamonds.png" },
    { value: "9", suit: "diamonds", img: "9_of_diamonds.png" },
    { value: "10", suit: "diamonds", img: "10_of_diamonds.png" },
    { value: "J", suit: "diamonds", img: "jack_of_diamonds.png" },
    { value: "Q", suit: "diamonds", img: "queen_of_diamonds.png" },
    { value: "K", suit: "diamonds", img: "king_of_diamonds.png" },
    { value: "A", suit: "diamonds", img: "ace_of_diamonds.png" },

    { value: "2", suit: "clubs", img: "2_of_clubs.png" },
    { value: "3", suit: "clubs", img: "3_of_clubs.png" },
    { value: "4", suit: "clubs", img: "4_of_clubs.png" },
    { value: "5", suit: "clubs", img: "5_of_clubs.png" },
    { value: "6", suit: "clubs", img: "6_of_clubs.png" },
    { value: "7", suit: "clubs", img: "7_of_clubs.png" },
    { value: "8", suit: "clubs", img: "8_of_clubs.png" },
    { value: "9", suit: "clubs", img: "9_of_clubs.png" },
    { value: "10", suit: "clubs", img: "10_of_clubs.png" },
    { value: "J", suit: "clubs", img: "jack_of_clubs.png" },
    { value: "Q", suit: "clubs", img: "queen_of_clubs.png" },
    { value: "K", suit: "clubs", img: "king_of_clubs.png" },
    { value: "A", suit: "clubs", img: "ace_of_clubs.png" },

    { value: "2", suit: "spades", img: "2_of_spades.png" },
    { value: "3", suit: "spades", img: "3_of_spades.png" },
    { value: "4", suit: "spades", img: "4_of_spades.png" },
    { value: "5", suit: "spades", img: "5_of_spades.png" },
    { value: "6", suit: "spades", img: "6_of_spades.png" },
    { value: "7", suit: "spades", img: "7_of_spades.png" },
    { value: "8", suit: "spades", img: "8_of_spades.png" },
    { value: "9", suit: "spades", img: "9_of_spades.png" },
    { value: "10", suit: "spades", img: "10_of_spades.png" },
    { value: "J", suit: "spades", img: "jack_of_spades.png" },
    { value: "Q", suit: "spades", img: "queen_of_spades.png" },
    { value: "K", suit: "spades", img: "king_of_spades.png" },
    { value: "A", suit: "spades", img: "ace_of_spades.png" },
  ];

  const shuffledDeck = [...deck, ...deck, ...deck, ...deck]; // Create a full 52-card deck (4 suits)
  
  // Fisher-Yates shuffle
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};
