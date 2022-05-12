export default class Player {
  constructor() {
    this.score = 0;
    this.hand = [];
  }

  // updates a Player's score

  updateScore() {
    let newScore = 0;
    let faceCards = ["JACK", "QUEEN", "KING"];
    let aces = [];
    // check each of the Player's drawn cards
    for (let card of this.hand) {
      if (card.value === "ACE") {
        // assume aces are 11 for now
        aces.push(card);
        newScore += 11;
      } else if (faceCards.includes(card.value)) {
        // add 10 for any face card
        newScore += 10;
      } else {
        // parse the integer value of any other card
        newScore += parseInt(card.value);
      }
    }
    // decide if each ace is 1 or 11
    aces.forEach(ace => {
      if (newScore > 21) newScore -= 10;
    })
    // update score property with new score
    this.score = newScore;
  }
}


// module.exports = Player;
// export Player;