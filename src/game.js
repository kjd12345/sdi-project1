import Player from "./player.js";
// import fetch from "node-fetch";  //this is needed to run npm test, but breaks the npm start implementation.

try {
    var fetchHandler = fetch;
} catch {
    // console.log('using node')
    var fetchHandler = require("node-fetch");
}

export default class Game {
    constructor(deck_id) {
        if (typeof deck_id === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this.typeOfOutCome
        this.player = new Player();
        this.dealer = new Player();
        this.deck_id = deck_id;
    }

    async drawCard(player) {
        player.hand.push(await fetchHandler("http://deckofcardsapi.com/api/deck/" + this.deck_id + "/draw/?count=1" + '/')
            .then(response => response.json())
            .then(formattedData => formattedData.cards[0])
            .catch(err => {
                this.typeOfOutCome = "Couldn't draw a card. Try again later." + Math.random()
                this.endGame();
                console.log(err)
                throw ("OOPS,", err)
            })
        )

        player.updateScore(); //This will update the HTML to the new player's score
        if (player === this.player) {
            if (player.hand.length < 6) {
                document.getElementById(`playerCard${player.hand.length}`)
                    .src = player.hand[player.hand.length - 1].image;
                document.getElementById(`playerCard${player.hand.length}`)
                    .hidden = false;
                document.getElementById("playerScore")
                    .innerText = `Player Score: ${player.score}`;
            }
            if (player.score > 21) {
                this.typeOfOutCome = "Busted"
                this.endGame()
            } else if (player.hand.length > 4) { //5 card charlie rule will be implemented
                // this.stand()
                this.typeOfOutCome = "Winner Winner Chicken Dinner"
                this.endGame();
            } else if (player.score === 21) {
                this.stand();
            }
        } else {
            if (player.hand.length < 6) {
                document.getElementById(`dealerCard${player.hand.length}`)
                    .src = player.hand[player.hand.length - 1].image;
                document.getElementById(`dealerCard${player.hand.length}`)
                    .hidden = false;
                document.getElementById("dealerScore")
                    .innerText = `Dealer Score: ${this.dealer.score}`;
            }
        }
    }

    //ends the game
    endGame() {
        let gameOutcomeElement = document.getElementById('gameOutcome')
        gameOutcomeElement.innerText = this.typeOfOutCome;
        setTimeout(() => {
            gameOutcomeElement.hidden = false
        }, 500);
    }

    evaluateOutcome() {
        //check the dealerScore against playerScore
        //if dealer wins
        if (this.dealer.score > this.player.score && this.dealer.score <= 21) {
            this.typeOfOutCome = "You Lost"; // textColor: red background: Black
        }

        //if player wins
        if (this.player.score > this.dealer.score || this.dealer.score > 21) {
            this.typeOfOutCome = "Winner Winner Chicken Dinner";
        }

        //if tie
        if (this.player.score === this.dealer.score) {
            this.typeOfOutCome = "Push";
        }

        this.endGame();
    }

    async stand() { //this will simulate a real dealer using real fetch methods is why this is async
        //calc the dealerscore
        //score between 25 and 17
        //if score is below 17 and dealer has less than 5 cards, continue to draw
        //5-card Charlie is a special blackjack rule that states the player wins if
        //he has 5 card hand without busting, providing 1.46% house edge
        while (this.dealer.hand.length === 1 || (this.dealer.score < 17 && this.dealer.hand.length < 5)) {
            await new Promise(r => setTimeout(() => r(), 500));
            await this.drawCard(this.dealer);
        }

        this.evaluateOutcome();
    }


    static async buildGame() {
        let numOfDecks = 1; //allows us in the future to apply more decks
        //await pauses the buildGame method until the value of the fetch is returned
        let deck_id = await fetchHandler("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=" + numOfDecks + '/')
            .then((response) => response.json())
            .then((formattedData) => formattedData.deck_id) //returns the Deck ID
            .catch(error => {
                let fakeGame = new Game(null);
                fakeGame.typeOfOutCome = "Couldn't build the deck. Please leave, now."
                fakeGame.endGame();
                console.log(err)
                throw ("OOPS,", err)
            })

        let tempGame = new Game(deck_id);
        await Promise.all([tempGame.drawCard(tempGame.player), tempGame.drawCard(tempGame.player), tempGame.drawCard(tempGame.dealer)]);

        return tempGame;
    }

}

// Example API response when drawing two cards
// {
//   "success": true,
//   "cards": [
//       {
//           "image": "http://deckofcardsapi.com/static/img/KH.png",
//           "value": "KING",
//           "suit": "HEARTS",
//           "code": "KH"
//       },
//       {
//           "image": "http://deckofcardsapi.com/static/img/8C.png",
//           "value": "8",
//           "suit": "CLUBS",
//           "code": "8C"
//       }
//   ],
//   "deck_id":"3p40paa87x90",
//   "remaining": 50
// }
