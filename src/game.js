// import fetch from "node-fetch";
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const fetch = require('node-fetch');
// const Player = require('./player');
import Player from "./player.js";

export default class Game {

   constructor (deck_id) {
    // console.log(deck_id)
      if (typeof deck_id === 'undefined') {
        throw new Error('Cannot be called directly');
      }
    this.typeOfOutCome
    this.player  = new Player();
    this.deck_id = deck_id
    this.dealerScore = Math.floor((Math.random() * (25 - 17 + 1) + 17)/2); //this will need to be removed when the dealer becomes a true player

  }
  async drawCard(player){
    player.hand.push(await fetch("http://deckofcardsapi.com/api/deck/"+this.deck_id+"/draw/?count=1")
      .then(response => response.json())
      .then(formattedData => formattedData.cards[0])
      .catch(err => console.warn(err))
    )

    player.updateScore()
    if(player.score > 21){
      this.typeOfOutCome = "Busted"
      this.endGame()
    }
  }

  endGame(){
    let gameOutcomeElement = document.getElementById('gameOutcome');

    //ends the game
      //switch(if else) (this.typeOfOutCome)
        //won winning animation
          //the money falling
        //lost loosing animation
          //pops up you died
        //busted busted animation
          //https://media3.giphy.com/media/xT5LMzWVNsfgu6srOU/200.gif

    gameOutcomeElement.innerText = this.typeOfOutCome;
    gameOutcomeElement.hidden = false;
  }

  async stand(){
  //this will simulate a real dealer using real fetch methods is why this is async
    //calc the dealerscore
    //score between 25 and 17


    this.dealerScore += Math.floor((Math.random() * (25 - 17 + 1) + 17)/2);

    //check the dealerScore against playerScore
    //if dealer wins
    if(this.dealerScore > this.player.score && this.dealerScore <= 21){
       this.typeOfOutCome = "You Died"; // textColor: red background: Black
    }
    //if player wins
    if(this.player.score > this.dealerScore || this.dealerScore > 21){
      this.typeOfOutCome = "Winner Winner Chicken Dinner";
    }
    //if tie
    if(this.player.score === this.dealerScore){
        this.typeOfOutCome = "No Harm in Trying";
    }

    this.endGame();
  }

// export default;

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

  static async buildGame () {
      let numOfDecks = 1; //allows us in the future to apply more decks
      //await pauses the buildGame method until the value of the fetch is returned
        let deck_id = await fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count="+numOfDecks)
          .then((response) => response.json())
          .then((formattedData) => formattedData.deck_id) //returns the Deck ID
          .catch(error => console.warn(error))
        return new Game(deck_id);
  }

}

// module.exports = Game;
