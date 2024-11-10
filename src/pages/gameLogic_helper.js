

// Calculate total hand value
export const calculateHandValue = (hand) => {
    let total = 0;
    let aceCount = 0;
  
    hand.forEach((card) => {
      if (card === "J" || card === "Q" || card === "K") {
        total += 10;
      } else if (card === "A") {
        aceCount++;
        total += 11; // initially count Ace as 11
      } else {
        total += parseInt(card);
      }
    });
  
    // Adjust for Aces if the total exceeds 21
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount--;
    }
  
    return total;
  };
  