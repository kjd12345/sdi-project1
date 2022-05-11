class Player {
  constructor() {
    this.score = 0;
    this.drawnCards = [];
  }

  updateScore() {
    //this method allows us to
    let newScore = 0;
    let faceCards = ["JACK", "QUEEN", "KING"];
    let aces = [];
    for (let card of this.drawnCards) {
      if (card.value === "ACE") {
        aces.push(card);
        newScore += 11;
      }
      else if (faceCards.includes(card.value)) {
        newScore += 10;
      }
      else {
        newScore += parseInt(card.value);
      }
    }

    // decide if each ace is 1 or 11
    if (newScore > 21) {
      for (let ace of aces) {
        if (newScore > 21) {
          newScore -= 10;
        }
      }
    }

    this.score = newScore;
  }
}


module.exports = Player;