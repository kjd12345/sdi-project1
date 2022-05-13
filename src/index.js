// https://withaterriblefate.com/wp-content/uploads/2018/01/GTA8.png
// const Game = require('./Game');

// module.exports = {
//   Player: require('./player'),
//   Game: require('./game')
// }

// export {
//   Player: require('./player'),
//   Game: require('./game')
// }

import Game from "./game.js"
import Player from "./player.js"

// let indexGame;
let counter = 2;

// use a static method to instantiate our Game
let indexGame = Game.buildGame();

indexGame.then(async (game) => {//draws two cards
  await Promise.all([game.drawCard(game.player), game.drawCard(game.player)]);
  return game;
}).then(game => {
  document.getElementById("playerCard1").src = game.player.hand[0].image;
  document.getElementById("playerCard2").src = game.player.hand[1].image;
  document.getElementById("playerScore").innerText = `Player Score: ${game.player.score}`;
  document.getElementById("dealerScore").innerText = `Dealer Score: ${game.dealerScore}`;
  return game;
}).then(game => {
  document.getElementById("hitButton").addEventListener("click", () => {
    if(game.typeOfOutCome === undefined) {
      game.drawCard(game.player)
        .then( () => {
          document.getElementById(`playerCard${counter + 1}`).src = game.player.hand[counter].image;
          document.getElementById("playerScore").innerText = `Player Score: ${game.player.score}`;
          counter++;
        })
    }
  });
  document.getElementById("standButton").addEventListener("click", () => {
    if(game.typeOfOutCome === undefined) {
      game.stand();
    }
  });
})






//type module in package

// "./index.js" async></script>


//"type" : "module";
//must be in the root package of our root object